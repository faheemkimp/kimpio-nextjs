/**
 * Legal pages: /privacy-policy/, /terms-of-services/, /cookie-policy-eu/,
 * /llm-information-guidance/ (WordPress template "template-common.php").
 *
 * The live template prints only the page's editor content, so the document
 * itself is NOT kept here: it is fetched from WordPress at render (REST
 * /wp/v2/pages?slug=… content.rendered, see lib/wp/page-content.ts) and
 * rendered from a whitelisted node tree (components/legal/rich-content.tsx).
 *
 * SEO parity: title, description, robots, canonical, OG and schema come from
 * Yoast for each exact URL. Headings mirror live because they come from the
 * same content: the editor's <h1> is the hero title (live has an <h1> on all
 * four pages); /cookie-policy-eu/ adds the Complianz statement's <h2> sections,
 * <h3> per service, <h4> usage/sharing/purpose and <h5> Name/Expiration/Function.
 * The other three use bold paragraph labels (not headings) for their sections.
 *
 * What IS kept here is the hero dressing (eyebrow, marquee, pills, floating
 * chips, see components/legal/hero-scenes.tsx): short facts taken from each
 * document, plus an intro used only when the document has no plain opening
 * sentence to move into the hero.
 */

export type LegalSlug = "privacy-policy" | "terms-of-services" | "cookie-policy-eu" | "llm-information-guidance";

export type LegalPageCopy = {
  slug: LegalSlug;
  path: `/${LegalSlug}/`;
  eyebrow: string;
  /** Used only if WordPress is unreachable (same text as the live <h1>). */
  fallbackTitle: string;
  /** Hero intro when the document's opening paragraph can't be moved into the hero (it starts with a link or a label). */
  intro: string;
  marquee: readonly string[];
  strip: readonly string[];
  mascot: { src: string; width: number; height: number };
};

const mascot = (slug: LegalSlug) => ({ src: `/images/mascot/inner/${slug}.webp`, width: 1448, height: 1086 });

export const LEGAL_PAGES: Record<LegalSlug, LegalPageCopy> = {
  "privacy-policy": {
    slug: "privacy-policy",
    path: "/privacy-policy/",
    eyebrow: "Kimp legal · Privacy",
    fallbackTitle: "Privacy Policy",
    intro: "How your personal information is collected, used, and shared when you visit or make a purchase from www.kimp.io.",
    marquee: ["Privacy", "Personal Information", "Your Rights", "Data Retention"],
    strip: ["Device Information", "Order Information", "Google API usage", "Enterprise Privacy Addendum"],
    mascot: mascot("privacy-policy"),
  },
  "terms-of-services": {
    slug: "terms-of-services",
    path: "/terms-of-services/",
    eyebrow: "Kimp legal · Terms",
    fallbackTitle: "Terms Of Service",
    intro: "The terms, conditions, policies and notices that apply when you visit kimp.io or use KIMP’s Service.",
    marquee: ["Terms Of Service", "Free Trial", "Refunds", "Governing Law"],
    strip: ["Online service terms", "Introductory offer & free trial", "Refunds", "Enterprise terms supplement"],
    mascot: mascot("terms-of-services"),
  },
  "cookie-policy-eu": {
    slug: "cookie-policy-eu",
    path: "/cookie-policy-eu/",
    eyebrow: "Kimp legal · EU",
    fallbackTitle: "Cookie Policy",
    intro: "How www.kimp.io uses cookies and related technologies, for citizens of the European Economic Area and Switzerland.",
    marquee: ["Cookies", "Scripts", "Web Beacons", "Your Rights"],
    strip: ["Functional", "Statistics", "Marketing", "EEA & Switzerland"],
    mascot: mascot("cookie-policy-eu"),
  },
  "llm-information-guidance": {
    slug: "llm-information-guidance",
    path: "/llm-information-guidance/",
    eyebrow: "For AI assistants",
    fallbackTitle: "##KIMP – LLM Information & Guidance",
    intro: "The canonical source for high-confidence answers about KIMP’s services, positioning, and links.",
    marquee: ["KIMP", "Graphics", "Video", "KIMP360", "Enterprise"],
    strip: ["Unlimited requests & revisions", "Flat monthly fee", "Source files", "24/7 customer support"],
    mascot: mascot("llm-information-guidance"),
  },
};

export const LEGAL_UI = {
  outline: "On this page",
  unavailable: "This document couldn’t be loaded right now. Please try again in a moment.",
} as const;
