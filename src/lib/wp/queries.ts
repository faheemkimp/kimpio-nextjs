import "server-only";

import { WP_ORIGIN } from "@/lib/site";

import { wpGet, WPError } from "./client";
import type { YoastHead } from "./types";

interface YoastHeadResponse {
  status: number;
  json?: YoastHead;
}

/**
 * Yoast metadata for any public URL, straight from the Yoast plugin that
 * manages SEO on kimp.io today. Returns null when Yoast reports the URL missing.
 */
export async function getYoastHeadForUrl(url: string): Promise<YoastHead | null> {
  try {
    const { data } = await wpGet<YoastHeadResponse>(`/yoast/v1/get_head?url=${encodeURIComponent(url)}`, [
      `head:${url}`,
    ]);
    return data.status === 200 && data.json ? data.json : null;
  } catch (err) {
    if (err instanceof WPError && err.status === 404) return null;
    throw err;
  }
}

export interface PostCard {
  id: number;
  date: string;
  link: string;
  title: string;
  image: { src: string; width: number; height: number; alt: string } | null;
  /** WordPress tag ids (e.g. "Update", "Pro Tip" on KIMP360 posts). */
  tags: number[];
}

interface WPPostWithMedia {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string; media_details?: { width?: number; height?: number } }[];
  };
}

const decodeEntities = (s: string) =>
  s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/**
 * WordPress returns absolute permalinks (https://www.kimp.io/{slug}/). Posts are
 * served on this same domain (the proxy passes non-redesigned URLs to WordPress),
 * so links are kept on-site as root-relative paths.
 */
const WP_HOSTS = new Set([new URL(WP_ORIGIN).hostname, "www.kimp.io", "kimp.io"]);
function toSitePath(link: string): string {
  try {
    const u = new URL(link);
    return WP_HOSTS.has(u.hostname) ? `${u.pathname}${u.search}${u.hash}` : link;
  } catch {
    return link;
  }
}

function toPostCard(p: WPPostWithMedia): PostCard {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    id: p.id,
    date: p.date,
    link: toSitePath(p.link),
    title: decodeEntities(p.title.rendered),
    image: media?.source_url
      ? {
          src: media.source_url,
          width: media.media_details?.width ?? 1080,
          height: media.media_details?.height ?? 1080,
          alt: media.alt_text ?? "",
        }
      : null,
    tags: p.tags ?? [],
  };
}

const categoryPostsPath = (categoryId: number, perPage: number, page = 1) =>
  `/wp/v2/posts?categories=${categoryId}&per_page=${perPage}&page=${page}&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=id,date,link,title,tags,_links,_embedded`;

/** Latest published posts in one category, newest first (title, link, date, featured image). */
export async function getLatestPostsInCategory(categoryId: number, count: number): Promise<PostCard[]> {
  const { data } = await wpGet<WPPostWithMedia[]>(categoryPostsPath(categoryId, count), [
    "posts",
    `category:${categoryId}`,
  ]);
  return data.map(toPostCard);
}

export interface BlogPostCard extends PostCard {
  /** Primary category name (first assigned), e.g. "Branding". */
  category: string | null;
}

interface WPPostWithTerms extends WPPostWithMedia {
  _embedded?: WPPostWithMedia["_embedded"] & {
    "wp:term"?: { name?: string; taxonomy?: string }[][];
  };
}

/**
 * Latest blog posts across all categories, newest first, leaving out the given
 * category ids (e.g. KIMP360 product updates, which have their own page).
 */
export async function getLatestBlogPosts(count: number, excludeCategories: readonly number[] = []): Promise<BlogPostCard[]> {
  const exclude = excludeCategories.length ? `&categories_exclude=${excludeCategories.join(",")}` : "";
  const { data } = await wpGet<WPPostWithTerms[]>(
    `/wp/v2/posts?per_page=${count}&orderby=date&order=desc${exclude}&_embed=wp:featuredmedia,wp:term&_fields=id,date,link,title,tags,_links,_embedded`,
    ["posts", "blog:latest"],
  );
  return data.map((p) => {
    const cat = p._embedded?.["wp:term"]?.flat().find((t) => t.taxonomy === "category")?.name;
    return { ...toPostCard(p), category: cat ? decodeEntities(cat) : null };
  });
}

/** Every published post in one category, newest first (WordPress pages through 100 at a time). */
export async function getAllPostsInCategory(categoryId: number): Promise<PostCard[]> {
  const tags = ["posts", `category:${categoryId}`];
  const first = await wpGet<WPPostWithMedia[]>(categoryPostsPath(categoryId, 100), tags);
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, first.totalPages - 1) }, (_, i) =>
      wpGet<WPPostWithMedia[]>(categoryPostsPath(categoryId, 100, i + 2), tags),
    ),
  );
  return [first, ...rest].flatMap((r) => r.data).map(toPostCard);
}
