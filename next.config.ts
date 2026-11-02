import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      {
        source: "/projects/:slug",
        destination: "/en/projects/:slug",
        permanent: true,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: (process.env.IMAGE_HOSTS ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter((hostname) => /^[a-z0-9.-]+$/.test(hostname))
      .map((hostname) => ({
        protocol: "https" as const,
        hostname,
        pathname: "/**",
      })),
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
