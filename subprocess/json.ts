import { JsonValue } from "../typing/json.ts";
import { output } from "./mod.ts";

export async function json<T extends JsonValue>(
  ...args: Parameters<typeof output>
) {
  return JSON.parse(await output(...args)) as T;
}
