/**
 * Returns a random integer N such that a <= N <= b.
 */
export function randomInt(a: number, b: number) {
  const min = Math.ceil(a);
  const max = Math.floor(b);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
