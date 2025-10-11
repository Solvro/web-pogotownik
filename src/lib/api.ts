class FetchError extends Error {
  constructor(
    message: string,
    public response: Response,
  ) {
    super(message);
    this.response = response;
  }
}

export async function fetchQuery<T>(
  url: string,
  options: RequestInit,
  isJson = true,
) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new FetchError(
      `Failed to fetch ${url}: ${response.statusText}`,
      response,
    );
  }

  const data = isJson
    ? ((await response.json()) as T)
    : ((await response.text()) as T);

  return data;
}
