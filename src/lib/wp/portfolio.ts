import "server-only";

import { wpGetFile } from "./client";

interface PortfolioItem {
  thumbnail: string;
  fullsize: string;
  id: number;
  sort_order: number;
}

/** Category files are wrapped ([{ ctype, items }]); all.json is a bare list. */
type PortfolioFile = PortfolioItem[] | { ctype: string; items: PortfolioItem[] }[];

const itemsOf = (file: PortfolioFile): PortfolioItem[] =>
  file.length && "items" in file[0] ? (file as { items: PortfolioItem[] }[])[0].items : (file as PortfolioItem[]);

export interface GraphicsPortfolio {
  /** Categories in WordPress order (from index.json), with their live tab labels. */
  categories: { slug: string; label: string }[];
  /** Image URLs for the "All" tab, in WordPress order. */
  all: string[];
  /** Image URLs per category slug, in WordPress order. */
  byCategory: Record<string, string[]>;
}

/** /json/graphics/index.json: the category list WordPress generates alongside the files. */
interface PortfolioIndex {
  files: { slug: string; category: string }[];
}

/**
 * The /our-work/ gallery, read from the same WordPress JSON files the live
 * page loads (https://www.kimp.io/json/graphics/). The category list comes from
 * index.json, so new categories and images added in WordPress appear without a
 * deploy.
 */
export async function getGraphicsPortfolio(): Promise<GraphicsPortfolio> {
  const tags = ["portfolio-graphics"];
  const index = await wpGetFile<PortfolioIndex>("/json/graphics/index.json", tags);
  const categories = index.files.filter((f) => f.slug !== "all").map((f) => ({ slug: f.slug, label: f.category }));
  const [all, ...rest] = await Promise.all(
    ["all", ...categories.map((c) => c.slug)].map((c) => wpGetFile<PortfolioFile>(`/json/graphics/${c}.json`, tags)),
  );
  return {
    categories,
    all: itemsOf(all).map((i) => i.fullsize),
    byCategory: Object.fromEntries(categories.map((c, i) => [c.slug, itemsOf(rest[i]).map((it) => it.fullsize)])),
  };
}

export interface VideoSample {
  poster: string;
  /** YouTube link (youtu.be, /shorts/, watch?v=) or a direct .mp4 file. */
  video: string;
}

/** Video files map poster URL -> video URL: [{ ctype, items: { [poster]: video } }]. */
type VideoFile = { ctype: string; items: Record<string, string> }[];

/**
 * The /our-work/video-samples/ gallery, read from the WordPress JSON files the
 * live page loads (https://www.kimp.io/json/videos/{category}.json). Live
 * lists each file's entries in reverse; so does this.
 */
export async function getVideoPortfolio(categories: readonly string[]): Promise<Record<string, VideoSample[]>> {
  const files = await Promise.all(categories.map((c) => wpGetFile<VideoFile>(`/json/videos/${c}.json`, ["portfolio-videos"])));
  return Object.fromEntries(
    categories.map((c, i) => [
      c,
      Object.entries(files[i][0]?.items ?? {})
        .reverse()
        .map(([poster, video]) => ({ poster, video })),
    ]),
  );
}
