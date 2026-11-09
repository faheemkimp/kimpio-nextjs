import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { ScrollThread } from "@/components/home/fx/scroll-thread";
import { Hero } from "@/components/home/hero";
import { CommandCenter } from "@/components/home/kimp360/command-center";
import { BlogSection } from "@/components/home/sections/blog-section";
import { BuildVsBuy } from "@/components/home/sections/build-vs-buy";
import { CampaignJourney } from "@/components/home/sections/campaign-journey";
import { FaqSection } from "@/components/home/sections/faq-section";
import { FinalCta } from "@/components/home/sections/final-cta";
import { HybridEquation } from "@/components/home/sections/hybrid-equation";
import { MakeModes } from "@/components/home/sections/make-modes";
import { PricingPlans } from "@/components/home/sections/pricing-plans";
import { ReviewsWall } from "@/components/home/sections/reviews-wall";
import { ServicesGrid } from "@/components/home/sections/services-grid";
import { TeamUseCases } from "@/components/home/sections/team-use-cases";
import { WhyKimp } from "@/components/home/why-kimp";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { getPageSeo } from "@/lib/seo/page-seo";

const PATH = "/";

/* Section backgrounds alternate white / surface; threads blend the two and tuck into the section padding. */
const WHITE = "#ffffff";
const SURFACE = "#f2f5f8";
const THREAD = "relative z-10 -my-12 sm:-my-16";

export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

export default async function HomePage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager
        page={{ pagePostType: "frontpage", pagePostType2: "single-page" }}
      />
      <JsonLd data={schema} />
      <main id="main">
        <Hero />
        <HybridEquation />
        <ScrollThread label="Your choice" from={SURFACE} to={WHITE} className={THREAD} flip />
        <MakeModes />
        <CampaignJourney />
        <WhyKimp />
        <ServicesGrid />
        <CommandCenter />
        <ScrollThread label="The math" from={WHITE} to={SURFACE} className={THREAD} />
        <BuildVsBuy />
        <ScrollThread label="Who it's for" from={SURFACE} to={WHITE} className={THREAD} flip />
        <TeamUseCases />
        <PricingPlans />
        <ReviewsWall />
        <BlogSection />
        <ScrollThread label="Questions" from={WHITE} to={SURFACE} className={THREAD} />
        <FaqSection />
      </main>
      <FinalCta />
      <ScrollFx />
    </>
  );
}
