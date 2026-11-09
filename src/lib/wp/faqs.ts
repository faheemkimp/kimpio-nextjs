import "server-only";

import { wpAjaxHtml, wpGetHtml } from "./client";

/**
 * /faq/ questions and answers. WordPress keeps them in a custom post type that
 * is not in the REST API, so they are read the way the live page shows them:
 * the categories and every answer from the WordPress-rendered /faq/ page, and
 * search from the same admin-ajax action (`searchfaqs`) the live search box calls.
 *
 * Answers are WordPress HTML. They are turned into a small tree of whitelisted
 * tags (no raw HTML is ever injected), see FaqNode.
 */

const TAGS = ["faqs"];

/** Tags kept from the WordPress answer HTML; anything else is unwrapped (its text kept). */
const KEEP = new Set(["p", "ul", "ol", "li", "a", "strong", "b", "em", "i", "br", "h3", "div"]);
const VOID = new Set(["br", "img", "hr", "input", "source", "wbr"]);
/** Containers whose whitespace-only text between children is layout noise. */
const BLOCK = new Set(["root", "ul", "ol", "div"]);

export type FaqTag = "p" | "ul" | "ol" | "li" | "a" | "strong" | "b" | "em" | "i" | "br" | "h3" | "div";
export type FaqNode = string | { t: FaqTag; href?: string; value?: number; c: FaqNode[] };
export type FaqItem = { q: string; a: FaqNode[] };
export type FaqCategory = { id: string; name: string; items: FaqItem[] };
export type FaqData = { categories: FaqCategory[]; active: string };

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/** Only web and mail links survive (no javascript: or data: URLs). */
function safeHref(raw: string | undefined): string | undefined {
  const href = raw ? decode(raw).trim() : "";
  return /^(https?:\/\/|mailto:|\/)/i.test(href) ? href : undefined;
}

/** WordPress answer HTML → whitelisted node tree. Tolerant of unclosed or stray tags. */
export function parseRichText(html: string): FaqNode[] {
  type Open = { tag: string; node: { c: FaqNode[] } };
  const root: Open = { tag: "root", node: { c: [] } };
  const stack: Open[] = [root];
  const top = () => stack[stack.length - 1];
  const clean = html.replace(/<!--[\s\S]*?-->|<(script|style|iframe|svg)\b[\s\S]*?<\/\1>/gi, "");

  for (const m of clean.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g)) {
    const [, close, rawTag, attrs, chunk] = m;
    if (chunk !== undefined) {
      const parent = top();
      const t = decode(chunk).replace(/\s+/g, " ");
      if (!t.trim() && BLOCK.has(parent.tag)) continue;
      const prev = parent.node.c[parent.node.c.length - 1];
      if (typeof prev === "string") parent.node.c[parent.node.c.length - 1] = (prev + t).replace(/ {2,}/g, " ");
      else parent.node.c.push(t);
      continue;
    }
    const tag = rawTag.toLowerCase();
    if (close) {
      if (!KEEP.has(tag)) continue;
      const at = stack.map((o) => o.tag).lastIndexOf(tag);
      if (at > 0) stack.length = at;
      continue;
    }
    if (!KEEP.has(tag)) continue;
    const node: Exclude<FaqNode, string> = { t: tag as FaqTag, c: [] };
    if (tag === "a") node.href = safeHref(attrs.match(/href="([^"]*)"/)?.[1]);
    if (tag === "li" || tag === "ol") {
      const v = Number(attrs.match(/(?:value|start)="(\d+)"/)?.[1]);
      if (v) node.value = v;
    }
    top().node.c.push(node);
    if (!VOID.has(tag) && !/\/\s*$/.test(attrs)) stack.push({ tag, node });
  }
  return trim(root.node.c);
}

/** Drop empty paragraphs/wrappers and edge whitespace left by the WordPress editor. */
function trim(nodes: FaqNode[]): FaqNode[] {
  const out: FaqNode[] = [];
  for (const n of nodes) {
    if (typeof n === "string") {
      if (n) out.push(n);
      continue;
    }
    const c = trim(n.c);
    if (n.t !== "br" && !c.some((x) => typeof x !== "string" || x.trim())) continue;
    out.push({ ...n, c });
  }
  return out;
}

/** Index just past the </div> closing the <div> whose content starts at `from`. */
function closeDiv(html: string, from: number): number {
  const re = /<(\/?)div\b[^>]*>/gi;
  re.lastIndex = from;
  let depth = 1;
  for (let m = re.exec(html); m; m = re.exec(html)) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return m.index;
  }
  return html.length;
}

/** The live theme's `.faqitem` blocks (page or admin-ajax fragment): <h4> question + `.content` answer. */
export function parseFaqItems(html: string): FaqItem[] {
  const out: FaqItem[] = [];
  for (const chunk of html.split(/<div class="faqitem">/).slice(1)) {
    const q = text(chunk.match(/<h4[^>]*>([\s\S]*?)<\/h4>/)?.[1] ?? "");
    const open = chunk.match(/<div class="content">/);
    if (!q || !open || open.index === undefined) continue;
    const start = open.index + open[0].length;
    const a = parseRichText(chunk.slice(start, closeDiv(chunk, start)));
    if (a.length) out.push({ q, a });
  }
  return out;
}

/** Every category and answer, in the live order, with the category the live page opens on. */
export async function getFaqs(): Promise<FaqData> {
  const html = await wpGetHtml("/faq/", TAGS);
  const names = [...html.matchAll(/<li itemval="(\d+)" class="cat-items([^"]*)"><a[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({
    id: m[1],
    name: text(m[3]),
    active: /\bactive\b/.test(m[2]),
  }));
  const panels = [...html.matchAll(/class="faq-category faq category-(\d+)/g)];
  // The search-results container closes the last category (searched for after it: the page CSS also names the class).
  const end = html.indexOf('class="faq-search-items', panels.at(-1)?.index ?? 0);
  const byId = new Map(
    panels.map((m, i) => [m[1], parseFaqItems(html.slice(m.index, panels[i + 1]?.index ?? (end < 0 ? undefined : end)))]),
  );
  const categories = names.map(({ id, name }) => ({ id, name, items: byId.get(id) ?? [] })).filter((c) => c.items.length);
  const active = names.find((n) => n.active && byId.get(n.id)?.length)?.id ?? categories[0]?.id ?? "";
  return { categories, active };
}

/** Live search: admin-ajax action=searchfaqs, same keyword the visitor typed. */
export async function searchFaqs(keyword: string): Promise<FaqItem[]> {
  return parseFaqItems(await wpAjaxHtml({ action: "searchfaqs", keyword }, TAGS));
}
