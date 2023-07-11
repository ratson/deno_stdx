export const url = "https://icanhazip.com";

export const url_v6 = "https://ipv6.icanhazip.com";

export default async function (
  options: Parameters<typeof fetch>[1] & { v?: 4 | 6 } = {},
) {
  const { v, ...opts } = options;
  const res = await fetch(v === 6 ? url_v6 : url, opts);
  const ip = await res.text();
  return ip.trimEnd();
}
