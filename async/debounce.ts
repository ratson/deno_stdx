// deno-lint-ignore no-explicit-any
type GenericFunction = (...args: any[]) => any;

export interface DebouncedFunction<F extends GenericFunction> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): Promise<ReturnType<F>>;
  clear: () => void;
}

export function debounce<F extends GenericFunction>(
  this: ThisParameterType<F>,
  fn: F,
  milliseconds: number,
  options?: { leading: boolean },
): DebouncedFunction<F> {
  const leading = options?.leading ?? false;

  let leadingResult: ReturnType<F>;
  let timer: number | undefined;
  const pending: {
    resolve: (x: ReturnType<F>) => void;
    reject: (reason?: unknown) => void;
  }[] = [];

  const debounced = (...args: Parameters<F>) =>
    new Promise<ReturnType<F>>((resolve, reject) => {
      const runImmediately = leading && !timer;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;

        const result = leading ? leadingResult : fn.apply(this, args);

        while (true) {
          const x = pending.shift();
          if (!x) break;
          x.resolve(result);
        }
      }, milliseconds);

      if (runImmediately) {
        leadingResult = fn.apply(this, args);
        resolve(leadingResult);
      } else {
        pending.push({ resolve, reject });
      }
    });

  debounced.clear = function () {
    if (timer) clearTimeout(timer);
    pending.splice(0, pending.length);
  };

  return debounced;
}
