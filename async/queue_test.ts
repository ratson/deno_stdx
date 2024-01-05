// Copyright the p-queue authors. MIT License.
// Ported from https://github.com/sindresorhus/p-queue
// deno-lint-ignore-file require-await
import { DeadlineError } from "https://deno.land/std@0.211.0/async/deadline.ts";
import {
  assertEquals,
  assertRejects,
  assertStrictEquals,
  assertThrows,
  delay,
  isCI,
  randomInteger,
} from "../deps_test.ts";
import { AsyncQueue } from "./queue.ts";

// TODO Avoid flaky for Gihub Actions macOS
const ciDelay = isCI() && Deno.build.os === "darwin" ? 250 : 0;
const ciOpts = {
  sanitizeOps: ciDelay === 0,
  sanitizeResources: ciDelay === 0,
};

interface Range {
  readonly start?: number | BigInt;
  readonly end: number | BigInt;
}

const min = (left: number | BigInt, right: number | BigInt) =>
  left < right ? left : right;
const max = (left: number | BigInt, right: number | BigInt) =>
  left > right ? left : right;

const isNumberOrBigInt = (value: number | BigInt) =>
  ["number", "bigint"].includes(typeof value);

function inRange(number: number | BigInt, { start = 0, end }: Range) {
  if (
    !isNumberOrBigInt(number) ||
    !isNumberOrBigInt(start) ||
    !isNumberOrBigInt(end)
  ) {
    throw new TypeError(
      "Expected each argument to be either a number or a BigInt",
    );
  }

  return number >= min(start, end) && number <= max(end, start);
}

function convertHrtime(hrtime: number) {
  const nanoseconds = hrtime;
  const number = Number(nanoseconds);
  const milliseconds = number / 1000000;
  const seconds = number / 1000000000;

  return {
    seconds,
    milliseconds,
    nanoseconds,
  };
}

function timeSpan() {
  const start = performance.now() * 1000000;
  const end = (type: "milliseconds" | "seconds" | "nanoseconds") =>
    convertHrtime(performance.now() * 1000000 - start)[type];

  const returnValue = () => end("milliseconds");
  returnValue.rounded = () => Math.round(end("milliseconds"));
  returnValue.seconds = () => end("seconds");
  returnValue.nanoseconds = () => end("nanoseconds");

  return returnValue;
}

const fixture = Symbol("fixture");

Deno.test("add()", async () => {
  const queue = new AsyncQueue();
  const promise = queue.add(async () => 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(await promise, 1);
});

Deno.test("add() - limited concurrency", async () => {
  const queue = new AsyncQueue({ concurrency: 2 });
  const promise = queue.add(async () => fixture);
  const promise2 = queue.add(async () => {
    await delay(100);
    return fixture;
  });
  const promise3 = queue.add(async () => fixture);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 2);
  assertStrictEquals(await promise, fixture);
  assertStrictEquals(await promise2, fixture);
  assertStrictEquals(await promise3, fixture);
});

Deno.test("add() - concurrency: 1", async () => {
  const input = [
    [10, 300],
    [20, 200],
    [30, 100],
  ];

  const queue = new AsyncQueue({ concurrency: 1 });

  const mapper = ([value, ms]: number[]) =>
    queue.add(async () => {
      await delay(ms);
      return value;
    });

  const end = timeSpan();
  assertEquals(await Promise.all(input.map(mapper)), [10, 20, 30]);
  const elapsed = end();

  assertStrictEquals(
    inRange(elapsed, { start: 590, end: 650 + ciDelay }),
    true,
    `${elapsed} should within [590, 650]`,
  );
});

Deno.test("add() - concurrency: 5", async () => {
  const concurrency = 5;
  const queue = new AsyncQueue({ concurrency });
  let running = 0;

  const input = Array.from({ length: 100 }).fill(0).map(() =>
    queue.add(async () => {
      running++;
      assertStrictEquals(running <= concurrency, true);
      assertStrictEquals(queue.pending <= concurrency, true);
      await delay(randomInteger(30, 200));
      running--;
    })
  );

  await Promise.all(input);
  assertStrictEquals(running, 0);
});

