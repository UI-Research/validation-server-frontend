import { useState } from 'react';
import { useConfidentialDataRunPost } from '../context/ApiContext/queries/confidentialData';
import { useSyntheticDataResultsQuery } from '../context/ApiContext/queries/syntheticDataResult';
import RequestRelease from '../RequestRelease/RequestRelease';
import ReviewRefine from '../ReviewRefine/ReviewRefine';
import UploadExplore from '../UploadExplore/UploadExplore';
import { steps } from './steps';

interface StepsContentProps {
  activeStep: string;
  initialQueueList: number[];
  onSetStep: (id: string) => void;
}
function StepsContent({
  activeStep,
  initialQueueList,
  onSetStep,
}: StepsContentProps): JSX.Element | null {
  const [refinementQueue, setRefinementQueue] =
    useState<number[]>(initialQueueList);
  const syntheticResults = useSyntheticDataResultsQuery();
  const [releaseQueue, setReleaseQueue] = useState<number[]>([]);
  const confidentialDataPost = useConfidentialDataRunPost();

  const handleUploadExploreNextClick = () => {
    // On Upload & Explore "Next" button click, we want to do three things:
    // - Post Confidential Data Runs for each item in the queue
    // - Update the Review & Refinement Budget for each item in the queue
    // - Go to the next step
    refinementQueue.forEach(command_id => {
      confidentialDataPost.mutate({ command_id });
      // If the item was already in our initial queue list, this means that budget has already been
      // accounted for. Return early.
      // TODO: Figure out a different way to check if budget was already accounted for.
      // Perhaps setup a dictionary in the API Context?
      if (initialQueueList.includes(command_id)) {
        return;
      }
      // Get the synthetic data result that matches the command ID.
      const syntheticItem = syntheticResults.data?.find(
        s => s.command_id === command_id,
      );
      if (!syntheticItem) {
        throw new Error(
          `Synthetic data result item not found for command ${command_id}. Budget not patched.`,
        );
      }
      // Get the cost of the item.
      const cost = Number(syntheticItem.privacy_budget_used);
      // Ensure that the cost is finite (i.e. not NaN nor Infinity).
      if (Number.isFinite(cost)) {
        // reviewBudgetPatch.mutate(cost);
      } else {
        throw new Error(
          `privacy_budget_used value (${syntheticItem.privacy_budget_used}) of synthetic-data-result run ID ${syntheticItem.run_id} not usable.`,
        );
      }
    });
    onSetStep(steps[1].id);
  };

  const handleCommandToggle = (commandId: number): void => {
    if (refinementQueue.includes(commandId)) {
      setRefinementQueue(arr => arr.filter(c => c !== commandId));
    } else {
      setRefinementQueue(arr => [...arr, commandId]);
    }
  };

  // When a command has been completely removed, also remove it from
  // the queues.
  const handleCommandRemove = (commandId: number): void => {
    setRefinementQueue(arr => arr.filter(c => c !== commandId));
    // TODO: Figure out way to remove from the release queue as well.
    // setReleaseQueue(arr =>
    //   arr.filter(n => n.split('-')[0] !== String(commandId)),
    // );
  };

  const handleReleaseToggle = (id: number): void => {
    if (releaseQueue.includes(id)) {
      setReleaseQueue(arr => arr.filter(n => n !== id));
    } else {
      setReleaseQueue(arr => [...arr, id]);
    }
  };

  switch (activeStep) {
    case steps[0].id:
      return (
        <UploadExplore
          onNextClick={handleUploadExploreNextClick}
          refinementQueue={refinementQueue}
          onCommandToggle={handleCommandToggle}
          onCommandRemove={handleCommandRemove}
        />
      );
    case steps[1].id:
      return (
        <ReviewRefine
          onNextClick={() => onSetStep(steps[2].id)}
          refinementQueue={refinementQueue}
          releaseQueue={releaseQueue}
          onReleaseToggle={handleReleaseToggle}
        />
      );
    case steps[2].id:
      return <RequestRelease />;
    default:
      return null;
  }
}

export default StepsContent;
