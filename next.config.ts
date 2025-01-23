import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true
  },
  trailingSlash: true
};

export default nextConfig;
