import { useBudgetQuery } from '../context/ApiContext/queries/budget';
import { useCommandQuery } from '../context/ApiContext/queries/command';
import LoadingIndicator from '../LoadingIndicator';
import SectionTitle from '../SectionTitle';
import ReviewRefineAccordionGroup from './ReviewRefineAccordionGroup';

function useRefinementQueueResults(queue: number[]) {
  const commandResult = useCommandQuery();
  const refinementBudgetResult = useBudgetQuery('review-and-refinement-budget');
  const publicBudgetResult = useBudgetQuery('public-use-budget');

  return {
    isLoading:
      commandResult.isLoading ||
      refinementBudgetResult.isLoading ||
      publicBudgetResult.isLoading,
    // Sort commands by ID.
    data: commandResult.data?.results
      .filter(c => queue.includes(c.command_id))
      .sort((a, b) => (a.command_id > b.command_id ? 1 : -1)),
    refinementBudgetData: refinementBudgetResult.data,
    publicBudgetData: publicBudgetResult.data,
  };
}

interface ReviewRefineQueueProps {
  refinementQueue: number[];
  releaseQueue: string[];
  onReleaseToggle: (id: string) => void;
}
function ReviewRefineQueue({
  refinementQueue,
  releaseQueue,
  onReleaseToggle,
}: ReviewRefineQueueProps): JSX.Element {
  const { data, isLoading, publicBudgetData, refinementBudgetData } =
    useRefinementQueueResults(refinementQueue);

  return (
    <div>
      <SectionTitle>Review &amp; Refinement Queue</SectionTitle>
      <div>
        {/* Wait for everything to load. */}
        {isLoading || !data || !publicBudgetData || !refinementBudgetData ? (
          <LoadingIndicator />
        ) : (
          data.map(c => (
            <ReviewRefineAccordionGroup
              key={c.command_id}
              command={c}
              onAddClick={onReleaseToggle}
              availablePublic={publicBudgetData.total_budget_available}
              availableRefinement={refinementBudgetData.total_budget_available}
              releaseQueue={releaseQueue}
              startingPublic={Number(publicBudgetData.total_budget_allocated)}
              startingRefinement={Number(
                refinementBudgetData.total_budget_allocated,
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewRefineQueue;
