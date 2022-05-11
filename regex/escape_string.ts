// Ported from escape-string-regexp v5.0.0:
// https://github.com/sindresorhus/escape-string-regexp
// Copyright 2021 by Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com). All rights reserved. MIT license.

export function escapeString(text: string) {
  return text
    .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
    .replace(/-/g, "\\x2d");
}
