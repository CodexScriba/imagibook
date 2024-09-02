import { paraglide } from "@inlang/paraglide-next/plugin";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const nextConfigFunction = async (phase) => {
  let config = { ...nextConfig };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
    });
    config = withPWA(config);
  }

  return paraglide({
    paraglide: {
      project: "./project.inlang",
      outdir: "./paraglide"
    },
    ...config
  });
};

export default nextConfigFunction;