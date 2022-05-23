import { assertStrictEquals } from "../deps_test.ts";
import { camelCase } from "./camel_case.ts";

Deno.test("camelCase", () => {
  assertStrictEquals(camelCase("foo"), "foo");
  assertStrictEquals(camelCase("foo-bar"), "fooBar");
  assertStrictEquals(camelCase("foo-bar-baz"), "fooBarBaz");
  assertStrictEquals(camelCase("foo--bar"), "fooBar");
  assertStrictEquals(camelCase("--foo-bar"), "fooBar");
  assertStrictEquals(camelCase("--foo--bar"), "fooBar");
  assertStrictEquals(camelCase("FOO-BAR"), "fooBar");
  assertStrictEquals(camelCase("FOÈ-BAR"), "foèBar");
  assertStrictEquals(camelCase("-foo-bar-"), "fooBar");
  assertStrictEquals(camelCase("--foo--bar--"), "fooBar");
  assertStrictEquals(camelCase("foo-1"), "foo1");
  assertStrictEquals(camelCase("foo.bar"), "fooBar");
  assertStrictEquals(camelCase("foo..bar"), "fooBar");
  assertStrictEquals(camelCase("..foo..bar.."), "fooBar");
  assertStrictEquals(camelCase("foo_bar"), "fooBar");
  assertStrictEquals(camelCase("__foo__bar__"), "fooBar");
  assertStrictEquals(camelCase("foo bar"), "fooBar");
  assertStrictEquals(camelCase("  foo  bar  "), "fooBar");
  assertStrictEquals(camelCase("-"), "");
  assertStrictEquals(camelCase(" - "), "");
  assertStrictEquals(camelCase("fooBar"), "fooBar");
  assertStrictEquals(camelCase("fooBar-baz"), "fooBarBaz");
  assertStrictEquals(camelCase("foìBar-baz"), "foìBarBaz");
  assertStrictEquals(camelCase("fooBarBaz-bazzy"), "fooBarBazBazzy");
  assertStrictEquals(camelCase("FBBazzy"), "fbBazzy");
  assertStrictEquals(camelCase("F"), "f");
  assertStrictEquals(camelCase("FooBar"), "fooBar");
  assertStrictEquals(camelCase("Foo"), "foo");
  assertStrictEquals(camelCase("FOO"), "foo");
  assertStrictEquals(camelCase("--"), "");
  assertStrictEquals(camelCase(""), "");
  assertStrictEquals(camelCase("_"), "");
  assertStrictEquals(camelCase(" "), "");
  assertStrictEquals(camelCase("."), "");
  assertStrictEquals(camelCase(".."), "");
  assertStrictEquals(camelCase("--"), "");
  assertStrictEquals(camelCase("  "), "");
  assertStrictEquals(camelCase("__"), "");
  assertStrictEquals(camelCase("--__--_--_"), "");
  assertStrictEquals(camelCase("foo bar?"), "fooBar?");
  assertStrictEquals(camelCase("foo bar!"), "fooBar!");
  assertStrictEquals(camelCase("foo bar$"), "fooBar$");
  assertStrictEquals(camelCase("foo-bar#"), "fooBar#");
  assertStrictEquals(camelCase("XMLHttpRequest"), "xmlHttpRequest");
  assertStrictEquals(camelCase("AjaxXMLHttpRequest"), "ajaxXmlHttpRequest");
  assertStrictEquals(camelCase("Ajax-XMLHttpRequest"), "ajaxXmlHttpRequest");
  assertStrictEquals(camelCase("mGridCol6@md"), "mGridCol6@md");
  assertStrictEquals(camelCase("A::a"), "a::a");
  assertStrictEquals(camelCase("Hello1World"), "hello1World");
  assertStrictEquals(camelCase("Hello11World"), "hello11World");
  assertStrictEquals(camelCase("hello1world"), "hello1World");
  assertStrictEquals(camelCase("Hello1World11foo"), "hello1World11Foo");
  assertStrictEquals(camelCase("Hello1"), "hello1");
  assertStrictEquals(camelCase("hello1"), "hello1");
  assertStrictEquals(camelCase("1Hello"), "1Hello");
  assertStrictEquals(camelCase("1hello"), "1Hello");
  assertStrictEquals(camelCase("h2w"), "h2W");
  assertStrictEquals(
    camelCase("розовый_пушистый-единороги"),
    "розовыйПушистыйЕдинороги",
  );
  assertStrictEquals(
    camelCase("розовый_пушистый-единороги"),
    "розовыйПушистыйЕдинороги",
  );
  assertStrictEquals(
    camelCase("РОЗОВЫЙ_ПУШИСТЫЙ-ЕДИНОРОГИ"),
    "розовыйПушистыйЕдинороги",
  );
  assertStrictEquals(camelCase("桑德在这里。"), "桑德在这里。");
  assertStrictEquals(camelCase("桑德在这里。"), "桑德在这里。");
  assertStrictEquals(camelCase("桑德_在这里。"), "桑德在这里。");

  assertStrictEquals(camelCase("IDs"), "iDs");
  assertStrictEquals(camelCase("FooIDs"), "fooIDs");
});

