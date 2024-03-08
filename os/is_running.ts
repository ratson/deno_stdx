import { osType } from "https://deno.land/std@0.219.1/path/_os.ts";

function checkCommand(pid: number) {
  switch (osType) {
    case "windows":
      return new Deno.Command("powershell.exe", {
        args: ["Get-Process", "-pid", `${pid}`],
      });
    default: {
      return new Deno.Command("kill", {
        args: ["-0", `${pid}`],
      });
    }
  }
}

export async function isRunning(pid: number) {
  const result = await checkCommand(pid).output();
  return result.success;
}

export function isRunningSync(pid: number) {
  return checkCommand(pid).outputSync().success;
}
