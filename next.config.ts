import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Enables HMR when the local dev server is opened from another device on this network.
  allowedDevOrigins: ["172.20.10.4"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
