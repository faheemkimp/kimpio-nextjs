import "server-only";

import { wpAjaxHtml, wpGetHtml } from "./client";

/** A /reviews/ testimonial: a written quote, or a video with its thumbnail. */
export type Testimonial =
  | { kind: "text"; paragraphs: string[]; initials: string; name: string; company: string }
  | { kind: "video"; video: string; thumb: { src: string; width: number; height: number }; name: string; company: string };

/** WordPress page that owns the testimonials (the live "View More" sends pageid=117025). */
const PAGE_ID = "117025";
const TAGS = ["testimonials"];

const decode = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const clean = (s: string) => decode(s.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

/**
 * Parse the live theme's testimonial cards (`.inner_testmo_box`) from either the
 * rendered page or an admin-ajax fragment. Kept tolerant: a card that doesn't
 * match is skipped rather than breaking the page.
 */
export function parseTestimonials(html: string): Testimonial[] {
  const out: Testimonial[] = [];
  const boxes = html.split(/<div class="inner_testmo_box">/).slice(1);
  for (const box of boxes) {
    const name = clean(box.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)?.[1] ?? "");
    if (!name) continue;
    const company = clean(box.match(/<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "");
    const video = box.match(/<a data-fancybox[^>]*href="([^"]+)"/)?.[1];
    if (video) {
      const img = box.match(/<img[^>]*>/)?.[0] ?? "";
      const src = img.match(/data-lazy-src="([^"]+)"/)?.[1] ?? img.match(/\ssrc="(https?:[^"]+)"/)?.[1];
      if (!src) continue;
      out.push({
        kind: "video",
        video,
        thumb: { src, width: Number(img.match(/width="(\d+)"/)?.[1] ?? 1272), height: Number(img.match(/height="(\d+)"/)?.[1] ?? 720) },
        name,
        company,
      });
      continue;
    }
    const content = box.match(/class="ki_testi_content">([\s\S]*?)<div class="user_detail/)?.[1] ?? "";
    const paragraphs = [...content.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => clean(m[1])).filter(Boolean);
    if (!paragraphs.length) continue;
    out.push({ kind: "text", paragraphs, initials: clean(box.match(/class="user_pic">([\s\S]*?)<\/span>/)?.[1] ?? ""), name, company });
  }
  return out;
}

/** The testimonials the live page renders before "View More": read from the WordPress-rendered /reviews/ page. */
export async function getInitialTestimonials(): Promise<Testimonial[]> {
  const html = await wpGetHtml("/reviews/", TAGS);
  const start = html.indexOf('id="ki_testi_all"');
  const end = html.indexOf("ki_testi_view_more_btn", start);
  return start < 0 ? [] : parseTestimonials(html.slice(start, end < 0 ? undefined : end));
}

/** One "View More" batch (live: admin-ajax action=getnexttestimonials, sets 1, 2, 3…). `done` once WordPress says there are no more. */
export async function getTestimonialSet(set: number): Promise<{ items: Testimonial[]; done: boolean }> {
  const html = await wpAjaxHtml({ action: "getnexttestimonials", nextset: String(set), pageid: PAGE_ID }, TAGS);
  const items = parseTestimonials(html);
  return { items, done: items.length === 0 || /id="hide-more"/.test(html) };
}
