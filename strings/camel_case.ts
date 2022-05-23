const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(
  SEPARATORS.source + IDENTIFIER.source,
  "gu",
);
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");

const preserveCamelCase = (
  s: string,
  toLowerCase: (s: string) => string,
  toUpperCase: (s: string) => string,
) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let index = 0; index < s.length; index++) {
    const character = s[index];

    if (isLastCharLower && UPPERCASE.test(character)) {
      s = s.slice(0, index) + "-" + s.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (
      isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)
    ) {
      s = s.slice(0, index - 1) + "-" + s.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = toLowerCase(character) === character &&
        toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = toUpperCase(character) === character &&
        toLowerCase(character) !== character;
    }
  }

  return s;
};

const preserveConsecutiveUppercase = (
  input: string,
  toLowerCase: (s: string) => string,
) => {
  LEADING_CAPITAL.lastIndex = 0;

  return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
};

const postProcess = (input: string, toUpperCase: (s: string) => string) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;

  return input.replace(
    SEPARATORS_AND_IDENTIFIER,
    (_, identifier) => toUpperCase(identifier),
  )
    .replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
};

export interface CamelCaseOptions {
  locale?: string | string[] | false;
  keepConsecutiveUppercase?: boolean;
}

export function camelCase(
  input: string,
  { keepConsecutiveUppercase = false, locale }: CamelCaseOptions = {},
) {
  if (!(typeof input === "string")) {
    throw new TypeError("Expected the input to be `string`");
  }

  input = input.trim();

  if (input.length === 0) {
    return "";
  }

  const toLowerCase = locale === false
    ? (s: string) => s.toLowerCase()
    : (s: string) => s.toLocaleLowerCase(locale);

  const toUpperCase = locale === false
    ? (s: string) => s.toUpperCase()
    : (s: string) => s.toLocaleUpperCase(locale);

  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }
    return toLowerCase(input);
  }

  const hasUpperCase = input !== toLowerCase(input);

  if (hasUpperCase) {
    input = preserveCamelCase(input, toLowerCase, toUpperCase);
  }

  input = input.replace(LEADING_SEPARATORS, "");
  input = keepConsecutiveUppercase
    ? preserveConsecutiveUppercase(input, toLowerCase)
    : toLowerCase(input);

  return postProcess(input, toUpperCase);
}
