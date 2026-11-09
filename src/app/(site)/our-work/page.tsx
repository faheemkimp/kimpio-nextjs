import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { OUR_WORK_SCENE } from "@/components/inner/page-scenes";
import { CurvedShowcase } from "@/components/portfolio/curved-showcase";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { OW_CTA, OW_GALLERY, OW_HERO, OW_SHOWCASE, PATH } from "@/content/our-work";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getGraphicsPortfolio, type GraphicsPortfolio } from "@/lib/wp/portfolio";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Our Work / Graphics samples (/our-work/). Same headings and copy as live;
 * the gallery is read from the WordPress JSON files the live page uses and is
 * presented as a curved, scroll-driven slider, one category at a time.
 * Closes with the live "We cut costs and time." panel inside the homepage
 * CTA + footer panel. See src/content/our-work.ts.
 */
export default async function OurWorkPage() {
  const [{ schema, yoast }, portfolio] = await Promise.all([getPageSeo(PATH), loadPortfolio()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live <h1>; no hero button on live. */}
        <InnerHero
          id="ow-hero-title"
          titleAs="h1"
          eyebrow={OW_HERO.eyebrow}
          title={OW_HERO.title}
          intro={OW_HERO.intro}
          marquee={OW_HERO.marquee}
          strip={OW_HERO.strip}
          mascot={OW_HERO.mascot}
          custom={OUR_WORK_SCENE}
          tall
        />
        {portfolio ? (
          <CurvedShowcase
            sets={portfolio.categories.map((c) => ({ ...c, images: portfolio.byCategory[c.slug] ?? [] })).filter((c) => c.images.length > 0)}
            cta={OW_SHOWCASE.cta}
            alt={OW_GALLERY.alt}
          />
        ) : (
          <p className="container-page rounded-[1.75rem] bg-surface px-6 py-16 text-center text-lg text-ink/70">{OW_GALLERY.unavailable}</p>
        )}
      </main>
      {/* Live closing panel: "We cut costs and time." stays an <h2>. */}
      <FinalCta content={OW_CTA} />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadPortfolio(): Promise<GraphicsPortfolio | null> {
  try {
    return await getGraphicsPortfolio();
  } catch (err) {
    console.error("[our-work] portfolio unavailable", err);
    return null;
  }
}
