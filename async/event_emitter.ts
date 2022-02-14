import type { ValueOf } from "../typing/util.ts";

type EventListener<Events> = (event: ValueOf<Events>) => void;
type WildcardListener<Events> = (
  type: keyof Events,
  event: ValueOf<Events>,
) => void;

export class EventEmitter<Events extends Record<string, unknown>> {
  #listeners = new Map<keyof Events, Array<EventListener<Events>>>();

  on<T extends keyof Events>(type: T, listener: EventListener<Events>): void;
  on<T extends keyof Events>(
    type: "*",
    listener: WildcardListener<Events>,
  ): void;
  on<T extends keyof Events>(
    type: T,
    listener: EventListener<Events> | WildcardListener<Events>,
  ) {
    const listeners = this.#listeners.get(type);
    const f = listener as EventListener<Events>;
    if (listeners) {
      listeners.push(f);
    } else {
      this.#listeners.set(type, [f]);
    }
  }

  off<T extends keyof Events>(type: T, listener?: EventListener<Events>): void;
  off<T extends keyof Events>(
    type: "*",
    listener?: WildcardListener<Events>,
  ): void;
  off<T extends keyof Events>(
    type: T,
    listener?: EventListener<Events> | WildcardListener<Events>,
  ) {
    const listeners = this.#listeners.get(type);
    if (listeners) {
      if (listener) {
        listeners.splice(
          listeners.indexOf(listener as EventListener<Events>) >>> 0,
          1,
        );
      } else {
        this.#listeners.set(type, []);
      }
    }
  }

  emit<T extends keyof Events>(type: T, event?: Events[T]) {
    const listeners = this.#listeners.get(type);
    const e = event as ValueOf<Events>;
    if (listeners) {
      for (const f of listeners) {
        f(e);
      }
    }

    const wildcard = this.#listeners.get("*");
    if (wildcard) {
      for (const f of wildcard) {
        (f as unknown as WildcardListener<Events>)(type, e);
      }
    }
  }
}
