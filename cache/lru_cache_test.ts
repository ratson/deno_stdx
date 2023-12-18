import { assertStrictEquals } from "../deps_test.ts";
import { LRUCache } from "./lru_cache.ts";

const lru = new LRUCache(10);

Deno.test("set key", () => {
  lru.set("key", "value");
  assertStrictEquals(lru.get("key"), "value");
});

Deno.test("set foo", () => {
  lru.set("foo", "bar");
  assertStrictEquals(lru.get("foo"), "bar");
});

Deno.test("peek", () => {
  assertStrictEquals(lru.peek("key"), "value");
});

Deno.test("missing key", () => {
  assertStrictEquals(lru.get("missing"), undefined);
});

Deno.test("size", () => {
  assertStrictEquals(lru.size, 2);
});

Deno.test("delete", () => {
  lru.delete("key");
  assertStrictEquals(lru.size, 1);
});

Deno.test("clear", () => {
  lru.clear();
  assertStrictEquals(lru.size, 0);
});
