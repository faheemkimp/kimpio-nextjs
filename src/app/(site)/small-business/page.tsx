import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { SMALL_BUSINESS_SCENE } from "@/components/audience/hero-scenes-2";
import { WorkWall } from "@/components/audience/sections";
import { CallBand, DesignForThat, GoogleReviewPair, IconPerkGrid, TeamFeatures } from "@/components/audience/sections-2";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, SB_CALL, SB_DESIGNS, SB_HERO, SB_PERKS, SB_REVIEWS, SB_TEAM, SB_WORK } from "@/content/small-business";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Small Business (/small-business/). Sections follow the live page's
 * order, headings and links (src/content/small-business.ts).
 */
export default async function SmallBusinessPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has an <h1> in the hero. No logo row on live, so the panel shows pills (no extra heading). */}
        <InnerHero
          id="sb-hero-title"
          titleAs="h1"
          eyebrow={SB_HERO.eyebrow}
          title={SB_HERO.title}
          intro={SB_HERO.intro}
          primaryCta={SB_HERO.primaryCta}
          secondaryCta={SB_HERO.secondaryCta}
          marquee={SB_HERO.marquee}
          strip={SB_HERO.strip}
          mascot={{ src: "/images/mascot/inner/small-business.webp", width: 1448, height: 1086 }}
          custom={SMALL_BUSINESS_SCENE}
        />
        <IconPerkGrid data={SB_PERKS} />
        <WorkWall data={SB_WORK} />
        <TeamFeatures data={SB_TEAM} />
        <DesignForThat data={SB_DESIGNS} />
        <GoogleReviewPair data={SB_REVIEWS} />
        <CallBand data={SB_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" collab />
      <ScrollFx />
    </>
  );
}
