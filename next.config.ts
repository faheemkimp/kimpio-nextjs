import type { NextConfig } from "next";

const WP_ORIGIN = process.env.WP_ORIGIN ?? "https://www.kimp.io";

if (process.env.NODE_ENV === "production" && !process.env.WP_ORIGIN) {
  // Once www.kimp.io points at this app, proxying to it would loop forever.
  console.warn(
    "\n[kimp] WP_ORIGIN is not set. It defaults to https://www.kimp.io, which only works BEFORE the DNS cutover.\n" +
      "       Set WP_ORIGIN to the WordPress origin host (e.g. https://cms.kimp.io) for production.\n",
  );
}

const wpHost = new URL(WP_ORIGIN).hostname;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // WordPress URLs all end in "/". Keep them byte-identical so no ranking signal moves.
  trailingSlash: true,
  // The slash redirect for Next-owned pages happens in src/proxy.ts (as a 301, like
  // WordPress) so WordPress-owned URLs (/wp-json, admin-ajax POSTs) are never touched.
  skipTrailingSlashRedirect: true,

  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.kimp.io", pathname: "/wp-content/**" },
      { protocol: "https", hostname: wpHost, pathname: "/wp-content/**" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // 90 for the hero mascot renders (fine fur/visor detail); 75 stays the default.
    qualities: [75, 90],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
