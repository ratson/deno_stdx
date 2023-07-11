import type { Provider } from "./base.ts";

export const url = "https://httpbin.org/ip";

export default (async (options) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });
  const data: { origin: string } = await res.json();
  return data.origin;
}) as Provider<Parameters<typeof fetch>[1]>;
