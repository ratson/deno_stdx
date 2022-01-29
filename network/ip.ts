import type { PromiseOr } from "../typing/promise.ts";

export class IpNotFoundError extends Error {
  constructor(message?: string, init?: ErrorInit) {
    super(message ?? "Could not get the public IP address", init);
    this.name = "IpNotFoundError";
  }
}

type ProviderOptions = {
  v?: 4 | 6;
};

export abstract class IpProvider {
  static registry = new Map<string, IpProvider>();

  static id = "";

  get id(): string {
    // @ts-expect-error dynamic-prop
    return this.constructor.id;
  }

  constructor() {
    if (!this.id) throw new Error("id is requried");

    const { registry } = IpProvider;
    if (registry.has(this.id)) throw new Error(`id "${this.id}" is registered`);
    registry.set(this.id, this);
  }

  ip(_options: ProviderOptions): PromiseOr<string> {
    throw new Error("Not implemented");
  }
}

class IcanhazipProvider extends IpProvider {
  static id = "icanhazip" as const;

  async ip(options: ProviderOptions) {
    const s = options.v ? `ipv${options.v}.` : "";
    const res = await fetch(`https://${s}icanhazip.com`);
    const ip = await res.text();
    return ip.trimEnd();
  }
}

class IfconfigProvider extends IpProvider {
  static id = "ifconfig" as const;

  async ip() {
    const res = await fetch(`https://ifconfig.co/ip`);
    const ip = await res.text();
    return ip.trimEnd();
  }
}

class IpifyProvider extends IpProvider {
  static id = "ipify" as const;

  async ip(options: ProviderOptions) {
    const s = options.v === 4 ? "" : 64;
    const res = await fetch(`https://api${s}.ipify.org?format=text`);
    return res.text();
  }
}

const providers = [IpifyProvider, IcanhazipProvider, IfconfigProvider] as const;

export const defaultProviders = providers.map((C) => new C());

interface Options extends ProviderOptions {
  providers?: Array<IpProvider | typeof providers[number]["id"]>;
}

export async function getPublicIP(options?: Options): Promise<string> {
  const opts = { providers: defaultProviders, ...options } as const;
  for (const k of opts.providers) {
    const provider = typeof k === "string" ? IpProvider.registry.get(k) : k;
    if (!provider) continue;
    try {
      return await provider.ip(opts);
    } catch {
      continue;
    }
  }
  throw new IpNotFoundError();
}
