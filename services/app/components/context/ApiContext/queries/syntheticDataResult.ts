import { useContext } from 'react';
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

export { useSyntheticDataResultsQuery };
