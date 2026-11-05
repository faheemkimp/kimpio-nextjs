import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { FooterLegal, FooterLinks } from "@/components/layout/site-footer";
import { CtaLink } from "@/components/ui/cta-button";
import { FINAL_CTA } from "@/content/home-sections";

import { SpeedLines } from "../fx/speed-lines";
import { Eyebrow } from "./section-heading";

/**
 * Closing call to action: an ink panel that grows into place, a glossy ribbon
 * drifting in parallax, the mascot taking off. On the homepage it doubles as the
 * site footer: the link columns and legal line sit inside the same panel
 * (the standalone <SiteFooter> is hidden there by <FooterGate>).
 */
export function FinalCta() {
  return (
    <footer className="relative px-2 pt-6 pb-6 sm:px-3 sm:pb-5">
      <div
        data-fx="panel"
        className="relative isolate overflow-hidden rounded-[2rem] bg-ink text-white sm:rounded-[2.5rem]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 -left-24 size-[34rem] rounded-full bg-brand/35 blur-3xl" />
          <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-[#7c69e8]/25 blur-3xl" />
          <div
            data-fx="parallax"
            data-speed="0.5"
            className="absolute top-[8%] -right-[12%] w-[70%] max-w-[56rem] opacity-90 sm:top-[4%] lg:-right-[6%] lg:w-[52%]"
          >
            <Image
              src="/images/home/redesign/ribbon.webp"
              alt=""
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 50vw, 70vw"
              className="w-full"
            />
          </div>
        </div>

        <section
          aria-labelledby="final-cta-title"
          className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-24"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <Eyebrow tone="dark">{FINAL_CTA.eyebrow}</Eyebrow>
              <h2
                id="final-cta-title"
                data-fx="reveal"
                className="mt-6 text-[2.4rem] leading-[1.04] font-bold tracking-[-0.02em] sm:text-6xl lg:text-7xl"
              >
                {FINAL_CTA.title}
              </h2>
              <p
                data-fx="reveal"
                data-delay="0.1"
                className="mt-6 text-xl font-semibold text-white/75"
              >
                {FINAL_CTA.body}
              </p>
              <div
                data-fx="reveal"
                data-delay="0.2"
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <CtaLink href={FINAL_CTA.primary.href} size="lg">
                  {FINAL_CTA.primary.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
                <CtaLink
                  href={FINAL_CTA.secondary.href}
                  variant="light"
                  size="lg"
                >
                  {FINAL_CTA.secondary.label}
                </CtaLink>
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

        {/* footer links: a glass card inside the same panel */}
        <div className="container-page relative">
          <div
            data-fx="reveal"
            className="rounded-[1.75rem] bg-white/[0.04] p-6 ring-1 ring-white/10 backdrop-blur-sm sm:p-10"
          >
            <FooterLinks />
            <FooterLegal className="mt-10 border-t border-white/10 pt-6" />
          </div>
        </div>

        {/* breathing room below the footer card */}
        <div aria-hidden="true" className="h-10 sm:h-16" />
      </div>
    </footer>
  );
}
