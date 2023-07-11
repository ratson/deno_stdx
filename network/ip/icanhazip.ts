import type { Provider } from "./base.ts";

export const url = "https://icanhazip.com";

export const url_v6 = "https://ipv6.icanhazip.com";

export default (async function (options = {}) {
  const { v, ...opts } = options;
  const res = await fetch(v === 6 ? url_v6 : url, opts);
  const ip = await res.text();
  return ip.trimEnd();
}) as Provider<Parameters<typeof fetch>[1]>;
