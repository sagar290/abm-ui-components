import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Interactive admin console is client-state heavy; keep classic SSR/CSR behavior.
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
