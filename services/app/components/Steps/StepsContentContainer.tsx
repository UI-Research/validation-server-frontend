import { useQuery } from 'react-query';
import { loadList } from '../context/ApiContext/load';
import { CommandResponseResult } from '../context/ApiContext/queries/command';
import { ConfidentialDataRunResult } from '../context/ApiContext/queries/confidentialData';
import LoadingIndicator from '../LoadingIndicator';
import StepsContent from './StepsContent';

async function loadQueue(token: string): Promise<number[]> {
  const [fullCommandIds, confidentialRuns] = await Promise.all([
    loadList<CommandResponseResult>('/command/', token).then(res =>
      res.map(c => c.command_id),
    ),
    loadList<ConfidentialDataRunResult>('/confidential-data-run/', token),
  ]);

  // Get list of unique command IDs from the confidential data run query.
  // This will infer which commands were previously added to the refinement queue,
  // so we should add them to the initial queue list.
  const uniqueIds: number[] = [];
  confidentialRuns.forEach(d => {
    if (
      // If item is not currently in our unique ID array
      // and contains an actual command ID we can use,
      // then add it to our array.
      !uniqueIds.includes(d.command_id) &&
      fullCommandIds.includes(d.command_id)
    ) {
      uniqueIds.push(d.command_id);
    }
  });
  return uniqueIds;
}

interface StepsContentContainerProps {
  activeStep: string;
  onSetStep: (id: string) => void;
  token: string;
}

function StepsContentContainer({
  token,
  ...props
}: StepsContentContainerProps): JSX.Element {
  // TODO: make use of the command and confidential data run React queries
  // already setup here to cut down on duplicate calls.
  // This would require figuring out how to set this up to never call again.
  // Else, the query would get marked as stale by our POST/PATCH/DELETE calls
  // and cause the query to refetch; causing side-effects on the queue,
  // unnecessary re-rendering, and possible wonkiness for the display (i.e. loading display).
  const result = useQuery('initial-queue', () => loadQueue(token));

  if (!result.data || result.isLoading) {
    return <LoadingIndicator />;
  }

  return <StepsContent {...props} initialQueueList={result.data} />;
}

export default StepsContentContainer;
