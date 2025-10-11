class FetchError extends Error {
  constructor(
    message: string,
    public response: Response,
  ) {
    super(message);
    this.response = response;
  }
}

export async function fetchQuery<T>(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new FetchError(
      `Failed to fetch ${url}: ${response.statusText}`,
      response,
    );
  }
  const data = (await response.json()) as T;
  return data;
}
