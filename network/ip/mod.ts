import httpbin from "./httpbin.ts";
import icanhazip from "./icanhazip.ts";
import ifconfig_co from "./ifconfig_co.ts";
import ifconfig_io from "./ifconfig_io.ts";
import ipify from "./ipify.ts";

export * from "./base.ts";

export default {
  httpbin,
  icanhazip,
  "ifconfig.co": ifconfig_co,
  "ifconfig.io": ifconfig_io,
  ipify,
} as const;
