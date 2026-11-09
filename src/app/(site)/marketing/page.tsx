import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { MARKETING_SCENE } from "@/components/audience/hero-scenes-2";
import { WorkWall } from "@/components/audience/sections";
import { CallBand, DesignForThat, GoogleReviewPair, IconPerkGrid, TeamFeatures } from "@/components/audience/sections-2";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { MK_CALL, MK_DESIGNS, MK_HERO, MK_PERKS, MK_REVIEWS, MK_TEAM, MK_WORK, PATH } from "@/content/marketing";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Marketing Teams (/marketing/). Sections follow the live page's
 * order, headings and links (src/content/marketing.ts).
 */
export default async function MarketingPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has an <h1> in the hero. No logo row on live, so the panel shows pills (no extra heading). */}
        <InnerHero
          id="mk-hero-title"
          titleAs="h1"
          eyebrow={MK_HERO.eyebrow}
          title={MK_HERO.title}
          intro={MK_HERO.intro}
          primaryCta={MK_HERO.primaryCta}
          secondaryCta={MK_HERO.secondaryCta}
          marquee={MK_HERO.marquee}
          strip={MK_HERO.strip}
          mascot={{ src: "/images/mascot/inner/marketing.webp", width: 1448, height: 1086 }}
          custom={MARKETING_SCENE}
        />
        <IconPerkGrid data={MK_PERKS} />
        <WorkWall data={MK_WORK} />
        <TeamFeatures data={MK_TEAM} />
        <DesignForThat data={MK_DESIGNS} />
        <GoogleReviewPair data={MK_REVIEWS} />
        <CallBand data={MK_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" collab />
      <ScrollFx />
    </>
  );
}
