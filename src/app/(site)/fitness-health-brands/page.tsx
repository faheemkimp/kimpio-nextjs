import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CallCard, CaseStudyFeature, ClientReviewGrid, ServicesShowcase, TrialBand, WorkWall } from "@/components/audience/sections";
import { Perks } from "@/components/graphic-design-services/perks-team";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { FITNESS_HEALTH_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { FH_CALL, FH_CASE, FH_CLIENTS, FH_HERO, FH_SERVICES, FH_TRIAL, FH_WORK, PATH } from "@/content/fitness-health-brands";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Fitness/Health Brands (/fitness-health-brands/). Sections follow the live page's order, headings and links
 * (src/content/fitness-health-brands.ts); Kimp Perks and the ratings reuse the
 * /graphic-design-services/ components (same live copy).
 */
export default async function FitnessHealthBrandsPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). The logo row keeps its live <h2>. */}
        <InnerHero
          id="fh-hero-title"
          titleAs="h2"
          eyebrow={FH_HERO.eyebrow}
          title={FH_HERO.title}
          intro={FH_HERO.intro}
          primaryCta={FH_HERO.primaryCta}
          secondaryCta={FH_HERO.secondaryCta}
          marquee={FH_HERO.marquee}
          band={FH_HERO.band}
          mascot={FH_HERO.mascot}
          custom={FITNESS_HEALTH_SCENE}
        />
        <CaseStudyFeature data={FH_CASE} />
        <ClientReviewGrid data={FH_CLIENTS} />
        <Perks />
        <ServicesShowcase data={FH_SERVICES} />
        <Ratings />
        <TrialBand data={FH_TRIAL} />
        <WorkWall data={FH_WORK} />
        <CallCard data={FH_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
