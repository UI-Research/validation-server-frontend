import basePath from './basePath';

interface LoadOptions {
  okStatuses?: number[];
}

/**
 * General data getter for a URL.
 * @param url Full URL to GET.
 * @param token API Token
 * @param opts LoadOptions
 * @returns
 */
async function loadUrl<T>(
  url: string,
  token?: string | null,
  opts?: LoadOptions,
): Promise<T> {
  const headers = token ? { Authorization: `Token ${token}` } : undefined;

  const response = await fetch(url, { headers });

  // Check that the response is ok OR if the status is passable.
  const isOkay = response.ok || opts?.okStatuses?.includes(response.status);

  if (!isOkay) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const resJson = response.json();
  return resJson;
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
  return loadUrl(`${basePath}${endpoint}`, token, opts);
}

interface ListResponse<T> {
  count: number;
  next: string | null;
  prev: string | null;
  results: T[];
}
/**
 * Data loader for the list endpoints. Will iterate through each page
 * to get the full list of data items.
 * @param endpoint List endpoint
 * @param token Token
 * @param opts LoadOptions
 * @returns Promise with an array of list items
 */
async function loadList<T>(
  endpoint: string,
  token: string | null,
  opts?: LoadOptions,
): Promise<T[]> {
  const response = await load<ListResponse<T>>(endpoint, token, opts);

  let data = response.results;

  // If `next` was provided, then there are more results to retrieve.
  // Iterate through each page to get all the results.
  let nextUrl = response.next;
  while (nextUrl) {
    // Since the `response.next` will be a full URL, use `loadUrl`.
    const { next, results } = await loadUrl<ListResponse<T>>(
      nextUrl.replace(/^http:\/\//i, 'https://'),
      token,
      opts,
    );
    data = data.concat(results);
    nextUrl = next;
  }

  return data;
}

export { loadList };
export default load;
