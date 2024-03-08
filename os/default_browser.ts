import { osType } from "https://deno.land/std@0.219.1/path/_os.ts";
import { output } from "./subprocess.ts";

async function linux() {
  const s = await output([
    "xdg-mime",
    "query",
    "default",
    "x-scheme-handler/http",
  ]);
  const id = s.trim();
  const name = id.replace(/.desktop$/, "").replaceAll("-", " ");

  return { id, name };
}

export default () => {
  switch (osType) {
    case "linux":
      return linux();
    case "darwin":
    case "windows":
    default:
      throw new Error("OS is not supported");
  }
};
