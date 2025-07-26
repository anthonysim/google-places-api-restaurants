import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["maps.googleapis.com"],
  },
};

export default nextConfig;
