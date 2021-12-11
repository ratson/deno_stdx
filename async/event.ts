import { deadline, deferred } from "https://deno.land/std@0.116.0/async/mod.ts";

export function waitEvent(
  target: EventTarget,
  event: string,
  options: { timeout: number } = { timeout: Number.POSITIVE_INFINITY },
) {
  const d = deferred<Event>();
  const listener: EventListener = (evt) => {
    d.resolve(evt);
  };

  target.addEventListener(event, listener, { once: true });

  return deadline(d, options.timeout).finally(() => {
    target.removeEventListener(event, listener);
  });
}
