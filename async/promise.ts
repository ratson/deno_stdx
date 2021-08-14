import { pooledMap } from "https://deno.land/std@0.104.0/async/mod.ts";

export async function map<T, R>(
  iterable: Iterable<T> | AsyncIterable<T>,
  mapper: (data: T) => Promise<R>,
  opts?: { readonly concurrency?: number },
) {
  const results = pooledMap(
    opts?.concurrency ?? Number.POSITIVE_INFINITY,
    iterable,
    mapper,
  );

  const arr = [];
  for await (const i of results) arr.push(i);
  return arr;
}
