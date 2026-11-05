import { Check, Sparkles } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-button";
import { CLIENT_LOGOS, HERO } from "@/content/home";

import { VideoDialog } from "./video-dialog";
import { WorkflowAnimation } from "./workflow-animation";
// Previous 3D hero animation, kept for reference / easy swap-back:
// import { HeroWorkflow } from "./workflow/hero-workflow";
// <HeroWorkflow className="aspect-4/5 sm:aspect-5/4 lg:absolute lg:-top-40 lg:-bottom-12 lg:-left-28 lg:aspect-auto lg:w-[calc(50vw+7rem)]" />
// (wrapper: "relative -mx-4 sm:-mx-6 lg:mx-0 lg:h-[clamp(34rem,44vw,42rem)]")

/**
 * Logos share one visual weight instead of one height: a fixed height makes wide
 * wordmarks dominate and square marks shrink. Height scales with aspect^-0.4, so
 * a square mark is `--logo-base` tall and a 5:1 wordmark about half that.
 */
function logoScale(width: number, height: number) {
  return Math.pow(width / height, -0.4).toFixed(3);
}

export function Hero() {
  const {
    eyebrow,
    headline,
    intro,
    introOffer,
    primaryCta,
    video,
    features,
  } = HERO;

  return (
    <section
      aria-labelledby="hero-title"
      // Pulled up by the header height so the sticky nav sits inside the framed box.
      className="relative -mt-18 p-2 sm:p-3"
    >
      {/* Rounded frame: nav + hero + logos share one box, with a travelling light on the border */}
      <div className="hero-frame relative isolate rounded-[1.75rem] sm:rounded-[2.5rem]">
      <div className="relative overflow-hidden rounded-[inherit] pt-24 sm:pt-31">
        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
            {/* Left: hero copy */}
            <div className="relative z-10 max-w-2xl text-left">
              <p className="mb-6 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-1.5 text-[0.6875rem] font-bold tracking-[0.1em] text-teal-100 uppercase backdrop-blur sm:text-xs">
                <span className="grid size-6 place-items-center rounded-full bg-white/15 text-white">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                </span>
                {eyebrow.map((item, i) => (
                  <span key={item} className="flex items-center gap-2.5">
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-white/40"
                      />
                    )}
                    {item}
                  </span>
                ))}
              </p>
              <h1
                id="hero-title"
                className="text-[2.35rem] leading-[1.12] font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.08] lg:text-[3.25rem] xl:text-[3.6rem]"
              >
                {headline.lead}{" "}
                <span className="bg-[linear-gradient(100deg,#ff8a3d_10%,#ffb47a_50%,#f1731e_90%)] bg-clip-text text-transparent lg:whitespace-nowrap">
                  {headline.highlight}
                </span>
              </h1>

              <div className="mt-6 max-w-xl space-y-4">
                <p className="text-lg leading-relaxed text-white/75 sm:text-xl">
                  {intro}
                </p>
                <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
                  {introOffer.lead}{" "}
                  <strong className="font-semibold text-white">
                    {introOffer.strong}
                  </strong>
                </p>
              </div>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CtaLink href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </CtaLink>
                <VideoDialog label={video.label} src={video.src} glass />
              </div>

              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/80">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-teal-400/25 text-teal-100 ring-1 ring-teal-300/30">
                      <Check
                        className="size-3"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: one request travelling through the Kimp360 workflow */}
            {/* Wider than its column (bleeds into the right gutter) so the board reads larger */}
            <div className="relative sm:-mx-6 lg:mx-0 lg:-ml-4 lg:w-[calc(100%+8rem)] xl:-ml-6 xl:w-[calc(100%+11rem)]">
              <WorkflowAnimation showCaption={false} />
            </div>
          </div>
        </div>

        {/* Trusted-by logos (live section "clientLogoNewSection") */}
        <div className="relative z-10 mt-12 pt-20 pb-10 lg:-mt-10">
          <h2 className="container-page text-center text-sm font-semibold tracking-wide text-white/85 sm:text-base">
            {CLIENT_LOGOS.title}
          </h2>
          <div className="logo-marquee container-page mt-7 overflow-hidden">
            <div className="logo-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                  className="flex shrink-0 items-center gap-x-14 pr-14 [--logo-base:2.25rem] xl:[--logo-base:2.5rem]"
                >
                  {CLIENT_LOGOS.logos.map((logo) => (
                    <li key={logo.src} className="shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos, nothing to optimise */}
                      <img
                        src={logo.src}
                        alt={copy === 0 ? logo.alt : ""}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                        decoding="async"
                        style={{
                          height: `calc(var(--logo-base) * ${logoScale(logo.width, logo.height)})`,
                        }}
                        // Dark bg: render logos as white silhouettes
                        className="w-auto opacity-60 brightness-0 invert transition hover:opacity-100"
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
