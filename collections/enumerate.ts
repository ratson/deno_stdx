export function* enumerate<T>(iterable: Iterable<T>) {
  let i = 0;
  for (const x of iterable) {
    yield [i, x] as const;
    i++;
  }
}
