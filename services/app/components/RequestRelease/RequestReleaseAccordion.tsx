import { Checkbox, Grid, makeStyles } from '@material-ui/core';
import { Fragment, ReactNode } from 'react';
import Accordion from '../Accordion';
import MoreMenuIcon from '../MoreMenu/MoreMenuIcon';

interface RequestReleaseAccordionProps {
  finalQueue: string[];
  onCheckboxClick: () => void;
  releaseId: string;
}
function RequestReleaseAccordion({
  finalQueue,
  onCheckboxClick,
  releaseId,
}: RequestReleaseAccordionProps): JSX.Element {
  const handleRenameClick = () => {
    // TODO
  };

  return (
    <Fragment>
      <Accordion
        id={releaseId}
        summaryContent={
          <RequestAccordionSummary
            added={finalQueue.includes(releaseId)}
            cost={5}
            onCheckboxClick={onCheckboxClick}
            onRenameClick={handleRenameClick}
            text={releaseId}
          />
        }
      >
        {releaseId}
      </Accordion>
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
