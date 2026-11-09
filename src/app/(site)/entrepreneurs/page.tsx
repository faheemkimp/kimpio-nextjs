import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CallCard, CaseStudyFeature, ServicesShowcase, SingleReview, TrialBand, VideoTestimonials, WorkWall } from "@/components/audience/sections";
import { Perks } from "@/components/graphic-design-services/perks-team";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { ENTREPRENEURS_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { EN_CALL, EN_CASE, EN_HERO, EN_REVIEW, EN_SERVICES, EN_TRIAL, EN_VIDEOS, EN_WORK, PATH } from "@/content/entrepreneurs";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Entrepreneurs (/entrepreneurs/). Sections follow the live page's order, headings and links
 * (src/content/entrepreneurs.ts); Kimp Perks and the ratings reuse the
 * /graphic-design-services/ components (same live copy).
 */
export default async function EntrepreneursPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). The logo row keeps its live <h2>. */}
        <InnerHero
          id="en-hero-title"
          titleAs="h2"
          eyebrow={EN_HERO.eyebrow}
          title={EN_HERO.title}
          intro={EN_HERO.intro}
          primaryCta={EN_HERO.primaryCta}
          secondaryCta={EN_HERO.secondaryCta}
          features={EN_HERO.features}
          marquee={EN_HERO.marquee}
          band={EN_HERO.band}
          mascot={EN_HERO.mascot}
          custom={ENTREPRENEURS_SCENE}
        />
        <CaseStudyFeature data={EN_CASE} />
        <Perks />
        <VideoTestimonials data={EN_VIDEOS} />
        <ServicesShowcase data={EN_SERVICES} />
        <SingleReview data={EN_REVIEW} />
        <Ratings />
        <TrialBand data={EN_TRIAL} />
        <WorkWall data={EN_WORK} />
        <CallCard data={EN_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
