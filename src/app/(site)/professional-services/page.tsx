import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CallCard, CaseStudyFeature, ReviewPair, ServicesShowcase, TrialBand, VideoTestimonials, WorkWall } from "@/components/audience/sections";
import { Perks } from "@/components/graphic-design-services/perks-team";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { PROFESSIONAL_SERVICES_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, PS_CALL, PS_CASE, PS_CASE_2, PS_HERO, PS_REVIEWS, PS_SERVICES, PS_TRIAL, PS_VIDEO, PS_WORK } from "@/content/professional-services";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp For: Professional Services (/professional-services/). Sections follow the live page's order, headings and links
 * (src/content/professional-services.ts); Kimp Perks reuse the
 * /graphic-design-services/ components (same live copy).
 */
export default async function ProfessionalServicesPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). The logo row keeps its live <h2>. */}
        <InnerHero
          id="ps-hero-title"
          titleAs="h2"
          eyebrow={PS_HERO.eyebrow}
          title={PS_HERO.title}
          intro={PS_HERO.intro}
          primaryCta={PS_HERO.primaryCta}
          secondaryCta={PS_HERO.secondaryCta}
          marquee={PS_HERO.marquee}
          band={PS_HERO.band}
          mascot={PS_HERO.mascot}
          custom={PROFESSIONAL_SERVICES_SCENE}
        />
        <CaseStudyFeature data={PS_CASE} />
        <Perks />
        <ReviewPair reviews={PS_REVIEWS} />
        <VideoTestimonials data={PS_VIDEO} />
        <ServicesShowcase data={PS_SERVICES} />
        <TrialBand data={PS_TRIAL} />
        <WorkWall data={PS_WORK} />
        <CaseStudyFeature data={PS_CASE_2} />
        <CallCard data={PS_CALL} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
