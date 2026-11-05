import "server-only";

import type { Metadata } from "next";

import baseline from "@/data/seo-baseline.json";
import { absoluteUrl } from "@/lib/site";
import { getYoastHeadForUrl } from "@/lib/wp/queries";
import type { YoastHead } from "@/lib/wp/types";

import { staticMetadata, yoastToMetadata } from "./metadata";

type BaselineEntry = { t: string; d?: string; img?: string; noindex?: boolean };
const BASELINE = baseline as Record<string, BaselineEntry>;

export interface PageSeo {
  metadata: Metadata;
  schema: YoastHead["schema"] | null;
  /** Raw Yoast data, for tags the Metadata API cannot express (see <OgProperties>). */
  yoast: YoastHead | null;
}

/**
 * SEO for a Next.js-rendered route, resolved from the same Yoast configuration
 * the SEO team edits in WordPress today. If WordPress is unreachable, the values
 * captured from the live site before migration (src/data/seo-baseline.json) are
 * used so the page never ships without its title, description and canonical.
 */
export async function getPageSeo(path: string): Promise<PageSeo> {
  const url = absoluteUrl(path);
  let yoast: YoastHead | null = null;
  try {
    yoast = await getYoastHeadForUrl(url);
  } catch (err) {
    console.error(`[seo] Yoast lookup failed for ${url}; using baseline`, err);
  }
  if (yoast?.title) return { metadata: yoastToMetadata(yoast, path), schema: yoast.schema ?? null, yoast };

  const entry = BASELINE[new URL(url).pathname];
  if (!entry) {
    console.warn(`[seo] No Yoast data or baseline entry for ${url}`);
    return { metadata: staticMetadata({ path, title: "Kimp" }), schema: null, yoast: null };
  }
  return {
    metadata: staticMetadata({ path, title: entry.t, description: entry.d, ogImage: entry.img, noindex: entry.noindex }),
    schema: null,
    yoast: null,
  };
}