Deno.test("add() - update concurrency", async () => {
  let concurrency = 5;
  const queue = new AsyncQueue({ concurrency });
  let running = 0;

  const input = Array.from({ length: 100 }).fill(0).map(async (_value, index) =>
    queue.add(async () => {
      running++;

      assertStrictEquals(running <= concurrency, true);
      assertStrictEquals(queue.pending <= concurrency, true);

      await delay(randomInteger(30, 200));
      running--;

      if (index % 30 === 0) {
        queue.concurrency = --concurrency;
        assertStrictEquals(queue.concurrency, concurrency);
      }
    })
  );

  await Promise.all(input);
});

Deno.test("add() - priority", async () => {
  const result: number[] = [];
  const queue = new AsyncQueue({ concurrency: 1 });
  queue.add(async () => result.push(1), { priority: 1 });
  queue.add(async () => result.push(0), { priority: 0 });
  queue.add(async () => result.push(1), { priority: 1 });
  queue.add(async () => result.push(2), { priority: 1 });
  queue.add(async () => result.push(3), { priority: 2 });
  queue.add(async () => result.push(0), { priority: -1 });
  await queue.onEmpty();
  assertEquals(result, [1, 3, 1, 2, 0, 0]);
});

Deno.test("add() - timeout without throwing", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const result: string[] = [];
  const queue = new AsyncQueue({ timeout: 300, throwOnTimeout: false });
  queue.add(async () => {
    await delay(400);
    result.push("🐌");
  });
  queue.add(async () => {
    await delay(250);
    result.push("🦆");
  });
  queue.add(async () => {
    await delay(310);
    result.push("🐢");
  });
  queue.add(async () => {
    await delay(100);
    result.push("🐅");
  });
  queue.add(async () => {
    result.push("⚡️");
  });
  await queue.onIdle();
  assertEquals(result, ["⚡️", "🐅", "🦆"]);
});

Deno.test("add() - timeout with throwing", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const result: string[] = [];
  const queue = new AsyncQueue({ timeout: 300, throwOnTimeout: true });

  const p = assertRejects(() =>
    queue.add(async () => {
      await delay(400);
      result.push("🐌");
    }), DeadlineError);

  queue.add(async () => {
    await delay(200);
    result.push("🦆");
  });

  await queue.onIdle();
  assertEquals(result, ["🦆"]);
  await p;
});

Deno.test("add() - change timeout in between", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const result: string[] = [];
  const initialTimeout = 50;
  const newTimeout = 200;
  const queue = new AsyncQueue({
    timeout: initialTimeout,
    throwOnTimeout: false,
    concurrency: 2,
  });
  queue.add(async () => {
    const { timeout } = queue;
    assertEquals(timeout, initialTimeout);
    await delay(300);
    result.push("🐌");
  });
  queue.timeout = newTimeout;
  queue.add(async () => {
    const { timeout } = queue;
    assertEquals(timeout, newTimeout);
    await delay(100);
    result.push("🐅");
  });
  await queue.onIdle();
  assertEquals(result, ["🐅"]);
});

Deno.test("onEmpty()", { sanitizeOps: false }, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  queue.add(async () => 0);
  queue.add(async () => 0);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 1);
  await queue.onEmpty();
  assertStrictEquals(queue.size, 0);

  queue.add(async () => 0);
  queue.add(async () => 0);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 1);
  await queue.onEmpty();
  assertStrictEquals(queue.size, 0);

  // Test an empty queue
  await queue.onEmpty();
  assertStrictEquals(queue.size, 0);
});

Deno.test("onIdle()", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue({ concurrency: 2 });

  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 2);
  await queue.onIdle();
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 0);

  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 2);
  await queue.onIdle();
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 0);
});

Deno.test("onSizeLessThan()", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));

  await queue.onSizeLessThan(4);
  assertStrictEquals(queue.size, 3);
  assertStrictEquals(queue.pending, 1);

  await queue.onSizeLessThan(2);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 1);

  await queue.onSizeLessThan(10);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(queue.pending, 1);

  await queue.onSizeLessThan(1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 1);
});

Deno.test("onIdle() - no pending", async () => {
  const queue = new AsyncQueue();
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 0);

  assertStrictEquals(await queue.onIdle(), undefined);
});

