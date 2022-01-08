import { output, run } from "../subprocess/mod.ts";

interface Clipboard {
  readText(): Promise<string>;
  writeText(text: string): Promise<void>;
}

const darwin: Clipboard = {
  readText() {
    return output(["pbpaste"]);
  },
  async writeText(text: string) {
    await run(["pbcopy"], { pipeText: text });
  },
};

const linux: Clipboard = {
  readText() {
    return output(["xclip", "-selection", "clipboard", "-o"]);
  },
  async writeText(text: string) {
    await run(["xclip", "-selection", "clipboard", "-i"], { pipeText: text });
  },
};

const windows: Clipboard = {
  readText() {
    return output(["PowerShell", "-Command", "Get-Clipboard"]);
  },
  async writeText(text: string) {
    await run(["PowerShell", "-Command", "Set-Clipboard"], { pipeText: text });
  },
};

const clipboard: Clipboard = (() => {
  switch (Deno.build.os) {
    case "darwin":
      return darwin;
    case "linux":
      return linux;
    case "windows":
    default:
      return windows;
  }
})();

export const {
  readText,
  writeText,
} = clipboard;
