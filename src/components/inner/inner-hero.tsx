import {
  ArrowRight,
  AudioLines,
  BadgeCheck,
  CalendarDays,
  Captions,
  Check,
  Film,
  Layers,
  MousePointer2,
  PenTool,
  Receipt,
  Scissors,
  Quote as QuoteIcon,
  Scale,
  Sparkles,
  Star,
  Trophy,
  X,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { SpeedLines } from "@/components/home/fx/speed-lines";
import { cn } from "@/lib/utils";
import { CtaLink } from "@/components/ui/cta-button";

import "./inner-hero.css";

type Link = { label: string; href: string };
type Logo = { src: string; alt: string; width: number; height: number };

export type InnerHeroProps = {
  /** id of the title element, used by aria-labelledby. */
  id: string;
  eyebrow: string;
  /** `lead` in ink, `highlight` on its own line in brand orange. */
  title: { lead: string; highlight: string };
  /**
   * Heading level of the title. Inner pages keep the level the live page uses
   * (SEO parity), e.g. /graphic-design-services/ has no <h1>, so it passes "h2".
   */
  titleAs?: "h1" | "h2";
  /** Live intro copy, kept on the page under the title. */
  intro: string;
  /** Left out on pages whose live hero has no button (e.g. /kimp360-product-updates/). */
  primaryCta?: Link;
  secondaryCta?: Link;
  /** Extra control after the CTAs, e.g. a "How it works" video button. */
  action?: ReactNode;
  features?: readonly string[];
  /** Giant words drifting across the panel behind the mascot (decorative). */
  marquee: readonly string[];
  /** Panel content: a heading (keeps the live level, h2) and the client-logo strip. */
  band?: { title: string; logos: readonly Logo[]; /** "p" where the live trust line is not a heading (e.g. /compare-service/). */ titleAs?: "h2" | "p" };
  /**
   * Shown instead of `band` on pages whose live hero has no logo strip (so no
   * extra <h2> is added): short promises as a pill row, not headings.
   */
  strip?: readonly string[];
  /**
   * Flying mascot render (decorative). Page-themed versions keep the master
   * character pixel-identical and only add a held prop: see brand/mascot/README.md
   * and scripts/generate-inner-mascots.py.
   */
  mascot?: { src: string; width: number; height: number };
  /** Floating props around the mascot: design-tool UI (default) or video-editor UI. */
  scene?: "design" | "video" | "pricing" | "kimp360" | "reviews" | "compare";
  /** Taller light top area, for heroes without buttons that would otherwise look squat. */
  tall?: boolean;
  /**
   * A page's own floating elements around the mascot (overrides `scene`). Pages
   * build them with the exported <HeroProp>/<HeroStars> helpers, in the page's
   * own component file, so each hero matches its content.
   */
  custom?: HeroScene;
  /** Lift the mascot scene on desktop, for heroes whose text column is tall (buttons + feature row). */
  raise?: boolean;
};

const DEFAULT_MASCOT = { src: "/images/mascot/fly-hero.webp", width: 1448, height: 1086 };

/* Brand-coloured streaks: the mascot half overlaps a white background, where the default white lines vanish. */
const STREAKS = [
  { top: "40%", left: "-34%", width: "40%", delay: 0, color: "#f1731e" },
  { top: "50%", left: "-48%", width: "50%", delay: 0.3, color: "#00806c" },
  { top: "60%", left: "-30%", width: "32%", delay: 0.55, color: "#ff9f55" },
  { top: "70%", left: "-52%", width: "54%", delay: 0.15, color: "#2fc3a5" },
];

/** Same optical sizing the homepage logo strip uses (see home/hero.tsx). */
function logoScale(width: number, height: number) {
  return Math.pow(width / height, -0.4).toFixed(3);
}

/**
 * Hero for inner pages. A light top area (title, intro, CTAs) sits over a
 * dark-teal panel with giant drifting words and the logo strip. The flying
 * mascot, surrounded by design-tool props, bridges the two: it swoops in on
 * load, bobs, trails speed lines and drifts with scroll. All motion is
 * decorative and switches off under prefers-reduced-motion.
 */
export function InnerHero({
  id,
  eyebrow,
  title,
  titleAs: Title = "h1",
  intro,
  primaryCta,
  secondaryCta,
  action,
  features,
  marquee,
  band,
  strip,
  mascot = DEFAULT_MASCOT,
  scene = "design",
  tall = false,
  custom,
  raise = false,
}: InnerHeroProps) {
  return (
    <section
      aria-labelledby={id}
      /* overflow-x-clip: on phones the mascot's decoration layer is wider than the screen; clip it sideways only, so the mascot still hangs down into the panel. */
      className="relative -mt-18 overflow-x-clip px-2 pb-2 sm:px-3 sm:pb-3"
    >
      {/* ---------- light top (z-10: the mascot paints over the panel below) ---------- */}
      <div className="relative isolate z-10 pt-24 sm:pt-28">
        <div
          aria-hidden="true"
          className="fx-dots absolute inset-0 -z-10 [mask-image:radial-gradient(70%_80%_at_50%_30%,#000,transparent)]"
        />

        <div
          className={cn(
            "relative mx-auto grid w-full max-w-[86rem] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-6 lg:px-10",
            tall && "lg:min-h-[28rem]",
          )}
        >
          <div className="relative z-10 lg:pb-6">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink/75 shadow-[0_1px_2px_rgb(27_30_35/0.06)] ring-1 ring-border">
              <span
                aria-hidden="true"
                className="grid size-5 place-items-center rounded-full bg-brand-soft ring-1 ring-brand/25"
              >
                <span className="size-1.5 rounded-full bg-brand" />
              </span>
              {eyebrow}
            </p>
            <Title
              id={id}
              className="mt-6 text-[2.5rem] leading-[1.06] font-bold tracking-[-0.025em] text-ink sm:text-6xl lg:text-[3.6rem] xl:text-[4rem] 2xl:text-[4.1rem]"
            >
              {title.lead}{" "}
              <span className="block text-brand">{title.highlight}</span>
            </Title>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/65">
              {intro}
            </p>

            {(primaryCta || secondaryCta || action) && (
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                {primaryCta && (
                  <CtaLink href={primaryCta.href} size="lg">
                    {primaryCta.label}
                    <ArrowRight aria-hidden="true" />
                  </CtaLink>
                )}
                {secondaryCta && (
                  <CtaLink href={secondaryCta.href} variant="light" size="lg">
                    <CalendarDays aria-hidden="true" />
                    {secondaryCta.label}
                  </CtaLink>
                )}
                {action}
              </div>
            )}
            {features && (
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/70">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-teal-soft text-teal-brand">
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
            )}
          </div>

          {/* the mascot's airspace: it hangs down into the panel */}
          <div
            aria-hidden="true"
            className="relative -mb-32 h-80 sm:-mb-40 sm:h-[26rem] lg:mb-0 lg:h-auto lg:self-stretch"
          >
            <MascotScene mascot={mascot} scene={scene} custom={custom} raise={raise} />
          </div>
        </div>
      </div>

      {/* ---------- dark panel ---------- */}
      {/* Same width as the header bar: the section's px-2/3 plus the header's inner px-4/6/10, so the edges line up with the logo and the trial button. */}
      <div className="hero-frame relative isolate mx-4 mt-8 overflow-hidden rounded-[1.75rem] sm:mx-6 sm:rounded-[2.5rem] lg:mx-10 lg:mt-2">
        {/* Giant words: still at rest, they only slide while the reader scrolls (one motion, not two competing loops). */}
        <div
          aria-hidden="true"
          className="ih-words relative overflow-hidden pt-10 sm:pt-12"
        >
          <p
            data-fx="drift"
            data-distance="14"
            className="flex w-max items-center text-[clamp(3.25rem,8.5vw,8rem)] leading-none font-bold tracking-[-0.03em] whitespace-nowrap uppercase lg:-ml-[4%]"
          >
            {marquee.map((w, i) => (
              <span key={w} className="flex items-center">
                {i > 0 && (
                  <span className="size-[0.12em] rounded-full bg-brand" />
                )}
                <span className="ih-word-fill px-[0.25em]">{w}</span>
              </span>
            ))}
          </p>
        </div>

        {strip && !band && (
          <ul className="container-page relative z-10 flex flex-wrap items-center justify-center gap-2.5 pt-6 pb-10 sm:gap-3 sm:pt-8 sm:pb-12">
            {strip.map((s) => (
              <li
                key={s}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/12"
              >
                <Check className="size-4 text-brand" strokeWidth={3} aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        )}

        {/* Logos: one calm, static row (wraps on small screens); each lights up on hover. */}
        {band && (
        <div className="relative z-10 pt-6 pb-10 sm:pt-8 sm:pb-12">
          <div className="container-page flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"
            />
            {band.titleAs === "p" ? (
              <p className="text-center text-sm font-semibold text-white/80 sm:text-base">{band.title}</p>
            ) : (
              <h2 className="text-center text-sm font-semibold text-white/80 sm:text-base">{band.title}</h2>
            )}
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20"
            />
          </div>
          {/* Phones: a 3 x 3 grid (the tenth logo is dropped there so no row is left with an orphan). */}
          <ul className="container-page mt-8 grid grid-cols-3 place-items-center gap-x-6 gap-y-7 [--logo-base:1.9rem] sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12 xl:gap-x-14 xl:[--logo-base:2.2rem]">
            {band.logos.map((logo, i) => (
              <li
                key={logo.src}
                className={i === 9 ? "hidden shrink-0 sm:block" : "shrink-0"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logos, nothing to optimise */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: `calc(var(--logo-base) * ${logoScale(logo.width, logo.height)})`,
                  }}
                  className="w-auto opacity-55 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </section>
  );
}

const chip =
  "flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-ink shadow-[0_18px_40px_-18px_rgb(27_30_35/0.45)] ring-1 ring-ink/5";

/**
 * Mascot plus design-tool props (selection frame, bezier path, swatches, type,
 * layers, a collaborator cursor). Mascot layers nest so each motion owns its own
 * transform: scroll drift (GSAP parallax) > swoop-in (CSS) > idle bob (CSS).
 */
export type HeroScene = {
  /** Label on the blue selection frame around the mascot. */
  frame: string;
  /** Tag on the wandering cursor; omit to hide the cursor. */
  cursor?: string;
  /** Floating elements: <HeroProp> chips (top-left, mid-left, top-centre and lower-left slots are free of the mascot). */
  props: ReactNode;
};

function MascotScene({
  mascot,
  scene,
  custom,
  raise,
}: {
  mascot: NonNullable<InnerHeroProps["mascot"]>;
  scene: NonNullable<InnerHeroProps["scene"]>;
  custom?: HeroScene;
  raise: boolean;
}) {
  const video = scene === "video";
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 mx-auto w-[min(32rem,92vw)] lg:top-auto lg:right-[-4%] lg:bottom-[-6rem] lg:left-auto lg:w-[112%] xl:w-[106%]",
        // /compare-service/ has a taller text column (buttons + feature row): lift the scene into the open space above.
        (raise || scene === "compare") && "lg:bottom-[4rem]",
      )}
    >
      {/* bezier path with anchor points, drawn behind everything (farthest layer: slowest parallax) */}
      <svg
        data-fx="lift"
        data-lift="180"
        viewBox="0 0 600 450"
        className="absolute inset-0 -z-10 size-full overflow-visible"
        fill="none"
      >
        <path
          d="M30 330 C 150 120, 300 420, 440 170 S 590 90, 600 40"
          stroke="#00806c"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
        <line
          x1="150"
          y1="120"
          x2="30"
          y2="330"
          stroke="#00806c"
          strokeOpacity="0.25"
        />
        <circle
          cx="30"
          cy="330"
          r="6"
          fill="#fff"
          stroke="#00806c"
          strokeWidth="2"
        />
        <circle cx="150" cy="120" r="4" fill="#00806c" />
        <circle
          cx="440"
          cy="170"
          r="6"
          fill="#fff"
          stroke="#f1731e"
          strokeWidth="2"
        />
      </svg>

      <div data-fx="lift" data-lift="420">
        <div className="ih-swoop">
          <div className="cta-fly relative">
            <SpeedLines angle={-22} lines={STREAKS} />
            {/* selection frame, like the object is selected in a design tool */}
            <div className="ih-frame absolute inset-[4%_2%_6%_4%] rounded-sm border-[1.5px] border-dashed border-[#4da3ff]">
              {[
                "-top-1.5 -left-1.5",
                "-top-1.5 -right-1.5",
                "-bottom-1.5 -left-1.5",
                "-right-1.5 -bottom-1.5",
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute ${pos} size-3 rounded-[3px] border-[1.5px] border-[#4da3ff] bg-white`}
                />
              ))}
              <span className="absolute -top-7 left-0 rounded-md bg-[#4da3ff] px-2 py-0.5 text-[0.65rem] font-bold text-white">
                {custom ? custom.frame : video
                  ? "Kimp_Hero.mp4 · 1080p · 00:30"
                  : scene === "pricing"
                    ? "Flat_Fee.plan · No hidden fees"
                    : scene === "kimp360"
                      ? "KIMP360 · Your design HQ"
                      : scene === "reviews"
                        ? "Kimp_Reviews · ★★★★★"
                        : scene === "compare"
                          ? "Kimp vs. Them · Side by side"
                          : `Kimp Hero · ${mascot.width} × ${mascot.height}`}
              </span>
            </div>
            <Image
              src={mascot.src}
              alt=""
              width={mascot.width}
              height={mascot.height}
              priority
              sizes="(min-width: 1024px) 48vw, 92vw"
              quality={90}
              className="relative w-full drop-shadow-[0_40px_40px_rgb(2_31_28/0.35)]"
            />
          </div>
        </div>
      </div>

      {/* floating tool props: all rise on scroll, each by its own amount (bigger lift = nearer layer) */}
      {custom ? (custom.props) : video ? (
        <VideoProps />
      ) : scene === "pricing" ? (
        <PricingProps />
      ) : scene === "kimp360" ? (
        <PlatformProps />
      ) : scene === "reviews" ? (
        <ReviewProps />
      ) : scene === "compare" ? (
        <CompareProps />
      ) : (
        <DesignProps />
      )}

      {/* collaborator cursor: parallax on the wrapper, wandering on the inner element */}
      <div
        data-fx="lift"
        data-lift="960"
        // Not on /compare-service/: it would drift over the fist gripping the scale.
        className={cn("absolute top-[30%] left-[22%] hidden", (custom ? !!custom.cursor : scene !== "compare") && "sm:block")}
      >
        <div className="ih-cursor">
          <MousePointer2 className="size-5 fill-teal-brand text-teal-brand" />
          <span className="ml-4 inline-block rounded-md rounded-tl-none bg-teal-brand px-2 py-0.5 text-[0.65rem] font-bold text-white">
            {custom?.cursor ?? (video
              ? "Your editor"
              : scene === "pricing"
                ? "Your PM"
                : scene === "kimp360"
                  ? "Your team"
                  : scene === "reviews"
                    ? "Happy client"
                    : scene === "compare"
                      ? "Smart switch"
                      : "Your designer")}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Video-editor UI around the mascot (Kimp Video): razor tool, aspect ratios, timecode, timeline tracks. */
function VideoProps() {
  return (
    <>
      <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <Scissors className="size-4" strokeWidth={2.4} />
        </span>
        <span className="text-xs font-bold">Razor tool</span>
      </HeroProp>

      <HeroProp lift={860} delay="-2.6s" className="top-[46%] left-[2%] lg:left-[-8%]" inner="gap-1 px-2">
        {["16:9", "9:16", "1:1"].map((r, k) => (
          <span
            key={r}
            className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold tabular-nums ${k === 1 ? "bg-brand text-white" : "bg-surface text-ink/60"}`}
          >
            {r}
          </span>
        ))}
      </HeroProp>

      <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="flex-col items-start gap-0 px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-xl leading-none font-bold tabular-nums">
          <span className="ih-rec size-2 rounded-full bg-[#ff4d4d]" /> 00:42
        </span>
        <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">REC · 60 fps</span>
      </HeroProp>

      {/* timeline tracks: sits low on the left, clear of the camera and clapperboard */}
      <HeroProp
        lift={760}
        delay="-0.4s"
        className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
        inner="flex-col items-stretch gap-1 px-3 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Film className="size-3.5" /> Timeline
        </span>
        {(
          [
            [Film, "Video", "#f1731e", "70%"],
            [AudioLines, "Audio", "#00806c", "88%"],
            [Captions, "Captions", "#7c69e8", "52%"],
          ] as const
        ).map(([Icon, n, c, w]) => (
          <span key={n} className="flex w-40 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
            <Icon className="size-3 shrink-0" style={{ color: c }} />
            <span className="w-12">{n}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full rounded-full" style={{ width: w, background: c }} />
            </span>
          </span>
        ))}
      </HeroProp>
    </>
  );
}

/** Billing UI around the mascot (/pricing/): flat fee, currencies, an invoice with no extras. */
function PricingProps() {
  return (
    <>
      <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <BadgeCheck className="size-4" strokeWidth={2.4} />
        </span>
        <span className="text-xs font-bold">No contracts</span>
      </HeroProp>

      <HeroProp lift={860} delay="-2.6s" className="top-[46%] left-[2%] lg:left-[-8%]" inner="gap-1 px-2">
        {["USD", "GBP", "EUR", "CAD", "AUD"].map((c, k) => (
          <span
            key={c}
            className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? "bg-brand text-white" : "bg-surface text-ink/60"}`}
          >
            {c}
          </span>
        ))}
      </HeroProp>

      <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="flex-col items-start gap-0 px-3.5 py-2.5">
        <span className="text-xl leading-none font-bold">Flat fee</span>
        <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">Billed every 30 days</span>
      </HeroProp>

      {/* invoice: sits low on the left, clear of the coin */}
      <HeroProp
        lift={760}
        delay="-0.4s"
        className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
        inner="flex-col items-stretch gap-1 px-3 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Receipt className="size-3.5" /> Your invoice
        </span>
        {(
          [
            ["Subscription", "Flat"],
            ["Hidden fees", "$0"],
            ["Extra seats", "$0"],
          ] as const
        ).map(([k, v], i) => (
          <span key={k} className="flex w-40 items-center justify-between rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
            {k}
            <span className={i === 0 ? "text-ink" : "text-teal-brand"}>{v}</span>
          </span>
        ))}
      </HeroProp>
    </>
  );
}

export const HeroStars = ({ size = "size-3.5" }: { size?: string }) => (
  <span className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, k) => (
      <Star key={k} className={`${size} fill-[#f5a623] text-[#f5a623]`} />
    ))}
  </span>
);

/** Review UI around the trophy mascot (/reviews/): verified badge, rating, review sources, a review card. */
function ReviewProps() {
  return (
    <>
      <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <BadgeCheck className="size-4" strokeWidth={2.4} />
        </span>
        <span className="text-xs font-bold">Verified clients</span>
      </HeroProp>

      <HeroProp lift={860} delay="-2.6s" className="top-[46%] left-[2%] lg:left-[-8%]" inner="gap-1 px-2">
        {["Trustpilot", "Google", "Clutch"].map((s, k) => (
          <span key={s} className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? "bg-teal-brand text-white" : "bg-surface text-ink/60"}`}>
            {s}
          </span>
        ))}
      </HeroProp>

      <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="flex-col items-start gap-0 px-3.5 py-2.5">
        <span className="flex items-center gap-2">
          <span className="text-xl leading-none font-bold tabular-nums">4.9</span>
          <HeroStars />
        </span>
        <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">Average rating</span>
      </HeroProp>

      {/* review card: sits low on the left, clear of the trophy */}
      <HeroProp
        lift={760}
        delay="-0.4s"
        className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
        inner="w-48 flex-col items-stretch gap-1.5 px-3 py-2.5"
      >
        <span className="flex items-center justify-between">
          <HeroStars size="size-3" />
          <QuoteIcon className="size-4 fill-brand/15 text-brand" />
        </span>
        <span className="h-1.5 w-full rounded-full bg-ink/10" />
        <span className="h-1.5 w-4/5 rounded-full bg-ink/10" />
        <span className="mt-0.5 flex items-center gap-1.5 text-[0.65rem] font-bold">
          <span className="grid size-5 place-items-center rounded-full bg-brand-soft text-[0.55rem] text-brand">K</span>
          “Design superheroes!”
        </span>
      </HeroProp>
    </>
  );
}

/** Comparison UI around the scale-holding mascot (/compare-service/): winner badge, rivals, a Kimp vs. Them board. */
function CompareProps() {
  const rows = [
    ["Dedicated team", true, false],
    ["Unlimited revisions", true, false],
    ["Flat monthly fee", true, false],
  ] as const;
  return (
    <>
      <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <Trophy className="size-4" strokeWidth={2.4} />
        </span>
        <span className="text-xs font-bold">Kimp wins</span>
      </HeroProp>

      {/* bottom right, by his boots: the left side stays clear of the hero's feature row */}
      <HeroProp lift={860} delay="-2.6s" className="right-[2%] bottom-[10%] hidden sm:block" inner="gap-1 px-2">
        {["Kimp", "Freelancer", "Agency"].map((s, k) => (
          <span key={s} className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${k === 0 ? "bg-brand text-white" : "bg-surface text-ink/45 line-through decoration-ink/30"}`}>
            {s}
          </span>
        ))}
      </HeroProp>

      <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="flex-col items-start gap-0 px-3.5 py-2.5">
        <span className="flex items-center gap-1.5 text-xl leading-none font-bold">
          <Scale className="size-5 text-teal-brand" strokeWidth={2.2} /> Us vs. Them
        </span>
        <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">The honest comparison</span>
      </HeroProp>

      {/* comparison board: mid-left, beside the scale */}
      <HeroProp
        lift={760}
        delay="-0.4s"
        className="top-[40%] left-[-4%] hidden sm:block lg:left-[-16%]"
        inner="flex-col items-stretch gap-1 px-3 py-2.5"
      >
        <span className="grid w-48 grid-cols-[1fr_2rem_2rem] items-center text-[0.6rem] font-bold text-ink/50">
          <span />
          <span className="text-center text-brand">Kimp</span>
          <span className="text-center">Them</span>
        </span>
        {rows.map(([k, us, them]) => (
          <span key={k} className="grid w-48 grid-cols-[1fr_2rem_2rem] items-center rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
            {k}
            <span className="grid place-items-center">{us ? <Check className="size-3.5 text-teal-brand" strokeWidth={3} /> : <X className="size-3.5 text-ink/30" strokeWidth={3} />}</span>
            <span className="grid place-items-center">{them ? <Check className="size-3.5 text-teal-brand" strokeWidth={3} /> : <X className="size-3.5 text-ink/30" strokeWidth={3} />}</span>
          </span>
        ))}
      </HeroProp>
    </>
  );
}

/** KIMP360 UI around the mascot (/kimp360-platform/): AI request, kanban move, feedback pin, brands. */
function PlatformProps() {
  return (
    <>
      <HeroProp lift={680} delay="-1s" className="top-[14%] left-[-12%] hidden sm:block">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <Sparkles className="size-4" strokeWidth={2.4} />
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-bold">AI request</span>
          <span className="text-[0.6rem] font-semibold text-ink/50">Blog graphic · 3 sizes</span>
        </span>
      </HeroProp>

      <HeroProp lift={860} delay="-2.6s" className="top-[46%] left-[2%] lg:left-[-8%]" inner="gap-1.5 px-2.5">
        <span className="rounded-full bg-surface px-2 py-0.5 text-[0.65rem] font-bold text-ink/50">In Progress</span>
        <ArrowRight className="size-3 text-ink/40" />
        <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[0.65rem] font-bold text-teal-brand">In Review</span>
      </HeroProp>

      <HeroProp lift={560} delay="-3.8s" className="top-[-2%] left-[36%]" inner="gap-2 px-3 py-2">
        <span className="grid size-6 place-items-center rounded-full rounded-bl-none bg-brand text-[0.65rem] font-bold text-white">2</span>
        <span className="flex flex-col">
          <span className="text-xs font-bold">Make the logo bigger</span>
          <span className="text-[0.6rem] font-semibold text-ink/50">Feedback pin</span>
        </span>
      </HeroProp>

      {/* brands: low on the left, clear of the laptop */}
      <HeroProp
        lift={760}
        delay="-0.4s"
        className="bottom-[2%] left-[-4%] hidden sm:block lg:bottom-[14%] lg:left-[-14%]"
        inner="flex-col items-stretch gap-1 px-3 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Layers className="size-3.5" /> Your brands
        </span>
        {(
          [
            ["Moshi Marketing", "#f1731e"],
            ["Leafy Shop", "#00806c"],
            ["Northwind", "#7c69e8"],
          ] as const
        ).map(([n, c]) => (
          <span key={n} className="flex w-40 items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold">
            <span className="grid size-4 place-items-center rounded text-[0.5rem] font-bold text-white" style={{ background: c }}>
              {n[0]}
            </span>
            {n}
          </span>
        ))}
      </HeroProp>
    </>
  );
}

/** Design-tool UI around the mascot (default). */
function DesignProps() {
  return (
    <>
      <HeroProp
        lift={680}
        delay="-1s"
        className="top-[14%] left-[-12%] hidden sm:block"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
          <PenTool className="size-4" strokeWidth={2.4} />
        </span>
        <span className="text-xs font-bold">Pen tool</span>
      </HeroProp>

      <HeroProp
        lift={860}
        delay="-2.6s"
        className="top-[46%] left-[2%] lg:left-[-8%]"
        inner="gap-1.5 px-2.5"
      >
        {["#f1731e", "#ffb47a", "#00806c", "#1b1e23", "#7c69e8"].map((c) => (
          <span
            key={c}
            className="size-5 rounded-full ring-2 ring-white"
            style={{ background: c }}
          />
        ))}
      </HeroProp>

      <HeroProp
        lift={560}
        delay="-3.8s"
        className="top-[-2%] left-[36%]"
        inner="flex-col items-start gap-0 px-3.5 py-2.5"
      >
        <span className="text-2xl leading-none font-bold">Aa</span>
        <span className="mt-1 text-[0.65rem] font-semibold text-ink/50">
          Gilroy · Bold
        </span>
      </HeroProp>

      <HeroProp
        lift={760}
        delay="-0.4s"
        className="right-[3%] bottom-[34%] hidden sm:block"
        inner="flex-col items-stretch gap-1 px-3 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-ink/60">
          <Layers className="size-3.5" /> Layers
        </span>
        {[
          ["Mascot", "#f1731e"],
          ["Cape", "#e8434b"],
          ["Background", "#00806c"],
        ].map(([n, c]) => (
          <span
            key={n}
            className="flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[0.65rem] font-semibold"
          >
            <span className="size-2 rounded-sm" style={{ background: c }} />
            {n}
          </span>
        ))}
      </HeroProp>
    </>
  );
}

/**
 * A floating prop. The wrapper takes the scroll lift (GSAP, `lift` px upward
 * over the hero's scroll-out) and the inner card the idle bob (CSS), so the two
 * transforms never fight.
 */
export function HeroProp({
  lift,
  delay,
  className,
  inner = "",
  children,
}: {
  lift: number;
  delay: string;
  className: string;
  inner?: string;
  children: ReactNode;
}) {
  return (
    <div data-fx="lift" data-lift={lift} className={`absolute ${className}`}>
      <div
        className={`${chip} hero2-float ${inner}`}
        style={{ animationDelay: delay }}
      >
        {children}
      </div>
    </div>
  );
}
