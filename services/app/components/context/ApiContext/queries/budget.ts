import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import ApiContext from '..';
import load from '../load';

interface BudgetDataResponseResult {
  researcher_id: number;
  total_budget_allocated: string;
  total_budget_available: number;
  total_budget_used: string;
}

interface BudgetDataResponse {
  count: number;
  results: BudgetDataResponseResult[];
}

export type BudgetType = 'public-use-budget' | 'review-and-refinement-budget';

function useBudgetQuery(
  type: BudgetType,
): UseQueryResult<BudgetDataResponseResult> {
  const { token } = useContext(ApiContext);
  const result = useQuery(type, () =>
    load<BudgetDataResponse>(`/${type}/`, token).then(data => {
      if (data.count === 0 || data.results.length === 0) {
        throw new Error(`Budget not found for ${type}.`);
      }
      return data.results[0];
    }),
  );
  return result;
}

export { useBudgetQuery };
