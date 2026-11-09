/**
 * /reviews/ (Testimonials) copy, taken verbatim from the live page
 * (WordPress template "template-testimonital").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, description, robots,
 * canonical, OG and schema come from Yoast for this exact URL. Headings mirror
 * live: no <h1>; hero <h2> "Testimonials"; section <h2> "Check out what our
 * clients say about us!" (line break after "clients"); rating figures <h6>;
 * one <h3> per testimonial (the client's name).
 *
 * The testimonials are NOT kept here: they come from WordPress (the rendered
 * page for the first batch, admin-ajax for "View More"; see lib/wp/testimonials.ts).
 */

export const PATH = "/reviews/";

export const RV_HERO = {
  eyebrow: "Kimp reviews",
  /* The live <h2> is the single word "Testimonials"; shown on its own in brand orange. */
  title: { lead: "", highlight: "Testimonials" },
  intro:
    "Want to start designing better, and scaling faster? Then you need a dedicated design team. But don’t just take our word for it! Read a Kimp review, or two, to find out what our clients are saying about Kimp.",
  marquee: ["Testimonials", "Kimp Reviews", "Trustpilot", "Google", "Clutch"],
  strip: ["230+ Trustpilot reviews", "150+ Google reviews", "4.9 average rating", "Video testimonials"],
  /** Master flying pose holding a 5-star trophy (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/review.webp", width: 1448, height: 1086 },
} as const;

export const RV_WALL = {
  eyebrow: "Rated by real clients",
  titleLines: ["Check out what our clients", "say about us!"],
  viewMore: "View More",
  play: "Play video testimonial from",
  unavailable: "Testimonials couldn’t be loaded right now.",
} as const;
