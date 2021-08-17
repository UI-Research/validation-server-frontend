import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ApiContext from '..';
import load from '../load';
import { useBudgetQuery } from './budget';
import { CommandResponseResult, useCommandQuery } from './command';

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

function notEmpty<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

export interface SyntheticRunData extends SyntheticDataRun {
  command: CommandResponseResult;
}
function useSyntheticData() {
  const commandResult = useCommandQuery();
  const runResult = useSyntheticDataRunQuery();
  const refinementBudgetResult = useBudgetQuery('review-and-refinement-budget');
  const publicBudgetResult = useBudgetQuery('public-use-budget');
  const [data, setData] = useState<SyntheticRunData[] | null>(null);

  useEffect(() => {
    if (commandResult.data && runResult.data) {
      const filteredData = runResult.data.results
        .map(r => {
          // Get the command for the given run item.
          const command = commandResult.data.results.find(
            c => r.command_id === c.command_id,
          );
          if (!command) {
            return null;
          }
          return {
            ...r,
            command,
          };
        })
        // Filter out the null items.
        .filter(notEmpty);
      setData(filteredData);
    }
  }, [commandResult.data, runResult.data]);

  return {
    isLoading:
      commandResult.isLoading ||
      runResult.isLoading ||
      refinementBudgetResult.isLoading ||
      publicBudgetResult.isLoading,
    data,
    refinementBudgetData: refinementBudgetResult.data,
    publicBudgetData: publicBudgetResult.data,
  };
}

export { useSyntheticData };
