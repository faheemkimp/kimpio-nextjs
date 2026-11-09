import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CategoryBrowser } from "@/components/company-2/category-browser";
import { CATEGORIES_SCENE } from "@/components/company-2/hero-scenes";
import { SupportBand } from "@/components/company-2/support-band";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { DC_HERO, DC_SUPPORT, PATH } from "@/content/design-categories";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Design Categories (/design-categories/). Same headings, lists and links as
 * live (src/content/design-categories.ts): the searchable A–Z graphics and
 * video lists, then the live-chat prompt.
 */
export default async function DesignCategoriesPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="dc-hero-title"
          titleAs="h2"
          eyebrow={DC_HERO.eyebrow}
          title={DC_HERO.title}
          intro={DC_HERO.intro}
          marquee={DC_HERO.marquee}
          strip={DC_HERO.strip}
          mascot={DC_HERO.mascot}
          custom={CATEGORIES_SCENE}
          tall
        />
        <CategoryBrowser />
        <SupportBand id="dc-support-title" titleLines={DC_SUPPORT.titleLines} bodyLines={DC_SUPPORT.bodyLines} cta={DC_SUPPORT.cta} chat />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
