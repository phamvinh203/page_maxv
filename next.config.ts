import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: without this, opening the dev server through the LAN IP blocks HMR and hydration, so menus never open.
  allowedDevOrigins: ["192.168.1.9"],
  cacheComponents: true,
  partialPrefetching: true,
  // Tin tức: nội dung mới lên website chậm nhất ~60 giây (NFR-05, ADR-004). stale ≥ 30 để còn nằm trong prerender.
  cacheLife: {
    news: { stale: 30, revalidate: 60, expire: 3600 },
  },
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
