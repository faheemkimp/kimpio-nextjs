/**
 * /brand-assets/ (press kit) copy, taken verbatim from the live page
 * (WordPress template "template-presskit").
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live, in order: no <h1>; hero <h2>
 * "Brand Assets"; <h2> "Our Logo"; <h2> "Product Screenshots"; <h2>
 * "Describing Kimp" with <h4> "Boilerplate" and <h4> "Short description";
 * <h2> "KIMP's Creative Video Ads"; <h2> "Check out our Media Kit!".
 *
 * Download links keep their live URLs (theme files and the Media Kit PDF);
 * the on-page previews are local copies of the same images.
 */

export const PATH = "/brand-assets/";

const THEME = "https://www.kimp.io/wp-content/themes/kimpan_2025/assets/images";

export const BA_HERO = {
  eyebrow: "Press & media",
  /* Live <h2> is "Brand Assets"; "Assets" is the orange half. */
  title: { lead: "Brand", highlight: "Assets" },
  intro: "Writing about Kimp? Use the resources below!",
  primaryCta: { label: "Schedule Demo", href: "/book-a-call/" },
  marquee: ["Logo", "Screenshots", "Boilerplate", "Video ads", "Media kit"],
  strip: ["Our Logo", "Product Screenshots", "Describing Kimp", "Creative Video Ads", "Media Kit"],
  /** Master flying pose holding a press-kit folder (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/brand-assets.webp", width: 1448, height: 1086 },
} as const;

export const BA_LOGOS = {
  eyebrow: "Logo files",
  title: "Our Logo",
  /* Live: line break after "options,". */
  introLines: ["Here's the Kimp logo! Please use one of the green and white options,", "if it will suit your layout."],
  download: "Download",
  items: [
    { name: "Green", preview: "/images/company-2/Kimp_Logo_Green.png", href: `${THEME}/Kimp_Logo_Green.png`, tone: "light" },
    { name: "White", preview: "/images/company-2/Kimp_Logo_White.png", href: `${THEME}/Kimp_Logo_White.png`, tone: "dark" },
    { name: "Black", preview: "/images/company-2/Kimp_Logo_Black.png", href: `${THEME}/Kimp_Logo_Black.png`, tone: "light" },
  ],
} as const;

export const BA_SCREENSHOT = {
  eyebrow: "KIMP360",
  title: "Product Screenshots",
  intro: "Want to show what the Kimp user experience looks like? Use the image below.",
  image: { src: "/images/company-2/360screenshort.webp", width: 1919, height: 987 },
} as const;

export const BA_DESCRIBE = {
  eyebrow: "Copy you can use",
  title: "Describing Kimp",
  blocks: [
    {
      title: "Boilerplate",
      body: "Kimp.io, is a subscription-based graphic and video design service, delivered for a flat monthly fee. The service includes a wide range of print and digital creatives, as well as promotional videos, and access to a dedicated design team, on a flexible, month-to-month basis. Founded in Canada, Kimp serves clients around the world that range from startups, to SMBs, to nonprofits, to marketing agencies.",
    },
    { title: "Short description", body: "Kimp is a subscription-based graphic and video design service, delivered for a flat monthly fee, by a dedicated design team." },
  ],
  image: { src: "/images/company-2/kimp_with_lap.png", width: 627, height: 663 },
} as const;

export const BA_VIDEOS = {
  eyebrow: "Concept ads",
  title: "KIMP's Creative Video Ads",
  intro: "Explore the many benefits of KIMP through our creative concept ads.",
  more: "Load more videos",
  play: "Play KIMP creative video ad",
  /** YouTube links as live; covers are local copies of the theme's cover1n–cover11n. */
  items: [
    "mM95sf5sX1g", "WlKTR1KaFkk", "UJ1-e_l_BOg", "jtbM6YQv8n0", "DEqGp_4E4is", "mV0Xo8Av6KM",
    "CFS3X_uWXHw", "WI5RLtCt8M8", "eo6EiIjBVjI", "98JivCscEnI", "GwM5-O8rm2E",
  ].map((id, i) => ({ video: `https://youtu.be/${id}?feature=shared`, thumb: { src: `/images/company-2/cover${i + 1}n.webp`, width: 420, height: 263 } })),
} as const;

export const BA_MEDIA_KIT = {
  title: "Check out our Media Kit!",
  /* Live: line break after "working". */
  bodyLines: ["Find out why brands around the world love working", "with Kimp to get their design projects done."],
  /** Live href, unchanged (opens in a new tab). */
  cta: { label: "View Media Kit", href: "https://www.kimp.io/media-kit/Kimp Sales-Marketing-Updating Media Kit-AN-2023-Version2-Table-Contents-3-2023.pdf" },
} as const;
