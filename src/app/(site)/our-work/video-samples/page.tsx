import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { VideoGallery } from "@/components/portfolio/video-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, VS_CATEGORIES, VS_GALLERY, VS_HERO } from "@/content/video-samples";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getVideoPortfolio, type VideoSample } from "@/lib/wp/portfolio";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Our Work / Video samples (/our-work/video-samples/). Same headings and copy
 * as live; the videos are read from the WordPress JSON files the live page
 * uses. Closes with the homepage CTA + footer panel. See src/content/video-samples.ts.
 */
export default async function VideoSamplesPage() {
  const [{ schema, yoast }, videos] = await Promise.all([getPageSeo(PATH), loadVideos()]);
  const g = VS_GALLERY;
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="vs-hero-title"
          titleAs="h2"
          eyebrow={VS_HERO.eyebrow}
          title={VS_HERO.title}
          intro={VS_HERO.intro}
          marquee={VS_HERO.marquee}
          strip={VS_HERO.strip}
          mascot={VS_HERO.mascot}
          scene="video"
          tall
        />
        <section aria-label="Video samples" className="py-20 sm:py-28">
          <div className="container-page">
            {videos ? (
              <VideoGallery data={videos} categories={VS_CATEGORIES} initial={g.initial} listTitle={g.listTitle} play={g.play} />
            ) : (
              <p className="rounded-[1.75rem] bg-surface px-6 py-16 text-center text-lg text-ink/70">{g.unavailable}</p>
            )}
          </div>
        </section>
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadVideos(): Promise<Record<string, VideoSample[]> | null> {
  try {
    return await getVideoPortfolio(VS_CATEGORIES.map((c) => c.slug));
  } catch (err) {
    console.error("[video-samples] videos unavailable", err);
    return null;
  }
}
