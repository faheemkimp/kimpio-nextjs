import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ClientCentred, Countries, GlobalImpact, KimpCares, OurStory, OurValues, TeamQuotes } from "@/components/company/about-sections";
import { ABOUT_SCENE } from "@/components/company/hero-scenes";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { AB_HERO, COMPANY_FINAL, PATH } from "@/content/about-us";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * About Us (/about-us/). Sections follow the live page's order, headings and
 * copy (src/content/about-us.ts). Closes with the live "Experience Seamless
 * Design with Kimp" panel inside the homepage CTA + footer panel.
 */
export default async function AboutUsPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="ab-hero-title"
          titleAs="h2"
          eyebrow={AB_HERO.eyebrow}
          title={AB_HERO.title}
          intro={AB_HERO.intro}
          marquee={AB_HERO.marquee}
          strip={AB_HERO.strip}
          mascot={AB_HERO.mascot}
          custom={ABOUT_SCENE}
          tall
        />
        <GlobalImpact />
        <OurStory />
        <ClientCentred />
        <Countries />
        <TeamQuotes />
        <KimpCares />
        <OurValues />
      </main>
      {/* Live closing panel: "GET STARTED" <h6> + "Experience Seamless Design with Kimp" <h2>. */}
      <FinalCta content={COMPANY_FINAL} />
      <ScrollFx />
    </>
  );
}
