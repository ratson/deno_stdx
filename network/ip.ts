import ipProviders, { type Provider, type ProviderOptions } from "./ip/mod.ts";

export class IpNotFoundError extends Error {
  override readonly name = "IpNotFoundError";

  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? "Could not get the public IP address", options);
  }
}

interface Options extends ProviderOptions {
  providers?: Array<Provider | keyof typeof ipProviders>;
}

export async function getPublicIP(options?: Options): Promise<string> {
  const { providers = Object.values(ipProviders), ...opts } = options ?? {};
  let cause: Error | undefined;
  for (const k of providers) {
    const provider = typeof k === "string" ? ipProviders[k] : k;
    if (!provider) continue;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const ip = await provider({ signal: controller.signal, ...opts });
      return ip;
    } catch (err) {
      cause = err;
      continue;
    } finally {
      clearTimeout(timer);
    }
  }
  throw new IpNotFoundError(undefined, { cause });
}
