import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Link preview clients may use unrecognized user agents and only read the head.
  htmlLimitedBots: /.*/,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
          {
            key: "Content-Security-Policy-Report-Only",
            value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'",
          },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
        ],
      },
      ...["/admin/:path*", "/api/:path*"].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
    ];
  },
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
