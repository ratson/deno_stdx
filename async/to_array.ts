/**
 * Implement https://github.com/tc39/proposal-array-from-async
 */
export async function toArray<T, M = T>(
  items: AsyncIterable<T> | Iterable<T>,
  mapfn?: (item: T) => M,
  thisArg?: unknown,
): Promise<M[]> {
  const ret: M[] = [];
  for await (const x of items) {
    ret.push(
      mapfn === undefined ? x as unknown as M : await mapfn.call(thisArg, x),
    );
  }
  return ret;
}
