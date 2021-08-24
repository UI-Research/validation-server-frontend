import { useContext } from 'react';
import { useQuery } from 'react-query';
import ApiContext from '..';
import load from '../load';

interface SyntheticDataRun {
  command_id: number;
  run_id: number;
  epsilon: string;
  /** Formatted like '2021-08-10T20:08:53+0000' */
  date_time_run_submitted: string;
}
interface SyntheticDataRunResponse {
  count: number;
  results: SyntheticDataRun[];
}
function useSyntheticDataRunQuery() {
  const { token } = useContext(ApiContext);
  const result = useQuery('synthetic-data-run', () =>
    load<SyntheticDataRunResponse>('/synthetic-data-run/', token),
  );
  return result;
}

export { useSyntheticDataRunQuery };
