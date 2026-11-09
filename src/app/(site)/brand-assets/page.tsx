import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { BrandDescribe, BrandLogos, BrandScreenshot, BrandVideos } from "@/components/company-2/brand-sections";
import { BRAND_ASSETS_SCENE } from "@/components/company-2/hero-scenes";
import { SupportBand } from "@/components/company-2/support-band";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { BA_HERO, BA_MEDIA_KIT, PATH } from "@/content/brand-assets";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Brand Assets / press kit (/brand-assets/). Same headings, copy and links as
 * live (src/content/brand-assets.ts); logo downloads and the Media Kit keep
 * their live URLs.
 */
export default async function BrandAssetsPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="ba-hero-title"
          titleAs="h2"
          eyebrow={BA_HERO.eyebrow}
          title={BA_HERO.title}
          intro={BA_HERO.intro}
          primaryCta={BA_HERO.primaryCta}
          marquee={BA_HERO.marquee}
          strip={BA_HERO.strip}
          mascot={BA_HERO.mascot}
          custom={BRAND_ASSETS_SCENE}
        />
        <BrandLogos />
        <BrandScreenshot />
        <BrandDescribe />
        <BrandVideos />
        <SupportBand id="ba-media-title" titleLines={[BA_MEDIA_KIT.title]} bodyLines={BA_MEDIA_KIT.bodyLines} cta={BA_MEDIA_KIT.cta} newTab />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
