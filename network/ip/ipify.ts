export const url = "https://api64.ipify.org?format=text";

export const url_v4 = "https://api.ipify.org?format=text";

export default async function (
  options: Parameters<typeof fetch>[1] & { v?: 4 | 6 } = {},
) {
  const { v, ...opts } = options;
  const res = await fetch(v === 4 ? url_v4 : url, opts);
  const ip = await res.text();
  return ip.trimEnd();
}
