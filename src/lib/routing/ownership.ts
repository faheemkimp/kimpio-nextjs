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
  // Kimp Graphics (same URL as live; SEO from Yoast).
  "/graphic-design-services/",
  // Preview of the secondary header + illustrated hero (noindex).
  "/home-2/",
]);

/**
 * Built and waiting for review: rendered by Next.js in `next dev` only, so they
 * can be checked on localhost. Production keeps sending these URLs to WordPress
 * until the path is moved into REDESIGNED_PAGES.
 */
const PREVIEW_PAGES = new Set<string>([
  // Kimp Video (same URL as live; SEO from Yoast).
  "/video-design-services/",
  // Kimp Pricing (same URL as live; SEO from Yoast; plan boxes still loaded from WordPress).
  "/pricing/",
  // KIMP360 (same URL as live; SEO from Yoast; latest updates fetched from WordPress).
  "/kimp360-platform/",
  // KIMP360 Platform Updates (same URL as live; SEO from Yoast; every update post fetched from WordPress).
  "/kimp360-product-updates/",
  // Salary Cost Calculator (same URL as live; SEO from Yoast; salary + exchange-rate data from WordPress /json/).
  "/salary-cost-calculator/",
  // Our Work / Graphics samples (same URL as live; SEO from Yoast; gallery from WordPress /json/graphics/).
  "/our-work/",
  // Our Work / Video samples (same URL as live; SEO from Yoast; videos from WordPress /json/videos/).
  "/our-work/video-samples/",
  // Us vs. Them (same URL as live; SEO from Yoast).
  "/compare-service/",
  // Testimonials (same URL as live; SEO from Yoast; testimonials from WordPress).
  "/reviews/",
  // Kimp For: Agencies (same URL as live; SEO from Yoast).
  "/white-label-graphic-design/",
  // Kimp For: Entrepreneurs, Fitness/Health Brands, Professional Services (same URLs as live; SEO from Yoast).
  "/entrepreneurs/",
  "/fitness-health-brands/",
  "/professional-services/",
  // FAQ (same URL as live; SEO from Yoast; questions + answers from WordPress, search via admin-ajax).
  "/faq/",
  // Remaining marketing pages (same URLs as live; SEO from Yoast). Built 2026-11, dev preview until approved.
  "/about-us/",
  "/contact-us/",
  "/affiliates/",
  "/careers/",
  "/careers/graphic-designer/",
  "/careers/project-manager/",
  "/careers/content-writer/",
  "/careers/motion-graphics-artist/",
  "/careers/illustrator/",
  "/small-business/",
  "/startups/",
  "/marketing/",
  "/enterprise-clients/",
  "/yspace/",
  "/canva-designers/",
  "/design-categories/",
  "/brand-assets/",
  "/privacy-policy/",
  "/terms-of-services/",
  "/cookie-policy-eu/",
  "/llm-information-guidance/",
  // Case studies: the list + the 12 live posts (same URLs; SEO from Yoast; copy from the live hardcoded templates).
  "/case-study/",
  "/case-study/bdyc/",
  "/case-study/big-results/",
  "/case-study/garry-robinson/",
  "/case-study/how-igloo-met-all-of-its-design-requirements-with-a-single-subscription/",
  "/case-study/how-nomos-found-an-experienced-and-reliable-design-solution-with-kimp/",
  "/case-study/nava-wilson/",
  "/case-study/paragon-well-being/",
  "/case-study/rzone-fitness/",
  "/case-study/search-engine-wizards/",
  "/case-study/smile-fred/",
  "/case-study/social-vizion-media/",
  "/case-study/wgan/",
]);

const isDev = process.env.NODE_ENV === "development";

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
  if (REDESIGNED_PAGES.has(path)) return "next";
  return isDev && PREVIEW_PAGES.has(path) ? "next" : "wordpress";
}
