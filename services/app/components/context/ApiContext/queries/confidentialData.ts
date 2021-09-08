import { useContext, useMemo, useState } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import ApiContext from '..';
import load, { loadList } from '../load';
import patch from '../patch';
import post from '../post';

export interface ConfidentialDataResult {
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
function useConfidentialDataResultsQuery(): UseQueryResult<
  ConfidentialDataResult[]
> {
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const results = useQuery('confidential-data-result', () =>
    loadList<ConfidentialDataResult>('/confidential-data-result/', token),
  );
  return results;
}

function useConfidentialDataResultByIdQuery(
  id: number,
): UseQueryResult<ConfidentialDataResult> {
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const results = useQuery(['confidential-data-result', { id }], () =>
    load<ConfidentialDataResult>(`/confidential-data-result/${id}/`, token),
  );
  return results;
}

function useConfidentialDataResultByCommandId(
  commandId: number,
): UseQueryResult<ConfidentialDataResult[] | null> {
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
    ['confidential-data-result', { commandId }],
    () =>
      loadList<ConfidentialDataResult>(
        `/confidential-data-result/?${paramString}`,
        token,
      ).then(data => {
        setAttempts(attempts + 1);
        // For no results, return null so it's easier to check.
        if (data.length === 0) {
          // Check attempts to retrieve query. Stop after a certain number as to not burden the server.
          // NOTE: probably remove this once API work has been more finalized.
          if (attempts > 4) {
            throw new Error(
              `Exceeded attempts to retrieve confidential data result for command ${commandId}. Stopping.`,
            );
          }
          return null;
        }
        return data;
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

interface ConfidentialDataResultPatchPayload {
  run_id: number;
  display_results_decision: boolean;
}
interface ConfidentialDataResultPatchOptions {
  onSuccess?: (data: ConfidentialDataResult) => void;
  onError?: (error: unknown) => void;
}
function useConfidentialDataResultPatch(
  opts: ConfidentialDataResultPatchOptions = {},
): UseMutationResult<
  ConfidentialDataResult,
  unknown,
  ConfidentialDataResultPatchPayload,
  unknown
> {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  // Function to patch the confidential data result.
  const patchResult = async (
    payload: ConfidentialDataResultPatchPayload,
  ): Promise<ConfidentialDataResult> => {
    if (!token) {
      throw new Error('Token is not defined.');
    }
    const response = await patch<ConfidentialDataResult>(
      `/confidential-data-result/${payload.run_id}/`,
      token,
      payload,
    );
    return response;
  };
  // Setup mutation object.
  const result = useMutation(patchResult, {
    ...opts,
    onSettled: () => {
      // Invalidate the confidential data result and budget queries.
      queryClient.invalidateQueries('confidential-data-result');
      queryClient.invalidateQueries('public-use-budget');
      queryClient.invalidateQueries('review-and-refinement-budget');
    },
  });
  return result;
}

export interface ConfidentialDataRunResult {
  command_id: number;
  run_id: number;
  researcher_id: number;
  epsilon: string;
  date_time_run_submitted: string;
}
/**
 * Get Confidential Data Runs from the `/confidential-data-run/` endpoint.
 * @param commandId Command ID. If supplied, will filter results to only data runs that use this command.
 * @returns `UseQueryResult<ConfidentialDataRunResult[]>`
 */
function useConfidentialDataRun(
  commandId?: number,
): UseQueryResult<ConfidentialDataRunResult[]> {
  const { token } = useContext(ApiContext);
  if (!token) {
    throw new Error('Token is not defined.');
  }
  const paramString = useMemo(() => {
    if (commandId) {
      const p = new URLSearchParams();
      p.set('command_id', String(commandId));
      return p.toString();
    }
    return null;
  }, [commandId]);
  const key = commandId
    ? ['confidential-data-run', { commandId }]
    : 'confidential-data-run';
  const result = useQuery(key, () =>
    loadList<ConfidentialDataRunResult>(
      `/confidential-data-run/${paramString ? `?${paramString}` : ''}`,
      token,
    ),
  );
  return result;
}

interface ConfidentialDataRunPostPayLoad {
  command_id: number;
}
interface ConfidentialDataRunPostOptions {
  onSuccess?: (data: ConfidentialDataRunResult[]) => void;
  onError?: (error: unknown) => void;
}
function useConfidentialDataRunPost(
  opts: ConfidentialDataRunPostOptions = {},
): UseMutationResult<
  ConfidentialDataRunResult[],
  unknown,
  ConfidentialDataRunPostPayLoad,
  unknown
> {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const postCommand = async (
    payload: ConfidentialDataRunPostPayLoad,
  ): Promise<ConfidentialDataRunResult[]> => {
    if (!token) {
      throw new Error('Token is not defined.');
    }
    const all = await Promise.all(
      // For the given command payload, we want to post 5 separate
      // confidential data runs: 0.01, 0.1, 1, 5, 10.
      [0.01, 0.1, 1, 5, 10].map(epsilon =>
        confidentialDataRunPostIfNeeded(
          {
            ...payload,
            epsilon,
          },
          token,
        ),
      ),
    );
    return all;
  };
  const result = useMutation(postCommand, {
    ...opts,
    onSettled: () => {
      // Invalidate the confidential data queries.
      queryClient.invalidateQueries('confidential-data-run');
      queryClient.invalidateQueries('confidential-data-result');
    },
  });
  return result;
}

interface FullPostPayLoad {
  command_id: number;
  epsilon: number;
}
async function confidentialDataRunPostIfNeeded(
  payload: FullPostPayLoad,
  token: string,
): Promise<ConfidentialDataRunResult> {
  // Check to see if a run already exists for the given payload.
  const p = new URLSearchParams();
  p.set('command_id', String(payload.command_id));
  const run = await loadList<ConfidentialDataRunResult>(
    `/confidential-data-run/?${p.toString()}`,
    token,
  ).then(res => res.find(r => Number(r.epsilon) === payload.epsilon));
  // If run was found, then resolve the promise by returning it.
  if (run) {
    return run;
  }

  // Else, post the payload to create a new data run.
  return post<ConfidentialDataRunResult>(
    '/confidential-data-run/',
    token,
    payload,
  );
}

export {
  useConfidentialDataResultByIdQuery,
  useConfidentialDataResultPatch,
  useConfidentialDataResultsQuery,
  useConfidentialDataResultByCommandId,
  useConfidentialDataRun,
  useConfidentialDataRunPost,
};
