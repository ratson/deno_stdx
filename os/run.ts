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

  return new Proxy(result, {
    get(target, prop: never) {
      switch (prop) {
        case "pid":
          return process[prop];
        case "stdoutText":
          return decoder.decode(result.stdout);
        case "stderrText":
          return decoder.decode(result.stderr);
      }
      return target[prop];
    },
  }) as Deno.CommandOutput & {
    pid: number;
    stdoutText?: string;
    stderrText?: string;
  };
}

export { run };
