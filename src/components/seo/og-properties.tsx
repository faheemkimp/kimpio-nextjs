import type { YoastHead } from "@/lib/wp/types";

/**
 * Open Graph `article:*` tags that the Metadata API can only emit as name="".
 * Live kimp.io outputs them as property="" (even on og:type=website pages such as
 * the homepage), so they are rendered here; React hoists <meta> into <head>.
 */
export function OgProperties({ yoast }: { yoast: YoastHead | null }) {
  if (!yoast) return null;
  return (
    <>
      {yoast.article_published_time && (
        <meta property="article:published_time" content={yoast.article_published_time} />
      )}
      {yoast.article_modified_time && <meta property="article:modified_time" content={yoast.article_modified_time} />}
    </>
  );
}
