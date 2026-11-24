import type { NextConfig } from "next";

const repositoryBase = "/estudo-biblico";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repositoryBase,
  assetPrefix: repositoryBase,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: repositoryBase,
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
