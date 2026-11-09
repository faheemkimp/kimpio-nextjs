/**
 * /kimp360-product-updates/ copy, taken verbatim from the live page
 * (WordPress template "template-kimp360blogs.php").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, description, robots,
 * canonical, OG and schema come from Yoast for this exact URL. The live page
 * has no <h1>: the hero title is its only heading (<h2>). Post titles on the
 * cards are plain text, not headings, as on live.
 *
 * The update cards are every published WordPress post in the "Kimp 360 Product"
 * category (id 2217), fetched at render time, newest first, so new updates
 * appear without a deploy, as on live. The filter labels are the live
 * template's; each maps to a WordPress tag.
 */

export const PATH = "/kimp360-product-updates/";

export const PU_HERO = {
  eyebrow: "KIMP360 · Product updates",
  /* Rendered "New Features & Updates" + line break + "Added Monthly!": same text as the live <h2>. */
  title: { lead: "New Features & Updates", highlight: "Added Monthly!" },
  intro:
    "When we built and launched KIMP360 we were just getting started. We’re constantly optimizing the platform and adding new features regularly too.",
  marquee: ["KIMP360", "New Features", "Updates", "Pro Tips", "Shipped Monthly"],
  strip: ["New features", "Platform updates", "Integrations", "Pro tips", "Performance"],
  mascot: { src: "/images/mascot/fly-kimp360-laptop.webp", width: 1448, height: 1086 },
} as const;

export const PU_LIST = {
  /** WordPress category "Kimp 360 Product". */
  categoryId: 2217,
  filterLabel: "Filter By",
  /** Live radio options: "All", then one per WordPress tag. */
  allLabel: "All",
  filters: [
    { tagId: 2244, label: "Update" },
    { tagId: 2245, label: "Pro Tip" },
  ],
  more: "Learn More",
  /** Shown only if WordPress cannot be reached (no cached copy). */
  unavailable: { text: "Updates couldn’t be loaded right now.", cta: { label: "Visit the KIMP360 platform page", href: "/kimp360-platform/" } },
} as const;
