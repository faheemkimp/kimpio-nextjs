import { Check, Sparkles } from "lucide-react";

import { SecondaryHeader } from "@/components/layout/secondary-header";
import { CtaLink } from "@/components/ui/cta-button";
import { HERO } from "@/content/home";
import { TRUST_BADGE } from "@/content/home-secondary";

import { VideoDialog } from "../video-dialog";
import { HeroIllustration } from "./hero-scene";

/**
 * Secondary hero: a framed card holding its own header, the main hero copy
 * (same content as the home hero) centered, and a flat illustration of design
 * cards and ribbons flowing into a monitor, in Kimp orange and teal.
 */
export function HeroSecondary() {
  const { headline, intro, primaryCta, video, features } = HERO;

  return (
    <div className="bg-[#f2f0ec] p-2 sm:p-4">
      <section
        aria-labelledby="hero2-title"
        className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#fbfaf8] ring-1 ring-ink/5 sm:rounded-[2.25rem]"
      >
        <SecondaryHeader />

        <div className="relative z-20 mx-auto max-w-5xl px-5 pt-10 text-center sm:pt-8 lg:-mt-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.85rem] font-semibold text-teal-brand shadow-[0_1px_2px_rgb(27_30_35/0.05)] ring-1 ring-ink/6">
            <span className="size-1.5 rounded-full bg-brand" />
            {TRUST_BADGE}
          </span>

          <h1
            id="hero2-title"
            className="mt-6 text-[2.35rem] leading-[1.08] font-bold tracking-tight text-ink sm:text-6xl sm:leading-[1.05] lg:text-[3.75rem]"
          >
            {headline.lead}
            <br className="hidden sm:block" />{" "}
            <span className="relative mt-1 inline-flex items-center gap-3 sm:whitespace-nowrap">
              <span
                aria-hidden="true"
                className="hidden size-12 rotate-[-8deg] place-items-center rounded-2xl bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_4px_0_#b84d08,0_12px_24px_-8px_rgb(241_115_30/0.6)] sm:grid lg:size-14"
              >
                <Sparkles className="size-6 lg:size-7" />
              </span>
              <span className="bg-[linear-gradient(100deg,#f1731e_10%,#ff9a4d_50%,#d85f0d_90%)] bg-clip-text text-transparent">
                {headline.highlight}
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{intro}</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </CtaLink>
            <VideoDialog label={video.label} src={video.src} />
          </div>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink/75">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-teal-brand text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <HeroIllustration />
      </section>
    </div>
  );
}
