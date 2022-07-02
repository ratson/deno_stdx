import {
  assertStrictEquals,
  assertThrows,
  describe,
  it,
} from "../deps_test.ts";
import { ms } from "./ms.ts";

describe("ms(string)", () => {
  it("should not throw an error", () => {
    ms("1m");
  });

  it("should preserve ms", () => {
    assertStrictEquals(ms("100"), 100);
  });

  it("should convert from m to ms", () => {
    assertStrictEquals(ms("1m"), 60_000);
  });

  it("should convert from h to ms", () => {
    assertStrictEquals(ms("1h"), 3_600_000);
  });

  it("should convert d to ms", () => {
    assertStrictEquals(ms("2d"), 172_800_000);
  });
  it("should convert w to ms", () => {
    assertStrictEquals(ms("3w"), 1_814_400_000);
  });

  it("should convert s to ms", () => {
    assertStrictEquals(ms("1s"), 1_000);
  });

  it("should convert ms to ms", () => {
    assertStrictEquals(ms("100ms"), 100);
  });

  it("should convert y to ms", () => {
    assertStrictEquals(ms("1y"), 31_557_600_000);
  });

  it("should work with decimals", () => {
    assertStrictEquals(ms("1.5h"), 5_400_000);
  });

  it("should work with multiple spaces", () => {
    assertStrictEquals(ms("1   s"), 1_000);
  });

  it("should return NaN if invalid", () => {
    // @ts-expect-error - We expect this to fail.
    assertStrictEquals(isNaN(ms("☃")), true);
    // @ts-expect-error - We expect this to fail.
    assertStrictEquals(isNaN(ms("10-.5")), true);
    // @ts-expect-error - We expect this to fail.
    assertStrictEquals(isNaN(ms("ms")), true);
  });

  it("should be case-insensitive", () => {
    assertStrictEquals(ms("1.5H"), 5_400_000);
  });

  it("should work with numbers starting with .", () => {
    assertStrictEquals(ms(".5ms"), 0.5);
  });

  it("should work with negative integers", () => {
    assertStrictEquals(ms("-100ms"), -100);
  });

  it("should work with negative decimals", () => {
    assertStrictEquals(ms("-1.5h"), -5_400_000);
    assertStrictEquals(ms("-10.5h"), -37_800_000);
  });

  it('should work with negative decimals starting with "."', () => {
    assertStrictEquals(ms("-.5h"), -1_800_000);
  });
});

describe("ms(long string)", () => {
  it("should not throw an error", () => {
    ms("53 milliseconds");
  });

  it("should convert milliseconds to ms", () => {
    assertStrictEquals(ms("53 milliseconds"), 53);
  });

  it("should convert msecs to ms", () => {
    assertStrictEquals(ms("17 msecs"), 17);
  });

  it("should convert sec to ms", () => {
    assertStrictEquals(ms("1 sec"), 1_000);
  });

  it("should convert from min to ms", () => {
    assertStrictEquals(ms("1 min"), 60_000);
  });

  it("should convert from hr to ms", () => {
    assertStrictEquals(ms("1 hr"), 3_600_000);
  });

  it("should convert days to ms", () => {
    assertStrictEquals(ms("2 days"), 172_800_000);
  });

  it("should convert weeks to ms", () => {
    assertStrictEquals(ms("1 week"), 604_800_000);
  });

  it("should convert years to ms", () => {
    assertStrictEquals(ms("1 year"), 31_557_600_000);
  });

  it("should work with decimals", () => {
    assertStrictEquals(ms("1.5 hours"), 5_400_000);
  });

  it("should work with negative integers", () => {
    assertStrictEquals(ms("-100 milliseconds"), -100);
  });

  it("should work with negative decimals", () => {
    assertStrictEquals(ms("-1.5 hours"), -5_400_000);
  });

  it('should work with negative decimals starting with "."', () => {
    assertStrictEquals(ms("-.5 hr"), -1_800_000);
  });
});

