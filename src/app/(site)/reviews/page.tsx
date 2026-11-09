import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { Ratings } from "@/components/graphic-design-services/proof";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { TestimonialWall } from "@/components/reviews/testimonial-wall";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, RV_HERO, RV_WALL } from "@/content/reviews";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getInitialTestimonials, type Testimonial } from "@/lib/wp/testimonials";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Testimonials (/reviews/). Same headings and copy as live; the ratings reuse
 * the /graphic-design-services/ cards and the testimonials come from WordPress.
 * Closes with the homepage CTA + footer panel. See src/content/reviews.ts.
 */
export default async function ReviewsPage() {
  const [{ schema, yoast }, testimonials] = await Promise.all([getPageSeo(PATH), loadTestimonials()]);
  const w = RV_WALL;
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="rv-hero-title"
          titleAs="h2"
          eyebrow={RV_HERO.eyebrow}
          title={RV_HERO.title}
          intro={RV_HERO.intro}
          marquee={RV_HERO.marquee}
          strip={RV_HERO.strip}
          mascot={RV_HERO.mascot}
          scene="reviews"
          tall
        />
        <Ratings
          id="rv-wall-title"
          eyebrow={w.eyebrow}
          title={
            <>
              {w.titleLines[0]}
              <br />
              {w.titleLines[1]}
            </>
          }
        >
          {testimonials ? (
            <TestimonialWall initial={testimonials} viewMore={w.viewMore} play={w.play} />
          ) : (
            <p className="mt-14 rounded-[1.75rem] bg-surface px-6 py-16 text-center text-lg text-ink/70">{w.unavailable}</p>
          )}
        </Ratings>
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadTestimonials(): Promise<Testimonial[] | null> {
  try {
    const items = await getInitialTestimonials();
    return items.length ? items : null;
  } catch (err) {
    console.error("[reviews] testimonials unavailable", err);
    return null;
  }
}
