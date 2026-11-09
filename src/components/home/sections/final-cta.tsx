import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { FooterPanel } from "@/components/layout/site-footer";
import { CtaLink } from "@/components/ui/cta-button";
import { FINAL_CTA } from "@/content/home-sections";

import { SpeedLines } from "../fx/speed-lines";
import { Eyebrow } from "./section-heading";

type FinalCtaContent = {
  eyebrow: string;
  /** "h6" where the live label is a heading. */
  eyebrowAs?: "p" | "h6";
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/**
 * Closing call to action: an ink panel that grows into place, a glossy ribbon
 * drifting in parallax, the mascot taking off. On the homepage it doubles as the
 * site footer: the link columns and legal line sit inside the same panel
 * (the standalone <SiteFooter> is hidden there by <FooterGate>).
 * Inner pages reuse it as their closing panel; where the live page has no such
 * heading, pass titleAs="p" so no heading is added (SEO parity).
 */
export function FinalCta({
  titleAs: Title = "h2",
  content = FINAL_CTA,
  collab = false,
}: {
  titleAs?: "h2" | "p";
  /** A page's own live closing copy (e.g. /our-work/); defaults to the homepage text. */
  content?: FinalCtaContent;
  /** Live page uses the older theme footer with <h4>In Collaboration With</h4> (see FooterPanel). */
  collab?: boolean;
} = {}) {
  const c = content;
  return (
    <FooterPanel collab={collab}>
        <section
          aria-labelledby="final-cta-title"
          className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-24"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <Eyebrow tone="dark" as={c.eyebrowAs}>
                {c.eyebrow}
              </Eyebrow>
              <Title
                id="final-cta-title"
                data-fx="reveal"
                className="mt-6 text-[2.4rem] leading-[1.04] font-bold tracking-[-0.02em] sm:text-6xl lg:text-7xl"
              >
                {c.title}
              </Title>
              {c.body && (
                <p data-fx="reveal" data-delay="0.1" className="mt-6 text-xl font-semibold text-white/75">
                  {c.body}
                </p>
              )}
              <div
                data-fx="reveal"
                data-delay="0.2"
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <CtaLink href={c.primary.href} size="lg">
                  {c.primary.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
                {c.secondary && (
                  <CtaLink href={c.secondary.href} variant="light" size="lg">
                    {c.secondary.label}
                  </CtaLink>
                )}
              </div>
            </div>
            {/* Mascot flying up and to the right, speed lines trailing
                off behind him. The wrapper bobs (cta-rise animates
                `rotate`), so the tilt lives on the image itself. */}
            <div className="cta-rise pointer-events-none relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-[23rem]">
              <SpeedLines angle={-42} />
              {/* Animated WebP (cape flutter), so it skips the optimizer. */}
              <Image
                src="/images/mascot/takeoff.webp"
                alt=""
                width={400}
                height={523}
                unoptimized
                className="relative w-full rotate-[52deg] drop-shadow-[0_30px_30px_rgb(0_0_0/0.5)]"
              />
            </div>
          </div>
        </section>
    </FooterPanel>
  );
}
