/** Same as Object.entries, but types the keys and values. */
export const typedEntries = <
  T extends Record<string | number | symbol, unknown> | unknown[],
>(
  record: T,
) => Object.entries(record) as [keyof T, T[keyof T]][];
