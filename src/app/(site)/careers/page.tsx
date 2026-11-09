import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { FactCards, PerksSplit, Positions, ScamNotice } from "@/components/careers/careers-sections";
import { CAREERS_SCENE } from "@/components/careers/hero-scenes";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CR_ABOUT, CR_CTA, CR_FACTOR, CR_HERO, PATH } from "@/content/careers";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Careers (/careers/). Same headings, copy and links as live (template
 * "template-career_landing"; all copy is in the PHP template, see
 * src/content/careers.ts). Closes with the live "Apply today" <h2> inside the
 * homepage CTA + footer panel.
 */
export default async function CareersPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2>. Live's hero "Apply Now" button is hidden (d-none), so no button here. */}
        <InnerHero
          id="cr-hero-title"
          titleAs="h2"
          eyebrow={CR_HERO.eyebrow}
          title={CR_HERO.title}
          intro={CR_HERO.intro}
          marquee={CR_HERO.marquee}
          strip={CR_HERO.strip}
          mascot={CR_HERO.mascot}
          custom={CAREERS_SCENE}
          tall
        />
        <ScamNotice />
        <FactCards id="cr-about-title" {...CR_ABOUT} />
        <PerksSplit />
        <FactCards id="cr-factor-title" {...CR_FACTOR} tone="surface" />
        <Positions />
      </main>
      {/* Live closing section: "Apply today, to join the incredible Kimp Team!" stays an <h2>. */}
      <FinalCta content={CR_CTA} />
      <ScrollFx />
    </>
  );
}
