import { createFetchTextProvider, ProviderOptions } from "./base.ts";

export const url = "https://api64.ipify.org?format=text";

export const url_v4 = "https://api.ipify.org?format=text";

export default (options: ProviderOptions = {}) =>
  createFetchTextProvider(options.v === 4 ? url_v4 : url)(options);
