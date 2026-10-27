import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: without this, opening the dev server through the LAN IP blocks HMR and hydration, so menus never open.
  allowedDevOrigins: ["192.168.1.9"],
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
