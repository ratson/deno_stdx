export function* enumerate<T>(iterable: Iterable<T>) {
  let i = -1;
  for (const x of iterable) {
    yield [++i, x] as const;
  }
}
