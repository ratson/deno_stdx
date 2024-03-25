import { osType } from "https://deno.land/std@0.220.1/path/_os.ts";
import { output, pipeText } from "./subprocess.ts";

export interface Clipboard {
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
  backend?: Clipboard;

  async readText() {
    if (this.backend) return this.backend.readText();

    for (const o of this.#possibleBackends) {
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

    for (const o of this.#possibleBackends) {
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

  get #possibleBackends() {
    switch (osType) {
      case "darwin":
        return [darwin];
      case "linux":
        return [linux_xclip, linux_xsel];
      case "windows":
        return [windows];
      default:
        return [no_backend];
    }
  }
}

export const clipboard = new GenericClipboard();