Deno.test("clear()", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue({ concurrency: 2 });
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  assertStrictEquals(queue.size, 4);
  assertStrictEquals(queue.pending, 2);
  queue.clear();
  assertStrictEquals(queue.size, 0);

  await queue.onEmpty();
});

Deno.test("addAll()", async () => {
  const queue = new AsyncQueue();
  const fn = async (): Promise<symbol> => fixture;
  const functions = [fn, fn];
  const promise = queue.addAll(functions);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 2);
  assertEquals(await promise, [fixture, fixture]);
});

Deno.test("enforce number in options.concurrency", () => {
  assertThrows(
    () => {
      new AsyncQueue({ concurrency: 0 });
    },
    TypeError,
  );

  assertThrows(
    () => {
      new AsyncQueue({ concurrency: undefined });
    },
    TypeError,
  );

  new AsyncQueue({ concurrency: 1 });

  new AsyncQueue({ concurrency: 10 });

  new AsyncQueue({ concurrency: Number.POSITIVE_INFINITY });
});

Deno.test("enforce number in queue.concurrency", () => {
  assertThrows(
    () => {
      (new AsyncQueue()).concurrency = 0;
    },
    TypeError,
  );

  assertThrows(
    () => {
      // @ts-expect-error Testing
      (new AsyncQueue()).concurrency = undefined;
    },
    TypeError,
  );

  (new AsyncQueue()).concurrency = 1;

  (new AsyncQueue()).concurrency = 10;

  (new AsyncQueue()).concurrency = Number.POSITIVE_INFINITY;
});

Deno.test("enforce number in options.intervalCap", () => {
  assertThrows(
    () => {
      new AsyncQueue({ intervalCap: 0 });
    },
    TypeError,
  );

  assertThrows(
    () => {
      new AsyncQueue({ intervalCap: undefined });
    },
    TypeError,
  );

  new AsyncQueue({ intervalCap: 1 });

  new AsyncQueue({ intervalCap: 10 });

  new AsyncQueue({ intervalCap: Number.POSITIVE_INFINITY });
});

Deno.test("enforce finite in options.interval", () => {
  assertThrows(
    () => {
      new AsyncQueue({ interval: -1 });
    },
    TypeError,
  );

  assertThrows(
    () => {
      new AsyncQueue({ interval: undefined });
    },
    TypeError,
  );

  assertThrows(() => {
    new AsyncQueue({ interval: Number.POSITIVE_INFINITY });
  });

  new AsyncQueue({ interval: 0 });

  new AsyncQueue({ interval: 10 });

  assertThrows(() => {
    new AsyncQueue({ interval: Number.POSITIVE_INFINITY });
  });
});

Deno.test("autoStart: false", {
  sanitizeOps: false,
  sanitizeResources: false,
}, () => {
  const queue = new AsyncQueue({ concurrency: 2, autoStart: false });

  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  queue.add(async () => delay(20_000));
  assertStrictEquals(queue.size, 4);
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.isPaused, true);

  queue.start();
  assertStrictEquals(queue.size, 2);
  assertStrictEquals(queue.pending, 2);
  assertStrictEquals(queue.isPaused, false);

  queue.clear();
  assertStrictEquals(queue.size, 0);
});

Deno.test("start() - return this", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue({ concurrency: 2, autoStart: false });

  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  queue.add(async () => delay(100));
  assertStrictEquals(queue.size, 3);
  assertStrictEquals(queue.pending, 0);
  await queue.start().onIdle();
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 0);
});

Deno.test("start() - not paused", () => {
  const queue = new AsyncQueue();

  assertStrictEquals(queue.isPaused, false);

  queue.start();

  assertStrictEquals(queue.isPaused, false);
});

