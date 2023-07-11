export type ProviderOptions = {
    v?: 4 | 6;
    signal?: AbortSignal;
  };

// deno-lint-ignore no-explicit-any
export type Provider<T = any> = (
  options?: T & ProviderOptions,
) => Promise<string>;
