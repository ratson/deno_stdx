import { JsonValue } from "https://deno.land/std@0.219.1/json/common.ts";

export interface RunOptions extends Deno.CommandOptions {
  check?: boolean;
  decoder?: TextDecoder;
  input?: string;
}

export class CalledProcessError extends Error {
}

async function run(cmd: string[], options: RunOptions = {}) {
  const { check, input, decoder = new TextDecoder(), ...opts } = options;
  const hasInput = input !== undefined;

  if (hasInput) {
    if (opts.stdin === undefined) {
      opts.stdin = "piped";
    } else if (opts.stdin !== "piped") {
      throw new TypeError("`input` only works when `stdin` is `piped`");
    }
  }

  const command = new Deno.Command(cmd[0], {
    ...opts,
    args: cmd.slice(1),
  });

  const process = command.spawn();

  if (hasInput) {
    const writer = process.stdin.getWriter();
    writer.write(new TextEncoder().encode(input));
    writer.releaseLock();
    await process.stdin.close();
  }

  const result = await process.output();

  if (check && !result.success) {
    throw new CalledProcessError();
  }

  const handler = {
    get pid() {
      return process.pid;
    },
    get stdoutText() {
      return decoder.decode(result.stdout);
    },
    get stderrText() {
      return decoder.decode(result.stderr);
    },
    stdoutJSON<T = JsonValue>() {
      return JSON.parse(this.stdoutText) as T;
    },
    stderrJSON<T = JsonValue>() {
      return JSON.parse(this.stderrText) as T;
    },
  };

  return new Proxy(result, {
    get(target, prop: never) {
      return target[prop] ?? handler[prop];
    },
  }) as Deno.CommandOutput & typeof handler;
}

export { run };
