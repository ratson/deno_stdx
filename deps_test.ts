export {
  deadline,
  DeadlineError,
  delay,
} from "https://deno.land/std@0.190.0/async/mod.ts";
export * from "https://deno.land/std@0.190.0/testing/asserts.ts";
export * from "https://deno.land/std@0.190.0/testing/bdd.ts";

export { isWindows, osType } from "https://deno.land/std@0.190.0/_util/os.ts";
export { randomInteger } from "https://deno.land/std@0.190.0/collections/_utils.ts";

export {
  assertSpyCall,
  assertSpyCalls,
  spy,
} from "https://deno.land/x/mock@0.15.2/mod.ts";

export * from "./testing/mod.ts";
