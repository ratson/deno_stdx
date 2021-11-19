import { assertEquals } from "../deps_test.ts";
import { getPort, isPortAvailable } from "./port.ts";

Deno.test("getPort()",  () => {
  const port = getPort();
  assertEquals(isPortAvailable({ port }), true);

  const listener = Deno.listen({ port });
  assertEquals(isPortAvailable({ port }), false);
  listener.close()
});
