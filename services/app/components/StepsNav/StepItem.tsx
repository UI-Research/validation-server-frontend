import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { LockOpenOutlined, LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import StepPopover from './StepPopover';

const useStyles = makeStyles(theme => ({
  container: {
    border: `10px solid ${blueGrey[50]}`,
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
    textDecoration: 'none',
    '&:hover, &:focus': {
      borderColor: blueGrey[600],
      textDecoration: 'underline',
    },
  },
  activeContainer: {
    borderColor: blueGrey[300],
  },
  locked: {
    // Undo hover and focus styling for locked items.
    '&:hover, &:focus': {
      borderColor: blueGrey[50],
      textDecoration: 'none',
    },
  },
  // Attempt to vertically center align the icon and title.
  iconTitlePlacement: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
}));

interface StepItemProps {
  id: string;
  description?: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  isActive?: boolean;
  isLocked?: boolean;
}

function StepItem({
  description,
  title,
  onClick,
  isActive,
  isLocked,
}: StepItemProps): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // In theory, we should be passing the `isActive` prop to `useStyles()`
  // and applying the active style that way. However, this results in a
  // "Prop `className` did not match" error.
  // As a workaround, manually add the active container class when appropriate.
  const arr = [classes.container];
  if (isActive) {
    arr.push(classes.activeContainer);
  }
  if (isLocked) {
    arr.push(classes.locked);
  }

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid
      component="a"
      // Use an undefined href for locked item to effectively disable it.
      href={isLocked ? undefined : '#'}
      onClick={onClick}
      item={true}
      xs={true}
      className={arr.join(' ')}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      aria-haspopup={isLocked ? 'true' : undefined}
      onMouseEnter={isLocked ? handlePopoverOpen : undefined}
      onMouseLeave={isLocked ? handlePopoverClose : undefined}
    >
      <div>
        <span>
          {isLocked !== undefined && (
            <span className={classes.iconTitlePlacement}>
              <ItemIcon locked={isLocked} />
            </span>
          )}
          <span className={classes.iconTitlePlacement}>
            <strong>{title}</strong>
          </span>
        </span>
      </div>
      {description && <div>{description}</div>}
      {isLocked && (
        <StepPopover
          anchorEl={anchorEl}
          isOpen={open}
          onClose={handlePopoverClose}
        />
      )}
    </Grid>
  );
}

interface ItemIconProps {
  locked: boolean;
}
function ItemIcon({ locked }: ItemIconProps): JSX.Element {
  const Icon = locked ? LockOutlined : LockOpenOutlined;
  return <Icon style={{ width: '24px', height: '24px' }} fontSize="small" />;
}

export default StepItem;
