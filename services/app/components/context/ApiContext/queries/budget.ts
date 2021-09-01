import { useContext } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import ApiContext from '..';
import load from '../load';
import patch from '../patch';

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

async function loadBudget(
  type: BudgetType,
  token: string | null,
): Promise<BudgetDataResponseResult> {
  if (!token) {
    throw new Error('Token is not defined.');
  }
  return load<BudgetDataResponse>(`/${type}/`, token).then(data => {
    if (data.count === 0 || data.results.length === 0) {
      throw new Error(`Budget not found for ${type}.`);
    }
    return data.results[0];
  });
}

function useBudgetQuery(
  type: BudgetType,
): UseQueryResult<BudgetDataResponseResult> {
  const { token } = useContext(ApiContext);
  const result = useQuery(type, () => loadBudget(type, token));
  return result;
}

interface BudgetPatchOptions {
  onSuccess?: (data: BudgetDataResponseResult) => void;
  onError?: (error: unknown) => void;
}
function useBudgetPatch(
  type: BudgetType,
  // TODO: Remove the researcher ID requirement here once we can.
  researcherId: number,
  opts: BudgetPatchOptions = {},
): UseMutationResult<BudgetDataResponseResult, unknown, number, unknown> {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  // Function to patch the budget.
  const patchBudget = async (
    cost: number,
  ): Promise<BudgetDataResponseResult> => {
    if (!token) {
      throw new Error('Token is not defined.');
    }
    const response = await patch<BudgetDataResponseResult>(
      `/${type}/${researcherId}/`,
      token,
      {
        privacy_budget_used: cost,
      },
    );
    return response;
  };
  // Setup mutation object.
  const result = useMutation(patchBudget, {
    ...opts,
    onSettled: () => {
      // Invalidate the budget query.
      queryClient.invalidateQueries(type);
    },
  });
  return result;
}

export { loadBudget, useBudgetPatch, useBudgetQuery };
