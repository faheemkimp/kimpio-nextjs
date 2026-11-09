import "server-only";

import { wpGet } from "./client";

/**
 * Editor content of a WordPress page (REST `content.rendered`), for pages whose
 * live template only prints that content (template-common.php: the legal pages).
 *
 * The HTML is never injected: it is parsed into a small tree of whitelisted
 * nodes (RichNode) and rendered by components/legal/rich-content.tsx. Anything
 * not on the whitelist is unwrapped (its text kept) or, for markup that only
 * works with WordPress plugin JS/CSS (Complianz consent toggles, its e-mail
 * decoy), dropped.
 */

export type RichTag =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "ul"
  | "ol"
  | "li"
  | "a"
  | "strong"
  | "em"
  | "br"
  | "table"
  | "thead"
  | "tbody"
  | "tr"
  | "th"
  | "td"
  | "details"
  | "summary"
  | "div";

/**
 * Role of a kept <div> or <p>, from the Complianz cookie-statement classes (the
 * only containers whose structure matters). Other divs are unwrapped.
 */
export type RichKind =
  | "service-desc"
  | "sharing"
  | "purposes"
  | "purpose"
  | "row-head"
  | "row"
  | "cell-head"
  | "cell"
  | "subtitle";

export type RichElement = { t: RichTag; href?: string; start?: number; kind?: RichKind; id?: string; c: RichNode[] };
export type RichNode = string | RichElement;

/** A jump target of the document: an <h2>, or a bold paragraph label used as a section title. */
export type OutlineItem = { id: string; label: string };

export type LegalDocument = {
  /** Text of the first <h1> (live renders it from the editor content), split out for the hero. */
  title: string;
  /** Lead sentence moved into the hero (removed from the body), when the document opens with a plain one. */
  lead: string | null;
  body: RichNode[];
  outline: OutlineItem[];
  /** REST `modified` (WordPress local time). */
  modified: string;
};

const ALIAS: Record<string, RichTag> = { b: "strong", i: "em" };
const KEEP = new Set<string>([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "strong",
  "em",
  "br",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "details",
  "summary",
]);
const VOID = new Set(["br", "img", "hr", "input", "source", "wbr", "col"]);
/** Start tags that close an open <p>, as an HTML parser does (WordPress wraps whole <section>s in a <p>). */
const CLOSES_P = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "table",
  "details",
  "summary",
  "div",
  "section",
  "figure",
  "blockquote",
]);
/** Containers whose whitespace-only text between children is layout noise. */
const BLOCK = new Set(["root", "ul", "ol", "table", "thead", "tbody", "tr", "details", "summary", "div"]);

const DIV_KIND: Record<string, RichKind> = {
  "cmplz-service-description": "service-desc",
  "cmplz-sharing-data": "sharing",
  "cookies-per-purpose": "purposes",
  purpose: "purpose",
  "name-header": "row-head",
  "retention-header": "cell-head",
  "function-header": "cell-head",
  name: "row",
  retention: "cell",
  function: "cell",
};

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** Only web, mail, phone and same-site links survive (no javascript: or data: URLs). */
function safeHref(raw: string | undefined): string | undefined {
  const href = raw ? decode(raw).trim() : "";
  return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : undefined;
}

const classes = (attrs: string) => (attrs.match(/class="([^"]*)"/)?.[1] ?? "").split(/\s+/).filter(Boolean);

