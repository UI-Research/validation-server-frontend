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
import getReleaseId from '../../util/getReleaseId';
import Accordion from '../Accordion';
import BarChart from '../BarChart';
import CodeBlock from '../CodeBlock';
import { CommandResponseResult } from '../context/ApiContext/queries/command';
import { useConfidentialDataResultByCommandId } from '../context/ApiContext/queries/confidentialData';
import { useSyntheticDataResultByCommandIdQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import MoreMenu from '../MoreMenu';
import Paragraph from '../Paragraph';
import SpreadsheetTable from '../SpreadsheetTable';
import UIButton from '../UIButton';
import RefineAdjustmentsDialog from './RefineAdjustmentsDialog';

export interface ReviewRefineAccordionProps {
  added: boolean;
  command: CommandResponseResult;
  epsilon: string;
  selectedEpsilons: string[];
  onAddClick: (id: string) => void;
  onAddEpsilon: (epsilon: string) => void;
  availableRefinement: number;
  startingRefinement: number;
  availablePublic: number;
}
function ReviewRefineAccordion({
  added,
  availableRefinement,
  command,
  epsilon,
  selectedEpsilons,
  onAddClick,
  onAddEpsilon,
  startingRefinement,
}: ReviewRefineAccordionProps): JSX.Element | null {
  const [showDialog, setShowDialog] = useState(false);
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
    // TODO
  };
  const handleRemoveClick = () => {
    // TODO
  };

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
    c => c.privacy_budget_used === epsilon,
  );

  if (!confidentialItem) {
    throw new Error(
      `Confidential data result item with epsilon value of ${epsilon} not found for command ${command.command_id}.`,
    );
  }

  const syntheticData: Array<{ [key: string]: string | number }> | false =
    syntheticResult.data.result.ok &&
    JSON.parse(syntheticResult.data.result.data);
  const confidentialData: Array<{ [key: string]: string | number }> | false =
    confidentialItem.result.ok && JSON.parse(confidentialItem.result.data);

  const handleRefineClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    setShowDialog(true);
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };
  const handleAddVersionClick = (epsilon: string) => {
    setShowDialog(false);
    onAddEpsilon(epsilon);
  };

  const handleAddClick = () => {
    // Close the accordion and focus the summary.
    if (summaryRef.current) {
      summaryRef.current.click();
      summaryRef.current.focus();
    }
    if (onAddClick) {
      onAddClick(getReleaseId(command.command_id, epsilon));
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
          onAddedClick={() =>
            onAddClick(getReleaseId(command.command_id, epsilon))
          }
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
          <Fragment>
            <Paragraph>
              <strong>Privacy Cost for Public Release Access</strong>
            </Paragraph>
            <div>
              <Grid container={true}>
                <Grid item={true} xs={true}>
                  <Typography align="left">
                    Cost for request: {cost.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item={true} xs={true}>
                  <Typography align="right">
                    Available budget: {availableRefinement.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <BarChart
                width={600}
                max={startingRefinement}
                value={availableRefinement}
                secondaryValue={cost}
              />
            </div>
          </Fragment>
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
                onRemoveClick={handleRemoveClick}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <RefineAdjustmentsDialog
        confidentialDataResults={confidentialResult.data}
        selectedEpsilons={selectedEpsilons}
        onAddVersionClick={handleAddVersionClick}
        onDialogClose={handleDialogClose}
        showDialog={showDialog}
      />
    </Accordion>
  );
}

interface ReviewRefineAccordionSummaryProps {
  added?: boolean;
  cost: number;
  onAddedClick?: () => void;
  onRemoveClick?: () => void;
  onRenameClick?: () => void;
  text: string | ReactNode;
}
function ReviewRefineAccordionSummary({
  added,
  cost,
  onAddedClick,
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
          {cost}
        </Grid>
        <Grid item={true} xs={4} md={2}>
          <Grid container={true} justify="flex-end">
            <Grid item={true}>
              <IconButton
                aria-label="Add"
                onClick={handleAddClick}
                style={added ? { backgroundColor: green[100] } : undefined}
              >
                <AddShoppingCart
                  style={added ? { fill: green[900] } : undefined}
                />
              </IconButton>
              <IconButton aria-label="More">
                <MoreVert />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ReviewRefineAccordion;
