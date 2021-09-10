import basePath from './basePath';

interface PatchOptions {
  okStatuses?: number[];
}

/**
 * PATCH data runner for the Validation Server API.
 * @param endpoint Endpoint string
 * @param token Token string
 * @param data The data payload to pass through
 * @returns some Promise response object
 * @example
 * ```ts
 * const endpoint = '/command/';
 * const token = 'abc123';
 * const payload = { ... };
 * const result = await patch(endpoint, token, payload);
 * ```
 */
async function patch<T>(
  endpoint: string,
  token: string,
  data: unknown,
  opts?: PatchOptions,
): Promise<T> {
  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // Check that the response is ok OR if the status is passable.
  const isOkay = response.ok || opts?.okStatuses?.includes(response.status);

  if (!isOkay) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const resJson = response.json();
  return resJson;
}

export default patch;
