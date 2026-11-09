import "server-only";

import { wpGetHtml } from "./client";
import { parseFaqItems, type FaqItem } from "./faqs";

/**
 * /enterprise-clients/ FAQs. The answers are WordPress content that the live
 * Enterprise template prints (no API), so they are read the way faqs.ts reads
 * /faq/: from the WordPress-rendered page, the theme's `.faqitem` blocks inside
 * the "new-faq-section" (an older, commented-out FAQ block earlier in the page
 * is skipped). Answers go through the same whitelist parser (no raw HTML).
 */

/** The Enterprise template's answers use named entities that faqs.ts does not decode. */
const NAMED: Record<string, string> = {
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  trade: "™",
  reg: "®",
  copy: "©",
};

export async function getEnterpriseFaqs(): Promise<FaqItem[]> {
  const html = await wpGetHtml("/enterprise-clients/", ["enterprise-faqs"]);
  const start = html.indexOf("new-faq-section");
  if (start < 0) return [];
  const end = html.indexOf("</section>", start);
  const section = html
    .slice(start, end < 0 ? undefined : end)
    .replace(/<\?xml[^>]*\?>|<\?xml[^>]*>/g, "")
    .replace(/&(rsquo|lsquo|rdquo|ldquo|mdash|ndash|hellip|trade|reg|copy);/g, (_, n: string) => NAMED[n]);
  return parseFaqItems(section);
}
