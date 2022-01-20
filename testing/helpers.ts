type DenoTest = typeof Deno.test;

/**
 * @deprecated use `Deno.test(name, options, fn)`
 */
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

/**
 * @deprecated use `Deno.test(name, { only: true }, fn)`
 */
export function only(f: DenoTest) {
  return config(f, { only: true });
}

/**
 * @deprecated use `Deno.test(name, { ignore: true }, fn)`
 */
export function ignore(f: DenoTest) {
  return config(f, { ignore: true });
}
