import { JsonValue } from "https://deno.land/std@0.211.0/json/common.ts";
import { run, type RunOptions } from "./run.ts";

/**
 * Capture `stdout` output from a command.
 *
 * `stderr` is default to `null`.
 */
export async function output(
  cmd: string[],
  options?: Omit<RunOptions, "stdout">,
): Promise<string> {
  const r = await run(cmd, { stderr: "null", ...options, stdout: "piped" });
  return r.stdoutText;
}

/**
 * Similar to `echo "text" | cmd`.
 */
export function pipeText(
  cmd: string[],
  text: string,
  opts?: Omit<RunOptions, "input" | "stdin" | "stdout">,
): Promise<string> {
  return output(cmd, { ...opts, input: text });
}

/**
 * Capture `stdout` output as JSON value
 */
export async function json<T extends JsonValue>(
  ...args: Parameters<typeof output>
) {
  return JSON.parse(await output(...args)) as T;
}