Deno.test("keepConsecutiveUppercase option", () => {
  assertStrictEquals(
    camelCase("foo-BAR", { keepConsecutiveUppercase: true }),
    "fooBAR",
  );
  assertStrictEquals(
    camelCase("Foo-BAR", { keepConsecutiveUppercase: true }),
    "fooBAR",
  );
  assertStrictEquals(
    camelCase("fooBAR", { keepConsecutiveUppercase: true }),
    "fooBAR",
  );
  assertStrictEquals(
    camelCase("fooBaR", { keepConsecutiveUppercase: true }),
    "fooBaR",
  );
  assertStrictEquals(
    camelCase("FOÈ-BAR", { keepConsecutiveUppercase: true }),
    "FOÈBAR",
  );
  assertStrictEquals(
    camelCase(["foo", "BAR"].join(" "), { keepConsecutiveUppercase: true }),
    "fooBAR",
  );
  assertStrictEquals(
    camelCase(["foo", "-BAR"].join(" "), { keepConsecutiveUppercase: true }),
    "fooBAR",
  );
  assertStrictEquals(
    camelCase(["foo", "-BAR", "baz"].join(" "), {
      keepConsecutiveUppercase: true,
    }),
    "fooBARBaz",
  );
  assertStrictEquals(
    camelCase(["", ""].join(" "), { keepConsecutiveUppercase: true }),
    "",
  );
  assertStrictEquals(camelCase("--", { keepConsecutiveUppercase: true }), "");
  assertStrictEquals(camelCase("", { keepConsecutiveUppercase: true }), "");
  assertStrictEquals(
    camelCase("--__--_--_", { keepConsecutiveUppercase: true }),
    "",
  );
  assertStrictEquals(
    camelCase(["---_", "--", "", "-_- "].join(" "), {
      keepConsecutiveUppercase: true,
    }),
    "",
  );
  assertStrictEquals(
    camelCase("foo BAR?", { keepConsecutiveUppercase: true }),
    "fooBAR?",
  );
  assertStrictEquals(
    camelCase("foo BAR!", { keepConsecutiveUppercase: true }),
    "fooBAR!",
  );
  assertStrictEquals(
    camelCase("foo BAR$", { keepConsecutiveUppercase: true }),
    "fooBAR$",
  );
  assertStrictEquals(
    camelCase("foo-BAR#", { keepConsecutiveUppercase: true }),
    "fooBAR#",
  );
  assertStrictEquals(
    camelCase("XMLHttpRequest", { keepConsecutiveUppercase: true }),
    "XMLHttpRequest",
  );
  assertStrictEquals(
    camelCase("AjaxXMLHttpRequest", { keepConsecutiveUppercase: true }),
    "ajaxXMLHttpRequest",
  );
  assertStrictEquals(
    camelCase("Ajax-XMLHttpRequest", { keepConsecutiveUppercase: true }),
    "ajaxXMLHttpRequest",
  );
  assertStrictEquals(
    camelCase([].join(" "), { keepConsecutiveUppercase: true }),
    "",
  );
  assertStrictEquals(
    camelCase("mGridCOl6@md", { keepConsecutiveUppercase: true }),
    "mGridCOl6@md",
  );
  assertStrictEquals(
    camelCase("A::a", { keepConsecutiveUppercase: true }),
    "a::a",
  );
  assertStrictEquals(
    camelCase("Hello1WORLD", { keepConsecutiveUppercase: true }),
    "hello1WORLD",
  );
  assertStrictEquals(
    camelCase("Hello11WORLD", { keepConsecutiveUppercase: true }),
    "hello11WORLD",
  );
  assertStrictEquals(
    camelCase("РозовыйПушистыйFOOдинорогиf", {
      keepConsecutiveUppercase: true,
    }),
    "розовыйПушистыйFOOдинорогиf",
  );
  assertStrictEquals(
    camelCase("桑德在这里。", { keepConsecutiveUppercase: true }),
    "桑德在这里。",
  );
  assertStrictEquals(
    camelCase("桑德_在这里。", { keepConsecutiveUppercase: true }),
    "桑德在这里。",
  );
  assertStrictEquals(
    camelCase("FooIDs", { keepConsecutiveUppercase: true }),
    "fooIDs",
  );

  assertStrictEquals(
    camelCase("IDs", { keepConsecutiveUppercase: true }),
    "iDs",
  );
});

