import {
  DeadlineError,
  delay,
} from "https://deno.land/std@0.178.0/async/mod.ts";
import { assertRejects, assertStrictEquals } from "../deps_test.ts";
import { waitEvent } from "./event.ts";

Deno.test("ok", async () => {
  const target = new EventTarget();
  const event = new CustomEvent("test");
  setTimeout(() => {
    target.dispatchEvent(event);
  }, 200);

  const result = await waitEvent(target, "test");
  assertStrictEquals(result, event);
});

Deno.test("timeout", async () => {
  const target = new EventTarget();
  const event = new CustomEvent("test");
  setTimeout(() => {
    target.dispatchEvent(event);
  }, 100);

  await assertRejects(async () => {
    await waitEvent(target, "test", { timeout: 10 });
  }, DeadlineError);

  await delay(100);
});
