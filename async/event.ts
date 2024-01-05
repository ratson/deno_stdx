import { deadline } from "https://deno.land/std@0.211.0/async/deadline.ts";

export async function waitEvent(
  target: EventTarget,
  event: string,
  options?: { timeout?: number },
) {
  const { promise, resolve } = Promise.withResolvers();
  const listener: EventListener = (evt) => {
    resolve(evt);
  };

  target.addEventListener(event, listener, { once: true });

  try {
    return await (options?.timeout === undefined
      ? promise
      : deadline(promise, options.timeout));
  } finally {
    target.removeEventListener(event, listener);
  }
}
