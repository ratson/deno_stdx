export type ProviderOptions = {
    v?: 4 | 6;
    signal?: AbortSignal;
  };

// deno-lint-ignore no-explicit-any
export type Provider<T = any> = (
  options?: T & ProviderOptions,
) => Promise<string>;

export const createFetchTextProvider = (url: string): Provider<Parameters<typeof fetch>[1]> => async (options) => {
  const res = await fetch(url, options);
  const ip = await res.text();
  return ip.trimEnd();
}
