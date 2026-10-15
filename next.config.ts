import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Interactive admin console is client-state heavy; keep classic SSR/CSR behavior.
  // Static export only when building for optional GitHub Pages (no extra server).
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: "/ui-components",
        assetPrefix: "/ui-components/",
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
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
