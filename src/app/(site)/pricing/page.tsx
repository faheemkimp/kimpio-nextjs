import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { FaqSection, GdsFinalCta } from "@/components/graphic-design-services/faq-cta";
import { Perks } from "@/components/graphic-design-services/perks-team";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { ScrollThread } from "@/components/home/fx/scroll-thread";
import { InnerHero } from "@/components/inner/inner-hero";
import { PricingPlansSection } from "@/components/pricing/plans";
import { CatalogueSection, IncludedSection, VolumeSection } from "@/components/pricing/sections";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, PRICING_FAQ, PRICING_HERO } from "@/content/pricing";
import { getPageSeo } from "@/lib/seo/page-seo";

const WHITE = "#ffffff";
const SURFACE = "#f2f5f8";
const THREAD = "relative z-10 -my-12 sm:-my-16";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Kimp Pricing (/pricing/). Sections follow the live page's order, headings
 * and links; see src/content/pricing.ts. Perks and the closing CTA are the
 * same word-for-word as /graphic-design-services/, so they are reused.
 */
export default async function PricingPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the banner title stays an <h2> (decision D2). No logo strip on live. */}
        <InnerHero
          id="pricing-hero-title"
          titleAs="h2"
          eyebrow={PRICING_HERO.eyebrow}
          title={PRICING_HERO.title}
          intro={PRICING_HERO.intro}
          primaryCta={PRICING_HERO.primaryCta}
          marquee={PRICING_HERO.marquee}
          strip={PRICING_HERO.strip}
          mascot={PRICING_HERO.mascot}
          scene="pricing"
        />

        <PricingPlansSection />
        <IncludedSection />
        <CatalogueSection />
        <VolumeSection />
        <ScrollThread label="Kimp Perks" from={WHITE} to={SURFACE} className={THREAD} />
        <Perks />
        <FaqSection id="pricing-faq" data={PRICING_FAQ} />
      </main>
      <GdsFinalCta />
      <ScrollFx />
    </>
  );
}
