import { Fragment, useEffect, useState } from 'react';
import {
  useConfidentialDataResultByCommandId,
  useConfidentialDataResultPatch,
} from '../context/ApiContext/queries/confidentialData';
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
  const confidentialResultPatch = useConfidentialDataResultPatch();
  // Keep track of our initial fetching as to prevent duplicative calls.
  // TODO: Figure out way to keep track of this via the `confidentialResultPatch` data object.
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if (fetched) {
      return;
    }
    // We always assume that the epsilon "1.00" result should
    const run = confidentialResult.data?.find(
      d => d.privacy_budget_used === '1.00',
    );
    if (run) {
      setFetched(true);
      if (run.display_results_decision === false) {
        // TODO: check that this mutation is currently already running before running.
        confidentialResultPatch.mutate({
          run_id: run.run_id,
          display_results_decision: true,
        });
      }
    }
  }, [confidentialResult.data, confidentialResultPatch, fetched]);

  const handleAddRun = (id: number) => {
    confidentialResultPatch.mutate({
      run_id: id,
      display_results_decision: true,
    });
  };

  const results = confidentialResult.data?.filter(
    d => d.display_results_decision === true,
  );

  if (!results || results.length === 0) {
    return <LoadingIndicator />;
  }

  return (
    <Fragment>
      {results.map(result => (
        <ReviewRefineAccordion
          key={result.run_id}
          {...props}
          added={releaseQueue.includes(result.run_id)}
          onAddRun={handleAddRun}
          runId={result.run_id}
          selectedRuns={results.map(r => r.run_id)}
        />
      ))}
    </Fragment>
  );
}

export default ReviewRefineAccordionGroup;
