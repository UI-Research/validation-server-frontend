import { Grid, IconButton, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { AddShoppingCart } from '@material-ui/icons';
import { MouseEventHandler, ReactNode, useRef, useState } from 'react';
import getReleaseId from '../../util/getReleaseId';
import Accordion from '../Accordion';
import AccordionContentTitle from '../Accordion/content/AccordionContentTitle';
import CommandDisplay from '../Accordion/content/CommandDisplay';
import ConfidentialDataDisplay from '../Accordion/content/ConfidentialDataDisplay';
import SyntheticDataDisplay from '../Accordion/content/SyntheticDataDisplay';
import CommandRenameDialog from '../CommandRenameDialog';
import { CommandResponseResult } from '../context/ApiContext/queries/command';
import { useConfidentialDataResultByCommandId } from '../context/ApiContext/queries/confidentialData';
import { useSyntheticDataResultByCommandIdQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenuButton from '../MoreMenu/MoreMenuButton';
import MoreMenuIcon from '../MoreMenu/MoreMenuIcon';
import Paragraph from '../Paragraph';
import PrivacyCostFigure from '../PrivacyCostFigure';
import UIButton from '../UIButton';
import { Columns, getAccuracyDatum, getErrorVal } from './getAccuracyData';
import RefineAdjustmentsDialog from './RefineAdjustmentsDialog';

export interface ReviewRefineAccordionProps {
  added: boolean;
  command: CommandResponseResult;
  runId: number;
  selectedRuns: number[];
  onAddClick: (id: string) => void;
  onAddRun: (runId: number) => void;
  // TODO: Maybe move these "budget" style props to a context?
  /** Available value for the "Review & Refinement Budget". */
  availableRefinement: number;
  /** Starting value for the "Review & Refinement Budget". */
  startingRefinement: number;
  /** Available value for the "Public Release Budget". */
  availablePublic: number;
  /** Starting value for the "Public Release Budget". */
  startingPublic: number;
}
function ReviewRefineAccordion({
  added,
  command,
  onAddClick,
  onAddRun,
  runId,
  selectedRuns,
  availableRefinement,
  availablePublic,
  startingPublic,
}: ReviewRefineAccordionProps): JSX.Element | null {
  const [showRefinementDialog, setShowRefinementDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);
  const syntheticResult = useSyntheticDataResultByCommandIdQuery(
    command.command_id,
  );
  const confidentialResult = useConfidentialDataResultByCommandId(
    command.command_id,
  );

  // TODO: Do something user facing if synthetic data result query errors out.
  if (syntheticResult.isError || confidentialResult.isError) {
    return null;
  }

  // Wait for data result item to finish loading.
  if (
    syntheticResult.isLoading ||
    !syntheticResult.data ||
    confidentialResult.isLoading ||
    !confidentialResult.data
  ) {
    return <LoadingIndicator />;
  }

  const confidentialItem = confidentialResult.data.find(
    c => c.run_id === runId,
  );

  if (!confidentialItem) {
    throw new Error(
      `Confidential data result item of run ID ${runId} not found for command ${command.command_id}.`,
    );
  }

  // Event handlers
  const handleRenameClick = () => {
    setShowRenameDialog(true);
  };
  // TODO: Include remove click handler if necessary.
  // For now, leave undefined so the action will not appear.
  // const handleRemoveClick = () => {
  //
  // };
  const handleRefineClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    setShowRefinementDialog(true);
  };
  const handleRefinementDialogClose = () => {
    setShowRefinementDialog(false);
  };
  const handleRenameDialogClose = () => {
    setShowRenameDialog(false);
  };
  const handleAddVersionClick = (id: number) => {
    setShowRefinementDialog(false);
    onAddRun(id);
  };

  const handleAddClick = () => {
    // Close the accordion and focus the summary.
    if (summaryRef.current) {
      summaryRef.current.click();
      summaryRef.current.focus();
    }
    if (onAddClick) {
      onAddClick(getReleaseId(command.command_id, runId));
    }
  };

  const cost = Number(confidentialItem.privacy_budget_used);
  const accuracyDatum = getAccuracyDatum(confidentialItem);
  return (
    <Accordion
      id={String(command.command_id)}
      summaryContent={
        <ReviewRefineAccordionSummary
          added={added}
          cost={cost}
          onAddedClick={() =>
            onAddClick(getReleaseId(command.command_id, runId))
          }
          onRenameClick={handleRenameClick}
          // onRemoveClick={handleRemoveClick}
          text={
            command.command_name +
            (cost !== 1 ? ` - Adjusted to ${cost.toLocaleString()}` : '')
          }
        />
      }
      summaryRef={summaryRef}
    >
      <div style={{ width: '100%' }}>
        <CommandDisplay command={command} />
        <SyntheticDataDisplay syntheticDataResult={syntheticResult.data} />
        <ConfidentialDataDisplay confidentialDataResult={confidentialItem} />
        {!isNaN(cost) && (
          <PrivacyCostFigure
            availableBudget={availablePublic}
            cost={cost}
            title="Privacy Cost for Public Release Access"
            totalBudget={startingPublic}
          />
        )}
        <AccordionContentTitle>
          Adjustments for Random Variation
        </AccordionContentTitle>
        <Paragraph>
          To preserve privacy, random variation was added by setting the privacy
          loss budget. The distribution of the variation is:
        </Paragraph>
        <Typography component="ul">
          <li>10% Quantile: {getErrorVal(accuracyDatum['10'])}</li>
          <li>
            50% Quantile: {getErrorVal(accuracyDatum[Columns.PRIVACY_ERROR])}
          </li>
          <li>90% Quantile: {getErrorVal(accuracyDatum['90'])}</li>
        </Typography>
        <Paragraph>
          <a href="#" onClick={handleRefineClick}>
            Refine this variation
          </a>
        </Paragraph>
        <Paragraph>
          More adjustments require additional review &amp; refinement budget
          cost.
        </Paragraph>
        <div>
          <Grid container={true} justify="space-between" alignItems="center">
            <Grid item={true}>
              <UIButton
                title={`${
                  added ? 'Remove from' : 'Add to'
                } final request queue`}
                icon="AddShoppingCart"
                onClick={handleAddClick}
              />
            </Grid>
            <Grid item={true}>
              <MoreMenuButton onRenameClick={handleRenameClick} />
            </Grid>
          </Grid>
        </div>
      </div>
      <CommandRenameDialog
        command={command}
        onDialogClose={handleRenameDialogClose}
        showDialog={showRenameDialog}
      />
      <RefineAdjustmentsDialog
        availableRefinement={availableRefinement}
        confidentialDataResults={confidentialResult.data}
        selectedRuns={selectedRuns}
        onAddVersionClick={handleAddVersionClick}
        onDialogClose={handleRefinementDialogClose}
        showDialog={showRefinementDialog}
      />
    </Accordion>
  );
}

interface ReviewRefineAccordionSummaryProps {
  added?: boolean;
  cost: number;
  onAddedClick?: () => void;
  onRemoveClick?: () => void;
  onRenameClick: () => void;
  text: string | ReactNode;
}
function ReviewRefineAccordionSummary({
  added,
  cost,
  onAddedClick,
  onRemoveClick,
  onRenameClick,
  text,
}: ReviewRefineAccordionSummaryProps): JSX.Element {
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddedClick && onAddedClick();
  };
  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={7} md={9}>
          {text}
        </Grid>
        <Grid item={true} xs={1} md={1}>
          {cost.toLocaleString()}
        </Grid>
        <Grid item={true} xs={4} md={2}>
          <Grid container={true} justify="flex-end">
            <Grid item={true}>
              <IconButton
                aria-label={`${added ? 'Remove from' : 'Add to'} Queue`}
                title={`${added ? 'Remove from' : 'Add to'} Queue`}
                onClick={handleAddClick}
                style={added ? { backgroundColor: green[100] } : undefined}
              >
                <AddShoppingCart
                  style={added ? { fill: green[900] } : undefined}
                />
              </IconButton>
              <MoreMenuIcon
                onRenameClick={onRenameClick}
                onRemoveClick={onRemoveClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewRefineAccordion;
