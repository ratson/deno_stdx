import { filterKeys } from "https://deno.land/std@0.122.0/collections/filter_keys.ts";

export function omit<K extends string, T>(
  record: Readonly<Record<K, T>>,
  keys: readonly string[],
): Record<K, T> {
  return filterKeys(record, (x) => !keys.includes(x));
}
