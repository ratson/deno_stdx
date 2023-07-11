import httpbin from "./httpbin.ts";
import icanhazip from "./icanhazip.ts";
import ifconfig from "./ifconfig.ts";
import ipify from "./ipify.ts";

export * from "./base.ts";

export default {
  httpbin,
  icanhazip,
  ifconfig,
  ipify,
} as const;
