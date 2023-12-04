import { wakeOnLAN } from "../network/wol.ts";

const itemKey = "wolMAC";

const mac = prompt("MAC:", localStorage.getItem(itemKey) ?? "");
if (!mac) Deno.exit();

await wakeOnLAN(mac);

localStorage.setItem(itemKey, mac);
