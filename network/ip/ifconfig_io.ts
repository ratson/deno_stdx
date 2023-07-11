import { createFetchTextProvider } from "./base.ts";

export const url = "https://ifconfig.io/ip";

export default createFetchTextProvider(url)
