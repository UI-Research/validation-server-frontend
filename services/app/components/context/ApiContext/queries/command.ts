import { useContext } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from 'react-query';
import ApiContext from '..';
import load from '../load';
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

function useCommandQuery(): UseQueryResult<CommandResponse> {
  const { token } = useContext(ApiContext);
  const result = useQuery('command', () =>
    load<CommandResponse>('/command/', token),
  );
  return result;
}

export interface CommandPayload {
  command_type: number;
  command_name: string;
  sanitized_command_input: {
    epsilon: number;
    analysis_query: string;
    transformation_query: string;
  };
}

function useCommandMutation() {
  const { token } = useContext(ApiContext);
  const queryClient = useQueryClient();
  const postCommand = async (
    data: CommandPayload,
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
      console.log('onSuccess');
      console.log(data);
    },
    onError: error => {
      console.log('onError');
      console.error(error);
    },
    onSettled: () => {
      console.log('onSettled');
      // Invalidate the command query.
      queryClient.invalidateQueries('command');
    },
  });
  return result;
}

export { useCommandMutation, useCommandQuery };
