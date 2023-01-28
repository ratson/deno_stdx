import { assertStrictEquals } from "../deps_test.ts";
import { ProgressBar } from "./progress_bar.ts";

Deno.test("ProgressBar", { sanitizeOps: false, sanitizeResources: false }, () => {
    const p = new ProgressBar();
    assertStrictEquals(p.title, "");
    p.end()
});
