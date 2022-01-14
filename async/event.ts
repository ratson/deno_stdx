import { deadline } from "https://deno.land/std@0.121.0/async/deadline.ts";
import { deferred } from "https://deno.land/std@0.121.0/async/deferred.ts";

export async function waitEvent(
  target: EventTarget,
  event: string,
  options?: { timeout: number },
) {
  const opts = { timeout: 30 * 60 * 1000, ...options };

  const d = deferred<Event>();
  const listener: EventListener = (evt) => {
    d.resolve(evt);
  };

  target.addEventListener(event, listener, { once: true });

  try {
    return await deadline(d, opts.timeout);
  } finally {
    target.removeEventListener(event, listener);
  }
}
