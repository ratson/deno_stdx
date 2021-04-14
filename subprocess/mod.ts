const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type RunOptions = Omit<Deno.RunOptions, "cmd">;

function run(
  cmd: string[],
  opts: RunOptions & { stderr: "piped" },
): Promise<Deno.ProcessStatus & { stderr: string }>;
function run(
  cmd: string[],
  opts: RunOptions & { stdout: "piped" },
): Promise<Deno.ProcessStatus & { stdout: string }>;
function run(cmd: string[], opts?: RunOptions): Promise<Deno.ProcessStatus>;
/**
 * Spawns a subprocess to run `cmd`.
 * 
 * @param cmd An array of program arguments, the first of which is the binary
 */
async function run(cmd: string[], opts?: RunOptions) {
  const p = Deno.run({ ...opts, cmd });
  const result: Deno.ProcessStatus & {
    stderr?: string;
    stdout?: string;
  } = await p.status();
  if (opts?.stderr === "piped") {
    result.stderr = decoder.decode(await p.stderrOutput());
  }
  if (opts?.stdout === "piped") {
    result.stdout = decoder.decode(await p.output());
  }
  p.close();
  return result;
}
export { run };

/**
 * Capture `stdout` output from a command.
 * 
 * `stderr` is default to `null`.
 */
export async function output(
  cmd: string[],
  opts?: Omit<RunOptions, "stdout">,
) {
  const r = await run(cmd, { stderr: "null", ...opts, stdout: "piped" });
  return r.stdout!;
}

/**
 * Capture `stderr` output from a command.
 * 
 * `stdout` is default to `null`.
 */
export async function stderrOutput(
  cmd: string[],
  opts?: Omit<RunOptions, "stderr">,
) {
  const r = await run(cmd, { stdout: "null", ...opts, stderr: "piped" });
  return r.stderr!;
}

export type PipeTextOptions = Omit<RunOptions, "stdout" | "stdin">;

/**
 * Similar to `echo "text" | cmd`.
 */
export async function pipeText(
  cmd: string[],
  text: string,
  opts?: PipeTextOptions,
) {
  const p = Deno.run({
    stderr: "null",
    ...opts,
    cmd,
    stdout: "piped",
    stdin: "piped",
  });
  await p.stdin.write(encoder.encode(text));
  p.stdin.close();

  const output = await p.output();
  p.close();
  return decoder.decode(output);
}
