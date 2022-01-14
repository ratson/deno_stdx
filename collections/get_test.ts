import { assertStrictEquals } from "../deps_test.ts";
import { get } from "./get.ts";

Deno.test("input: object", () => {
  assertStrictEquals(get({ a: 1 }, ["a"]), 1);
  assertStrictEquals(get({ a: { b: 1 } }, ["a", "b"]), 1);
  assertStrictEquals(get({ 1: 2 }, [1]), 2);
  assertStrictEquals(get({ 1: 2 }, ["1"]), 2);
  assertStrictEquals(get({ 1: null }, ["1"]), null);
  // symbol
  const s = Symbol("test");
  assertStrictEquals(get({ [s]: 2 }, [s]), 2);
  // returns instance
  const v = { b: 2 };
  assertStrictEquals(get({ a: [1, v] }, ["a", 1]), v);
  // no value
  assertStrictEquals(get({}, ["a"]), undefined);
  assertStrictEquals(get({ 1: null }, ["1", 0]), undefined);
  assertStrictEquals(get({ 1: 2 }, ["1", 0]), undefined);
});

Deno.test("input: Array", () => {
  assertStrictEquals(get([1, 2], [1]), 2);
  assertStrictEquals(get([1, 2], ["1"]), 2);
});

Deno.test("input: object instance", () => {
  class C {
    get b() {
      return 2;
    }
  }
  assertStrictEquals(get({ a: new C() }, ["a", "b"]), 2);
  // @ts-expect-error invalid-input-type
  assertStrictEquals(get(new C(), ["b"]), 2);
});

Deno.test("input: string", () => {
  assertStrictEquals(get("abc", [1]), "b");
  assertStrictEquals(get("abc", [1, 0]), "b");
  assertStrictEquals(get("abc", [1, 1]), undefined);
  assertStrictEquals(get("abc", [1, 1], "d"), "d");
  // @ts-expect-error invalid-path-type
  assertStrictEquals(get("abc", ["a"]), undefined);
});

Deno.test("input: undefined", () => {
  assertStrictEquals(get(undefined, [0]), undefined);
  assertStrictEquals(get(undefined, [0], 1), 1);
});

Deno.test("input: null", () => {
  assertStrictEquals(get(null, [0]), undefined);
});

Deno.test("input: Function", () => {
  // @ts-expect-error invalid-input-type
  assertStrictEquals(get(Function, ["name"]), "Function");

  function f() {}
  // @ts-expect-error invalid-input-type
  assertStrictEquals(get(f, ["name"]), "f");
});

Deno.test("path: string", () => {
  assertStrictEquals(get({ a: { b: 1 } }, "a.b"), 1);
  assertStrictEquals(get({ a: [1, { b: 2 }] }, "a.1.b"), 2);
  assertStrictEquals(get([1, 2], "1"), 2);
  // @ts-expect-error invalid-input-type
  assertStrictEquals(get("abc", "0.0"), "a");
});

Deno.test("defaultValue", () => {
  assertStrictEquals(get({}, ["a"], null), null);
  assertStrictEquals(get([], [1], null), null);
});

Deno.test("mixed", () => {
  assertStrictEquals(get([1, { b: 2 }], [1, "b"]), 2);
  assertStrictEquals(get({ a: [1, { b: 2 }] }, ["a", 1, "b"]), 2);
});
