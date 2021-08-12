import { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import ApiContext from '..';
import load from '../load';

export interface BudgetDataResponse {
  researcher_id: number;
  total_budget_allocated: string;
  total_budget_available: number;
  total_budget_used: string;
}

export type BudgetType = 'public-use-budget' | 'review-and-refinement-budget';

function useBudgetQuery(type: BudgetType): UseQueryResult<BudgetDataResponse> {
  const { researcherId, token } = useContext(ApiContext);
  const result = useQuery(type, () =>
    load<BudgetDataResponse>(`/${type}/${researcherId}/`, token),
  );
  return result;
}

export { useBudgetQuery };
