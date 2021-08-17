import basePath from './basePath';

interface DeleteOptions {
  okStatuses?: number[];
}

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
async function deleteMethod(
  endpoint: string,
  token: string,
  opts?: DeleteOptions,
): Promise<void> {
  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  // Check that the response is ok OR if the status is passable.
  const isOkay = response.ok || opts?.okStatuses?.includes(response.status);

  if (!isOkay) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  // No need to return the response for DELETE queries,
  // simply resolve the Promise.
  return Promise.resolve();
}

export default deleteMethod;
