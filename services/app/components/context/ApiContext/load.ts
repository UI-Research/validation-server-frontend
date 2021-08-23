const basePath = 'https://validation-server-stg.urban.org/api/v1';

/**
 * Data loader for the Validation Server API.
 * @param endpoint Endpoint
 * @param token Token
 * @returns some Promise response object
 * @example
 * ```ts
 * const researcherId = 2;
 * const endpoint = `/public-use-budget/${researcherId}`;
 * const result = await load(endpoint);
 * ```
 */
async function load(endpoint: string, token?: string | null) {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;

  const response = await fetch(`${basePath}${endpoint}`, { headers });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}. Check your token.`,
    );
  }

  const resJson = response.json();
  return resJson;
}

export default load;
