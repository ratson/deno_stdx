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

const linux_xclip: Clipboard = {
  readText() {
    return output(["xclip", "-selection", "clipboard", "-o"]);
  },
  async writeText(text: string) {
    await run(["xclip", "-selection", "clipboard", "-i"], { pipeText: text });
  },
};

const linux_xsel: Clipboard = {
  readText() {
    return output(["xsel", "--clipboard", "--output"]);
  },
  async writeText(text: string) {
    await run(["xsel", "--clipboard", "--input"], { pipeText: text });
  },
};

let linux = {
  async readText() {
    for (const o of [linux_xclip, linux_xsel]) {
      try {
        const result = await o.readText();
        linux = o;
        return result;
      } catch {
        continue;
      }
    }
    throw new Error("cannot read clipboard");
  },
  async writeText(text: string) {
    for (const o of [linux_xclip, linux_xsel]) {
      try {
        const result = await o.writeText(text);
        linux = o;
        return result;
      } catch {
        continue;
      }
    }
    throw new Error("cannot write to clipboard");
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
