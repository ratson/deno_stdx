export const url = "https://httpbin.org/ip";

export default async function (options?: Parameters<typeof fetch>[1]) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });
  const data: { origin: string } = await res.json();
  return data.origin;
}
