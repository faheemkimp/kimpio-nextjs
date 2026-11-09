import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { FaqBrowser } from "@/components/faq/faq-browser";
import { GdsFinalCta } from "@/components/graphic-design-services/faq-cta";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { InnerHero } from "@/components/inner/inner-hero";
import { FAQ_SCENE } from "@/components/inner/page-scenes";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { FAQ_BROWSER, FAQ_HERO, PATH } from "@/content/faq";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getFaqs, type FaqData } from "@/lib/wp/faqs";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * FAQ (/faq/). Same headings and copy as live; every question and answer comes
 * from WordPress (lib/wp/faqs.ts). Closes with the live newsletter sign-up
 * (<h2>, as live) inside the homepage footer panel. See src/content/faq.ts.
 */
export default async function FaqPage() {
  const [{ schema, yoast }, faqs] = await Promise.all([getPageSeo(PATH), loadFaqs()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="faq-hero-title"
          titleAs="h2"
          eyebrow={FAQ_HERO.eyebrow}
          title={FAQ_HERO.title}
          intro={FAQ_HERO.intro}
          marquee={FAQ_HERO.marquee}
          strip={FAQ_HERO.strip}
          mascot={FAQ_HERO.mascot}
          custom={FAQ_SCENE}
          tall
        />
        <section aria-labelledby="faq-hero-title" className="relative isolate bg-surface py-20 sm:py-28">
          <div className="container-page">
            {faqs ? (
              <FaqBrowser categories={faqs.categories} initial={faqs.active} />
            ) : (
              <p className="rounded-[1.75rem] bg-white px-6 py-16 text-center text-lg text-ink/70">{FAQ_BROWSER.unavailable}</p>
            )}
          </div>
        </section>
      </main>
      {/* Live closes with the newsletter <h2> + email field: same heading, inside the footer panel. */}
      <GdsFinalCta />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadFaqs(): Promise<FaqData | null> {
  try {
    const data = await getFaqs();
    return data.categories.length ? data : null;
  } catch (err) {
    console.error("[faq] FAQs unavailable", err);
    return null;
  }
}
