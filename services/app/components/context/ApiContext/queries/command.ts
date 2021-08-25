import { useContext } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import ApiContext from '..';
import deleteMethod from '../deleteMethod';
import load from '../load';
import patch from '../patch';
import post from '../post';

export interface CommandResponseResult {
  command_id: number;
  command_name: string;
  command_type: number;
  researcher_id: number;
  sanitized_command_input: {
    analysis_query: string;
    epsilon: number;
    transformation_query: string;
  };
}
export interface CommandResponse {
  count: number;
  results: CommandResponseResult[];
}
// COMMAND GET QUERY
function useCommandQuery(): UseQueryResult<CommandResponse> {
  const { token } = useContext(ApiContext);
  const result = useQuery('command', () =>
    load<CommandResponse>('/command/', token),
  );
  return result;
}

// COMMAND POST QUERY
export interface CommandPostPayload {
  command_type: number;
  command_name: string;
  sanitized_command_input: {
    epsilon: number;
    analysis_query: string;
    transformation_query?: string;
  };
}
interface CommandPostOptions {
  onSuccess?: (data: CommandResponseResult) => void;
  onError?: (error: unknown) => void;
}
function useCommandPost(opts: CommandPostOptions = {}) {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const postCommand = async (
    data: CommandPostPayload,
  ): Promise<CommandResponseResult> => {
    const response = await post<CommandResponseResult>(
      '/command/',
      token,
      data,
    );
    return response;
  };
  const result = useMutation(postCommand, {
    onSuccess: data => {
      if (opts.onSuccess) {
        opts.onSuccess(data);
      }
    },
    onError: error => {
      if (opts.onError) {
        opts.onError(error);
      }
    },
    onSettled: () => {
      // Invalidate the command and synthetic data results queries.
      queryClient.invalidateQueries('command');
      queryClient.invalidateQueries('synthetic-data-result');
    },
  });
  return result;
}

// COMMAND PATCH QUERY
interface CommandPatchPayload {
  command_id: number;
  command_name: string;
}
interface CommandPatchOptions {
  onSuccess?: (data: CommandResponseResult) => void;
  onError?: (error: unknown) => void;
}
function useCommandPatch(opts: CommandPatchOptions = {}) {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const patchCommand = async (
    data: CommandPatchPayload,
  ): Promise<CommandResponseResult> => {
    const response = await patch<CommandResponseResult>(
      `/command/${data.command_id}/`,
      token,
      { command_name: data.command_name },
    );
    return response;
  };
  const result = useMutation(patchCommand, {
    onSuccess: data => {
      if (opts.onSuccess) {
        opts.onSuccess(data);
      }
    },
    onError: error => {
      if (opts.onError) {
        opts.onError(error);
      }
    },
    onSettled: () => {
      // Invalidate the command and synthetic data results queries.
      queryClient.invalidateQueries('command');
      queryClient.invalidateQueries('synthetic-data-result');
    },
  });
  return result;
}

// COMMAND DELETE QUERY
interface CommandDeletePayload {
  command_id: number;
}
interface CommandDeleteOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}
function useCommandDelete(opts: CommandDeleteOptions = {}) {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const deleteCommand = async (data: CommandDeletePayload) =>
    deleteMethod(`/command/${data.command_id}/`, token);
  const result = useMutation(deleteCommand, {
    onSuccess: () => {
      if (opts.onSuccess) {
        opts.onSuccess();
      }
    },
    onError: error => {
      if (opts.onError) {
        opts.onError(error);
      }
    },
    onSettled: () => {
      // Invalidate the command and synthetic data results queries.
      queryClient.invalidateQueries('command');
      queryClient.invalidateQueries('synthetic-data-result');
    },
  });
  return result;
}

export { useCommandDelete, useCommandPatch, useCommandPost, useCommandQuery };
