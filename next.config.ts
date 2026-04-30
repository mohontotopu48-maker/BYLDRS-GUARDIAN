import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    "space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
