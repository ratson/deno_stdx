import { chunk } from "https://deno.land/std@0.224.0/collections/chunk.ts";
import ipProviders, { type Provider, type ProviderOptions } from "./ip/mod.ts";

export class IpNotFoundError extends Error {
  override readonly name = "IpNotFoundError";

  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? "Could not get the public IP address", options);
  }
}

interface Options extends ProviderOptions {
  providers?: Array<Provider | keyof typeof ipProviders>;
  batchSize?: number;
}

export async function getPublicIP(options: Options = {}): Promise<string> {
  const { providers = Object.values(ipProviders), batchSize = 2, ...opts } =
    options;
  let cause: Error | undefined;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2_000);
  try {
    for (const c of chunk(providers, batchSize)) {
      const ip = await Promise.any(c.map((k) => {
        const provider = typeof k === "string" ? ipProviders[k] : k;
        if (!provider) return null;
        return provider({ signal: controller.signal, ...opts });
      }));
      if (ip) return ip;
    }
  } catch (err) {
    cause = err;
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
  throw new IpNotFoundError(undefined, { cause });
}
