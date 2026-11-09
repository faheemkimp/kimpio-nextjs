/**
 * /yspace/ (WordPress template "template-landing", title "yspace - Kimp").
 *
 * The page body is the WordPress editor content of page 16716 and is NOT kept
 * here: it is read from the REST API at render (lib/wp/yspace.ts), so edits in
 * WordPress still show up. Live heading order (kept as is): no <h1>;
 * <h2> "Spend Less Time On Your Marketing And Scale Your Business Faster" (the
 * hero title here), <h4> lead line, four <h5> features; <h2> "How It Works"
 * with three <h4> steps; <h2> "We Offer An Unlimited Design Service For
 * Businesses Of Every Size"; <h2> "Innovation York’s Pricing" with one <h3> per
 * testimonial (name + company), <h4> "World-class Support Team"; then the
 * landing footer's three <h4>s (In Collaboration With / Contact / Address).
 *
 * What lives here: the landing footer (hardcoded in template-landing.php) and
 * the decorative hero bits (eyebrow, marquee, pills).
 */

export const PATH = "/yspace/";

export const YS_HERO = {
  eyebrow: "Kimp × YSpace",
  marquee: ["Unlimited", "Experience", "Turnaround", "No hidden costs"],
  strip: ["Unlimited Service", "Extensive Experience", "Fast turnaround", "No Hidden Costs"],
  /** Master flying pose holding a sprouting plant (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/yspace.webp", width: 1448, height: 1086 },
} as const;

/** Live "footer-yspace" block of the landing template: three <h4>s, kept above the site footer. */
export const YS_PARTNER = {
  collab: {
    title: "In Collaboration With",
    href: "https://yspace.yorku.ca/",
    logo: { src: "/images/company-2/footer_yspace.png", alt: "footer_yspace", width: 240, height: 70 },
  },
  contact: {
    title: "Contact",
    links: [
      { label: "hello@kimp.io", href: "mailto:hello@kimp.io" },
      { label: "1-800-946-9778", href: "tel:1-800-946-9778" },
    ],
  },
  address: { title: "Address", lines: ["7030 Woodbine Avenue, Suite 500", "Markham ON, L3R 6G2", "Canada"] },
} as const;

export const YS_UI = {
  featuresEyebrow: "Why Kimp",
  stepsEyebrow: "Three steps",
  samplesEyebrow: "Our work",
  pricingEyebrow: "Pricing",
  supportEyebrow: "Support",
  partnerEyebrow: "Kimp × YSpace",
  unavailable: "This content couldn’t be loaded right now. Please try again in a moment.",
} as const;
