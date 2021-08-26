import { useContext, useMemo, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import ApiContext from '..';
import load from '../load';

interface ConfidentialDataResult {
  command_id: number;
  run_id: number;
  researcher_id: number;
  accuracy: string;
  result: {
    ok: boolean;
    data: string;
    error?: string;
  };
  display_results_decision: boolean;
  release_results_decision: boolean;
  privacy_budget_used: string;
}
interface ConfidentialDataResponse {
  count: number;
  results: ConfidentialDataResult[];
}
function useConfidentialDataResultsQuery(): UseQueryResult<ConfidentialDataResponse> {
  const { token } = useContext(ApiContext);
  const results = useQuery('confidential-data-result', () =>
    load<ConfidentialDataResponse>('/confidential-data-result/', token),
  );
  return results;
}

function useConfidentialDataResultByCommandId(
  commandId: number,
): UseQueryResult<ConfidentialDataResult | null> {
  const [stop, setStop] = useState(false);
  const { token } = useContext(ApiContext);
  const paramString = useMemo(() => {
    const p = new URLSearchParams();
    p.set('command_id', String(commandId));
    return p.toString();
  }, [commandId]);

  const [attempts, setAttempts] = useState(0);

  const results = useQuery(
    ['synthetic-data-result', { commandId }],
    () =>
      load<ConfidentialDataResponse>(
        `/synthetic-data-result/?${paramString}`,
        token,
      ).then(data => {
        setAttempts(attempts + 1);
        // For no results, return null so it's easier to check.
        if (data.count === 0 || data.results.length === 0) {
          // Check attempts to retrieve query. Stop after a certain number as to not burden the server.
          // NOTE: probably remove this once API work has been more finalized.
          if (attempts > 4) {
            throw new Error(
              `Exceeded attempts to retrieve confidential data result for command ${commandId}. Stopping.`,
            );
          }
          return null;
        }
        return data.results[0];
      }),
    {
      onSuccess: data => {
        if (!data) {
          // Data not yet found, keep refetching.
        } else {
          // Data found, stop refetching.
          setStop(true);
        }
      },
      onError: () => {
        setStop(true);
      },
      enabled: commandId !== null,
      // Refetch every 3 seconds (3000ms).
      refetchInterval: stop ? false : 3000,
      refetchIntervalInBackground: true,
    },
  );
  return results;
}

export {
  useConfidentialDataResultsQuery,
  useConfidentialDataResultByCommandId,
};