describe("ms(number, { long: true })", () => {
  it("should not throw an error", () => {
    ms(500, { long: true });
  });

  it("should support milliseconds", () => {
    assertStrictEquals(ms(500, { long: true }), "500 ms");

    assertStrictEquals(ms(-500, { long: true }), "-500 ms");
  });

  it("should support seconds", () => {
    assertStrictEquals(ms(1000, { long: true }), "1 second");
    assertStrictEquals(ms(1200, { long: true }), "1 second");
    assertStrictEquals(ms(10000, { long: true }), "10 seconds");

    assertStrictEquals(ms(-1000, { long: true }), "-1 second");
    assertStrictEquals(ms(-1200, { long: true }), "-1 second");
    assertStrictEquals(ms(-10000, { long: true }), "-10 seconds");
  });

  it("should support minutes", () => {
    assertStrictEquals(ms(60 * 1000, { long: true }), "1 minute");
    assertStrictEquals(ms(60 * 1200, { long: true }), "1 minute");
    assertStrictEquals(ms(60 * 10000, { long: true }), "10 minutes");

    assertStrictEquals(ms(-1 * 60 * 1000, { long: true }), "-1 minute");
    assertStrictEquals(ms(-1 * 60 * 1200, { long: true }), "-1 minute");
    assertStrictEquals(ms(-1 * 60 * 10000, { long: true }), "-10 minutes");
  });

  it("should support hours", () => {
    assertStrictEquals(ms(60 * 60 * 1000, { long: true }), "1 hour");
    assertStrictEquals(ms(60 * 60 * 1200, { long: true }), "1 hour");
    assertStrictEquals(ms(60 * 60 * 10000, { long: true }), "10 hours");

    assertStrictEquals(ms(-1 * 60 * 60 * 1000, { long: true }), "-1 hour");
    assertStrictEquals(ms(-1 * 60 * 60 * 1200, { long: true }), "-1 hour");
    assertStrictEquals(ms(-1 * 60 * 60 * 10000, { long: true }), "-10 hours");
  });

  it("should support days", () => {
    assertStrictEquals(ms(24 * 60 * 60 * 1000, { long: true }), "1 day");
    assertStrictEquals(ms(24 * 60 * 60 * 1200, { long: true }), "1 day");
    assertStrictEquals(ms(24 * 60 * 60 * 10000, { long: true }), "10 days");

    assertStrictEquals(ms(-1 * 24 * 60 * 60 * 1000, { long: true }), "-1 day");
    assertStrictEquals(ms(-1 * 24 * 60 * 60 * 1200, { long: true }), "-1 day");
    assertStrictEquals(
      ms(-1 * 24 * 60 * 60 * 10000, { long: true }),
      "-10 days",
    );
  });

  it("should round", () => {
    assertStrictEquals(ms(234234234, { long: true }), "3 days");

    assertStrictEquals(ms(-234234234, { long: true }), "-3 days");
  });
});

describe("ms(number)", () => {
  it("should not throw an error", () => {
    ms(500);
  });

  it("should support milliseconds", () => {
    assertStrictEquals(ms(500), "500ms");

    assertStrictEquals(ms(-500), "-500ms");
  });

  it("should support seconds", () => {
    assertStrictEquals(ms(1000), "1s");
    assertStrictEquals(ms(10_000), "10s");

    assertStrictEquals(ms(-1000), "-1s");
    assertStrictEquals(ms(-10_000), "-10s");
  });

  it("should support minutes", () => {
    assertStrictEquals(ms(60 * 1000), "1m");
    assertStrictEquals(ms(60 * 10_000), "10m");

    assertStrictEquals(ms(-1 * 60 * 1000), "-1m");
    assertStrictEquals(ms(-1 * 60 * 10_000), "-10m");
  });

  it("should support hours", () => {
    assertStrictEquals(ms(60 * 60 * 1000), "1h");
    assertStrictEquals(ms(60 * 60 * 10_000), "10h");

    assertStrictEquals(ms(-1 * 60 * 60 * 1000), "-1h");
    assertStrictEquals(ms(-1 * 60 * 60 * 10_000), "-10h");
  });

  it("should support days", () => {
    assertStrictEquals(ms(24 * 60 * 60 * 1000), "1d");
    assertStrictEquals(ms(24 * 60 * 60 * 10_000), "10d");

    assertStrictEquals(ms(-1 * 24 * 60 * 60 * 1_000), "-1d");
    assertStrictEquals(ms(-1 * 24 * 60 * 60 * 10_000), "-10d");
  });

  it("should round", () => {
    assertStrictEquals(ms(234234234), "3d");

    assertStrictEquals(ms(-234234234), "-3d");
  });
});

describe("ms(invalid inputs)", () => {
  it('should throw an error, when ms("")', () => {
    assertThrows(() => {
      // @ts-expect-error - We expect this to throw.
      ms("");
    });
  });

  it("should throw an error, when ms(undefined)", () => {
    assertThrows(() => {
      // @ts-expect-error - We expect this to throw.
      ms(undefined);
    });
  });

  it("should throw an error, when ms(null)", () => {
    assertThrows(() => {
      // @ts-expect-error - We expect this to throw.
      ms(null);
    });
  });

  it("should throw an error, when ms([])", () => {
    assertThrows(() => {
      // @ts-expect-error - We expect this to throw.
      ms([]);
    });
  });

  it("should throw an error, when ms({})", () => {
    assertThrows(() => {
      // @ts-expect-error - We expect this to throw.
      ms({});
    });
  });

  it("should throw an error, when ms(NaN)", () => {
    assertThrows(() => {
      ms(NaN);
    });
  });

  it("should throw an error, when ms(Infinity)", () => {
    assertThrows(() => {
      ms(Infinity);
    });
  });

  it("should throw an error, when ms(-Infinity)", () => {
    assertThrows(() => {
      ms(-Infinity);
    });
  });
});
