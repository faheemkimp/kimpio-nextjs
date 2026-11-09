import type { Metadata } from "next";

import { TagManager } from "@/components/analytics/tag-manager";
import { ContactDetails } from "@/components/company/contact-sections";
import { CONTACT_SCENE } from "@/components/company/hero-scenes";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { COMPANY_FINAL } from "@/content/about-us";
import { CT_HERO, PATH } from "@/content/contact-us";
import { getPageSeo } from "@/lib/seo/page-seo";

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PATH)).metadata;
}

/**
 * Contact Us (/contact-us/). Same headings and copy as live
 * (src/content/contact-us.ts): contact details, Chat Now and the map.
 * Closes with the live "Experience Seamless Design with Kimp" panel.
 */
export default async function ContactUsPage() {
  const { schema, yoast } = await getPageSeo(PATH);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live has no <h1> and no hero button: the hero title stays an <h2> (decision D2). */}
        <InnerHero
          id="ct-hero-title"
          titleAs="h2"
          eyebrow={CT_HERO.eyebrow}
          title={CT_HERO.title}
          intro={CT_HERO.intro}
          marquee={CT_HERO.marquee}
          strip={CT_HERO.strip}
          mascot={CT_HERO.mascot}
          custom={CONTACT_SCENE}
          tall
        />
        <ContactDetails />
      </main>
      {/* Live closing panel: "GET STARTED" <h6> + "Experience Seamless Design with Kimp" <h2>. */}
      <FinalCta content={COMPANY_FINAL} />
      <ScrollFx />
    </>
  );
}
