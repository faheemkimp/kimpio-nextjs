import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { UpdatesBrowser } from "@/components/kimp360/updates-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CtaLink } from "@/components/ui/cta-button";
import { PATH, PU_HERO, PU_LIST } from "@/content/kimp360-product-updates";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getAllPostsInCategory, type PostCard } from "@/lib/wp/queries";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * KIMP360 Platform Updates (/kimp360-product-updates/). Same content as live:
 * the hero, then every "Kimp 360 Product" post from WordPress with the
 * All / Update / Pro Tip filter, then the homepage CTA + footer panel.
 * See src/content/kimp360-product-updates.ts.
 */
export default async function Kimp360ProductUpdatesPage() {
  const [{ schema, yoast }, posts] = await Promise.all([getPageSeo(PATH), loadPosts()]);
  const l = PU_LIST;
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2>, its only heading (decision D2). */}
        <InnerHero
          id="pu-hero-title"
          titleAs="h2"
          eyebrow={PU_HERO.eyebrow}
          title={PU_HERO.title}
          intro={PU_HERO.intro}
          marquee={PU_HERO.marquee}
          strip={PU_HERO.strip}
          mascot={PU_HERO.mascot}
          scene="kimp360"
        />
        <section aria-label="KIMP360 updates" className="py-20 sm:py-28">
          <div className="container-page">
            {posts.length > 0 ? (
              <UpdatesBrowser
                posts={posts}
                filters={l.filters}
                filterLabel={l.filterLabel}
                allLabel={l.allLabel}
                more={l.more}
              />
            ) : (
              <div className="flex flex-col items-center gap-6 rounded-[1.75rem] bg-surface px-6 py-16 text-center">
                <p className="text-lg text-ink/70">{l.unavailable.text}</p>
                <CtaLink href={l.unavailable.cta.href} variant="dark">
                  {l.unavailable.cta.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
              </div>
            )}
          </div>
        </section>
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadPosts(): Promise<PostCard[]> {
  try {
    return await getAllPostsInCategory(PU_LIST.categoryId);
  } catch (err) {
    console.error("[kimp360-product-updates] posts unavailable", err);
    return [];
  }
}
