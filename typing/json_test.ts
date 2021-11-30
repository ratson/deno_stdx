import { JsonValue } from "./json.ts";

Deno.test("JsonValue", () => {
  const f = (_: JsonValue) => {};
  f("");
  f(0);
  f(true);
  f(null);
});
