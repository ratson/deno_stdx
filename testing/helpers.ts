type DenoTest = typeof Deno.test;

export function config(
  f: DenoTest,
  opts: Omit<Deno.TestDefinition, "name" | "fn">,
) {
  return (name: string | Deno.TestDefinition, fn?: Parameters<DenoTest>[1]) => {
    if (typeof name === "string") {
      return f({ ...opts, name, fn: fn! });
    }

    return f(name);
  };
}

export function only(f: DenoTest) {
  return config(f, { only: true });
}

export function ignore(f: DenoTest) {
  return config(f, { ignore: true });
}
