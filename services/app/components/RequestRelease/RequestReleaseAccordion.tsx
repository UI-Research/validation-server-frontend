import { Checkbox, Grid, makeStyles } from '@material-ui/core';
import { Fragment, ReactNode, useRef, useState } from 'react';
import Accordion from '../Accordion';
import CodeBlock from '../CodeBlock';
import CommandRenameDialog from '../CommandRenameDialog';
import MoreMenuButton from '../MoreMenu/MoreMenuButton';
import MoreMenuIcon from '../MoreMenu/MoreMenuIcon';
import Paragraph from '../Paragraph';
import PrivacyCostFigure from '../PrivacyCostFigure';
import SpreadsheetTable from '../SpreadsheetTable';
import UIButton from '../UIButton';
import { ReleaseItem } from './RequestRelease';

interface RequestReleaseAccordionProps {
  finalQueue: string[];
  onCheckboxClick: () => void;
  releaseItem: ReleaseItem;
  /** Available value for the "Public Release Budget". */
  availablePublic: number;
  /** Starting value for the "Public Release Budget". */
  startingPublic: number;
}
function RequestReleaseAccordion({
  availablePublic,
  finalQueue,
  onCheckboxClick,
  releaseItem: { id, command, confidentialDataResult, syntheticDataResult },
  startingPublic,
}: RequestReleaseAccordionProps): JSX.Element {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const added = finalQueue.includes(id);
  const cost = Number(confidentialDataResult.privacy_budget_used);
  const syntheticData: Array<{ [key: string]: string | number }> | false =
    syntheticDataResult.result.ok &&
    JSON.parse(syntheticDataResult.result.data);
  const confidentialData: Array<{ [key: string]: string | number }> | false =
    confidentialDataResult.result.ok &&
    JSON.parse(confidentialDataResult.result.data);

  // Event handlers
  const handleRenameClick = () => {
    setShowRenameDialog(true);
  };
  const handleRenameDialogClose = () => {
    setShowRenameDialog(false);
  };
  const handleToggleButtonClick = () => {
    // Close the accordion and focus the summary.
    if (summaryRef.current) {
      summaryRef.current.click();
      summaryRef.current.focus();
    }
    onCheckboxClick();
  };

  return (
    <Fragment>
      <Accordion
        id={id}
        summaryContent={
          <RequestAccordionSummary
            added={added}
            cost={cost}
            onCheckboxClick={onCheckboxClick}
            onRenameClick={handleRenameClick}
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
          <div>
            <Grid container={true} justify="space-between" alignItems="center">
              <Grid item={true}>
                <UIButton
                  title={`${
                    added ? 'Remove from' : 'Add to'
                  } final request queue`}
                  icon="AddShoppingCart"
                  onClick={handleToggleButtonClick}
                />
              </Grid>
              <Grid item={true}>
                <MoreMenuButton onRenameClick={handleRenameClick} />
              </Grid>
            </Grid>
          </div>
        </div>
      </Accordion>
      <CommandRenameDialog
        command={command}
        onDialogClose={handleRenameDialogClose}
        showDialog={showRenameDialog}
      />
    </Fragment>
  );
}

// Accordion Summary content
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
}));
interface RequestAccordionSummaryProps {
  added: boolean;
  cost: number;
  onCheckboxClick: () => void;
  onRemoveClick?: () => void;
  onRenameClick?: () => void;
  text: string | ReactNode;
}
function RequestAccordionSummary({
  added,
  cost,
  onCheckboxClick,
  onRemoveClick,
  onRenameClick,
  text,
}: RequestAccordionSummaryProps): JSX.Element {
  const classes = useStyles();

  // Event Handlers
  const handleCheckboxClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    onCheckboxClick();
  };

  return (
    <div className={classes.root}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={1}>
          <Checkbox
            checked={added}
            color="default"
            inputProps={{ 'aria-label': 'toggle request' }}
            onClick={handleCheckboxClick}
          />
        </Grid>
        <Grid item={true} xs={7}>
          {text}
        </Grid>
        <Grid item={true} xs={1}>
          {cost.toLocaleString()}
        </Grid>
        <Grid item={true} xs={3}>
          <Grid container={true} justify="flex-end">
            <MoreMenuIcon
              onRemoveClick={onRemoveClick}
              onRenameClick={onRenameClick}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RequestReleaseAccordion;
