import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { YSPACE_SCENE } from "@/components/company-2/hero-scenes";
import { YsFeatures, YsPartner, YsPricing, YsSamples, YsSteps } from "@/components/company-2/yspace-sections";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { PATH, YS_HERO, YS_UI } from "@/content/yspace";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getYspaceContent, type YspaceContent } from "@/lib/wp/yspace";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/** Hero title on two lines: split before the last " And " (live: "… Marketing And Scale …"), else at the middle word. */
function splitTitle(title: string) {
  const at = title.lastIndexOf(" And ");
  if (at > 0) return { lead: title.slice(0, at), highlight: title.slice(at + 1) };
  const words = title.split(" ");
  const mid = Math.ceil(words.length / 2);
  return { lead: words.slice(0, mid).join(" "), highlight: words.slice(mid).join(" ") };
}

/**
 * YSpace landing page (/yspace/). The body is the page's WordPress editor
 * content, read at render (lib/wp/yspace.ts) with the live headings; the
 * landing template's footer block (partner, contact, address) is kept above the
 * site footer. See src/content/yspace.ts.
 */
export default async function YspacePage() {
  const [{ schema, yoast }, content] = await Promise.all([getPageSeo(PATH), loadContent()]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {content ? (
          <>
            {/* Live has no <h1>: its first heading, an <h2>, is the hero title (decision D2). */}
            <InnerHero
              id="ys-hero-title"
              titleAs="h2"
              eyebrow={YS_HERO.eyebrow}
              title={splitTitle(content.intro.title)}
              intro={content.pricing.body || content.pricing.intro}
              primaryCta={content.pricing.cta ?? undefined}
              marquee={YS_HERO.marquee}
              strip={YS_HERO.strip}
              mascot={YS_HERO.mascot}
              custom={YSPACE_SCENE}
            />
            <YsFeatures intro={content.intro} />
            <YsSteps steps={content.steps} />
            <YsSamples samples={content.samples} />
            <YsPricing pricing={content.pricing} />
          </>
        ) : (
          <p className="container-page py-40 text-center text-lg text-ink/70">{YS_UI.unavailable}</p>
        )}
        <YsPartner />
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadContent(): Promise<YspaceContent | null> {
  try {
    const c = await getYspaceContent();
    return c.intro.title ? c : null;
  } catch (err) {
    console.error("[yspace] page content unavailable", err);
    return null;
  }
}
