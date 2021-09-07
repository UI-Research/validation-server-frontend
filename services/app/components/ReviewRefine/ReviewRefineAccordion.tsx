import { Grid, IconButton, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { AddShoppingCart, MoreVert } from '@material-ui/icons';
import {
  Fragment,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
} from 'react';
import Accordion from '../Accordion';
import CodeBlock from '../CodeBlock';
import CommandRenameDialog from '../CommandRenameDialog';
import { CommandResponseResult } from '../context/ApiContext/queries/command';
import { useConfidentialDataResultByCommandId } from '../context/ApiContext/queries/confidentialData';
import { useSyntheticDataResultByCommandIdQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenu from '../MoreMenu';
import Paragraph from '../Paragraph';
import PrivacyCostFigure from '../PrivacyCostFigure';
import SpreadsheetTable from '../SpreadsheetTable';
import UIButton from '../UIButton';
import RefineAdjustmentsDialog from './RefineAdjustmentsDialog';

export interface ReviewRefineAccordionProps {
  added: boolean;
  command: CommandResponseResult;
  runId: number;
  selectedRuns: number[];
  onAddClick: (id: number) => void;
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
  availablePublic,
  startingPublic,
}: ReviewRefineAccordionProps): JSX.Element | null {
  const [showRefinementDialog, setShowRefinementDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
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

  const syntheticData: Array<{ [key: string]: string | number }> | false =
    syntheticResult.data.result.ok &&
    JSON.parse(syntheticResult.data.result.data);
  const confidentialData: Array<{ [key: string]: string | number }> | false =
    confidentialItem.result.ok && JSON.parse(confidentialItem.result.data);

  // Event handlers
  const handleMoreButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

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
      onAddClick(runId);
    }
  };

  const cost = Number(confidentialItem.privacy_budget_used);
  return (
    <Accordion
      id={String(command.command_id)}
      summaryContent={
        <ReviewRefineAccordionSummary
          added={added}
          cost={cost}
          onAddedClick={() => onAddClick(runId)}
          onRenameClick={handleRenameClick}
          // onRemoveClick={handleRemoveClick}
          text={command.command_name}
        />
      }
      summaryRef={summaryRef}
    >
      <div style={{ width: '100%' }}>
        <Paragraph>
          <strong>Command:</strong>
        </Paragraph>
        <div>
          <CodeBlock code={command.sanitized_command_input.analysis_query} />
        </div>
        {syntheticData ? (
          <Fragment>
            <Paragraph>
              <strong>Results with Synthetic Data:</strong>
            </Paragraph>
            <div>
              <SpreadsheetTable
                columns={Object.keys(syntheticData[0])}
                data={syntheticData}
              />
            </div>
          </Fragment>
        ) : null}
        {confidentialData ? (
          <Fragment>
            <Paragraph>
              <strong>Results with Confidential Data:</strong>
            </Paragraph>
            <div>
              <SpreadsheetTable
                columns={Object.keys(confidentialData[0])}
                data={confidentialData}
              />
            </div>
          </Fragment>
        ) : null}
        {!isNaN(cost) && (
          <PrivacyCostFigure
            availableBudget={availablePublic}
            cost={cost}
            title="Privacy Cost for Public Release Access"
            totalBudget={startingPublic}
          />
        )}
        <Paragraph>
          <strong>Adjustments for Privacy</strong>
        </Paragraph>
        <Paragraph>
          {/* TODO: Properly setup this section with dynamic data. */}
          To preserve privacy, random variation was added by setting:
        </Paragraph>
        <Typography component="ul">
          <li>
            {/* TODO: Use proper RMSE value. */}
            Root mean square error (RMSE): XYZ{' '}
            <a href="#" onClick={handleRefineClick}>
              Refine this privacy adjustment
            </a>
          </li>
        </Typography>
        <Paragraph>
          Additional adjustments require additional review &amp; refinement
          budget cost.
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
              <UIButton
                title="More Actions"
                icon="MoreVert"
                aria-label="More"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={handleMoreButtonClick}
              />
              <MoreMenu
                menuAnchorEl={menuAnchorEl}
                onMenuClose={handleMenuClose}
                onRenameClick={handleRenameClick}
                // onRemoveClick={handleRemoveClick}
              />
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
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddedClick && onAddedClick();
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={7} md={9}>
          {text}
        </Grid>
        <Grid item={true} xs={1} md={1}>
          {cost}
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
              <IconButton
                aria-label="More"
                aria-controls="more-menu"
                aria-haspopup="true"
                title="More actions"
                onClick={handleMenuClick}
              >
                <MoreVert />
              </IconButton>
              <MoreMenu
                menuAnchorEl={menuAnchorEl}
                onMenuClose={handleMenuClose}
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
