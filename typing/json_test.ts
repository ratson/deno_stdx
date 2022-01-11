import { assertType } from "../testing/asserts.ts";
import { JsonValue } from "./json.ts";

Deno.test("JsonValue", () => {
  assertType<JsonValue>("");
  assertType<JsonValue>(0);
  assertType<JsonValue>(true);
  assertType<JsonValue>(null);

  // @ts-expect-error wrong type
  assertType<JsonValue>(undefined);
});
