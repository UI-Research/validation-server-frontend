import { useState } from 'react';
import { useConfidentialDataRunPost } from '../context/ApiContext/queries/confidentialData';
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
  const [releaseQueue, setReleaseQueue] = useState<number[]>([]);
  const confidentialDataPost = useConfidentialDataRunPost();

  const handleUploadExploreNextClick = () => {
    // On Upload & Explore "Next" button click, we want to do three things:
    // - Post Confidential Data Runs for each item in the queue
    // - Update the Review & Refinement Budget for each item in the queue
    // - Go to the next step
    refinementQueue.forEach(command_id => {
      // TODO: Do not hard code the researcher ID.
      confidentialDataPost.mutate({ command_id, researcher_id: 2 });
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
    setReleaseQueue(arr => arr.filter(n => n !== commandId));
  };

  const handleReleaseToggle = (commandId: number): void => {
    if (releaseQueue.includes(commandId)) {
      setReleaseQueue(arr => arr.filter(n => n !== commandId));
    } else {
      setReleaseQueue(arr => [...arr, commandId]);
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
