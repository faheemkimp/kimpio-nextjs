import "server-only";

import { wpGet } from "./client";

/**
 * /yspace/ body: the WordPress editor content of the page (REST
 * `content.rendered`), read at render so WordPress edits still show. The HTML
 * is parsed into plain fields (text, links, image URLs); no raw HTML is ever
 * injected. Parsing is tolerant: a block that doesn't match is left out.
 */

type Img = { src: string; width: number; height: number };
type Link = { label: string; href: string };

export type YspaceContent = {
  intro: { title: string; lead: string; features: { title: string; body: string; icon: Img | null }[] };
  steps: { title: string; items: { lines: string[]; body: string; image: Img | null }[] };
  samples: { title: string; intro: string; more: Link | null };
  pricing: {
    title: string;
    intro: string;
    testimonials: { quote: string[]; name: string; company: string }[];
    support: { title: string; body: string } | null;
    price: { now: string; was: string } | null;
    body: string;
    features: string[];
    cta: Link | null;
  };
};

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const text = (s: string) => decode(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
/** Text split on <br>, one entry per line. */
const lines = (s: string) => s.split(/<br\s*\/?>/i).map(text).filter(Boolean);
const first = (s: string, re: RegExp) => s.match(re)?.[1] ?? "";

/** Only web links survive (no javascript: or data: URLs). */
function safeHref(raw: string): string | null {
  const href = decode(raw).trim();
  return /^(https?:\/\/|\/)/i.test(href) ? href : null;
}

function lastImage(html: string): Img | null {
  const tag = [...html.matchAll(/<img\b[^>]*>/gi)].at(-1)?.[0];
  if (!tag) return null;
  const src = first(tag, /\ssrc="(https?:\/\/[^"]+)"/);
  if (!src) return null;
  return { src: decode(src), width: Number(first(tag, /width="(\d+)"/)) || 160, height: Number(first(tag, /height="(\d+)"/)) || 160 };
}

function link(html: string): Link | null {
  const m = html.match(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
  const href = m ? safeHref(m[1]) : null;
  return m && href ? { label: text(m[2]), href } : null;
}

/** Each `<hN>` with the first paragraph after it, and the last image before it. */
function blocks(html: string, tag: "h4" | "h5") {
  const parts = html.split(new RegExp(`<${tag}\\b[^>]*>`, "i"));
  return parts.slice(1).map((part, i) => {
    const [title, rest = ""] = part.split(new RegExp(`</${tag}>`, "i"));
    return { title, body: text(first(rest, /<p\b[^>]*>([\s\S]*?)<\/p>/i)), image: lastImage(parts[i]) };
  });
}

export function parseYspace(html: string): YspaceContent {
  const at = (needle: string) => {
    const i = html.indexOf(needle);
    if (i < 0) throw new Error(`[yspace] block "${needle}" not found in the page content`);
    return i;
  };
  const iSteps = at("howitworks");
  const iSamples = at("kimp-samples");
  const iPricing = at("free-trial");
  const introHtml = html.slice(0, iSteps);
  const stepsHtml = html.slice(iSteps, iSamples);
  const samplesHtml = html.slice(iSamples, iPricing);
  const pricingHtml = html.slice(iPricing);

  const introBody = introHtml.slice(introHtml.search(/<\/h4>/i) + 5);
  const intro = {
    title: text(first(introHtml, /<h2\b[^>]*>([\s\S]*?)<\/h2>/i)),
    lead: text(first(introHtml, /<h4\b[^>]*>([\s\S]*?)<\/h4>/i)),
    features: blocks(introBody, "h5").map((b) => ({ title: text(b.title), body: b.body, icon: b.image })),
  };

  const steps = {
    title: text(first(stepsHtml, /<h2\b[^>]*>([\s\S]*?)<\/h2>/i)),
    items: blocks(stepsHtml, "h4").map((b) => ({ lines: lines(b.title), body: b.body, image: b.image })),
  };

  const samples = {
    title: text(first(samplesHtml, /<h2\b[^>]*>([\s\S]*?)<\/h2>/i)),
    intro: text(first(samplesHtml, /<p\b[^>]*class="sub"[^>]*>([\s\S]*?)<\/p>/i)),
    more: link(samplesHtml.slice(samplesHtml.search(/sample-btn/i) - 20)),
  };

  const slider = pricingHtml.indexOf("testimonial-slider");
  const afterSlider = pricingHtml.indexOf('class="clear"', slider);
  const box = pricingHtml.slice(Math.max(0, pricingHtml.indexOf("price-box")));
  const priceHtml = first(box, /<div class="price">([\s\S]*?)<\/div>/i);
  const afterPrice = box.slice(box.search(/<div class="price">[\s\S]*?<\/div>/i) + 1);
  const supportHtml = afterSlider < 0 ? "" : pricingHtml.slice(afterSlider, pricingHtml.indexOf("price-box"));

  const pricing = {
    title: text(first(pricingHtml, /<h2\b[^>]*>([\s\S]*?)<\/h2>/i)),
    intro: text(first(pricingHtml, /<p\b[^>]*class="sub"[^>]*>([\s\S]*?)<\/p>/i)),
    testimonials: (slider < 0 ? [] : pricingHtml.slice(slider, afterSlider < 0 ? undefined : afterSlider).split(/class="testimonial-slide"/).slice(1))
      .map((s) => {
        const h3 = first(s, /<h3\b[^>]*>([\s\S]*?)<\/h3>/i);
        return {
          quote: lines(first(s, /<p\b[^>]*>([\s\S]*?)<\/p>/i)),
          name: text(h3.replace(/<span[\s\S]*$/i, "")),
          company: text(first(h3, /<span\b[^>]*>([\s\S]*?)<\/span>/i)),
        };
      })
      .filter((t) => t.name && t.quote.length),
    support: (() => {
      const title = text(first(supportHtml, /<h4\b[^>]*>([\s\S]*?)<\/h4>/i));
      return title ? { title, body: text(first(supportHtml.slice(supportHtml.search(/<\/h4>/i)), /<p\b[^>]*>([\s\S]*?)<\/p>/i)) } : null;
    })(),
    price: priceHtml
      ? { now: text(priceHtml.replace(/<span[\s\S]*$/i, "")), was: text(first(priceHtml, /<span\b[^>]*>([\s\S]*?)<\/span>/i)) }
      : null,
    body: text(first(afterPrice, /<p\b[^>]*>([\s\S]*?)<\/p>/i)),
    features: [...first(box, /<ul\b[^>]*>([\s\S]*?)<\/ul>/i).matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => text(m[1])).filter(Boolean),
    cta: link(box.slice(box.search(/<\/ul>/i))),
  };

  return { intro, steps, samples, pricing };
}

/** The page content from the WordPress REST API (cached; refreshed by the `page:yspace` tag). */
export async function getYspaceContent(): Promise<YspaceContent> {
  const { data } = await wpGet<{ content: { rendered: string } }[]>("/wp/v2/pages?slug=yspace&_fields=content", ["pages", "page:yspace"]);
  const html = data[0]?.content.rendered;
  if (!html) throw new Error("[yspace] page content is empty");
  return parseYspace(html);
}
