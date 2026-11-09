import { LogIn } from "lucide-react";
import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { AffiliateSupport, EarnPerks, EasyTools, GoBig, HowItWorks } from "@/components/company/affiliate-sections";
import { AFFILIATE_SCENE } from "@/components/company/hero-scenes";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { AF_HERO, PATH } from "@/content/affiliates";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Affiliates - Refer and Earn (/affiliates/). Sections follow the live page's
 * order, headings and copy (src/content/affiliates.ts). Apply Now and
 * Affiliate Login keep their live links into the AffiliateWP area on WordPress.
 */
export default async function AffiliatesPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="af-hero-title"
          titleAs="h2"
          eyebrow={AF_HERO.eyebrow}
          title={AF_HERO.title}
          intro={AF_HERO.intro}
          primaryCta={AF_HERO.primaryCta}
          action={
            <CtaLink href={AF_HERO.login.href} variant="light" size="lg">
              <LogIn aria-hidden="true" />
              {AF_HERO.login.label}
            </CtaLink>
          }
          marquee={AF_HERO.marquee}
          strip={AF_HERO.strip}
          mascot={AF_HERO.mascot}
          custom={AFFILIATE_SCENE}
        />
        <EarnPerks />
        <EasyTools />
        <HowItWorks />
        <GoBig />
        <AffiliateSupport />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}
