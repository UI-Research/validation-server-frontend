import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    border: `10px solid ${blueGrey[50]}`,
    margin: theme.spacing(1),
    '&:hover, &:focus': {
      borderColor: blueGrey[600],
    },
  },
  activeContainer: {
    borderColor: blueGrey[300],
  },
}));

interface StepItemProps {
  id: string;
  description?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  isActive?: boolean;
}

function StepItem({
  description,
  title,
  onClick,
  isActive,
}: StepItemProps): JSX.Element {
  const classes = useStyles();
  // In theory, we should be passing the `isActive` prop to `useStyles()`
  // and applying the active style that way. However, this results in a
  // "Prop `className` did not match" error.
  // As a workaround, manually add the active container class when appropriate.
  const arr = [classes.container];
  if (isActive) {
    arr.push(classes.activeContainer);
  }
  return (
    <Grid
      component="a"
      href="#"
      onClick={onClick}
      item={true}
      xs={true}
      className={arr.join(' ')}
    >
      {title && (
        <div>
          <strong>{title}</strong>
        </div>
      )}
      {description && <div>{description}</div>}
    </Grid>
  );
}

export default StepItem;
