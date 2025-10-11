export const deserializeNullableDate = (value: string | null | undefined) =>
  value == null ? null : new Date(value);
