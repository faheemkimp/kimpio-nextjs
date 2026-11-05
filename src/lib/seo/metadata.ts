import type { Metadata } from "next";

import { absoluteUrl, SITE_NAME } from "@/lib/site";
import type { YoastHead } from "@/lib/wp/types";

import { decodeEntities } from "./entities";

type Robots = NonNullable<Metadata["robots"]>;

function mapRobots(robots: YoastHead["robots"]): Robots {
  if (!robots) return { index: true, follow: true };
  const num = (v?: string) => (v ? Number(v.split(":")[1]) : undefined);
  const preview = robots["max-image-preview"]?.split(":")[1] as "none" | "standard" | "large" | undefined;
  return {
    index: robots.index !== "noindex",
    follow: robots.follow !== "nofollow",
    "max-snippet": num(robots["max-snippet"]),
    "max-image-preview": preview,
    "max-video-preview": num(robots["max-video-preview"]),
  };
}

/**
 * Head tags for a redesigned page (decision D1 in SEO-URL-AUDIT.md):
 *
 * - title, meta description, robots: Yoast values (identical to what kimp.io outputs today)
 * - og:title / twitter:title = the page title, og:description / twitter:description =
 *   the meta description. This is what the live site outputs today; Yoast's own social
 *   title can differ (e.g. "kimp" on the homepage) and is deliberately not used.
 * - canonical, og:url, og:image, twitter:image, article times: from Yoast. These are
 *   configured in Yoast but dropped by the live site; restoring them was approved.
 *
 * Titles use `absolute` so no title template can ever alter them.
 */
export function yoastToMetadata(y: YoastHead, fallbackPath: string): Metadata {
  const canonical = y.canonical ?? absoluteUrl(fallbackPath);
  const title = decodeEntities(y.title);
  const description = decodeEntities(y.description) || undefined;
  const images = (y.og_image ?? []).map((img) => ({
    url: img.url,
    width: img.width,
    height: img.height,
    type: img.type,
  }));

  // article:* times need property="" (not name=""), so they are rendered by <OgProperties>.
  const other: Record<string, string> = {};
  Object.entries(y.twitter_misc ?? {}).forEach(([label, data], i) => {
    other[`twitter:label${i + 1}`] = label;
    other[`twitter:data${i + 1}`] = data;
  });

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: mapRobots(y.robots),
    openGraph: {
      locale: y.og_locale ?? "en_US",
      type: y.og_type === "article" ? "article" : "website",
      title,
      description,
      url: y.og_url ?? canonical,
      siteName: y.og_site_name ?? SITE_NAME,
      images: images.length ? images : undefined,
    },
    twitter: {
      card: (y.twitter_card as "summary_large_image" | "summary" | undefined) ?? "summary_large_image",
      title,
      description,
      images: y.twitter_image ? [y.twitter_image] : undefined,
    },
    other,
  };
}

/**
 * Used only if Yoast cannot be reached: the values captured from the live site
 * before the redesign, so a page never ships without title/description/canonical.
 */
export function staticMetadata(opts: {
  path: string;
  title: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(opts.path);
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical },
    robots: opts.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    openGraph: {
      locale: "en_US",
      type: "website",
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: SITE_NAME,
      images: opts.ogImage ? [{ url: opts.ogImage }] : undefined,
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}
