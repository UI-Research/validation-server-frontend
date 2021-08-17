import { Fragment } from 'react';
import { useSyntheticData } from '../context/ApiContext/queries/syntheticData';
import LoadingIndicator from '../LoadingIndicator';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import PreliminaryResultsAccordion from './PreliminaryResultsAccordion';

interface PreliminaryResultsProps {
  // TODO
}
function PreliminaryResults({}: PreliminaryResultsProps): JSX.Element {
  const { data, isLoading, publicBudgetData, refinementBudgetData } =
    useSyntheticData();

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
            {data.map(r => (
              <PreliminaryResultsAccordion
                key={r.run_id}
                runItem={r}
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
