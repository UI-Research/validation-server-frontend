import { useContext, useMemo, useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import ApiContext from '..';
import load, { loadList } from '../load';

// Set max wait time to 1 minute, converted to milliseconds.
const MAX_WAIT_TIME_MS = 1 * 60 * 1000;
// Interval on refetching attempts. Set to 3 seconds, converted to milliseconds.
const INTERVAL_MS = 3 * 1000;
const MAX_ATTEMPTS = MAX_WAIT_TIME_MS / INTERVAL_MS;

export interface SyntheticDataResult {
  command_id: number;
  run_id: number;
  accuracy: string;
  result: {
    ok: boolean;
    data: string;
    error?: string;
  };
  privacy_budget_used: string;
}
export interface SyntheticDataResponse {
  count: number;
  results: SyntheticDataResult[];
}

function useSyntheticDataResultsQuery(): UseQueryResult<SyntheticDataResult[]> {
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const results = useQuery('synthetic-data-result', () =>
    loadList<SyntheticDataResult>('/synthetic-data-result/', token),
  );
  return results;
}

interface ResultNotFound {
  detail: string;
}
function isNotFound<T>(item: T | ResultNotFound): item is ResultNotFound {
  return Object.keys(item).includes('detail');
}

/**
 * Get the synthetic data result for a given run ID. Since the result will not populate
 * until the results are totally complete, refetch until data is available.
 * @param id Run ID to fetch.
 * @returns UseQueryResult UseQueryResult<SyntheticDataResult | null>
 */
function useSyntheticDataResultQuery(
  id: number,
): UseQueryResult<SyntheticDataResult | null> {
  const [stop, setStop] = useState(false);
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const results = useQuery(
    ['synthetic-data-result', id],
    () =>
      load<SyntheticDataResult | ResultNotFound>(
        `/synthetic-data-result/${id}/`,
        token,
        {
          // For this use case, result items will not appear until they are complete.
          okStatuses: [404],
        },
      ).then(result => {
        if (isNotFound(result)) {
          // For "not found" result, return null so it's easier to check.
          return null;
        }
        return result;
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
      enabled: id !== null,
      // Refetch every 3 seconds (3000ms).
      refetchInterval: stop ? false : INTERVAL_MS,
      refetchIntervalInBackground: true,
    },
  );
  return results;
}

/**
 * Get the synthetic data result for a given command ID. Since the result will not populate
 * until the results are totally complete, refetch until data is available.
 * @param commandId Command ID to fetch.
 * @returns UseQueryResult UseQueryResult<SyntheticDataResult | null>
 */
function useSyntheticDataResultByCommandIdQuery(
  commandId: number,
): UseQueryResult<SyntheticDataResult | null> {
  const [stop, setStop] = useState(false);
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const paramString = useMemo(() => {
    const p = new URLSearchParams();
    p.set('command_id', String(commandId));
    return p.toString();
  }, [commandId]);

  const [attempts, setAttempts] = useState(0);

  const results = useQuery(
    ['synthetic-data-result', { commandId }],
    () =>
      load<SyntheticDataResponse>(
        `/synthetic-data-result/?${paramString}`,
        token,
      ).then(data => {
        setAttempts(attempts + 1);
        // For no results, return null so it's easier to check.
        if (data.count === 0 || data.results.length === 0) {
          // Check attempts to retrieve query. Stop after a certain number as to not burden the server.
          // NOTE: probably remove this once API work has been more finalized.
          if (attempts > MAX_ATTEMPTS) {
            throw new Error(
              `Exceeded attempts to retrieve synthetic data result for command ${commandId}. Stopping.`,
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
      refetchInterval: stop ? false : INTERVAL_MS,
      refetchIntervalInBackground: true,
    },
  );
  return results;
}

export {
  useSyntheticDataResultByCommandIdQuery,
  useSyntheticDataResultQuery,
  useSyntheticDataResultsQuery,
};
