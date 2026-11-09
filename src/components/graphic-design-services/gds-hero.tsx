import { InnerHero } from "@/components/inner/inner-hero";
import { CLIENT_LOGOS } from "@/content/home";
import { GDS_HERO, GDS_LOGOS_TITLE } from "@/content/graphic-design-services";

/**
 * Kimp Graphics hero, on the shared inner-page hero. The title stays an <h2>
 * and the logo strip keeps its own <h2>, as on the live page (no <h1>, decision D2).
 */
export function GdsHero() {
  return (
    <InnerHero
      id="gds-hero-title"
      titleAs="h2"
      eyebrow={GDS_HERO.eyebrow}
      title={GDS_HERO.title}
      intro={GDS_HERO.intro}
      primaryCta={GDS_HERO.primaryCta}
      secondaryCta={GDS_HERO.secondaryCta}
      features={GDS_HERO.features}
      marquee={GDS_HERO.marquee}
      band={{ title: GDS_LOGOS_TITLE, logos: CLIENT_LOGOS.logos }}    />
  );
}
