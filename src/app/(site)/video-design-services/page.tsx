import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ContactCards, GdsFaq, GdsFinalCta } from "@/components/graphic-design-services/faq-cta";
import { Perks, TeamChart } from "@/components/graphic-design-services/perks-team";
import { PlanSection } from "@/components/graphic-design-services/plan-work";
import { FeaturedReview, Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { ScrollThread } from "@/components/home/fx/scroll-thread";
import { SectionHeading } from "@/components/home/sections/section-heading";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { VideoServiceGrid } from "@/components/video-design-services/service-grid";
import { VideoTabs } from "@/components/video-design-services/video-tabs";
import { CLIENT_LOGOS } from "@/content/home";
import {
  PATH,
  VDS_HERO,
  VDS_LOGOS_TITLE,
  VDS_PLAN,
  VDS_SERVICES,
  VDS_TABS,
  VDS_TEAM_JOBS,
  VDS_TEAM_MEMBERS,
} from "@/content/video-design-services";
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
 * Kimp Video (/video-design-services/). Sections follow the live page's
 * order, headings and links; see src/content/video-design-services.ts.
 * Sections shared word-for-word with /graphic-design-services/ reuse its components.
 */
export default async function VideoDesignServicesPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="vds-hero-title"
          titleAs="h2"
          eyebrow={VDS_HERO.eyebrow}
          title={VDS_HERO.title}
          intro={VDS_HERO.intro}
          primaryCta={VDS_HERO.primaryCta}
          secondaryCta={VDS_HERO.secondaryCta}
          features={VDS_HERO.features}
          marquee={VDS_HERO.marquee}
          mascot={VDS_HERO.mascot}
          scene="video"
          band={{ title: VDS_LOGOS_TITLE, logos: CLIENT_LOGOS.logos }}
        />

        <section aria-labelledby="vds-services-title" className="relative isolate overflow-hidden py-24 sm:py-32">
          <div className="container-page">
            <SectionHeading id="vds-services-title" eyebrow={VDS_SERVICES.eyebrow} title={VDS_SERVICES.title} intro={VDS_SERVICES.intro} />
            <VideoServiceGrid />
          </div>
        </section>

        <ScrollThread label="Why Kimp Video" from={WHITE} to={SURFACE} className={THREAD} />

        <section aria-labelledby="vds-tabs-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
          <div className="container-page">
            <SectionHeading id="vds-tabs-title" eyebrow={VDS_TABS.eyebrow} title={VDS_TABS.title} intro={VDS_TABS.intro} />
            <VideoTabs />
          </div>
        </section>

        <FeaturedReview />
        <div className="h-24 sm:h-32" aria-hidden="true" />
        <Perks />
        <ScrollThread label="Your team" from={SURFACE} to={WHITE} className={THREAD} flip />
        <TeamChart members={VDS_TEAM_MEMBERS} jobs={VDS_TEAM_JOBS} />
        <ScrollThread label="The plan" from={WHITE} to={SURFACE} className={THREAD} />
        <PlanSection id="vds-plan-title" plan={VDS_PLAN} />
        <Ratings />
        <ContactCards />
        <GdsFaq />
      </main>
      <GdsFinalCta />
      <ScrollFx />
    </>
  );
}
