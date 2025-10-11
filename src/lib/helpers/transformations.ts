export const deserializeNullableDate = (value: string | null | undefined) =>
  value == null ? null : new Date(value);

export const arrayAverage = (array: number[]) =>
  array.reduce((a, b) => a + b, 0) / array.length;
