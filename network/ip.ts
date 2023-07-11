import type { PromiseOr } from "../typing/promise.ts";
import fetchIP_HttpbinOrg from "./ip/httpbin.ts";
import fetchIP_IfconfigCo from "./ip/ifconfig.ts";

export class IpNotFoundError extends Error {
  override readonly name = "IpNotFoundError";

  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? "Could not get the public IP address", options);
  }
}

type ProviderOptions = {
  v?: 4 | 6;
  signal?: AbortSignal;
};

export abstract class IpProvider {
  static registry = new Map<string, IpProvider>();

  static id = "";

  get id(): string {
    // @ts-expect-error dynamic-prop
    return this.constructor.id;
  }

  constructor() {
    if (!this.id) return;

    const { registry } = IpProvider;
    if (registry.has(this.id)) throw new Error(`id "${this.id}" is registered`);
    registry.set(this.id, this);
  }

  ip(_options: ProviderOptions): PromiseOr<string> {
    throw new Error("Not implemented");
  }
}

class HttpbinProvider extends IpProvider {
  static id = "httpbin" as const;

  ip(options: ProviderOptions) {
    return fetchIP_HttpbinOrg(options);
  }
}

class IcanhazipProvider extends IpProvider {
  static id = "icanhazip" as const;

  async ip(options: ProviderOptions) {
    const s = options.v ? `ipv${options.v}.` : "";
    const res = await fetch(`https://${s}icanhazip.com`, {
      signal: options.signal,
    });
    const ip = await res.text();
    return ip.trimEnd();
  }
}

class IfconfigProvider extends IpProvider {
  static id = "ifconfig" as const;

  ip(options: ProviderOptions) {
    return fetchIP_IfconfigCo({
      signal: options.signal,
    });
  }
}

class IpifyProvider extends IpProvider {
  static id = "ipify" as const;

  async ip(options: ProviderOptions) {
    const s = options.v === 4 ? "" : 64;
    const res = await fetch(`https://api${s}.ipify.org?format=text`, {
      signal: options.signal,
    });
    return await res.text();
  }
}

const providers = [
  IpifyProvider,
  IcanhazipProvider,
  IfconfigProvider,
  HttpbinProvider,
] as const;

export const defaultProviders = providers.map((C) => new C());

interface Options extends ProviderOptions {
  providers?: Array<IpProvider | typeof providers[number]["id"]>;
}

export async function getPublicIP(options?: Options): Promise<string> {
  const opts = { providers: defaultProviders, ...options } as const;
  let cause: Error | undefined;
  for (const k of opts.providers) {
    const provider = typeof k === "string" ? IpProvider.registry.get(k) : k;
    if (!provider) continue;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const ip = await provider.ip({ signal: controller.signal, ...opts });
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
