import { filterKeys } from "https://deno.land/std@0.133.0/collections/filter_keys.ts";

export function pick<K extends string, T>(
  record: Readonly<Record<K, T>>,
  keys: readonly string[],
): Record<K, T> {
  return filterKeys(record, (x) => keys.includes(x));
}
