import { useMutation, UseMutationResult, useQueryClient } from 'react-query';
import { apiBase } from './basePath';

interface TokenResponse {
  token: string;
}

async function fetchToken(
  username: string,
  password: string,
): Promise<TokenResponse> {
  const response = await fetch(`${apiBase}/api-token-auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}.`);
  }

  const resJson = response.json();
  return resJson;
}

interface TokenPayload {
  username: string;
  password: string;
}
function useApiTokenMutation(): UseMutationResult<
  TokenResponse,
  unknown,
  TokenPayload,
  unknown
> {
  const queryClient = useQueryClient();
  const postToken = async ({
    username,
    password,
  }: TokenPayload): Promise<TokenResponse> => {
    const response = await fetchToken(username, password);
    return response;
  };
  const result = useMutation(postToken, {
    onSettled: () => {
      // Invalidate the command and synthetic data results queries.
      queryClient.invalidateQueries('command');
      queryClient.invalidateQueries('synthetic-data-result');
    },
  });
  return result;
}

export { useApiTokenMutation };
