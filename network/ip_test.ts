import { isIP } from "https://deno.land/std@0.120.0/node/net.ts";
import { assertRejects, assertStrictEquals } from "../deps_test.ts";
import { getPublicIP, IpNotFoundError } from "./ip.ts";

let publicIP: string;

Deno.test("default", async () => {
  const ip = await getPublicIP();
  assertStrictEquals(isIP(ip), 4);
  publicIP = ip;
});

Deno.test("v = 4", async () => {
  const ip = await getPublicIP({ v: 4 });
  assertStrictEquals(ip, publicIP);
});

Deno.test("v = 6", async () => {
  const ip = await getPublicIP({ v: 6 });
  assertStrictEquals(ip, publicIP);
});

Deno.test("provider = ipify", async () => {
  const ip = await getPublicIP({ providers: ["ipify"] });
  assertStrictEquals(ip, publicIP);
});

Deno.test("provider = icanhazip", async () => {
  const ip = await getPublicIP({ providers: ["icanhazip"] });
  assertStrictEquals(ip, publicIP);
});

Deno.test("provider = icanhazip, v = 6", async () => {
  await assertRejects(async () => {
    const ip = await getPublicIP({ providers: ["icanhazip"], v: 6 });
    assertStrictEquals(ip, publicIP);
  }, IpNotFoundError);
});

Deno.test("provider = ifconfig", async () => {
  const ip = await getPublicIP({ providers: ["ifconfig"] });
  assertStrictEquals(ip, publicIP);
});
