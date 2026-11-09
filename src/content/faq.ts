/**
 * /faq/ copy, taken verbatim from the live page (WordPress template "template-faq_new").
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, description, robots,
 * canonical, OG and schema come from Yoast for this exact URL. Headings mirror
 * live: no <h1>; hero <h2> "Frequently Asked Questions"; sidebar <h4>
 * "CATEGORIES"; one <h4> per question (answers keep their own <h3>); closing
 * newsletter <h2>.
 *
 * The questions and answers are NOT kept here: they come from WordPress (the
 * rendered page for the categories, admin-ajax for search; see lib/wp/faqs.ts).
 */

export const PATH = "/faq/";

export const FAQ_HERO = {
  eyebrow: "Kimp FAQ",
  title: { lead: "Frequently Asked", highlight: "Questions" },
  intro: "Have questions about how we work and what you get? We’ve got all the answers you need.",
  marquee: ["FAQ", "Free Trial", "Billing", "KIMP360", "Requests"],
  strip: ["Free trial & billing", "Graphics & video", "KIMP360 platform", "IP & confidentiality"],
  mascot: { src: "/images/mascot/inner/faq.webp", width: 1448, height: 1086 },
} as const;

export const FAQ_BROWSER = {
  categoriesTitle: "CATEGORIES",
  searchPlaceholder: "Enter keywords to search",
  searchLabel: "Search",
  clear: "Back to categories",
  resultsFor: "Results for",
  noResults: "No questions match that search. Try another keyword, or browse the categories.",
  searchError: "Search couldn’t run right now. Please try again.",
  unavailable: "The FAQs couldn’t be loaded right now.",
} as const;
