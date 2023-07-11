import type { Provider } from "./base.ts";

export const url = "https://api64.ipify.org?format=text";

export const url_v4 = "https://api.ipify.org?format=text";

export default (async function (options = {}) {
  const { v, ...opts } = options;
  const res = await fetch(v === 4 ? url_v4 : url, opts);
  const ip = await res.text();
  return ip.trimEnd();
}) as Provider<Parameters<typeof fetch>[1]>;
