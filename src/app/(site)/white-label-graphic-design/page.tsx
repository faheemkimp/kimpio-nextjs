import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CaseStudyFeature, ReviewPair, ServicesShowcase, TrialBand, WorkWall } from "@/components/audience/sections";
import { Perks } from "@/components/graphic-design-services/perks-team";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { WHITE_LABEL_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, WL_CASE, WL_HERO, WL_REVIEWS, WL_SERVICES, WL_TRIAL, WL_WORK } from "@/content/white-label";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Agencies (/white-label-graphic-design/). Sections follow the live
 * page's order, headings and links (src/content/white-label.ts); Kimp Perks and
 * the ratings reuse the /graphic-design-services/ components (same live copy).
 */
export default async function WhiteLabelPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). The logo row keeps its live <h2>. */}
        <InnerHero
          id="wl-hero-title"
          titleAs="h2"
          eyebrow={WL_HERO.eyebrow}
          title={WL_HERO.title}
          intro={WL_HERO.intro}
          primaryCta={WL_HERO.primaryCta}
          secondaryCta={WL_HERO.secondaryCta}
          features={WL_HERO.features}
          marquee={WL_HERO.marquee}
          band={WL_HERO.band}
          mascot={WL_HERO.mascot}
          custom={WHITE_LABEL_SCENE}
        />
        <CaseStudyFeature data={WL_CASE} />
        <Perks />
        <ReviewPair reviews={WL_REVIEWS} />
        <ServicesShowcase data={WL_SERVICES} />
        <Ratings />
        <TrialBand data={WL_TRIAL} />
        <WorkWall data={WL_WORK} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
