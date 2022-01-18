import { Path } from "../path/path.ts";

export const dataPath = Path.fromImportMeta(import.meta, "./testdata");

export * from "../deps_test.ts";
export { withEnv } from "../testing/mod.ts";
