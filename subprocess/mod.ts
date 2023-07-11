import { run, type RunOptions } from "./run.ts";

export * from "./run.ts";

/**
 * Capture `stdout` output from a command.
 *
 * @deprecated Use `stdoutText` from `os/run` instead.
 *
 * `stderr` is default to `null`.
 */
export async function output(
  cmd: string[],
  opts?: Omit<RunOptions, "stdout">,
): Promise<string> {
  const r = await run(cmd, { stderr: "null", ...opts, stdout: "piped" });
  return r.stdout;
}

/**
 * Capture `stderr` output from a command.
 *
 * @deprecated Use `stderrText` from `os/run` instead.
 *
 * `stdout` is default to `null`.
 */
export async function stderrOutput(
  cmd: string[],
  opts?: Omit<RunOptions, "stderr">,
): Promise<string> {
  const r = await run(cmd, { stdout: "null", ...opts, stderr: "piped" });
  return r.stderr;
}

/**
 * Similar to `echo "text" | cmd`.
 *
 * @deprecated Use `input` option from `os/run` instead.
 */
export async function pipeText(
  cmd: string[],
  text: string,
  opts?: Omit<RunOptions, "pipeText" | "stdin" | "stdout">,
): Promise<string> {
  const r = await run(cmd, { ...opts, pipeText: text, stdout: "piped" });
  return r.stdout;
}
