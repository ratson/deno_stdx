export const url = "https://ifconfig.co/ip";

export default async function (options?: Parameters<typeof fetch>[1]) {
  const res = await fetch(url, options);
  const ip = await res.text();
  return ip.trimEnd();
}
