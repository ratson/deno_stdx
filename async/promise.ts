import { pooledMap } from "https://deno.land/std@0.108.0/async/mod.ts";

export async function map<T, R>(
  iterable: Iterable<T> | AsyncIterable<T>,
  mapper: (data: T) => Promise<R>,
  opts?: { readonly concurrency?: number },
): Promise<R[]> {
  async function* gen() {
    let index = 0;
    for await (const value of iterable) {
      yield { index, value };
      index += 1;
    }
  }

  const arr: R[] = [];
  const results = pooledMap(
    opts?.concurrency ?? Number.POSITIVE_INFINITY,
    gen(),
    async ({ index, value }) => {
      arr[index] = await mapper(value);
    },
  );

  for await (const _ of results) {
    // noop
  }
  return arr;
}
