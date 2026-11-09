import { Check } from "lucide-react";

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
      {/* Rounded frame: nav + hero + logos share one box */}
      <div className="hero-frame relative isolate rounded-[1.75rem] sm:rounded-[2.5rem]">
      <div className="relative overflow-hidden rounded-[inherit] pt-26 sm:pt-34">
        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
            {/* Left: hero copy */}
            <div className="relative z-10 max-w-2xl text-left">
              {/* Plain text eyebrow (no pill) so it doesn't echo the nav strip above it */}
              <p className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.625rem] font-semibold tracking-[0.16em] text-teal-100/70 uppercase sm:text-[0.6875rem]">
                {eyebrow.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="size-[3px] rounded-full bg-brand"
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

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
                {intro}
              </p>

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
        <div className="relative z-10 mt-12 pt-20 pb-12 lg:-mt-8">
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
