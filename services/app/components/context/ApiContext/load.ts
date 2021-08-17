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
 * const researcherId = 2;
 * const token = 'abc123';
 * const endpoint = `/public-use-budget/${researcherId}`;
 * const result = await load(endpoint, token);
 * ```
 */
async function load<T = any>(
  endpoint: string,
  token: string,
  opts?: LoadOptions,
): Promise<T> {
  const response = await fetch(`${basePath}${endpoint}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  // Check that the response is ok OR if the status is passable.
  const isOkay = response.ok || opts?.okStatuses?.includes(response.status);

  if (!isOkay) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const resJson = response.json();
  return resJson;
}

export default load;
