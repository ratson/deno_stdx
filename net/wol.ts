import { concat } from "https://deno.land/std@0.219.1/bytes/concat.ts";

export function createMagicPacket(macAddress: string): Uint8Array {
  const octets = macAddress.match(/[0-9a-fA-F]{2}/g);
  if (!octets) throw new Error("Invalid mac address");

  const macArr = Uint8Array.from(octets.map((octet) => parseInt(octet, 16)));

  let packet = new Uint8Array(0x06).fill(0xff);
  for (let i = 0; i < 16; i++) {
    packet = concat([packet, macArr]);
  }
  return packet;
}

export interface WakeOnLANOptions {
  ip?: string;
  port?: number;
}

export async function wakeOnLAN(
  macAddress: string,
  { ip = "255.255.255.255", port = 9 }: WakeOnLANOptions = {},
) {
  const conn = Deno.listenDatagram({
    port: 0,
    hostname: "0.0.0.0",
    transport: "udp",
  });

  try {
    await conn.send(createMagicPacket(macAddress), {
      transport: "udp",
      hostname: ip,
      port,
    });
  } finally {
    conn.close();
  }
}
