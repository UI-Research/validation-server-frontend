import { Grid, makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import {
  BudgetType,
  useBudgetQuery,
} from '../context/ApiContext/queries/budget';
import { H5 } from '../Headings';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import BudgetFigure from './BudgetFigure';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  budgetTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
}));

function BudgetView(): JSX.Element {
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
          <Grid item={true} sm={6}>
            <H5 className={classes.budgetTitle}>
              Review &amp; Refinement Budget:
            </H5>
            <Paragraph>
              The review &amp; refinement budget covers your own exploration of
              your requests with the confidential US tax data.
            </Paragraph>
            <BudgetFigureContainer type="review-and-refinement-budget" />
          </Grid>
          <Grid item={true} sm={6}>
            <H5 className={classes.budgetTitle}>Public Release Budget:</H5>
            <Paragraph>
              The public release budget is for obtaining the confidential data
              for use in publications and other public-facing purposes.
            </Paragraph>
            <BudgetFigureContainer type="public-use-budget" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

interface BudgetFigureContainerProps {
  type: BudgetType;
}
function BudgetFigureContainer({
  type,
}: BudgetFigureContainerProps): JSX.Element {
  const { data, isError, isLoading } = useBudgetQuery(type);

  if (isError) {
    return (
      <Grid container={true} spacing={2} justifyContent="center">
        <Grid item={true}>
          <ErrorIcon color="error" />
        </Grid>
        <Grid item={true}>
          <Typography>Something went wrong!</Typography>
        </Grid>
      </Grid>
    );
  }

  if (isLoading || !data) {
    return <LoadingIndicator />;
  }

  return (
    <BudgetFigure
      available={data.total_budget_available}
      starting={Number(data.total_budget_allocated)}
    />
  );
}
export default BudgetView;
