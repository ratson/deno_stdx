// deno-lint-ignore-file no-explicit-any
import { getColorEnabled } from "https://deno.land/std@0.223.0/fmt/colors.ts";
import { ms } from "../fmt/ms.ts";
import { camelCase } from "../strings/camel_case.ts";

const canReadEnv = await Deno.permissions.query({ name: "env" }).then(
  (status) => status.state === "granted",
);

const { inspect } = Deno;

// We assume the terminal supports colors
const colors = [
  20,
  21,
  26,
  27,
  32,
  33,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  56,
  57,
  62,
  63,
  68,
  69,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  92,
  93,
  98,
  99,
  112,
  113,
  128,
  129,
  134,
  135,
  148,
  149,
  160,
  161,
  162,
  163,
  164,
  165,
  166,
  167,
  168,
  169,
  170,
  171,
  172,
  173,
  178,
  179,
  184,
  185,
  196,
  197,
  198,
  199,
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  209,
  214,
  215,
  220,
  221,
];

/**
 * Selects a color for a debug namespace
 */
function selectColor(namespace: string): number {
  let hash = 0;

  for (let i = 0; i < namespace.length; i++) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return colors[Math.abs(hash) % colors.length];
}

function getInspectOpts(): Deno.InspectOptions {
  const currentEnv = canReadEnv ? Deno.env.toObject() : {};
  const inspectOpts: Deno.InspectOptions = Object.keys(currentEnv)
    .filter((key) => /^debug_/i.test(key))
    .reduce((obj: { [key: string]: number | boolean | null }, key) => {
      const prop = camelCase(key.slice(6));

      const envVar: string = currentEnv[key];
      let val: boolean | number | null;
      if (/^(yes|on|true|enabled)$/i.test(envVar)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(envVar)) {
        val = false;
      } else if (envVar === "null") {
        val = null;
      } else {
        val = Number(envVar);
      }

      obj[prop] = val;
      return obj;
    }, {});
  return inspectOpts;
}

/**
 * Coerce `val`.
 */
function coerce(val: any): any {
  if (val instanceof Error) {
    return val.stack || val.message;
  }
  return val;
}

/**
 * Convert regexp to namespace
 */
function regexpToNamespace(regexp: RegExp): string {
  return regexp
    .toString()
    .substring(2, regexp.toString().length - 2)
    .replace(/\.\*\?$/, "*");
}

const inspectOpts = getInspectOpts();
const formatRegExp = /%[sdjoO%]/g;

function format(...args: any[]) {
  if (typeof args[0] !== "string") {
    const objects = [];
    for (let i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i], inspectOpts));
    }
    return objects.join(" ");
  }

  let i = 1;
  const f = args[0];
  const len = args.length;
  let str = String(f).replace(formatRegExp, function (x) {
    if (x === "%%") return "%";
    if (i >= len) return x;
    switch (x) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return String(Number(args[i++]));
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return "[Circular]";
        }
      case "%o":
      case "%O":
        return inspect(args[i++], inspectOpts);
      default:
        return x;
    }
  });
  for (let x = args[i]; i < len; x = args[++i]) {
    if (x == null || typeof x !== "object") {
      str += " " + x;
    } else {
      str += " " + inspect(x);
    }
  }
  return str;
}

const DEBUG = {
  debug: "",
};

interface DebugInstance {
  (log: string | Error, ...args: any[]): void;
  namespace: string;
  enabled: boolean;
  color: number;
  destroy: () => boolean;
  extend: (namespace: string, delimiter?: string) => DebugInstance;
  log?: (...args: any[]) => any;
}

interface DebugFactory {
  (namespace: string): DebugInstance;
  enable: (namespaces: any) => void;
  disable: (namespace?: "*") => string;
  enabled: (namespace: string) => boolean;
  names: RegExp[];
  skips: RegExp[];
  formatters: Formatters;
  log: (...args: any[]) => any;
}

interface Formatters {
  [key: string]: (value: any) => string;
}

/**
 * Active `debug` instances.
 */
let instances: DebugInstance[] = [];

/**
 * The currently active debug mode names, and names to skip.
 */
let names: RegExp[] = [];
let skips: RegExp[] = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */
const formatters: Formatters = {};

/**
 * Create a debugger with the given `namespace`.
 */
function createDebug(namespace: string): DebugInstance {
  let prevTime: number;

  const debug: DebugInstance = function (log: string | Error, ...args: any[]) {
    // Skip if debugger is disabled
    if (!debug.enabled) {
      return;
    }

    const self = debug;

    log = coerce(log);

    if (typeof log !== "string") {
      // Anything else let's inspect with %O
      args.unshift(log);
      log = "%O";
    }

    // Set `diff` timestamp
    const currTime = Number(Date.now());
    // Difference in miliseconds
    const diff = currTime - (prevTime || currTime);
    prevTime = currTime;

    // Apply all custom formatters to our arguments
    const customFormattedArgs = applyFormatters.call(self, log, ...args);
    const { namespace, color } = self;

    // Format the string before logging
    const formattedArgs = formatArgs(
      { namespace, color, diff },
      customFormattedArgs,
    );

    // Use a custom logger if defined
    // If not, we use the default logger
    const logFn = self.log || debugFactory.log;

    // Finally, log
    logFn.apply(self, formattedArgs);
    return;
  };

  debug.namespace = namespace;
  debug.color = selectColor(namespace);
  debug.enabled = enabled(namespace);
  debug.destroy = destroy;
  debug.extend = extend;

  instances.push(debug);

  return debug;
}

