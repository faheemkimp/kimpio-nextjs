/**
 * Which URLs the redesigned Next.js site serves.
 *
 * Only pages listed in REDESIGNED_PAGES are rendered by Next.js. Every other URL
 * (blog, case studies, account, checkout, forms, feeds, sitemaps, wp-*) is passed
 * to WordPress unchanged, so no existing URL can break.
 *
 * Going live with a redesigned page = adding its exact path here.
 * Rolling it back = removing it.
 */
export const REDESIGNED_PAGES = new Set<string>([
  "/",
  // Preview of the secondary header + illustrated hero (noindex).
  "/home-2/",
]);

/**
 * Query params that only WordPress understands (search, shortlinks, previews,
 * WooCommerce, AffiliateWP referral tracking). A request carrying any of these
 * goes to WordPress even if the path is redesigned, so the plugin keeps working.
 */
const WP_QUERY_PARAMS = ["s", "p", "page_id", "preview", "add-to-cart", "ref", "affwp_ref", "wc-ajax", "wc-api"];

export type Owner = "next" | "wordpress";

export function isNextInternal(pathname: string): boolean {
  return pathname.startsWith("/_next/") || pathname.startsWith("/api/");
}

export function resolveOwner(pathname: string, search: URLSearchParams): Owner {
  if (isNextInternal(pathname)) return "next";
  if (WP_QUERY_PARAMS.some((p) => search.has(p))) return "wordpress";
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return REDESIGNED_PAGES.has(path) ? "next" : "wordpress";
}
