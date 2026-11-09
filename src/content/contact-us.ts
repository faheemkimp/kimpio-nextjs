/**
 * /contact-us/ copy, taken verbatim from the live page (WordPress template
 * "template-contact"). All hardcoded in the PHP template; there is no form on
 * the live page: contact details, a "Chat Now" button (opens the Crisp chat on
 * live) and a Google Maps embed.
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for this exact URL. Headings mirror live: no <h1>; <h2> hero
 * "Contact Us"; <h3> "Contact Us" and "Address"; closing <h6> "GET STARTED" +
 * <h2> "Experience Seamless Design with Kimp" (COMPANY_FINAL in ./about-us).
 */

export const PATH = "/contact-us/";

export const CT_HERO = {
  eyebrow: "Get in touch",
  title: { lead: "", highlight: "Contact Us" },
  intro: "We would love to hear from you.",
  marquee: ["Contact Us", "hello@kimp.io", "Chat Now", "Markham ON"],
  strip: ["hello@kimp.io", "1-800-946-9778", "Markham, ON, Canada", "Chat Now"],
  /** Master flying pose holding an envelope (composited prop; see brand/mascot/README.md). */
  mascot: { src: "/images/mascot/inner/contact-us.webp", width: 1448, height: 1086 },
} as const;

export const CT_DETAILS = {
  contactTitle: "Contact Us",
  email: { label: "hello@kimp.io", href: "mailto:hello@kimp.io" },
  phone: { label: "1-800-946-9778", href: "tel:1-800-946-9778" },
  addressTitle: "Address",
  /* Live lines, each followed by a <br>. */
  address: ["7030 Woodbine Avenue", "Suite 500", "Markham, ON", "L3R 6G2", "Canada"],
  chat: "Chat Now",
  map: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.002090600014!2d-79.35296542361002!3d43.81431604199496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5e9f2043fe3%3A0x51a429f81da6a62!2sKimp!5e0!3m2!1sen!2sin!4v1730116351028!5m2!1sen!2sin",
    title: "Kimp on Google Maps",
  },
} as const;