function destroy(this: DebugInstance) {
  if (instances.includes(this)) {
    this.enabled = false;
    instances = instances.filter((instance) => instance !== this);
    return true;
  }
  return false;
}

/**
 * const server = debug('server');
 * const serverHttp = server.extend('http') // server:http
 * const serverHttpReq = serverHttp.extend('req', '-') // server:http-req
 */
function extend(
  this: DebugInstance,
  subNamespace: string,
  delimiter = ":",
) {
  const newNamespace = `${this.namespace}${delimiter}${subNamespace}`;
  const newDebug = createDebug(newNamespace);
  // Pass down the custom logger
  newDebug.log = this.log;
  return newDebug;
}

function applyFormatters(this: DebugInstance, fmt: string, ...args: any[]) {
  let index = 0;
  const newFmt = fmt.replace(/%([a-zA-Z%])/g, (match, format) => {
    // If we encounter an escaped % then don't increase the array index
    if (match === "%%") {
      return match;
    }

    const formatter = formatters[format];

    if (typeof formatter === "function") {
      const value = args[index];
      // Remove the argument we used in the custom formatter
      args = [...args.slice(0, index), ...args.slice(index + 1)];
      return formatter.call(this, value);
    }

    index++;
    return match;
  });

  // Return the update fmt string and updated args
  return [newFmt, ...args];
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 */
export function enabled(namespace: string): boolean {
  if (namespace[namespace.length - 1] === "*") {
    return true;
  }

  for (const skip of skips) {
    if (skip.test(namespace)) {
      return false;
    }
  }
  for (const name of names) {
    if (name.test(namespace)) {
      return true;
    }
  }

  return false;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 */
export function enable(namespaces: string) {
  updateNamespacesEnv(namespaces);

  // Resets enabled and disable namespaces
  names = [];
  skips = [];
  // Splits on comma
  // Loops through the passed namespaces
  // And groups them in enabled and disabled lists
  (typeof namespaces === "string" ? namespaces : "")
    .split(/[\s,]+/)
    // Ignore empty strings
    .filter(Boolean)
    .map((namespace) => namespace.replace(/\*/g, ".*?"))
    .forEach((ns) => {
      // If a namespace starts with `-`, we should disable that namespace
      if (ns[0] === "-") {
        skips.push(new RegExp(`^${ns.slice(1)}$`));
      } else {
        names.push(new RegExp(`^${ns}$`));
      }
    });

  instances.forEach((instance) => {
    instance.enabled = enabled(instance.namespace);
  });
}

interface FormatArgsOptions {
  namespace: string;
  color: number;
  diff: number;
}

function formatArgs(
  { namespace, color, diff }: FormatArgsOptions,
  args: any[],
): any[] {
  const colorCode = "\u001B[3" + (color < 8 ? color : "8;5;" + color);
  const noColor = !getColorEnabled();
  const prefix = noColor
    ? `  ${namespace} `
    : `  ${colorCode};1m${namespace} \u001B[0m`;
  // Add a prefix on every line
  args[0] = args[0]
    .split("\n")
    .map((line: string) => `${prefix}${line}`)
    .join("\n");

  const lastArg = noColor
    ? `+${ms(diff)}`
    : `${colorCode}m+${ms(diff)}${"\u001B[0m"}`;

  return [...args, lastArg];
}

/**
 * Disable debug output.
 */
export function disable(_?: "*"): string {
  const namespaces = [
    ...names.map(regexpToNamespace),
    ...skips.map(regexpToNamespace).map((namespace) => `-${namespace}`),
  ].join(",");
  enable("");
  return namespaces;
}

/**
 * Save `namespaces` to env.
 */
function updateNamespacesEnv(namespaces: string): void {
  if (namespaces) {
    DEBUG.debug = namespaces;
  } else {
    DEBUG.debug = "";
  }
}

// Default logger
function log(...args: any[]): void {
  const result = format(...args);
  console.log(result);
}

const debugFactory: DebugFactory = Object.assign(createDebug, {
  enable,
  disable,
  enabled,
  names,
  skips,
  formatters,
  log,
});

// Enable namespaces passed from env
if (canReadEnv) {
  const setting = Deno.env.get("DEBUG");
  if (setting) {
    DEBUG.debug = setting;
  }
}

enable(DEBUG.debug);

export default debugFactory;