/** WordPress page HTML → whitelisted node tree. Tolerant of unclosed, stray or misnested tags. */
export function parseRichContent(html: string): RichNode[] {
  type Open = { tag: string; node: { c: RichNode[] } };
  const root: Open = { tag: "root", node: { c: [] } };
  const stack: Open[] = [root];
  const top = () => stack[stack.length - 1];
  const clean = html
    .replace(/<\?xml[^>]*>|<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|svg|noscript|label|button|form)\b[\s\S]*?<\/\1>/gi, "")
    // Complianz e-mail obfuscation: a decoy domain its CSS hides (live shows "info@kimp.io").
    .replace(/<span class="cmplz-fmail-domain">[^<]*<\/span>/g, "");
  /** Unwrapped divs, so their </div> does not close a kept one. */
  const divs: boolean[] = [];

  for (const m of clean.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g)) {
    const [, close, rawTag, attrs, chunk] = m;
    if (chunk !== undefined) {
      const parent = top();
      const t = decode(chunk).replace(/[ \t\r\n]+/g, " ");
      if (!t.trim() && BLOCK.has(parent.tag)) continue;
      const prev = parent.node.c[parent.node.c.length - 1];
      if (typeof prev === "string") parent.node.c[parent.node.c.length - 1] = (prev + t).replace(/ {2,}/g, " ");
      else parent.node.c.push(t);
      continue;
    }
    const lower = rawTag.toLowerCase();
    const tag = ALIAS[lower] ?? lower;
    if (close) {
      if (tag === "div" && !divs.pop()) continue;
      if (!KEEP.has(tag) && tag !== "div") continue;
      const at = stack.map((o) => o.tag).lastIndexOf(tag);
      if (at > 0) stack.length = at;
      continue;
    }
    if (CLOSES_P.has(tag)) {
      const p = stack.map((o) => o.tag).lastIndexOf("p");
      if (p > 0) stack.length = p;
    }
    if (tag === "li") {
      const list = Math.max(stack.map((o) => o.tag).lastIndexOf("ul"), stack.map((o) => o.tag).lastIndexOf("ol"));
      const li = stack.map((o) => o.tag).lastIndexOf("li");
      if (li > list && li > 0) stack.length = li;
    }
    let kind: RichKind | undefined;
    if (tag === "div") {
      kind = classes(attrs)
        .map((c) => DIV_KIND[c])
        .find(Boolean);
      if (!/\/\s*$/.test(attrs)) divs.push(Boolean(kind));
      if (!kind) continue;
    } else if (!KEEP.has(tag)) continue;
    if (tag === "p" && classes(attrs).includes("cmplz-subtitle")) kind = "subtitle";

    const node: RichElement = { t: tag as RichTag, c: [] };
    if (kind) node.kind = kind;
    if (tag === "a") node.href = safeHref(attrs.match(/href="([^"]*)"/)?.[1]);
    if (tag === "ol") {
      const v = Number(attrs.match(/start="(\d+)"/)?.[1]);
      if (v) node.start = v;
    }
    top().node.c.push(node);
    if (!VOID.has(tag) && !/\/\s*$/.test(attrs)) stack.push({ tag, node });
  }
  return trim(root.node.c, true);
}

/** Drop empty paragraphs/wrappers, stray top-level line breaks and edge whitespace left by the editor. */
function trim(nodes: RichNode[], top = false): RichNode[] {
  const out: RichNode[] = [];
  for (const n of nodes) {
    if (typeof n === "string") {
      if (n && !(top && !n.trim())) out.push(n);
      continue;
    }
    if (n.t === "br") {
      if (!top) out.push(n);
      continue;
    }
    const c = trim(n.c);
    // Empty cookie cells (Complianz leaves some "Function" values blank) keep their slot in the grid.
    if (!hasText(c) && n.kind !== "cell" && n.kind !== "row") continue;
    out.push({ ...n, c: stripEdgeBreaks(n.t, c) });
  }
  return out;
}

const hasText = (nodes: RichNode[]): boolean =>
  nodes.some((x) => (typeof x === "string" ? x.trim() : x.t !== "br" && hasText(x.c)));

/** Leading/trailing <br> and whitespace inside a paragraph, heading or cell render as blank lines: drop them. */
function stripEdgeBreaks(tag: RichTag, c: RichNode[]): RichNode[] {
  if (!["p", "li", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "a", "strong", "em"].includes(tag)) return c;
  const out = [...c];
  const blank = (x: RichNode | undefined) => x !== undefined && (typeof x === "string" ? !x.trim() : x.t === "br");
  while (blank(out[0])) out.shift();
  while (blank(out[out.length - 1])) out.pop();
  if (typeof out[0] === "string") out[0] = out[0].trimStart();
  const last = out.length - 1;
  if (typeof out[last] === "string") out[last] = (out[last] as string).trimEnd();
  return out;
}

