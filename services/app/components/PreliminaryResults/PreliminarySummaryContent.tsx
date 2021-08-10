import {
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { MoreVert, PlaylistAdd } from '@material-ui/icons';
import React, { ReactNode, useState } from 'react';
import Check from '../Icons/Check';
import Warning from '../Icons/Warning';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

interface PreliminarySummaryContentProps {
  iconType: 'check' | 'warning';
  text: string | ReactNode;
}
function PreliminarySummaryContent({
  iconType,
  text,
}: PreliminarySummaryContentProps): JSX.Element {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null,
  );
  const classes = useStyles();
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    handleMenuClose();
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
          <Grid container={true} justify="flex-end">
            {iconType === 'check' && (
              <Grid item={true}>
                <IconButton aria-label="Add" onClick={e => e.stopPropagation()}>
                  <PlaylistAdd />
                </IconButton>
              </Grid>
            )}
            <Grid item={true}>
              <IconButton
                aria-label="More"
                aria-controls="more-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="more-menu"
                anchorEl={menuAnchorEl}
                keepMounted={true}
                open={Boolean(menuAnchorEl)}
                onClose={(event, reason) => {
                  // For backdrop clicks, stop propagation (if event has it).
                  // Else, the accordion with think it was clicked and toggle.
                  if (reason === 'backdropClick') {
                    if (typeof (event as any).stopPropagation === 'function') {
                      (
                        event as React.MouseEvent<HTMLElement>
                      ).stopPropagation();
                    }
                  }
                  handleMenuClose();
                }}
              >
                {/* TODO: Handle menu item clicks. */}
                <MenuItem onClick={handleMenuItemClick}>
                  Save for Later
                </MenuItem>
                <MenuItem onClick={handleMenuItemClick}>
                  Remove from List
                </MenuItem>
                <MenuItem onClick={handleMenuItemClick}>Rename</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default PreliminarySummaryContent;
