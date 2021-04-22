/**
 * Check if a port is available
 */
export function isPortAvailable(options: Deno.ListenOptions): boolean {
  try {
    const listener = Deno.listen(options);
    listener.close();
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.AddrInUse) {
      return false;
    }
    throw error;
  }
}

/**
 * Get a free port
 */
export function getPort() {
  const listener = Deno.listen({ port: 0 });
  const { port } = (listener.addr as Deno.NetAddr);
  listener.close();
  return port;
}
