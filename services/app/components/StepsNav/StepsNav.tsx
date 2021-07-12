import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import StepItem from './StepItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(5, 9),
  },
}));

interface StepsNavProps {
  // TODO
}

function StepsNav({}: StepsNavProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container={true} spacing={5}>
        <StepItem title="Step 1" description="Upload &amp; Explore" />
        <StepItem title="Step 2" description="Review &amp; Refine" />
        <StepItem title="Step 3" description="Request &amp; Release" />
        <StepItem description="Saved and History" />
      </Grid>
    </div>
  );
}

export default StepsNav;
