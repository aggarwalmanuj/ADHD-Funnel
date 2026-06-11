import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.aimerge.live" },
    ],
  },
  // PostHog requires trailing slashes on its API endpoints (/e/, /flags/,
  // /decide/). Next.js's default trailing-slash redirect would break them,
  // so we opt out. No other route in this app depends on trailing-slash
  // behavior, so this is safe.
  skipTrailingSlashRedirect: true,
  // Reverse proxy for PostHog. Routes browser requests through our own
  // origin so ad blockers (uBlock, Brave Shields, etc.) can't drop them
  // based on the `us.i.posthog.com` hostname.
  //   /ingest/static/* → asset host  (must come first — more specific)
  //   /ingest/*        → ingestion host
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
