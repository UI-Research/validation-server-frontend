import { Fragment } from 'react';
import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import { useCommandQuery } from '../context/ApiContext/queries/command';
import { useSyntheticDataResultsQuery } from '../context/ApiContext/queries/syntheticDataResult';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import PreliminaryResultsAccordion from './PreliminaryResultsAccordion';

interface PreliminaryResultsProps {
  // TODO
}
function PreliminaryResults({}: PreliminaryResultsProps): JSX.Element {
  const commandResults = useCommandQuery();
  const syntheticResults = useSyntheticDataResultsQuery();
  const refinementBudgetResult = useBudgetQuery('review-and-refinement-budget');
  const publicBudgetResult = useBudgetQuery('public-use-budget');

  return (
    <div>
      <SectionTitle>Preliminary Results Using Synthetic Data</SectionTitle>
      <Paragraph>
        Here, you may review the results of each command using the{' '}
        <a href="#">synthetic tax data</a>. For each successful command, you
        will see the cost against your review &amp; refinement privacy budget to
        view these results with the confidential tax data. For your reference,
        the public use privacy cost is also displayed.
      </Paragraph>
      <div>
        {/* Wait for everything to load. */}
        {syntheticResults.isLoading ||
        !syntheticResults.data ||
        commandResults.isLoading ||
        !commandResults.data ||
        refinementBudgetResult.isLoading ||
        !refinementBudgetResult.data ||
        publicBudgetResult.isLoading ||
        !publicBudgetResult.data ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            {syntheticResults.data.results.map(r => (
              <PreliminaryResultsAccordion
                key={r.run_id}
                resultItem={r}
                commands={commandResults.data.results}
                availablePublic={publicBudgetResult.data.total_budget_available}
                availableRefinement={
                  refinementBudgetResult.data.total_budget_available
                }
                startingRefinement={Number(
                  refinementBudgetResult.data.total_budget_allocated,
                )}
              />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default PreliminaryResults;
