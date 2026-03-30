import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static export for production — disabled in dev so API routes work
  ...(!isDev && {
    output: "export",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
