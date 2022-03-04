// Copyright the dotenv authors. MIT License.
// Ported mostly from https://github.com/motdotla/dotenv

const LINE =
  /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

/** @deprecated use `std/dotenv` instead */
export function parse(content: string): Record<string, string> {
  const ret: Record<string, string> = {};

  // Convert line breaks to same format
  const lines = content.replace(/\r\n?/mg, "\n");

  let match;
  while ((match = LINE.exec(lines)) !== null) {
    const [, key, v = ""] = match;
    const trimmed = v.trim();

    // Remove surrounding quotes
    let value = trimmed.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");

    // Expand newlines if double quoted
    if (trimmed[0] === '"') {
      value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
    }

    ret[key] = value;
  }

  return ret;
}
