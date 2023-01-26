import { osType } from "https://deno.land/std@0.174.0/_util/os.ts";
import { output, pipeText } from "../subprocess/mod.ts";

interface Clipboard {
  readText(): Promise<string>;
  writeText(text: string): Promise<void>;
}

const no_backend: Clipboard = {
  readText() {
    throw new Error("cannot read clipboard");
  },
  writeText(_text: string) {
    throw new Error("cannot write to clipboard");
  },
};

const darwin: Clipboard = {
  readText() {
    return output(["pbpaste"]);
  },
  async writeText(text: string) {
    await pipeText(["pbcopy"], text);
  },
};

const linux_xclip: Clipboard = {
  readText() {
    return output(["xclip", "-selection", "clipboard", "-o"]);
  },
  async writeText(text: string) {
    await pipeText(["xclip", "-selection", "clipboard", "-i"], text);
  },
};

const linux_xsel: Clipboard = {
  readText() {
    return output(["xsel", "--clipboard", "--output"]);
  },
  async writeText(text: string) {
    await pipeText(["xsel", "--clipboard", "--input"], text);
  },
};

const windows: Clipboard = {
  readText() {
    return output(["PowerShell", "-Command", "Get-Clipboard"]);
  },
  async writeText(text: string) {
    await pipeText(["PowerShell", "-Command", "Set-Clipboard"], text);
  },
};

class GenericClipboard implements Clipboard {
  possibleBackends: Array<Clipboard> = [];
  backend?: Clipboard;

  constructor() {
    switch (osType) {
      case "darwin":
        this.backend = darwin;
        break;
      case "linux":
        this.possibleBackends = [linux_xclip, linux_xsel];
        break;
      case "windows":
        this.backend = windows;
        break;
      default:
        this.backend = no_backend;
    }
  }

  async readText() {
    if (this.backend) return this.backend.readText();

    for (const o of this.possibleBackends) {
      try {
        const result = await o.readText();
        this.backend = o;
        return result;
      } catch {
        continue;
      }
    }
    this.backend = no_backend;
    return no_backend.readText();
  }

  async writeText(text: string) {
    if (this.backend) return this.backend.writeText(text);

    for (const o of this.possibleBackends) {
      try {
        const result = await o.writeText(text);
        this.backend = o;
        return result;
      } catch {
        continue;
      }
    }
    this.backend = no_backend;
    return no_backend.writeText(text);
  }
}

export const clipboard = new GenericClipboard();
