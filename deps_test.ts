export {
  deadline,
  DeadlineError,
  delay,
} from "https://deno.land/std@0.218.2/async/mod.ts";
export * from "https://deno.land/std@0.218.2/assert/mod.ts";
export * from "https://deno.land/std@0.218.2/testing/bdd.ts";

export { isWindows, osType } from "https://deno.land/std@0.218.2/path/_os.ts";
export { randomInteger } from "https://deno.land/std@0.218.2/collections/_utils.ts";

export {
  assertSpyCall,
  assertSpyCalls,
  spy,
} from "https://deno.land/std@0.218.2/testing/mock.ts";

export {
  assertType,
  type IsExact,
} from "https://deno.land/std@0.218.2/testing/types.ts";

export * from "./testing/mod.ts";
