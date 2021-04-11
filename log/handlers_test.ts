import { getLogger, setup } from "https://deno.land/std@0.92.0/log/mod.ts";
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";
import { BufferHandler } from "./handlers.ts";

Deno.test("BufferHandler", async () => {
  const testHandler = new BufferHandler("DEBUG");
  await setup({
    handlers: {
      test: testHandler,
    },
    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["test"],
      },
    },
  });
  getLogger().debug("hello");
  assertEquals(testHandler.messages, ["DEBUG hello"]);

  const f = console.log;
  console.log = () => {};
  testHandler.flush();
  console.log = f;
  assertEquals(testHandler.messages, []);
});
