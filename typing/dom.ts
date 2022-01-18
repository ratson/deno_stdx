// deno-lint-ignore-file no-explicit-any
import type { Navigator, Window } from "./lib.dom.ts";

/**
 * `window` object in browser environment.
 */
export const window: Window = globalThis as any;

export const { document } = window;

export const navigator: Navigator = globalThis.navigator as any;
