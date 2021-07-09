import { makeStyles, Theme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import React from 'react';

interface StyleProps {
  isActive?: boolean;
}
const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  container: ({ isActive }) => ({
    border: `10px solid ${blueGrey[isActive ? 300 : 50]}`,
    margin: theme.spacing(1),
    '&:hover, &:focus': {
      borderColor: blueGrey[600],
    },
  }),
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
  const classes = useStyles({ isActive });
  return (
    <Grid
      component="a"
      href="#"
      onClick={onClick}
      item={true}
      xs={true}
      className={classes.container}
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
