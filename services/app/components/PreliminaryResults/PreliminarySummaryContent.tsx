import { Grid, IconButton, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { PlaylistAdd } from '@material-ui/icons';
import React, { ReactNode } from 'react';
import Check from '../Icons/Check';
import Warning from '../Icons/Warning';
import MoreMenuIcon from '../MoreMenu/MoreMenuIcon';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

interface PreliminarySummaryContentProps {
  iconType: 'check' | 'warning';
  text: string | ReactNode;
  onRenameClick: () => void;
  onRemoveClick: () => void;
  added?: boolean;
  onAddedClick?: () => void;
}
function PreliminarySummaryContent({
  added,
  iconType,
  text,
  onAddedClick,
  onRenameClick,
  onRemoveClick,
}: PreliminarySummaryContentProps): JSX.Element {
  const classes = useStyles();
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAddedClick && onAddedClick();
  };
  return (
    <div className={classes.root}>
      <Grid container={true} alignItems="center">
        <Grid item={true} xs={1}>
          {iconType === 'check' ? <Check /> : <Warning />}
        </Grid>
        <Grid item={true} xs={7}>
          {text}
        </Grid>
        <Grid item={true} xs={4}>
          {/* Align these components to the right (flex-end) */}
          <Grid container={true} justifyContent="flex-end">
            {iconType === 'check' && (
              <Grid item={true}>
                <IconButton
                  aria-label={`${
                    added ? 'Remove from' : 'Add to'
                  } Review & Refinement Queue`}
                  title={`${
                    added ? 'Remove from' : 'Add to'
                  } Review & Refinement Queue`}
                  onClick={handleAddClick}
                  style={added ? { backgroundColor: green[100] } : undefined}
                >
                  <PlaylistAdd
                    style={added ? { fill: green[900] } : undefined}
                  />
                </IconButton>
              </Grid>
            )}
            <Grid item={true}>
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

export default PreliminarySummaryContent;
