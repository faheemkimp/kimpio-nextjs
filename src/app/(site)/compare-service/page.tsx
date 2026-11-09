import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { CompareTabs } from "@/components/compare-service/compare-tabs";
import { CompareQuiz } from "@/components/compare-service/quiz";
import { AlternativesTable, ContactCard, TestimonialsMarquee } from "@/components/compare-service/sections";
import { FaqSection } from "@/components/graphic-design-services/faq-cta";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { CS_COMPARE, CS_FAQ, CS_FINAL, CS_HERO, CS_QUIZ, PATH } from "@/content/compare-service";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Us vs. Them (/compare-service/). Sections follow the live page's order,
 * headings and links; copy in src/content/compare-service.ts. The ratings and
 * FAQ reuse the /graphic-design-services/ components (same live markup).
 */
export default async function CompareServicePage() {
  const { schema, yoast } = await getPageSeo(PATH);
  const [quizCta, compareCta] = CS_HERO.buttons;
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        <InnerHero
          id="cs-hero-title"
          titleAs="h1"
          eyebrow={CS_HERO.eyebrow}
          title={CS_HERO.titleParts}
          intro={CS_HERO.intro}
          primaryCta={quizCta}
          action={
            <CtaLink href={compareCta.href} variant="light" size="lg">
              {compareCta.label}
            </CtaLink>
          }
          features={CS_HERO.meta}
          marquee={CS_HERO.marquee}
          band={{ title: CS_HERO.trust, logos: CS_HERO.logos, titleAs: "p" }}
          mascot={CS_HERO.mascot}
          scene="compare"
        />
        <Ratings />
        <CompareTabs id={CS_COMPARE.id} eyebrow={CS_COMPARE.eyebrow} title={CS_COMPARE.title} intro={CS_COMPARE.intro} rivals={CS_COMPARE.rivals} />
        <TestimonialsMarquee />
        <AlternativesTable />
        <CompareQuiz quiz={CS_QUIZ} />
        {/* Live "Still have some questions?" card sits under the FAQ title (sticky column). */}
        <FaqSection id="cs-faq" data={CS_FAQ} aside={<ContactCard />} />
      </main>
      {/* Live closing panel: <h6>GET STARTED</h6> + <h2>, inside the homepage CTA + footer panel. */}
      <FinalCta content={CS_FINAL} />
      <ScrollFx />
    </>
  );
}
