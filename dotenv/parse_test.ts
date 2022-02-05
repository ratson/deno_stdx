// Copyright the dotenv authors. MIT License.
// Ported mostly from https://github.com/motdotla/dotenv
import {
  assertEquals,
  assertStrictEquals,
  assertThrows,
  unreachable,
} from "../deps_test.ts";
import { dataPath } from "./deps_test.ts";
import { parse } from "./parse.ts";

Deno.test("parse .env", async () => {
  const s = await dataPath.joinpath(".env").readTextFile();
  const parsed = parse(s);

  assertStrictEquals(parsed.BASIC, "basic", "sets basic environment variable");

  assertStrictEquals(
    parsed.AFTER_LINE,
    "after_line",
    "reads after a skipped line",
  );

  assertStrictEquals(parsed.EMPTY, "", "defaults empty values to empty string");

  assertStrictEquals(
    parsed.EMPTY_SINGLE_QUOTES,
    "",
    "defaults empty values to empty string",
  );

  assertStrictEquals(
    parsed.EMPTY_DOUBLE_QUOTES,
    "",
    "defaults empty values to empty string",
  );

  assertStrictEquals(
    parsed.EMPTY_BACKTICKS,
    "",
    "defaults empty values to empty string",
  );

  assertStrictEquals(
    parsed.SINGLE_QUOTES,
    "single_quotes",
    "escapes single quoted values",
  );

  assertStrictEquals(
    parsed.SINGLE_QUOTES_SPACED,
    "    single quotes    ",
    "respects surrounding spaces in single quotes",
  );

  assertStrictEquals(
    parsed.DOUBLE_QUOTES,
    "double_quotes",
    "escapes double quoted values",
  );

  assertStrictEquals(
    parsed.DOUBLE_QUOTES_SPACED,
    "    double quotes    ",
    "respects surrounding spaces in double quotes",
  );

  assertStrictEquals(
    parsed.DOUBLE_QUOTES_INSIDE_SINGLE,
    'double "quotes" work inside single quotes',
    "respects double quotes inside single quotes",
  );

  assertStrictEquals(
    parsed.SINGLE_QUOTES_INSIDE_DOUBLE,
    "single 'quotes' work inside double quotes",
    "respects single quotes inside double quotes",
  );

  assertStrictEquals(
    parsed.BACKTICKS_INSIDE_SINGLE,
    "`backticks` work inside single quotes",
    "respects backticks inside single quotes",
  );

  assertStrictEquals(
    parsed.BACKTICKS_INSIDE_DOUBLE,
    "`backticks` work inside double quotes",
    "respects backticks inside double quotes",
  );

  assertStrictEquals(parsed.BACKTICKS, "backticks");

  assertStrictEquals(parsed.BACKTICKS_SPACED, "    backticks    ");

  assertStrictEquals(
    parsed.DOUBLE_QUOTES_INSIDE_BACKTICKS,
    'double "quotes" work inside backticks',
    "respects double quotes inside backticks",
  );

  assertStrictEquals(
    parsed.SINGLE_QUOTES_INSIDE_BACKTICKS,
    "single 'quotes' work inside backticks",
    "respects single quotes inside backticks",
  );

  assertStrictEquals(
    parsed.DOUBLE_AND_SINGLE_QUOTES_INSIDE_BACKTICKS,
    "double \"quotes\" and single 'quotes' work inside backticks",
    "respects single quotes inside backticks",
  );

  assertStrictEquals(
    parsed.EXPAND_NEWLINES,
    "expand\nnew\nlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(
    parsed.DONT_EXPAND_UNQUOTED,
    "dontexpand\\nnewlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(
    parsed.DONT_EXPAND_SQUOTED,
    "dontexpand\\nnewlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(parsed.COMMENTS, undefined, "ignores commented lines");

  assertStrictEquals(
    parsed.INLINE_COMMENTS,
    "inline comments",
    "ignores inline comments",
  );

  assertStrictEquals(
    parsed.INLINE_COMMENTS_SINGLE_QUOTES,
    "inline comments outside of #singlequotes",
    "ignores inline comments and respects # character inside of single quotes",
  );

  assertStrictEquals(
    parsed.INLINE_COMMENTS_DOUBLE_QUOTES,
    "inline comments outside of #doublequotes",
    "ignores inline comments and respects # character inside of double quotes",
  );

  assertStrictEquals(
    parsed.INLINE_COMMENTS_BACKTICKS,
    "inline comments outside of #backticks",
    "ignores inline comments and respects # character inside of backticks",
  );

  assertStrictEquals(
    parsed.INLINE_COMMENTS_SPACE,
    "inline comments start with a",
    "treats # character as start of comment",
  );
  assertThrows(() => {
    assertStrictEquals(
      parsed.INLINE_COMMENTS_SPACE,
      "inline comments start with a#space",
      "respects # character in values when it is not preceded by a space character",
    );
  });

  assertStrictEquals(
    parsed.EQUAL_SIGNS,
    "equals==",
    "respects equals signs in values",
  );

  assertStrictEquals(
    parsed.RETAIN_INNER_QUOTES,
    '{"foo": "bar"}',
    "retains inner quotes",
  );

  assertThrows(() => {
    assertStrictEquals(
      parsed.RETAIN_LEADING_DQUOTE,
      '"retained',
      "retains leading double quote",
    );
  });

  assertThrows(() => {
    assertStrictEquals(
      parsed.RETAIN_LEADING_SQUOTE,
      "'retained",
      "retains leading single quote",
    );
  });

  assertThrows(() => {
    assertStrictEquals(
      parsed.RETAIN_TRAILING_DQUOTE,
      'retained"',
      "reatins trailing double quote",
    );
  });

  assertStrictEquals(
    parsed.RETAIN_TRAILING_SQUOTE,
    "retained'",
    "retains trailing single quote",
  );

  assertStrictEquals(
    parsed.EQUAL_SIGNS,
    "equals==",
    "respects equals signs in values",
  );

  assertStrictEquals(
    parsed.RETAIN_INNER_QUOTES,
    '{"foo": "bar"}',
    "retains inner quotes",
  );

  assertStrictEquals(
    parsed.RETAIN_INNER_QUOTES_AS_STRING,
    '{"foo": "bar"}',
    "retains inner quotes",
  );

  assertStrictEquals(
    parsed.TRIM_SPACE_FROM_UNQUOTED,
    "some spaced out string",
    "retains spaces in string",
  );

  assertStrictEquals(
    parsed.USERNAME,
    "therealnerdybeast@example.tld",
    "parses email addresses completely",
  );

  assertStrictEquals(
    parsed.SPACED_KEY,
    "parsed",
    "parses keys and values surrounded by spaces",
  );
});

const expectedPayload = {
  SERVER: "localhost",
  PASSWORD: "password",
  DB: "tests",
};

Deno.test("can parse (\\r) line endings", () => {
  const parsed = parse("SERVER=localhost\rPASSWORD=password\rDB=tests\r");
  assertEquals(parsed, expectedPayload);
});

Deno.test("can parse (\\n) line endings", () => {
  const parsed = parse("SERVER=localhost\nPASSWORD=password\nDB=tests\n");
  assertEquals(parsed, expectedPayload);
});

Deno.test("can parse (\\r\\n) line endings", () => {
  const parsed = parse(
    "SERVER=localhost\r\nPASSWORD=password\r\nDB=tests\r\n'",
  );
  assertEquals(parsed, expectedPayload);
});

Deno.test("parse .env-multiline", async () => {
  const s = await dataPath.joinpath(".env-multiline").readTextFile();
  const parsed = parse(s);

  assertStrictEquals(parsed.BASIC, "basic", "sets basic environment variable");

  assertStrictEquals(
    parsed.AFTER_LINE,
    "after_line",
    "reads after a skipped line",
  );

  assertStrictEquals(parsed.EMPTY, "", "defaults empty values to empty string");

  assertStrictEquals(
    parsed.SINGLE_QUOTES,
    "single_quotes",
    "escapes single quoted values",
  );

  assertStrictEquals(
    parsed.SINGLE_QUOTES_SPACED,
    "    single quotes    ",
    "respects surrounding spaces in single quotes",
  );

  assertStrictEquals(
    parsed.DOUBLE_QUOTES,
    "double_quotes",
    "escapes double quoted values",
  );

  assertStrictEquals(
    parsed.DOUBLE_QUOTES_SPACED,
    "    double quotes    ",
    "respects surrounding spaces in double quotes",
  );

  assertStrictEquals(
    parsed.EXPAND_NEWLINES,
    "expand\nnew\nlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(
    parsed.DONT_EXPAND_UNQUOTED,
    "dontexpand\\nnewlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(
    parsed.DONT_EXPAND_SQUOTED,
    "dontexpand\\nnewlines",
    "expands newlines but only if double quoted",
  );

  assertStrictEquals(parsed.COMMENTS, undefined, "ignores commented lines");

  assertStrictEquals(
    parsed.EQUAL_SIGNS,
    "equals==",
    "respects equals signs in values",
  );

  assertStrictEquals(
    parsed.RETAIN_INNER_QUOTES,
    '{"foo": "bar"}',
    "retains inner quotes",
  );

  assertStrictEquals(
    parsed.RETAIN_INNER_QUOTES_AS_STRING,
    '{"foo": "bar"}',
    "retains inner quotes",
  );

  assertStrictEquals(
    parsed.TRIM_SPACE_FROM_UNQUOTED,
    "some spaced out string",
    "retains spaces in string",
  );

  assertStrictEquals(
    parsed.USERNAME,
    "therealnerdybeast@example.tld",
    "parses email addresses completely",
  );

  assertStrictEquals(
    parsed.SPACED_KEY,
    "parsed",
    "parses keys and values surrounded by spaces",
  );

  assertStrictEquals(
    parsed.MULTI_DOUBLE_QUOTED,
    "THIS\nIS\nA\nMULTILINE\nSTRING",
    "parses multi-line strings when using double quotes",
  );

  assertStrictEquals(
    parsed.MULTI_SINGLE_QUOTED,
    "THIS\nIS\nA\nMULTILINE\nSTRING",
    "parses multi-line strings when using single quotes",
  );

  assertStrictEquals(
    parsed.MULTI_BACKTICKED,
    'THIS\nIS\nA\n"MULTILINE\'S"\nSTRING',
    "parses multi-line strings when using backticks",
  );

  assertThrows(() => {
    assertStrictEquals(
      parsed.MULTI_UNENDED,
      "THIS\nLINE HAS\nNO END QUOTE",
      "parses multi-line strings when using quote is not ended",
    );
  });
});
