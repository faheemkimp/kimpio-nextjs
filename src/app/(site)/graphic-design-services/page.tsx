import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { GdsFaq, ContactCards, GdsFinalCta } from "@/components/graphic-design-services/faq-cta";
import { GdsHero } from "@/components/graphic-design-services/gds-hero";
import { Perks, TeamChart } from "@/components/graphic-design-services/perks-team";
import { GraphicsPlan, WhatWeDo, WorkGallery } from "@/components/graphic-design-services/plan-work";
import { FeaturedReview, Ratings } from "@/components/graphic-design-services/proof";
import { ServiceTabs } from "@/components/graphic-design-services/service-tabs";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { ScrollThread } from "@/components/home/fx/scroll-thread";
import { SectionHeading } from "@/components/home/sections/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { GDS_SERVICE, PATH } from "@/content/graphic-design-services";
import { getPageSeo } from "@/lib/seo/page-seo";

/* Section backgrounds alternate white / surface; threads blend the two. */
const WHITE = "#ffffff";
const SURFACE = "#f2f5f8";
const THREAD = "relative z-10 -my-12 sm:-my-16";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp Graphics (/graphic-design-services/). Sections follow the live page's
 * order, headings and links; see src/content/graphic-design-services.ts.
 */
export default async function GraphicDesignServicesPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        <GdsHero />

        <section aria-labelledby="gds-service-title" className="relative isolate overflow-hidden py-24 sm:py-32">
          <div className="container-page">
            <SectionHeading id="gds-service-title" eyebrow={GDS_SERVICE.eyebrow} title={GDS_SERVICE.title} intro={GDS_SERVICE.intro} />
            <ServiceTabs />
          </div>
        </section>

        <FeaturedReview />
        <div className="h-24 sm:h-32" aria-hidden="true" />
        <Perks />
        <ScrollThread label="Your team" from={SURFACE} to={WHITE} className={THREAD} flip />
        <TeamChart />
        <WhatWeDo />
        <ScrollThread label="The plan" from={WHITE} to={SURFACE} className={THREAD} />
        <GraphicsPlan />
        <Ratings />
        <WorkGallery />
        <ContactCards />
        <GdsFaq />
      </main>
      <GdsFinalCta />
      <ScrollFx />
    </>
  );
}
