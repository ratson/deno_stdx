export {
  deadline,
  DeadlineError,
  delay,
} from "https://deno.land/std@0.208.0/async/mod.ts";
export * from "https://deno.land/std@0.208.0/assert/mod.ts";
export * from "https://deno.land/std@0.208.0/testing/bdd.ts";

export { isWindows, osType } from "https://deno.land/std@0.208.0/path/_os.ts";
export { randomInteger } from "https://deno.land/std@0.208.0/collections/_utils.ts";

export {
  assertSpyCall,
  assertSpyCalls,
  spy,
} from "https://deno.land/std@0.208.0/testing/mock.ts";

export { assertType, type IsExact } from "https://deno.land/std@0.208.0/testing/types.ts";

export * from "./testing/mod.ts";
