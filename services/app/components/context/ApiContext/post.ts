import basePath from './basePath';

/**
 * POST data runner for the Validation Server API.
 * @param endpoint Endpoint string
 * @param token Token string
 * @param data The data payload to pass through
 * @returns some Promise response object
 * @example
 * ```ts
 * const endpoint = '/command/';
 * const token = 'abc123';
 * const payload = { ... };
 * const result = await post(endpoint, token, payload);
 * ```
 */
async function post<T = any>(
  endpoint: string,
  token: string,
  data: Object,
): Promise<T> {
  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const resJson = response.json();
  return resJson;
}

export default post;
