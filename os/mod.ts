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
