import { paraglide } from "@inlang/paraglide-next/plugin";
import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config options here
};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

// Apply Paraglide configuration
const paraglideConfig = paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./paraglide"
  }
});

// Merge configurations
const mergedConfig = {
  ...nextConfig,
  ...paraglideConfig,
};

// Apply PWA configuration
export default withPWAConfig(mergedConfig);