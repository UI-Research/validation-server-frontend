import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  container: {
    border: `10px solid ${blueGrey[300]}`,
    margin: theme.spacing(1),
  },
}));

interface StepItemProps {
  description?: string;
  title?: string;
}

function StepItem({ description, title }: StepItemProps): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item={true} xs={true} className={classes.container}>
      {title && <div><strong>{title}</strong></div>}
      {description && <div>{description}</div>}
    </Grid>
  );
}

export default StepItem;
