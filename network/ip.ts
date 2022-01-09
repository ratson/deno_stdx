export class IpNotFoundError extends Error {
  constructor(_message?: string, init?: ErrorInit) {
    super("Could not get the public IP address", init);
    this.name = "IpNotFoundError";
  }
}

type Options = {
  v?: 4 | 6;
  providers?: Array<keyof typeof providers>;
};

async function icanhazip(options: Options) {
  const s = options.v ? `ipv${options.v}.` : "";
  const res = await fetch(`https://${s}icanhazip.com`);
  const ip = await res.text();
  return ip.trimEnd();
}

async function ifconfig(_options: Options) {
  const res = await fetch(`https://ifconfig.co/ip`);
  const ip = await res.text();
  return ip.trimEnd();
}

async function ipify(options: Options) {
  const s = options.v === 4 ? "" : 64;
  const res = await fetch(`https://api${s}.ipify.org?format=text`);
  return res.text();
}

const providers = {
  icanhazip,
  ifconfig,
  ipify,
} as const;

export const defaultProviders = ["ipify", "icanhazip", "ifconfig"] as const;

export async function getPublicIP(options?: Options): Promise<string> {
  const opts = { providers: defaultProviders, ...options } as const;
  for (const k of opts.providers) {
    try {
      return await providers[k](opts as Options);
    } catch {
      continue;
    }
  }
  throw new IpNotFoundError();
}
