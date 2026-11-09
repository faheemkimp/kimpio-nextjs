import { ArrowDown } from "lucide-react";
import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ENTERPRISE_SCENE } from "@/components/audience/hero-scenes-2";
import {
  BrandCards,
  CaseRail,
  EnterpriseFaq,
  EnterprisePricing,
  Integrations,
  SampleMarquee,
  ServiceGrid,
  SmarterWay,
  Testimonials,
  WhatWeDo,
} from "@/components/enterprise/sections";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { ENT_CTA, ENT_HERO, PATH } from "@/content/enterprise-clients";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getEnterpriseFaqs } from "@/lib/wp/enterprise-faqs";
import type { FaqItem } from "@/lib/wp/faqs";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * KIMP Enterprise (/enterprise-clients/). Sections follow the live page's order,
 * headings and links (src/content/enterprise-clients.ts); the FAQ answers are
 * WordPress content, fetched at render (src/lib/wp/enterprise-faqs.ts).
 */
export default async function EnterpriseClientsPage() {
  const [{ schema, yoast }, faqs] = await Promise.all([getPageSeo(PATH), loadFaqs()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has an <h1> in the hero; the logo row keeps its live <h2>. */}
        <InnerHero
          id="ent-hero-title"
          titleAs="h1"
          eyebrow={ENT_HERO.eyebrow}
          title={ENT_HERO.title}
          intro={ENT_HERO.intro}
          primaryCta={ENT_HERO.primaryCta}
          action={
            <CtaLink href={ENT_HERO.learnMore.href} variant="light" size="lg">
              {ENT_HERO.learnMore.label}
              <ArrowDown aria-hidden="true" />
            </CtaLink>
          }
          marquee={ENT_HERO.marquee}
          band={ENT_HERO.band}
          mascot={{ src: "/images/mascot/inner/enterprise-clients.webp", width: 1448, height: 1086 }}
          custom={ENTERPRISE_SCENE}
        />
        <SampleMarquee />
        <BrandCards />
        <SmarterWay />
        <ServiceGrid />
        <CaseRail />
        <EnterprisePricing />
        <WhatWeDo />
        <Testimonials />
        <Integrations />
        <EnterpriseFaq items={faqs} />
      </main>
      {/* Live closing section: <h6> "GET STARTED" + <h2>, in the homepage CTA + footer panel. */}
      <FinalCta content={ENT_CTA} />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadFaqs(): Promise<FaqItem[] | null> {
  try {
    return await getEnterpriseFaqs();
  } catch {
    return null;
  }
}
