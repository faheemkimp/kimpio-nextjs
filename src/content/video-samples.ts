/**
 * /our-work/video-samples/ copy, taken verbatim from the live page
 * (WordPress template "template-video-portfolio").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, robots, canonical, OG and
 * schema come from Yoast for this exact URL. Headings mirror live: no <h1>;
 * the hero title is an <h2> ("Our Client Work") and the category list is
 * headed by an <h4> ("Our Work").
 *
 * The videos are NOT kept here: they are read from the WordPress JSON files
 * the live page uses (see lib/wp/portfolio.ts).
 */

export const PATH = "/our-work/video-samples/";

export const VS_HERO = {
  eyebrow: "Our Work · Video samples",
  /* Rendered "Our Client" + line break + "Work": same text as the live <h2>. */
  title: { lead: "Our Client", highlight: "Work" },
  intro:
    "We design for a wide range of clients. Check out these samples of our work to see what we can do for you!",
  marquee: ["Our Client Work", "Reels", "Promo Videos", "Logo Animations", "Motion GIFs"],
  strip: ["Reels", "Promo videos", "Logo animations", "Social media ads", "Video editing"],
  mascot: { src: "/images/mascot/fly-video-camera.webp", width: 1448, height: 1086 },
} as const;

/** Live category list, in order. `slug` is the WordPress JSON file name. */
export const VS_CATEGORIES = [
  { slug: "animated-video-ads", label: "Animated Video Ads" },
  { slug: "instructional-videos", label: "Instructional Videos" },
  { slug: "logo-animations", label: "Logo Animations" },
  { slug: "motion-gifs", label: "Motion GIFs" },
  { slug: "promo-videos", label: "Promo Videos" },
  { slug: "reels", label: "Reels" },
  { slug: "service-product-videos", label: "Service & Product Videos" },
  { slug: "simple-animated-designs", label: "Simple Animated Designs" },
  { slug: "simple-gifs", label: "Simple GIFs" },
  { slug: "social-media-ads", label: "Social Media Ads" },
  { slug: "social-media-videos", label: "Social Media Videos" },
  { slug: "talking-head-videos", label: "Talking Head Videos" },
  { slug: "video-editing", label: "Video Editing" },
] as const;

export const VS_GALLERY = {
  /** Live <h4> above the category list. */
  listTitle: "Our Work",
  /** The set live shows before a category is clicked. */
  initial: "reels",
  play: "Play video",
  unavailable: "Video samples couldn’t be loaded right now.",
} as const;
