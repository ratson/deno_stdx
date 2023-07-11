import { JsonValue } from "../typing/json.ts";
import { output } from "./mod.ts";

/**
 * @deprecated Use `stdoutJSON()` from `os/run` instead.
 */
export async function json<T extends JsonValue>(
  ...args: Parameters<typeof output>
) {
  return JSON.parse(await output(...args)) as T;
}
