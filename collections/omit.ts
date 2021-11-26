import { filterKeys } from "https://deno.land/std@0.116.0/collections/filter_keys.ts";

export function omit<T>(
  record: Readonly<Record<string, T>>,
  keys: readonly string[],
): Record<string, T> {
  return filterKeys(record, (x) => !keys.includes(x));
}
