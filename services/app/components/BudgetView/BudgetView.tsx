import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import ApiContext from '../context/ApiContext';
import load from '../context/ApiContext/load';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import BudgetFigure from './BudgetFigure';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

interface BudgetDataResponse {
  researcher_id: number;
  total_budget_allocated: string;
  total_budget_available: number;
  total_budget_used: string;
}

interface BudgetViewProps {}
function BudgetView({}: BudgetViewProps): JSX.Element {
  const classes = useStyles();
  const { researcherId, token } = useContext(ApiContext);
  const reviewRefinementBudgetResult = useQuery<BudgetDataResponse>(
    'review-refinement-budget',
    () => load(`/review-and-refinement-budget/${researcherId}/`, token),
  );
  const publicUseBudgetResult = useQuery<BudgetDataResponse>(
    'public-use-budget',
    () => load(`/public-use-budget/${researcherId}/`, token),
  );
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
            {reviewRefinementBudgetResult.isLoading ||
            !reviewRefinementBudgetResult.data ? (
              <LoadingIndicator />
            ) : (
              <BudgetFigure
                available={
                  reviewRefinementBudgetResult.data.total_budget_available
                }
                starting={Number(
                  reviewRefinementBudgetResult.data.total_budget_allocated,
                )}
              />
            )}
          </Grid>
          <Grid item={true} xs={true}>
            <Typography variant="h5">Public Release Budget:</Typography>
            <Paragraph>
              The public release budget is for obtaining the confidential data
              for use in publications and other public-facing purposes.
            </Paragraph>
            {publicUseBudgetResult.isLoading || !publicUseBudgetResult.data ? (
              <LoadingIndicator />
            ) : (
              <BudgetFigure
                available={publicUseBudgetResult.data.total_budget_available}
                starting={Number(
                  publicUseBudgetResult.data.total_budget_allocated,
                )}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default BudgetView;
