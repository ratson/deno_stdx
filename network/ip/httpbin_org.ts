export default async function (options: Parameters<typeof fetch>[1]) {
  const res = await fetch("https://httpbin.org/ip", options);
  const data: { origin: string } = await res.json();
  return data.origin;
}
