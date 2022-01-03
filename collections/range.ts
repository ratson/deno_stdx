type Range = Generator<number>;

function range(stop: number): Range;
function range(start: number, stop?: number, step?: number): Range;
/**
 * Return an object that produces a sequence of integers from start (inclusive)
 * to stop (exclusive) by step.
 */
function* range(start = 0, stop?: number, step = 1): Range {
  if (step === 0) {
    if (stop !== Infinity) {
      throw Error("`step` can only be zero if `stop` is Infinity");
    }
    stop = start + 1;
  }

  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if ((step > 0 && start > stop) || (step < 0 && start < stop)) {
    return 0;
  }

  let iterationCount = 0;
  for (let i = start; step < 0 ? i > stop : i < stop; i += step) {
    yield i;
    iterationCount++;
  }
  return iterationCount;
}

export { range };
