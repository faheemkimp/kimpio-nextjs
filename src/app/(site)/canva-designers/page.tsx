import { CalendarDays } from "lucide-react";
import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CallCard } from "@/components/audience/sections";
import {
  CanvaCallBanner,
  CanvaFaq,
  CanvaOtherSubscriptions,
  CanvaPerks,
  CanvaPlans,
  CanvaSamples,
  CanvaTeam,
  CanvaTestimonials,
  CanvaVideos,
  CanvaWhy,
} from "@/components/company-2/canva-sections";
import { CANVA_SCENE } from "@/components/company-2/hero-scenes";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { CV_CALL, CV_HERO, CV_RATINGS, PATH } from "@/content/canva-designers";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getCanvaFaqs } from "@/lib/wp/canva-faqs";
import type { FaqItem } from "@/lib/wp/faqs";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * KIMP for Canva (/canva-designers/). Sections follow the live page's order,
 * headings and links (src/content/canva-designers.ts); the ratings reuse the
 * /graphic-design-services/ cards and the FAQs come from WordPress.
 */
export default async function CanvaDesignersPage() {
  const [{ schema, yoast }, faqs] = await Promise.all([getPageSeo(PATH), loadFaqs()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1>: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="cv-hero-title"
          titleAs="h2"
          eyebrow={CV_HERO.eyebrow}
          title={CV_HERO.title}
          intro={CV_HERO.intro}
          primaryCta={CV_HERO.primaryCta}
          action={
            <CtaLink href={CV_HERO.secondaryCta.href} target="_blank" rel="noopener" variant="light" size="lg">
              <CalendarDays aria-hidden="true" />
              {CV_HERO.secondaryCta.label}
            </CtaLink>
          }
          features={CV_HERO.features}
          marquee={CV_HERO.marquee}
          strip={CV_HERO.strip}
          mascot={CV_HERO.mascot}
          custom={CANVA_SCENE}
          raise
        />
        <CanvaWhy />
        <CanvaTestimonials />
        <CanvaPerks />
        <CanvaTeam />
        <CanvaCallBanner />
        <CanvaPlans />
        <CanvaOtherSubscriptions />
        <CanvaVideos />
        <Ratings id="cv-ratings-title" eyebrow={CV_RATINGS.eyebrow} title={CV_RATINGS.title} />
        <CanvaSamples />
        <CallCard data={CV_CALL} />
        <CanvaFaq items={faqs} />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadFaqs(): Promise<FaqItem[] | null> {
  try {
    const items = await getCanvaFaqs();
    return items.length ? items : null;
  } catch (err) {
    console.error("[canva-designers] FAQs unavailable", err);
    return null;
  }
}
