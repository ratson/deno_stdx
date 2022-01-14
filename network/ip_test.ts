import { isIP } from "https://deno.land/std@0.121.0/node/net.ts";
import { assertRejects, assertStrictEquals, isCI } from "../deps_test.ts";
import { getPublicIP, IpNotFoundError } from "./ip.ts";

let publicIP: string;

const assertIP = (a: string, b: string) =>
  isCI()
    ? assertStrictEquals(a.slice(0, 10), b.slice(0, 10))
    : assertStrictEquals(a, b);

Deno.test("default", async () => {
  const ip = await getPublicIP();
  assertStrictEquals(isIP(ip), 4);
  publicIP = ip;
});

Deno.test("v = 4", async () => {
  const ip = await getPublicIP({ v: 4 });
  assertIP(ip, publicIP);
});

Deno.test("v = 6", async () => {
  const ip = await getPublicIP({ v: 6 });
  assertIP(ip, publicIP);
});

Deno.test("provider = ipify", async () => {
  const ip = await getPublicIP({ providers: ["ipify"] });
  assertIP(ip, publicIP);
});

Deno.test("provider = icanhazip", async () => {
  const ip = await getPublicIP({ providers: ["icanhazip"] });
  assertIP(ip, publicIP);
});

Deno.test("provider = icanhazip, v = 6", async () => {
  await assertRejects(async () => {
    const ip = await getPublicIP({ providers: ["icanhazip"], v: 6 });
    assertStrictEquals(ip, publicIP);
  }, IpNotFoundError);
});

Deno.test("provider = ifconfig", async () => {
  const ip = await getPublicIP({ providers: ["ifconfig"] });
  assertIP(ip, publicIP);
});
