import { filterKeys } from "https://deno.land/std@0.224.0/collections/filter_keys.ts";

/**
 * @deprecated Use `omit()` from `std` instead.
 */
export function omit<K extends string, T>(
  record: Readonly<Record<K, T>>,
  keys: readonly string[],
): Record<K, T> {
  return filterKeys(record, (x) => !keys.includes(x));
}
