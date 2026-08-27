// eslint-disable-next-line no-undef
export function isStringOrNumber(val: unknown): val is string | number {
  return typeof val === 'string' || typeof val === 'number';
}
