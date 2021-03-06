export function homedir() {
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
