import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
    experimental: {
    allowedDevOrigins: ["192.168.29.8"],
     // allowedDevOrigins: ["*"],
  },
  // Disable Turbopack entirely
  turbo: false,
  experimental: {
    turbo: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  outputFileTracingRoot: path.resolve(__dirname, "../../"),

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

 };

module.exports = nextConfig;
export default nextConfig;

