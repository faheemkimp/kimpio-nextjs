/**
 * Site-wide constants. Values that differ per environment come from env vars
 * (see `.env.example`); everything else mirrors the live WordPress site so
 * URLs, metadata and tracking stay identical after the migration.
 */

/** Canonical public origin. Never changes: every canonical/OG URL is built on it. */
export const SITE_URL = "https://www.kimp.io";

export const SITE_NAME = "Kimp";

/**
 * WordPress origin that keeps serving the CMS, the account/checkout app and
 * any route not yet rebuilt in Next.js. In production this MUST be a different
 * host than SITE_URL (e.g. https://cms.kimp.io), otherwise proxied requests
 * would loop back into this app.
 */
export const WP_ORIGIN = (process.env.WP_ORIGIN ?? "https://www.kimp.io").replace(/\/$/, "");

/** WordPress REST API base used for content + Yoast metadata. */
export const WP_API = `${WP_ORIGIN}/wp-json`;

/** Google Tag Manager container loaded on the live site (via the GTM4WP plugin). */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5VVGLH4";

/** Search Console verification token hardcoded in the WP theme header. */
export const GOOGLE_SITE_VERIFICATION = "feAl1hPD-VEmi0OtnJHhF1LcW8y7ppSIGrSlKljjIIY";

export const CONTACT = {
  email: "hello@kimp.io",
  supportEmail: "info@kimp.io",
  phone: "1-800-946-9778",
  address: "7030 Woodbine Avenue, Suite 500, Markham ON, L3R 6G2, Canada",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/getkimp/",
  instagram: "https://www.instagram.com/getkimp/",
  linkedin: "https://www.linkedin.com/company/getkimp/",
} as const;

/** Build an absolute URL on the canonical origin, keeping WordPress' trailing slash. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const withSlash = path.endsWith("/") || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;
  return `${SITE_URL}${withSlash.startsWith("/") ? "" : "/"}${withSlash}`;
}
