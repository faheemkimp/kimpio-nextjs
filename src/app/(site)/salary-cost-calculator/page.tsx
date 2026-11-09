import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { SALARY_CALCULATOR_SCENE } from "@/components/inner/page-scenes";
import { SalaryCalculator } from "@/components/salary-calculator/calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { CALC_HERO, PATH } from "@/content/salary-cost-calculator";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getSalaryData, type SalaryData } from "@/lib/wp/salary-data";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Salary Cost Calculator (/salary-cost-calculator/). Same steps, fields,
 * wording and maths as live; salaries and exchange rates are read from the
 * WordPress JSON files the live calculator uses. It closes with the homepage's
 * CTA + footer panel. See src/content/salary-cost-calculator.ts.
 */
export default async function SalaryCostCalculatorPage() {
  const [{ schema, yoast }, data] = await Promise.all([getPageSeo(PATH), loadData()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the banner title stays an <h2> (decision D2). */}
        <InnerHero
          id="calc-hero-title"
          titleAs="h2"
          eyebrow={CALC_HERO.eyebrow}
          title={CALC_HERO.title}
          intro={CALC_HERO.intro}
          marquee={CALC_HERO.marquee}
          strip={CALC_HERO.strip}
          mascot={CALC_HERO.mascot}
          custom={SALARY_CALCULATOR_SCENE}
          tall
        />
        {data ? (
          <SalaryCalculator data={data} />
        ) : (
          <section aria-label="Salary cost calculator" className="container-page py-20 sm:py-28">
            <div className="flex flex-col items-center gap-6 rounded-[1.75rem] bg-surface px-6 py-16 text-center">
              <p className="text-lg text-ink/70">The calculator couldn’t be loaded right now.</p>
              <CtaLink href="/pricing/" variant="dark">
                See pricing
              </CtaLink>
            </div>
          </section>
        )}
      </main>
      {/* Same closing CTA + footer panel as the homepage. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadData(): Promise<SalaryData | null> {
  try {
    return await getSalaryData();
  } catch (err) {
    console.error("[salary-cost-calculator] salary data unavailable", err);
    return null;
  }
}
