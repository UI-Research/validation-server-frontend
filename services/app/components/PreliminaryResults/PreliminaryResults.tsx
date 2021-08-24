import { Fragment } from 'react';
import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import { useCommandQuery } from '../context/ApiContext/queries/command';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import PreliminaryResultsAccordion from './PreliminaryResultsAccordion';

function usePreliminaryResults() {
  const commandResult = useCommandQuery();
  const refinementBudgetResult = useBudgetQuery('review-and-refinement-budget');
  const publicBudgetResult = useBudgetQuery('public-use-budget');

  return {
    isLoading:
      commandResult.isLoading ||
      refinementBudgetResult.isLoading ||
      publicBudgetResult.isLoading,
    // Sort commands by ID.
    data: commandResult.data?.results.sort((a, b) =>
      a.command_id > b.command_id ? 1 : -1,
    ),
    refinementBudgetData: refinementBudgetResult.data,
    publicBudgetData: publicBudgetResult.data,
  };
}

interface PreliminaryResultsProps {}
function PreliminaryResults({}: PreliminaryResultsProps): JSX.Element {
  const { data, isLoading, publicBudgetData, refinementBudgetData } =
    usePreliminaryResults();

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
        {isLoading || !data || !publicBudgetData || !refinementBudgetData ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            {data.map(c => (
              <PreliminaryResultsAccordion
                key={c.command_id}
                command={c}
                availablePublic={publicBudgetData.total_budget_available}
                availableRefinement={
                  refinementBudgetData.total_budget_available
                }
                startingRefinement={Number(
                  refinementBudgetData.total_budget_allocated,
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
