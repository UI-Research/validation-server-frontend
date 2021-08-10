import basePath from './basePath';

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
async function load<T = any>(endpoint: string, token: string): Promise<T> {
  const response = await fetch(`${basePath}${endpoint}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}. Check your token.`,
    );
  }

  const resJson = response.json();
  return resJson;
}

export default load;
