import { isIP } from "node:net";
import { assertRejects, assertStrictEquals, isCI } from "../deps_test.ts";
import { getPublicIP, IpNotFoundError } from "./ip.ts";

const assertIP = (a: string, b: string) =>
  isCI()
    ? assertStrictEquals(a.slice(0, 10), b.slice(0, 10))
    : assertStrictEquals(a, b);

Deno.test("getPublicIP", { sanitizeOps: false }, async (t) => {
  const publicIP = await getPublicIP({ v: 4 });

  await t.step("default", async () => {
    await getPublicIP({ v: 4 });
    assertStrictEquals(isIP(publicIP), 4);
  });

  await t.step("v = 4", async () => {
    const ip = await getPublicIP({ v: 4 });
    assertIP(ip, publicIP);
  });

  await t.step("v = 6", async () => {
    const ip = await getPublicIP({ v: 6 });
    assertIP(ip, publicIP);
  });

  await t.step("provider = ipify", async () => {
    const ip = await getPublicIP({ providers: ["ipify"] });
    assertIP(ip, publicIP);
  });

  await t.step("provider = icanhazip", async () => {
    const ip = await getPublicIP({ providers: ["icanhazip"] });
    assertIP(ip, publicIP);
  });

  await t.step("provider = icanhazip, v = 6", async () => {
    await assertRejects(async () => {
      const ip = await getPublicIP({ providers: ["icanhazip"], v: 6 });
      assertStrictEquals(ip, publicIP);
    }, IpNotFoundError);
  });

  await t.step("provider = ifconfig.co", async () => {
    const ip = await getPublicIP({ providers: ["ifconfig.co"] });
    assertIP(ip, publicIP);
  });

  await t.step("provider = ifconfig.io", async () => {
    const ip = await getPublicIP({ providers: ["ifconfig.io"] });
    assertIP(ip, publicIP);
  });

  await t.step("provider = httpbin", async () => {
    const ip = await getPublicIP({ providers: ["httpbin"] });
    assertIP(ip, publicIP);
  });
});

Deno.test("custom provider", { sanitizeOps: false }, async () => {
  const provider = () => Promise.resolve("testing")

  const ip = await getPublicIP({ providers: [provider] });
  assertStrictEquals(ip, "testing");
});
