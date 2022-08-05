import { pooledMap } from "https://deno.land/std@0.151.0/async/pool.ts";
import { enumerate } from "./enumerate.ts";

export async function map<T, R>(
  iterable: Iterable<T> | AsyncIterable<T>,
  mapper: (data: T) => Promise<R>,
  opts?: { concurrency?: number },
): Promise<R[]> {
  const arr: R[] = [];
  const results = pooledMap(
    opts?.concurrency ?? Number.POSITIVE_INFINITY,
    enumerate(iterable),
    async ([index, value]) => {
      arr[index] = await mapper(value);
    },
  );

  for await (const _ of results) {
    // noop
  }
  return arr;
}
