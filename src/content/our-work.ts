/**
 * /our-work/ (Kimp "Graphics Works") copy, taken verbatim from the live page
 * (WordPress template "template-our-portfolio-new-design").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, robots, canonical, OG and
 * schema come from Yoast for this exact URL. Headings mirror live: the hero
 * title is the page's <h1> ("Our Client Work") and the closing panel title
 * is an <h2> ("We cut costs and time.").
 *
 * The gallery images are NOT kept here: they are read from the WordPress JSON
 * files the live page uses (see lib/wp/portfolio.ts).
 */

export const PATH = "/our-work/";

export const OW_HERO = {
  eyebrow: "Our Work · Graphics samples",
  /* Rendered "Our Client" + line break + "Work": same text as the live <h1>. */
  title: { lead: "Our Client", highlight: "Work" },
  intro:
    "We design for a wide range of clients. Check out these samples of our work to see what we can do for you!",
  marquee: ["Our Client Work", "Branding", "Social Media", "Print", "Web & App"],
  strip: ["Branding", "Social media", "Print", "Packaging", "Web & app"],
  mascot: { src: "/images/mascot/inner/our-work.webp", width: 1448, height: 1086 },
} as const;

/* The filter tabs (labels, order, counts) come from WordPress: /json/graphics/index.json. */

export const OW_GALLERY = {
  /** Live alt text on every sample. */
  alt: "Web Design",
  unavailable: "Samples couldn’t be loaded right now.",
} as const;

/**
 * Curved portfolio slider (new design; not on live): every WordPress sample,
 * one category at a time. It adds no headings, so the page keeps the live
 * heading structure (<h1> hero, <h2> closing panel).
 */
export const OW_SHOWCASE = {
  cta: { label: "Get Started", href: "/register-now/" },
} as const;

/** Live closing panel ("We cut costs and time." <h2>). Live buttons link to "#"; here they go where their labels say. */
export const OW_CTA = {
  eyebrow: "Get started",
  title: "We cut costs and time.",
  body: "Achieve stunning designs without the wait or high costs—Kimp.io",
  primary: { label: "Get Started", href: "/register-now/" },
  secondary: { label: "Schedule Demo", href: "/book-a-call/" },
} as const;