Deno.test("locale option", () => {
  assertStrictEquals(
    camelCase("lorem-ipsum", { locale: "tr-TR" }),
    "loremİpsum",
  );
  assertStrictEquals(
    camelCase("lorem-ipsum", { locale: "en-EN" }),
    "loremIpsum",
  );
  assertStrictEquals(
    camelCase("lorem-ipsum", { locale: ["tr", "TR", "tr-TR"] }),
    "loremİpsum",
  );
  assertStrictEquals(
    camelCase("lorem-ipsum", { locale: ["en-EN", "en-GB"] }),
    "loremIpsum",
  );
});

Deno.test("locale=disabled", (t) => {
  const withLocaleCaseFunctionsMocked = (fn) => {
    const throwWhenBeingCalled = () => {
      throw new Error("Should not be called");
    };

    const toLocaleUpperCase = Object.getOwnPropertyDescriptor(
      String.prototype,
      "toLocaleUpperCase",
    )!;
    const toLocaleLowerCase = Object.getOwnPropertyDescriptor(
      String.prototype,
      "toLocaleLowerCase",
    )!;

    Object.defineProperty(String.prototype, "toLocaleUpperCase", {
      ...toLocaleUpperCase,
      value: throwWhenBeingCalled,
    });
    Object.defineProperty(String.prototype, "toLocaleLowerCase", {
      ...toLocaleLowerCase,
      value: throwWhenBeingCalled,
    });

    try {
      fn();
    } finally {
      Object.defineProperty(
        String.prototype,
        "toLocaleUpperCase",
        toLocaleUpperCase,
      );
      Object.defineProperty(
        String.prototype,
        "toLocaleLowerCase",
        toLocaleLowerCase,
      );
    }
  };

  withLocaleCaseFunctionsMocked(() => {
    assertStrictEquals(
      camelCase("lorem-ipsum", { locale: false }),
      "loremIpsum",
    );
    assertStrictEquals(
      camelCase("ipsum-DOLOR", {
        locale: false,
        keepConsecutiveUppercase: true,
      }),
      "ipsumDOLOR",
    );
  });
});

Deno.test("with numbers", () => {
  assertStrictEquals(camelCase("12 feet"), "12Feet");
  assertStrictEquals(camelCase("enable 6h format"), "enable6HFormat");
  assertStrictEquals(camelCase("enable 24H format"), "enable24HFormat");
  assertStrictEquals(camelCase("too legit 2 quit"), "tooLegit2Quit");
  assertStrictEquals(camelCase("walk 500 miles"), "walk500Miles");
  assertStrictEquals(camelCase("xhr2 request"), "xhr2Request");
});

Deno.test("handle acronyms", () => {
  ["safe HTML", "safeHTML"].forEach((s) =>
    assertStrictEquals(camelCase(s), "safeHtml")
  );

  ["escape HTML entities", "escapeHTMLEntities"].forEach((s) =>
    assertStrictEquals(camelCase(s), "escapeHtmlEntities")
  );

  ["XMLHttpRequest", "XmlHTTPRequest"].forEach((s) =>
    assertStrictEquals(camelCase(s), "xmlHttpRequest")
  );
});