export const nodeText = (nodes: RichNode[]): string =>
  nodes
    .map((n) => (typeof n === "string" ? n : n.t === "br" ? " " : nodeText(n.c)))
    .join("")
    .replace(/\s+/g, " ")
    .trim();

/** Removes and returns the first <h1> (anywhere in the tree). */
function takeH1(nodes: RichNode[]): string | null {
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (typeof n === "string") continue;
    if (n.t === "h1") {
      nodes.splice(i, 1);
      return nodeText(n.c);
    }
    const found = takeH1(n.c);
    if (found !== null) return found;
  }
  return null;
}

/**
 * The opening sentence goes in the hero when the first paragraph starts with
 * plain text (no link, no bold label): it is moved, not copied, so the page
 * still shows every word once. Anything after its first line break stays.
 */
function takeLead(nodes: RichNode[]): string | null {
  const i = nodes.findIndex((n) => typeof n !== "string");
  const p = nodes[i];
  if (!p || typeof p === "string" || p.t !== "p" || p.kind) return null;
  // A paragraph that is only an <em> (e.g. Complianz's "last updated" line) is read through it.
  const source = p.c.length === 1 && typeof p.c[0] !== "string" && p.c[0].t === "em" ? p.c[0].c : p.c;
  const br = source.findIndex((x) => typeof x !== "string" && x.t === "br");
  const head = br < 0 ? source : source.slice(0, br);
  const plain = head.every((x) => typeof x === "string" || (x.t === "em" && x.c.every((y) => typeof y === "string")));
  const text = nodeText(head);
  if (!plain || text.length < 40 || text.length > 320) return null;
  const rest = stripEdgeBreaks("p", source.slice(head.length));
  if (hasText(rest)) p.c = rest;
  else nodes.splice(i, 1);
  return text;
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/**
 * Section titles for the "on this page" list: the <h2>s when the document has
 * them (Complianz), otherwise the bold labels the editor uses as section titles
 * (a <strong> that stands alone on its line in a top-level paragraph). Each gets
 * an id to jump to. Labels are not promoted to headings (live has none).
 */
function outline(nodes: RichNode[]): OutlineItem[] {
  const items: OutlineItem[] = [];
  const used = new Set<string>();
  const mark = (n: RichElement) => {
    const label = nodeText(n.c).replace(/^#+\s*/, "").replace(/[\s:.]+$/, "");
    if (!label) return;
    let id = slug(label) || "section";
    for (let k = 2; used.has(id); k++) id = `${slug(label)}-${k}`;
    used.add(id);
    n.id = id;
    items.push({ id, label });
  };
  const h2s = nodes.filter((n): n is RichElement => typeof n !== "string" && n.t === "h2");
  if (h2s.length) {
    h2s.forEach(mark);
    return items;
  }
  const isBreak = (x: RichNode | undefined) => x === undefined || (typeof x !== "string" && x.t === "br");
  for (const p of nodes) {
    if (typeof p === "string" || p.t !== "p") continue;
    const kids = p.c.filter((x) => typeof x !== "string" || x.trim());
    kids.forEach((x, k) => {
      if (typeof x === "string" || x.t !== "strong") return;
      if (!isBreak(kids[k - 1]) || !isBreak(kids[k + 1])) return;
      if (nodeText(x.c).length > 90) return;
      mark(x);
    });
  }
  return items;
}

type WPPageContent = { modified: string; content: { rendered: string } };

/** The page's editor content from the REST API (cached; tags `wp`, `page-content`, `page-<slug>`). */
export async function getLegalDocument(slugPath: string): Promise<LegalDocument | null> {
  const { data } = await wpGet<WPPageContent[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(slugPath)}&_fields=modified,content`,
    ["page-content", `page-${slugPath}`],
  );
  const page = data[0];
  if (!page) return null;
  const body = parseRichContent(page.content.rendered);
  const title = takeH1(body);
  if (!title) return null;
  const lead = takeLead(body);
  return { title, lead, body, outline: outline(body), modified: page.modified };
}
