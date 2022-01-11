/**
 * Returns the default root directory to use for user-specific cached data.
 * Users should create their own application-specific subdirectory within this one and use that.
 * 
 * On Unix systems, it returns $XDG_CACHE_HOME as specified by
 * https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
 * if non-empty, else $HOME/.cache.
 * On Darwin, it returns $HOME/Library/Caches.
 * On Windows, it returns %LocalAppData%.
 * 
 * If the location cannot be determined (for example, $HOME is not defined), then it will throw an error.
 */
export function userCacheDir() {
  const { env } = Deno;
  let dir: string | undefined;

  switch (Deno.build.os) {
    case "darwin":
      dir = env.get("HOME");
      if (!dir) {
        throw new Error("$HOME is not defined");
      }
      dir += "/Library/Caches";
      break;
    case "windows":
      dir = env.get("LocalAppData");
      if (!dir) {
        throw new Error("%LocalAppData% is not defined");
      }
      break;
    default: // Unix
      dir = env.get("XDG_CACHE_HOME");
      if (!dir) {
        dir = env.get("HOME");
        if (!dir) {
          throw new Error("neither $XDG_CACHE_HOME nor $HOME are defined");
        }
        dir += "/.cache";
      }
  }

  return dir;
}

/**
 * Returns the default root directory to use for user-specific configuration data.
 * Users should create their own application-specific subdirectory within this one and use that.
 * 
 * On Unix systems, it returns $XDG_CONFIG_HOME as specified by
 * https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
 * if non-empty, else $HOME/.config.
 * On Darwin, it returns $HOME/Library/Application Support.
 * On Windows, it returns %AppData%.
 * 
 * If the location cannot be determined (for example, $HOME is not defined), then it will throw an error.
 */
export function userConfigDir() {
  const { env } = Deno;
  let dir: string | undefined;

  switch (Deno.build.os) {
    case "darwin":
      dir = env.get("HOME");
      if (!dir) {
        throw new Error("$HOME is not defined");
      }
      dir += "/Library/Application Support";
      break;
    case "windows":
      dir = env.get("AppData");
      if (!dir) {
        throw new Error("%AppData% is not defined");
      }
      break;
    default: // Unix
      dir = env.get("XDG_CONFIG_HOME");
      if (!dir) {
        dir = env.get("HOME");
        if (!dir) {
          throw new Error("neither $XDG_CONFIG_HOME nor $HOME are defined");
        }
        dir += "/.config";
      }
  }

  return dir;
}

/**
 * Returns the current user's home directory.
 *
 * On Unix, including macOS, it returns the $HOME environment variable.
 * On Windows, it returns %USERPROFILE%.}
 *
 * If none of the above are defined, returns the OS default path.
 */
export function userHomeDir() {
  const { env } = Deno;
  const home = env.get("HOME");
  const user = env.get("LOGNAME") || env.get("USER") || env.get("LNAME") ||
    env.get("USERNAME");

  switch (Deno.build.os) {
    case "darwin":
      return home || (user ? `/Users/${user}` : null);
    case "linux":
      return home || (user ? `/home/${user}` : null);
    case "windows":
      return env.get("USERPROFILE") || home || null;
    default:
      return home || null;
  }
}
