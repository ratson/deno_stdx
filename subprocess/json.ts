import { JsonValue } from "../typing/json.ts";
import { output } from "./mod.ts";

/**
 * @deprecated Use `json()` from `os/subprocess` instead.
 */
export async function json<T extends JsonValue>(
  ...args: Parameters<typeof output>
) {
  return JSON.parse(await output(...args)) as T;
}
