const encoder = new TextEncoder();
const decoder = new TextDecoder();

type Stdio = "inherit" | "piped" | "null" | number;

interface RunOptions {
  cwd?: string;
  env?: {
    [key: string]: string;
  };
  stdout?: Stdio;
  stderr?: Stdio;
  stdin?: Stdio;
}

export async function run(cmd: string[], opts?: RunOptions) {
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

export async function output(
  cmd: string[],
  opts?: RunOptions & { stdout?: "piped" },
) {
  const r = await run(cmd, { stderr: "null", ...opts, stdout: "piped" });
  return r.stdout!;
}

export async function stderrOutput(
  cmd: string[],
  opts?: RunOptions & { stderr?: "piped" },
) {
  const r = await run(cmd, { stdout: "null", ...opts, stderr: "piped" });
  return r.stderr!;
}

type PipeTextOptions = {
  cwd?: string;
  env?: {
    [key: string]: string;
  };
};

export async function pipeText(
  cmd: string[],
  text: string,
  opts?: PipeTextOptions,
) {
  const p = Deno.run({ ...opts, cmd, stdout: "piped", stdin: "piped" });
  await p.stdin.write(encoder.encode(text));
  p.stdin.close();

  const output = await p.output();
  p.close();
  return decoder.decode(output);
}
