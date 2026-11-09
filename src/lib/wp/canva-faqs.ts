import "server-only";

import { wpGetHtml } from "./client";
import { parseFaqItems, type FaqItem } from "./faqs";

/**
 * /canva-designers/ FAQs. WordPress keeps them as posts of a custom type that
 * is not in the REST API, so they are read the way the live page shows them:
 * the `.faq-section` of the WordPress-rendered page, parsed into whitelisted
 * nodes by the /faq/ parser (no raw HTML is injected).
 */
export async function getCanvaFaqs(): Promise<FaqItem[]> {
  const html = await wpGetHtml("/canva-designers/", ["faqs", "canva-faqs"]);
  const start = html.indexOf('class="sec-spacing faq-section"');
  if (start < 0) return [];
  const end = html.indexOf("footermain", start);
  return parseFaqItems(html.slice(start, end < 0 ? undefined : end));
}
