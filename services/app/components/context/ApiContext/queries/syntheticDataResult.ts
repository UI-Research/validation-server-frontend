import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import ApiContext from '..';
import load from '../load';

export interface SyntheticDataResult {
  command_id: number;
  run_id: number;
  accuracy: string;
  result: {
    ok: boolean;
    data: string;
  };
  privacy_budget_used: string;
}
export interface SyntheticDataResponse {
  count: number;
  results: SyntheticDataResult[];
}

function useSyntheticDataResultsQuery() {
  const { token } = useContext(ApiContext);
  const results = useQuery('synthetic-data-result', () =>
    load<SyntheticDataResponse>('/synthetic-data-result/', token),
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
function useSyntheticDataResultQuery(id: number) {
  const [stop, setStop] = useState(false);
  const { token } = useContext(ApiContext);
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
      refetchInterval: stop ? false : 3000,
      refetchIntervalInBackground: true,
    },
  );
  return results;
}

export { useSyntheticDataResultQuery, useSyntheticDataResultsQuery };
