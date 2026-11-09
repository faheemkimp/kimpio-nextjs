import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CaseGrid } from "@/components/case-study/case-study";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { CASE_STUDY_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CASE_CARDS, CS_FINAL, CS_HERO, LIST_PATH } from "@/content/case-studies";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(LIST_PATH)).metadata;
}

/**
 * Case Studies (/case-study/). Same copy, headings and card order as live
 * (src/content/case-studies.ts); the live hero + intro, the 12 case study
 * cards, then the live closing newsletter heading in the homepage CTA panel.
 */
export default async function CaseStudiesPage() {
  const { schema, yoast } = await getPageSeo(LIST_PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "casestudy" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="cs-hero-title"
          titleAs="h2"
          eyebrow={CS_HERO.eyebrow}
          title={CS_HERO.title}
          intro={CS_HERO.intro}
          marquee={CS_HERO.marquee}
          strip={CS_HERO.strip}
          mascot={CS_HERO.mascot}
          custom={CASE_STUDY_SCENE}
          tall
        />
        <CaseGrid cards={CASE_CARDS} />
      </main>
      <FinalCta content={CS_FINAL} />
      <ScrollFx />
    </>
  );
}
