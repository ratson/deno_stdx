import { createFetchTextProvider, ProviderOptions } from "./base.ts";

export const url = "https://icanhazip.com";

export const url_v6 = "https://ipv6.icanhazip.com";

export default (options: ProviderOptions = {}) =>
  createFetchTextProvider(options.v === 6 ? url_v6 : url)(options);
