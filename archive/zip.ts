import { isWindows } from "https://deno.land/std@0.195.0/_util/os.ts";
import { run } from "../subprocess/mod.ts";

export async function unzip(
  zipPath: string,
  destinationPath: string,
): Promise<void> {
  const cmd = isWindows
    ? [
      "PowerShell",
      "Expand-Archive",
      "-Path",
      zipPath,
      "-DestinationPath",
      destinationPath,
    ]
    : ["unzip", zipPath, "-d", destinationPath];

  await run(cmd, { check: true, stdout: "null", stderr: "null" });
}
