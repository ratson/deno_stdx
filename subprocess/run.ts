const encoder = new TextEncoder();
const defaultDecoder = new TextDecoder();

export class CalledProcessError extends Error {
}

type RunOptionsBase = Omit<Deno.RunOptions, "cmd"> & {
  check?: boolean;
  decoder?: TextDecoder;
};
export type RunOptions =
  | (RunOptionsBase & { pipeText: string; stdin?: "piped" })
  | (RunOptionsBase & { pipeText?: undefined })
  | undefined;

function run(
  cmd: string[],
  opts: RunOptions & { stderr: "piped" },
): Promise<Deno.ProcessStatus & { stderr: string }>;
function run(
  cmd: string[],
  opts: RunOptions & { stdout: "piped" },
): Promise<Deno.ProcessStatus & { stdout: string }>;
function run(
  cmd: string[],
  opts?: RunOptions,
): Promise<Deno.ProcessStatus>;
/**
 * Spawns a subprocess to run `cmd`.
 *
 * @param cmd An array of program arguments, the first of which is the binary
 */
async function run(cmd: string[], opts?: RunOptions) {
  const { pipeText, ...o } = { decoder: defaultDecoder, ...(opts ?? {}) };
  const hasPipeText = pipeText !== undefined;
  if (hasPipeText) {
    if (o.stdin === undefined) {
      o.stdin = "piped";
    } else if (o.stdin !== "piped") {
      throw new TypeError("`pipeText` only works when `stdin` is `piped`");
    }
  }

  const p = Deno.run({ ...o, cmd });
  if (hasPipeText && p.stdin) {
    await p.stdin.write(encoder.encode(pipeText));
    p.stdin.close();
  }

  const [status, stdout, stderr] = await Promise.all([
    p.status(),
    o.stdout === "piped" ? p.output() : undefined,
    o.stderr === "piped" ? p.stderrOutput() : undefined,
  ]);
  p.close();

  const result: Deno.ProcessStatus & {
    stderr?: string;
    stdout?: string;
  } = status;
  if (stderr !== undefined) result.stderr = o.decoder.decode(stderr);
  if (stdout !== undefined) result.stdout = o.decoder.decode(stdout);

  if (o.check && !result.success) {
    throw new CalledProcessError();
  }

  return result;
}

export { run };
