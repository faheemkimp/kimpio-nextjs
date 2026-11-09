import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { STARTUPS_SCENE } from "@/components/audience/hero-scenes-2";
import { WorkWall } from "@/components/audience/sections";
import { CallBand, DesignForThat, GoogleReviewPair, IconPerkGrid, TeamFeatures } from "@/components/audience/sections-2";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, ST_CALL, ST_DESIGNS, ST_HERO, ST_PERKS, ST_REVIEWS, ST_TEAM, ST_WORK } from "@/content/startups";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Startups (/startups/). Sections follow the live page's order,
 * headings and links (src/content/startups.ts).
 */
export default async function StartupsPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has an <h1> in the hero. No logo row on live, so the panel shows pills (no extra heading). */}
        <InnerHero
          id="st-hero-title"
          titleAs="h1"
          eyebrow={ST_HERO.eyebrow}
          title={ST_HERO.title}
          intro={ST_HERO.intro}
          primaryCta={ST_HERO.primaryCta}
          secondaryCta={ST_HERO.secondaryCta}
          marquee={ST_HERO.marquee}
          strip={ST_HERO.strip}
          mascot={{ src: "/images/mascot/inner/startups.webp", width: 1448, height: 1086 }}
          custom={STARTUPS_SCENE}
        />
        <IconPerkGrid data={ST_PERKS} />
        <WorkWall data={ST_WORK} />
        <TeamFeatures data={ST_TEAM} />
        <DesignForThat data={ST_DESIGNS} />
        <GoogleReviewPair data={ST_REVIEWS} />
        <CallBand data={ST_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" collab />
      <ScrollFx />
    </>
  );
}
