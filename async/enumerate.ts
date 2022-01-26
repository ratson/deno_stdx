export async function* enumerate<T>(iterable: AsyncIterable<T> | Iterable<T>) {
  let i = -1;
  for await (const x of iterable) {
    yield [++i, x] as const;
  }
}
