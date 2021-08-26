import basePath from './basePath';

interface LoadOptions {
  okStatuses?: number[];
}

/**
 * Data loader for the Validation Server API.
 * @param endpoint Endpoint
 * @param token Token
 * @returns some Promise response object
 * @example
 * ```ts
 * const token = 'abc123';
 * const endpoint = '/public-use-budget/';
 * const result = await load(endpoint, token);
 * ```
 */
async function load<T>(
  endpoint: string,
  token: string | null,
  opts?: LoadOptions,
): Promise<T> {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;

  const response = await fetch(`${basePath}${endpoint}`, { headers });

  // Check that the response is ok OR if the status is passable.
  const isOkay = response.ok || opts?.okStatuses?.includes(response.status);

  if (!isOkay) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const resJson = response.json();
  return resJson;
}

export default load;
