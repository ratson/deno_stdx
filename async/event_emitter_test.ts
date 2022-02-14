import { EventEmitter } from "./event_emitter.ts";
import { assertEquals, fail } from "../deps_test.ts";

type Events = {
  foo: string;
  bar: number;
};

Deno.test("on", () => {
  const e = new EventEmitter<Events>();

  e.on("foo", (data) => {
    assertEquals(data, "bar");
  });

  e.on("*", (type, data) => {
    assertEquals(type, "foo");
    assertEquals(data, "bar");
  });

  e.emit("foo", "bar");
});

Deno.test("off", () => {
  const e = new EventEmitter<Events>();

  function foo() {
    fail();
  }

  e.on("foo", foo);
  e.off("foo", foo);

  e.on("*", foo);
  e.off("*", foo);

  e.emit("foo", "bar");
});
