import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { VideoDialog } from "@/components/home/video-dialog";
import { InnerHero } from "@/components/inner/inner-hero";
import { FeatureHub } from "@/components/kimp360/feature-hub";
import { DemoFooter, ReviewsSection, SubscriptionsSection, UpdatesSection } from "@/components/kimp360/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { K360_HERO, PATH } from "@/content/kimp360-platform";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * KIMP360 (/kimp360-platform/). Sections follow the live page's order,
 * headings and links; see src/content/kimp360-platform.ts. Live has no
 * closing sign-up panel here, so the standard site footer follows.
 */
export default async function Kimp360PlatformPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). No logo strip on live. */}
        <InnerHero
          id="k360-hero-title"
          titleAs="h2"
          eyebrow={K360_HERO.eyebrow}
          title={K360_HERO.title}
          intro={K360_HERO.intro}
          primaryCta={K360_HERO.primaryCta}
          action={<VideoDialog label={K360_HERO.video.label} src={K360_HERO.video.src} />}
          marquee={K360_HERO.marquee}
          strip={K360_HERO.strip}
          mascot={K360_HERO.mascot}
          scene="kimp360"
        />
        <FeatureHub />
        <ReviewsSection />
        <UpdatesSection />
        <Ratings />
        <SubscriptionsSection />
      </main>
      {/* Closing panel, like every page: here the live "Experience KIMP360 In Action!" demo (<h3>) inside the footer panel. */}
      <DemoFooter />
      <ScrollFx />
    </>
  );
}
