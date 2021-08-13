import basePath from './basePath';

/**
 * DELETE data runner for the Validation Server API.
 * @param endpoint Endpoint string
 * @param token Token string
 * @returns some Promise response object
 * @example
 * ```ts
 * const endpoint = '/command/2/';
 * const token = 'abc123';
 * const result = await delete(endpoint, token);
 * ```
 */
async function deleteMethod(endpoint: string, token: string): Promise<void> {
  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  // No need to return the response for DELETE queries,
  // simply resolve the Promise.
  return Promise.resolve();
}

export default deleteMethod;
