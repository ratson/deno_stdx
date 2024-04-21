import { randomInteger } from "https://deno.land/std@0.223.0/collections/_utils.ts";

function* randomInts(max: number, n: number) {
  while (n-- > 0) {
    yield randomInteger(0, max);
  }
}

export function* sampleIndex<T>(items: readonly T[], n: number) {
  if (!Number.isInteger(n)) {
    throw new TypeError(`n must be an integer. Received ${n}`);
  }
  n = Math.min(n, items.length);

  const max = items.length - 1;
  const s = new Set(randomInts(max, n));
  while (s.size < n) {
    s.add(randomInteger(0, max));
  }

  for (const i of s) {
    yield i;
  }
}

export function* sample<T>(items: readonly T[], n: number) {
  for (const i of sampleIndex(items, n)) {
    yield items[i];
  }
}
