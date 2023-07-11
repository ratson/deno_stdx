import type { Provider } from "./base.ts";

export const url = "https://ifconfig.co/ip";

export default (async function (options) {
  const res = await fetch(url, options);
  const ip = await res.text();
  return ip.trimEnd();
}) as Provider<Parameters<typeof fetch>[1]>;
