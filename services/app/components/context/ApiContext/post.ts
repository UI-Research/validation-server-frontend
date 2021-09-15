import { getCsrfToken } from '../../../util/cookies';
import basePath from './basePath';

interface PostOptions {
  okStatuses?: number[];
}

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
async function post<T>(
  endpoint: string,
  token: string,
  data: unknown,
  opts?: PostOptions,
): Promise<T> {
  const csrfToken = getCsrfToken();

  const headers: Record<string, string> = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };

  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }

  const response = await fetch(`${basePath}${endpoint}`, {
    method: 'POST',
    headers,
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

export default post;
