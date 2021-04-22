import { serve } from "https://deno.land/std@0.94.0/http/server.ts";
import { assertEquals } from "../deps_test.ts";
import { getPort, isPortAvailable } from "./port.ts";

Deno.test("getPort()", () => {
  const port = getPort();
  assertEquals(isPortAvailable({ port }), true);

  const server = serve({ port });
  assertEquals(isPortAvailable({ port }), false);
  server.close();
});