Deno.test("pause()", {
  sanitizeOps: false,
  sanitizeResources: false,
}, () => {
  const queue = new AsyncQueue({ concurrency: 2 });

  queue.pause();
  queue.add(() => delay(20_000));
  queue.add(() => delay(20_000));
  queue.add(() => delay(20_000));
  queue.add(() => delay(20_000));
  queue.add(() => delay(20_000));
  assertStrictEquals(queue.size, 5);
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.isPaused, true);

  queue.start();
  assertStrictEquals(queue.size, 3);
  assertStrictEquals(queue.pending, 2);
  assertStrictEquals(queue.isPaused, false);

  queue.add(() => delay(20_000));
  queue.pause();
  assertStrictEquals(queue.size, 4);
  assertStrictEquals(queue.pending, 2);
  assertStrictEquals(queue.isPaused, true);

  queue.start();
  assertStrictEquals(queue.size, 4);
  assertStrictEquals(queue.pending, 2);
  assertStrictEquals(queue.isPaused, false);

  queue.clear();
  assertStrictEquals(queue.size, 0);
});

Deno.test("add() sync/async mixed tasks", async () => {
  const queue = new AsyncQueue({ concurrency: 1 });
  queue.add(() => "sync 1");
  queue.add(() => delay(1000));
  queue.add(() => "sync 2");
  queue.add(() => fixture);
  assertStrictEquals(queue.size, 3);
  assertStrictEquals(queue.pending, 1);
  await queue.onIdle();
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 0);
});

Deno.test("add() - handle task throwing error", async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  queue.add(() => "sync 1");
  const p = assertRejects(
    () =>
      queue.add(() => {
        throw new Error("broken");
      }),
    Error,
    "broken",
  );
  queue.add(() => "sync 2");

  assertStrictEquals(queue.size, 2);
  await p;

  await queue.onIdle();
});

Deno.test("add() - handle task promise failure", async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  await assertRejects(
    () =>
      queue.add(
        async () => {
          throw new Error("broken");
        },
      ),
    Error,
    "broken",
  );

  queue.add(() => "task #1");

  assertStrictEquals(queue.pending, 1);

  await queue.onIdle();

  assertStrictEquals(queue.pending, 0);
});

Deno.test("addAll() sync/async mixed tasks", async () => {
  const queue = new AsyncQueue();

  const functions: Array<() => (string | Promise<void> | Promise<unknown>)> = [
    () => "sync 1",
    async () => delay(2000),
    () => "sync 2",
    async () => fixture,
  ];

  const promise = queue.addAll(functions);

  assertStrictEquals(queue.size, 0);
  assertStrictEquals(queue.pending, 4);
  assertEquals(await promise, ["sync 1", undefined, "sync 2", fixture]);
});

Deno.test("should resolve empty when size is zero", async () => {
  const queue = new AsyncQueue({ concurrency: 1, autoStart: false });

  // It should take 1 seconds to resolve all tasks
  for (let index = 0; index < 100; index++) {
    queue.add(async () => delay(10));
  }

  (async () => {
    await queue.onEmpty();
    assertStrictEquals(queue.size, 0);
  })();

  queue.start();

  // Pause at 0.5 second
  setTimeout(
    async () => {
      queue.pause();
      await delay(10);
      queue.start();
    },
    500,
  );

  await queue.onIdle();
});

Deno.test("add() - throttled", async () => {
  const result: number[] = [];
  const queue = new AsyncQueue({
    intervalCap: 1,
    interval: 500,
    autoStart: false,
  });
  queue.add(async () => result.push(1));
  queue.start();
  await delay(250);
  queue.add(async () => result.push(2));
  assertEquals(result, [1]);
  await delay(300);
  assertEquals(result, [1, 2]);
});

Deno.test("add() - throttled, carryoverConcurrencyCount false", async () => {
  const result: number[] = [];

  const queue = new AsyncQueue({
    intervalCap: 1,
    carryoverConcurrencyCount: false,
    interval: 500,
    autoStart: false,
  });

  const values = [0, 1];
  for (const value of values) {
    queue.add(async () => {
      await delay(600);
      result.push(value);
    });
  }

  queue.start();

  (async () => {
    await delay(550);
    assertStrictEquals(queue.pending, 2);
    assertEquals(result, []);
  })();

  (async () => {
    await delay(650);
    assertStrictEquals(queue.pending, 1);
    assertEquals(result, [0]);
  })();

  await delay(1250);
  assertEquals(result, values);
});

