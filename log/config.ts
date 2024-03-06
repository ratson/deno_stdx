import {
  ConsoleHandler,
  HandlerOptions,
} from "https://deno.land/std@0.218.2/log/handlers.ts";
import type { LevelName } from "https://deno.land/std@0.218.2/log/levels.ts";
import type { LogConfig } from "https://deno.land/std@0.218.2/log/mod.ts";

export function basicConfig(
  { level = "INFO", formatter, ...config }:
    & HandlerOptions
    & LogConfig
    & {
      level?: LevelName;
    } = {},
): LogConfig {
  return {
    ...config,
    handlers: {
      console: new ConsoleHandler(level, { formatter }),
      ...config.handlers,
    },
    loggers: {
      ...config.loggers,
      default: {
        level,
        handlers: ["console"],
        ...config.loggers?.default,
      },
    },
  };
}
