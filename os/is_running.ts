function checkCommand(pid: number) {
  switch (Deno.build.os) {
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

export function isRunning(pid: number) {
  return checkCommand(pid).outputSync().success;
}
