import { createFetchTextProvider } from "./base.ts";

export const url = "https://ifconfig.co/ip";

export default createFetchTextProvider(url);
