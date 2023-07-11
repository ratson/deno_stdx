import { isIP } from "node:net";
import { assertRejects, assertStrictEquals, isCI } from "../deps_test.ts";
import { getPublicIP, IpNotFoundError, IpProvider } from "./ip.ts";
import fetchIP_HttpbinOrg from "./ip/httpbin.ts";
import fetchIP_IfconfigCo from "./ip/ifconfig.ts";

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
    const ip = await fetchIP_IfconfigCo();
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

  await t.step("provider = ifconfig", async () => {
    const ip = await getPublicIP({ providers: ["ifconfig"] });
    assertIP(ip, publicIP);
  });

  await t.step("provider = httpbin", async () => {
    const ip = await fetchIP_HttpbinOrg();
    assertIP(ip, publicIP);
  });
});

Deno.test("custom provider", { sanitizeOps: false }, async () => {
  class C extends IpProvider {
    ip() {
      return "testing";
    }
  }

  const ip = await getPublicIP({ providers: [new C()] });
  assertStrictEquals(ip, "testing");

  const registrySize = IpProvider.registry.size;
  assertStrictEquals(registrySize, 4);

  class D extends IpProvider {
  }
  new D();
  assertStrictEquals(IpProvider.registry.size, registrySize);

  class E extends IpProvider {
    static id = "E";
  }
  new E();
  assertStrictEquals(IpProvider.registry.size, registrySize + 1);
});
