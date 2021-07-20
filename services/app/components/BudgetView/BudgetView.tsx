import { Grid, makeStyles, Typography } from '@material-ui/core';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import BudgetFigure from './BudgetFigure';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

interface BudgetViewProps {
  // TODO
}
function BudgetView({}: BudgetViewProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <SectionTitle>Available Privacy Budgets</SectionTitle>
      <Paragraph>
        Two independent privacy budgets provide increasing levels of access to
        the confidential data.
      </Paragraph>
      <div className={classes.root}>
        <Grid container={true} spacing={5}>
          <Grid item={true} xs={true}>
            <Typography variant="h5">
              Review &amp; Refinement Budget:
            </Typography>
            <Paragraph>
              The review &amp; refinement budget covers your own exploration of
              your requests with the confidential US tax data.
            </Paragraph>
            <BudgetFigure available={610} starting={1000} />
          </Grid>
          <Grid item={true} xs={true}>
            <Typography variant="h5">Public Release Budget:</Typography>
            <Paragraph>
              The public release budget is for obtaining the confidential data
              for use in publications and other public-facing purposes.
            </Paragraph>
            <BudgetFigure available={87} starting={100} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BudgetView;
