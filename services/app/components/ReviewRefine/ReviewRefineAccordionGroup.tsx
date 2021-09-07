import { Fragment, useEffect, useState } from 'react';
import { useConfidentialDataResultByCommandId } from '../context/ApiContext/queries/confidentialData';
import LoadingIndicator from '../LoadingIndicator';
import ReviewRefineAccordion, {
  ReviewRefineAccordionProps,
} from './ReviewRefineAccordion';

interface ReviewRefineAccordionGroupProps
  extends Omit<
    ReviewRefineAccordionProps,
    'added' | 'onAddRun' | 'runId' | 'selectedRuns'
  > {
  releaseQueue: number[];
}
function ReviewRefineAccordionGroup({
  releaseQueue,
  ...props
}: ReviewRefineAccordionGroupProps): JSX.Element {
  const confidentialResult = useConfidentialDataResultByCommandId(
    props.command.command_id,
  );
  // Keep track of what run IDs we are displaying for this group of accordions.
  const [runIds, setRunIds] = useState<number[] | null>(null);

  useEffect(() => {
    if (!runIds) {
      // For initial load, get the run ID of the confidential data result with epsilon "1.00".
      const run = confidentialResult.data?.find(
        d => d.privacy_budget_used === '1.00',
      );
      if (run) {
        setRunIds([run.run_id]);
      }
    }
  }, [confidentialResult.data, runIds]);

  const handleAddRun = (id: number) => {
    setRunIds(arr => {
      if (arr && !arr.includes(id)) {
        return [...arr, id];
      } else {
        return arr;
      }
    });
  };

  if (!runIds) {
    return <LoadingIndicator />;
  }

  return (
    <Fragment>
      {runIds.map(id => (
        <ReviewRefineAccordion
          key={id}
          {...props}
          added={releaseQueue.includes(id)}
          onAddRun={handleAddRun}
          runId={id}
          selectedRuns={runIds}
        />
      ))}
    </Fragment>
  );
}

export default ReviewRefineAccordionGroup;
