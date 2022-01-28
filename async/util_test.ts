import {
  assertGreater,
  assertRejects,
  assertStrictEquals,
  deadline,
  DeadlineError,
  delay,
} from "../deps_test.ts";
import { waitUntil } from "./util.ts";

Deno.test("return truthy value", async () => {
  assertStrictEquals(await waitUntil(() => true), true);
  assertStrictEquals(await waitUntil(() => "ok"), "ok");
});

Deno.test("falsy value never resolve", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  await assertRejects(async () => {
    await deadline(waitUntil(() => false), 500);
  }, DeadlineError);
});

Deno.test("options.retryDelay", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const start = performance.now();

  let i = 0;
  await waitUntil(() => ++i > 3 ? true : false, { retryDelay: 100 });

  assertGreater(performance.now() - start, 300);
});

Deno.test("options.timeout", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  await assertRejects(async () => {
    await waitUntil(() => false, { timeout: 100 });
  }, DeadlineError);
});

Deno.test("options.signal", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const abort = new AbortController();
  const { signal } = abort;
  setTimeout(() => abort.abort(), 0);

  await assertRejects(
    async () => {
      await waitUntil(async () => {
        await delay(10);
        return false;
      }, { retryDelay: 0, signal });
    },
    DOMException,
    "Wait was aborted",
  );
});

Deno.test("options.signal - abort during retry", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const abort = new AbortController();
  const { signal } = abort;
  setTimeout(() => abort.abort(), 0);

  await assertRejects(
    async () => {
      await waitUntil(() => false, { retryDelay: 100, signal });
    },
    DOMException,
    "Delay was aborted",
  );
});
