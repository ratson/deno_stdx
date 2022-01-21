// Copyright the dotenv authors. MIT License.
// Ported mostly from https://github.com/motdotla/dotenv

const NEWLINE = "\n";
const RE_INI_KEY_VAL =
  /^\s*([\w.-]+)\s*=\s*("[^"]*"|'[^']*'|[^#]*)?(\s*|\s*#.*)?$/;
const RE_NEWLINES = /\\n/g;
const NEWLINES_MATCH = /\r\n|\n|\r/;

export function parse(content: string): Record<string, string> {
  const ret: Record<string, string> = {};

  for (const line of content.split(NEWLINES_MATCH)) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL);
    if (keyValueArr === null) continue;

    const [, key, v = ""] = keyValueArr;
    let val = v;
    const valFirst = val[0];
    const valLast = val.slice(-1);
    const isDoubleQuoted = valFirst === '"' && valLast === '"';
    const isSingleQuoted = valFirst === "'" && valLast === "'";

    if (isDoubleQuoted || isSingleQuoted) {
      val = val.slice(1, -1);

      // if double quoted, expand newlines
      if (isDoubleQuoted) {
        val = val.replace(RE_NEWLINES, NEWLINE);
      }
    } else {
      // remove surrounding whitespace
      val = val.trim();
    }

    ret[key] = val;
  }

  return ret;
}
