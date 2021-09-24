import { Checkbox, Grid, makeStyles } from '@material-ui/core';
import { Fragment, ReactNode, useRef, useState } from 'react';
import Accordion from '../Accordion';
import CommandDisplay from '../Accordion/content/CommandDisplay';
import ConfidentialDataDisplay from '../Accordion/content/ConfidentialDataDisplay';
import SyntheticDataDisplay from '../Accordion/content/SyntheticDataDisplay';
import CommandRenameDialog from '../CommandRenameDialog';
import MoreMenuButton from '../MoreMenu/MoreMenuButton';
import MoreMenuIcon from '../MoreMenu/MoreMenuIcon';
import UIButton from '../UIButton';
import { ReleaseItem } from './RequestRelease';

interface RequestReleaseAccordionProps {
  finalQueue: string[];
  onCheckboxClick?: () => void;
  releaseItem: ReleaseItem;
  /** Available value for the "Public Release Budget". */
  availablePublic: number;
  /** Starting value for the "Public Release Budget". */
  startingPublic: number;
}
function RequestReleaseAccordion({
  finalQueue,
  onCheckboxClick,
  releaseItem: { id, command, confidentialDataResult, syntheticDataResult },
}: RequestReleaseAccordionProps): JSX.Element {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const added = finalQueue.includes(id);
  const cost = Number(confidentialDataResult.privacy_budget_used);

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
    onCheckboxClick && onCheckboxClick();
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
          <SyntheticDataDisplay syntheticDataResult={syntheticDataResult} />
          <ConfidentialDataDisplay
            confidentialDataResult={confidentialDataResult}
          />
          <div style={{ marginTop: '1rem' }}>
            <Grid container={true} justify="space-between" alignItems="center">
              <Grid item={true}>
                {onCheckboxClick && (
                  <UIButton
                    title={`${
                      added ? 'Remove from' : 'Add to'
                    } final request queue`}
                    icon="AddShoppingCart"
                    onClick={handleToggleButtonClick}
                  />
                )}
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
  onCheckboxClick?: () => void;
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
    onCheckboxClick && onCheckboxClick();
  };

  return (
    <div className={classes.root}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={1}>
          {onCheckboxClick && (
            <Checkbox
              checked={added}
              color="default"
              inputProps={{ 'aria-label': 'toggle request' }}
              onClick={handleCheckboxClick}
            />
          )}
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
