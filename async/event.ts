import { deadline } from "https://deno.land/std@0.123.0/async/deadline.ts";
import { deferred } from "https://deno.land/std@0.123.0/async/deferred.ts";

export async function waitEvent(
  target: EventTarget,
  event: string,
  options?: { timeout?: number },
) {
  const d = deferred<Event>();
  const listener: EventListener = (evt) => {
    d.resolve(evt);
  };

  target.addEventListener(event, listener, { once: true });

  try {
    return await (options?.timeout === undefined
      ? d
      : deadline(d, options.timeout));
  } finally {
    target.removeEventListener(event, listener);
  }
}