Deno.test("add() - throttled, carryoverConcurrencyCount true", {
  ...ciOpts,
}, async () => {
  const result: number[] = [];

  const queue = new AsyncQueue({
    carryoverConcurrencyCount: true,
    intervalCap: 1,
    interval: 500,
    autoStart: false,
  });

  const values = [0, 1];
  for (const value of values) {
    queue.add(async () => {
      await delay(600);
      result.push(value);
    });
  }

  queue.start();

  const promises = [
    (async () => {
      await delay(100);
      assertEquals(result, []);
      assertStrictEquals(queue.pending, 1, `pending != 1 after 100ms`);
    })(),

    (async () => {
      await delay(550);
      assertEquals(result, []);
      assertStrictEquals(queue.pending, 1);
    })(),

    (async () => {
      await delay(650);
      assertEquals(result, [0], `result should be [0] after 650ms: ${result}`);
      assertStrictEquals(queue.pending, 0);
    })(),

    (async () => {
      await delay(1550);
      assertEquals(result, [0], `result should be [0] after 1550ms: ${result}`);
    })(),
  ];

  await delay(1650 + ciDelay);
  assertEquals(result, values);

  await Promise.all(promises);
});

Deno.test("add() - throttled 10, concurrency 5", ciOpts, async () => {
  const result: number[] = [];

  const queue = new AsyncQueue({
    concurrency: 5,
    intervalCap: 10,
    interval: 1000,
    autoStart: false,
  });

  const firstValue = [...Array.from({ length: 5 }).keys()];
  const secondValue = [...Array.from({ length: 10 }).keys()];
  const thirdValue = [...Array.from({ length: 13 }).keys()];

  for (const value of thirdValue) {
    queue.add(async () => {
      await delay(300);
      result.push(value);
    });
  }

  queue.start();

  assertEquals(result, []);

  const promises = [
    (async () => {
      await delay(400);
      assertEquals(result, firstValue);
      assertStrictEquals(queue.pending, 5);
    })(),

    (async () => {
      await delay(700);
      assertEquals(result, secondValue);
    })(),

    (async () => {
      await delay(1200);
      assertStrictEquals(queue.pending, 3);
      assertEquals(result, secondValue);
    })(),
  ];

  await delay(1400);
  assertEquals(result, thirdValue);

  await Promise.all(promises);
  await queue.onIdle();
});

Deno.test("add() - throttled finish and resume", async () => {
  const result: number[] = [];

  const queue = new AsyncQueue({
    concurrency: 1,
    intervalCap: 2,
    interval: 2000,
    autoStart: false,
  });

  const values = [0, 1];
  const firstValue = [0, 1];
  const secondValue = [0, 1, 2];

  for (const value of values) {
    queue.add(async () => {
      await delay(100);
      result.push(value);
    });
  }

  queue.start();

  const promises = [
    (async () => {
      await delay(1000);
      assertEquals(result, firstValue);

      queue.add(async () => {
        await delay(100);
        result.push(2);
      });
    })(),

    (async () => {
      await delay(1500);
      assertEquals(result, firstValue);
    })(),
  ];

  await delay(2200 + ciDelay);
  assertEquals(result, secondValue);

  promises.push(queue.onIdle());
  await Promise.all(promises);
});

Deno.test("pause should work when throttled", ciOpts, async () => {
  const result: number[] = [];

  const queue = new AsyncQueue({
    concurrency: 2,
    intervalCap: 2,
    interval: 1000,
    autoStart: false,
  });

  const values = [0, 1, 2, 3];
  const firstValue = [0, 1];
  const secondValue = [0, 1, 2, 3];

  for (const value of values) {
    queue.add(async () => {
      await delay(100);
      result.push(value);
    });
  }

  queue.start();

  const promises = [
    (async () => {
      await delay(300);
      assertEquals(result, firstValue);
    })(),

    (async () => {
      await delay(600);
      queue.pause();
    })(),

    (async () => {
      await delay(1400);
      assertEquals(result, firstValue);
    })(),

    (async () => {
      await delay(1500);
      queue.start();
    })(),

    (async () => {
      await delay(2200);
      assertEquals(result, secondValue);
    })(),
  ];

  await delay(2500);

  await Promise.all(promises);
});

