import {
  assertEquals,
  assertStrictEquals,
  describe,
  it,
} from "../deps_test.ts";
import debug from "./debug.ts";

describe("debug", () => {
  it("passes a basic sanity check", () => {
    const log = debug("test");
    log.enabled = true;
    log.log = () => {};

    log("hello world");
  });

  it("allows namespaces to be a non-string value", () => {
    const log = debug("test");
    log.enabled = true;
    log.log = () => {};

    debug.enable(true);
  });

  it("honors global debug namespace enable calls", () => {
    assertStrictEquals(debug("test:12345").enabled, false);
    assertStrictEquals(debug("test:67890").enabled, false);

    debug.enable("test:12345");
    assertStrictEquals(debug("test:12345").enabled, true);
    assertStrictEquals(debug("test:67890").enabled, false);
  });

  it("uses custom log function", () => {
    const log = debug("test");
    log.enabled = true;

    const messages = [];
    log.log = (...args: never) => messages.push(args);

    log("using custom log function");
    log("using custom log function again");
    log("%O", 12345);

    assertStrictEquals(messages.length, 3);
  });

  describe("extend namespace", () => {
    it("should extend namespace", () => {
      const log = debug("foo");
      log.enabled = true;
      log.log = () => {};

      const logBar = log.extend("bar");
      assertStrictEquals(logBar.namespace, "foo:bar");
    });

    it("should extend namespace with custom delimiter", () => {
      const log = debug("foo");
      log.enabled = true;
      log.log = () => {};

      const logBar = log.extend("bar", "--");
      assertStrictEquals(logBar.namespace, "foo--bar");
    });

    it("should extend namespace with empty delimiter", () => {
      const log = debug("foo");
      log.enabled = true;
      log.log = () => {};

      const logBar = log.extend("bar", "");
      assertStrictEquals(logBar.namespace, "foobar");
    });

    it("should keep the log function between extensions", () => {
      const log = debug("foo");
      log.log = () => {};

      const logBar = log.extend("bar");
      assertStrictEquals(log.log, logBar.log);
    });
  });

  describe("rebuild namespaces string (disable)", () => {
    it("handle names, skips, and wildcards", () => {
      debug.enable("test,abc*,-abc");
      const namespaces = debug.disable();
      assertStrictEquals(namespaces, "test,abc*,-abc");
    });

    it("handles empty", () => {
      debug.enable("");
      const namespaces = debug.disable();
      assertStrictEquals(namespaces, "");
      assertEquals(debug.names, []);
      assertEquals(debug.skips, []);
    });

    it("handles all", () => {
      debug.enable("*");
      const namespaces = debug.disable();
      assertStrictEquals(namespaces, "*");
    });

    it("handles skip all", () => {
      debug.enable("-*");
      const namespaces = debug.disable();
      assertStrictEquals(namespaces, "-*");
    });

    it("names+skips same with new string", () => {
      debug.enable("test,abc*,-abc");
      const oldNames = [...debug.names];
      const oldSkips = [...debug.skips];
      const namespaces = debug.disable();
      assertStrictEquals(namespaces, "test,abc*,-abc");
      debug.enable(namespaces);
      assertEquals(oldNames.map(String), debug.names.map(String));
      assertEquals(oldSkips.map(String), debug.skips.map(String));
    });

    it("handles re-enabling existing instances", () => {
      debug.disable("*");
      const inst = debug("foo");
      const messages: string[] = [];
      inst.log = (msg: string) =>
        messages.push(msg.replace(/^[^@]*@([^@]+)@.*$/, "$1"));

      inst("@test@");
      assertEquals(messages, []);
      debug.enable("foo");
      assertEquals(messages, []);
      inst("@test2@");
      assertEquals(messages, ["test2"]);
      inst("@test3@");
      assertEquals(messages, ["test2", "test3"]);
      debug.disable("*");
      inst("@test4@");
      assertEquals(messages, ["test2", "test3"]);
    });
  });
});
