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
async function load(endpoint: string, token: string) {
  const response = await fetch(`${basePath}${endpoint}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const resJson = response.json();
  return resJson;
}

export default load;