Deno.test("clear interval on pause", ciOpts, async () => {
  const queue = new AsyncQueue({
    interval: 100,
    intervalCap: 1,
  });

  queue.add(() => {
    queue.pause();
  });

  queue.add(() => "task #1");

  await delay(300 + ciDelay);

  assertStrictEquals(queue.size, 1);
});

Deno.test("should be an EventTarget", () => {
  const queue = new AsyncQueue();
  assertStrictEquals(queue instanceof EventTarget, true);
});

Deno.test("should emit active event per item", async () => {
  const items = [0, 1, 2, 3, 4];
  const queue = new AsyncQueue();

  let eventCount = 0;
  queue.on("active", () => {
    eventCount++;
  });

  for (const item of items) {
    queue.add(() => item);
  }

  await queue.onIdle();

  assertStrictEquals(eventCount, items.length);
});

Deno.test("should emit idle event when idle", ciOpts, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  let timesCalled = 0;
  queue.on("idle", () => {
    timesCalled++;
  });

  const job1 = queue.add(() => delay(100));
  const job2 = queue.add(() => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(timesCalled, 0);

  await job1;

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 0);

  await job2;

  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 1);

  const job3 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 1);

  await job3;
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 2);
});

Deno.test("should emit add event when adding task", ciOpts, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  let timesCalled = 0;
  queue.on("add", () => {
    timesCalled++;
  });

  const job1 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 1);

  const job2 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(timesCalled, 2);

  await job1;

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 2);

  await job2;

  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 2);

  const job3 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 3);

  await job3;
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 3);
});

Deno.test("should emit next event when completing task", ciOpts, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  let timesCalled = 0;
  queue.on("next", () => {
    timesCalled++;
  });

  const job1 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 0);

  const job2 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(timesCalled, 0);

  await job1;

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 1);

  await job2;

  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 2);

  const job3 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 2);

  await job3;
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(timesCalled, 3);
});

Deno.test("should emit completed / error events", ciOpts, async () => {
  const queue = new AsyncQueue({ concurrency: 1 });

  let errorEvents = 0;
  let completedEvents = 0;
  queue.on("error", () => {
    errorEvents++;
  });
  queue.on("completed", () => {
    completedEvents++;
  });

  const job1 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(errorEvents, 0);
  assertStrictEquals(completedEvents, 0);

  const job2 = queue.add(async () => {
    await delay(1);
    throw new Error("failure");
  });

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 1);
  assertStrictEquals(errorEvents, 0);
  assertStrictEquals(completedEvents, 0);

  await job1;

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(errorEvents, 0);
  assertStrictEquals(completedEvents, 1);

  await assertRejects(() => job2);

  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(errorEvents, 1);
  assertStrictEquals(completedEvents, 1);

  const job3 = queue.add(async () => delay(100));

  assertStrictEquals(queue.pending, 1);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(errorEvents, 1);
  assertStrictEquals(completedEvents, 1);

  await job3;
  assertStrictEquals(queue.pending, 0);
  assertStrictEquals(queue.size, 0);
  assertStrictEquals(errorEvents, 1);
  assertStrictEquals(completedEvents, 2);
});

Deno.test("should verify timeout overrides passed to add", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue({ timeout: 200, throwOnTimeout: true });

  await assertRejects(() =>
    queue.add(async () => {
      await delay(400);
    })
  );

  await queue.add(async () => {
    await delay(400);
  }, { throwOnTimeout: false });

  await queue.add(async () => {
    await delay(400);
  }, { timeout: 600 });

  await queue.add(async () => {
    await delay(100);
  });

  await assertRejects(() =>
    queue.add(async () => {
      await delay(100);
    }, { timeout: 50 })
  );

  await queue.onIdle();
});

Deno.test("skip an aborted job", {
  sanitizeResources: false,
}, async () => {
  const queue = new AsyncQueue();

  const controller = new AbortController();

  controller.abort();
  await assertRejects(
    () => queue.add(() => {}, { signal: controller.signal }),
    DOMException,
  );
});

Deno.test("pass AbortSignal instance to job", {
  sanitizeOps: false,
}, async () => {
  const queue = new AsyncQueue();

  const controller = new AbortController();

  await queue.add(async ({ signal }) => {
    assertStrictEquals(controller.signal, signal);
  }, { signal: controller.signal });
});
