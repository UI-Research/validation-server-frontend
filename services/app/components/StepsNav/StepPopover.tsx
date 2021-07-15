import {
  makeStyles,
  Popover,
  PopoverProps,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverPaper: {
    maxWidth: 240,
    padding: theme.spacing(4),
  },
}));

interface StepPopoverProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: PopoverProps['onClose'];
}

function StepPopover({
  anchorEl,
  isOpen,
  onClose,
}: StepPopoverProps): JSX.Element {
  const classes = useStyles();
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.popoverPaper,
      }}
      open={isOpen}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      onClose={onClose}
      disableRestoreFocus={true}
    >
      <Typography>
        Please access an IRS-certified secure environment in order to access
        these tabs
      </Typography>
    </Popover>
  );
}

export default StepPopover;
