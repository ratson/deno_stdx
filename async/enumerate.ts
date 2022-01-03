export async function* enumerate<T>(iterable: AsyncIterable<T> | Iterable<T>) {
  let i = 0;
  for await (const x of iterable) {
    yield [i, x] as const;
    i++;
  }
}
