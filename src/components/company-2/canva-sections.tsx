import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock,
  Headset,
  LayoutGrid,
  LayoutPanelLeft,
  PenTool,
  Plus,
  Repeat,
  Star,
  Tag,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import { FaqRichText } from "@/components/faq/faq-rich-text";
import { Eyebrow, SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { InfoTip } from "@/components/ui/info-tip";
import {
  CV_CALL_BANNER,
  CV_FAQ,
  CV_OTHER,
  CV_PERKS,
  CV_PLANS,
  CV_SAMPLES,
  CV_TEAM,
  CV_TESTIMONIALS,
  CV_VIDEOS,
  CV_WHY,
  type CanvaIcon,
} from "@/content/canva-designers";
import type { FaqItem } from "@/lib/wp/faqs";
import { cn } from "@/lib/utils";

import { CanvaTabs } from "./canva-tabs";
import { LoopVideo } from "./loop-video";

/*
 * /canva-designers/ sections, in the live order, with the live heading levels
 * (see src/content/canva-designers.ts). Interactive bits (tabs, looping
 * videos) live in their own client components.
 */

const ICONS: Record<CanvaIcon, LucideIcon> = {
  users: Users,
  revisions: Repeat,
  timer: Timer,
  tag: Tag,
  pen: PenTool,
  layout: LayoutPanelLeft,
  grid: LayoutGrid,
  headset: Headset,
  star: BadgeCheck,
};

const TINTS = ["#f1731e", "#00806c", "#7c69e8", "#4da3ff", "#e89a00", "#ff5c8a"] as const;

const lines = (ls: readonly string[]) =>
  ls.map((l, i) => (
    <span key={l}>
      {i > 0 && <br className="hidden sm:block" />}
      {i > 0 && " "}
      {l}
    </span>
  ));

function IconCards({ items, cols }: { items: readonly { icon: CanvaIcon; title: string; body: string }[]; cols: "4" | "3" }) {
  return (
    <ul data-fx="stagger" className={cn("mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:gap-5", cols === "4" ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {items.map((it, i) => {
        const Icon = ICONS[it.icon];
        const tint = TINTS[i % TINTS.length];
        return (
          <li
            key={it.title}
            style={{ ["--tint" as string]: tint }}
            className="group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white p-7 ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_var(--tint)] sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-16 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `color-mix(in oklab, ${tint} 25%, transparent)` }}
            />
            <div className="flex items-start justify-between">
              <span
                aria-hidden="true"
                className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--tint)_12%,white)] text-(--tint) ring-1 ring-[color-mix(in_oklab,var(--tint)_25%,white)]"
              >
                <Icon className="size-6" strokeWidth={2.2} />
              </span>
              <span aria-hidden="true" className="text-sm font-bold text-ink/25 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-8 text-xl font-bold text-ink">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/60">{it.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Live first "perks_section": why choose KIMP (four <h3>). */
export function CanvaWhy() {
  return (
    <section aria-labelledby="cv-why-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="cv-why-title" eyebrow={CV_WHY.eyebrow} title={CV_WHY.title} align="center" twoTone={false} />
        <IconCards items={CV_WHY.items} cols="4" />
      </div>
    </section>
  );
}

/** Live "clientsay_section": four client cards (name <h3>, company, stars, quote) and "View All Reviews". */
export function CanvaTestimonials() {
  const t = CV_TESTIMONIALS;
  return (
    <section aria-labelledby="cv-testimonials-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="cv-testimonials-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {t.items.map((c) => (
            <li key={c.name} className="flex flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-8">
              <div className="flex items-center gap-4">
                <Image src={c.avatar} alt="" width={48} height={48} className="size-12 rounded-full" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-ink">{c.name}</h3>
                  <p className="text-sm text-ink/55">{c.company}</p>
                </div>
                <div role="img" aria-label="5 out of 5 stars" className="flex shrink-0 gap-0.5">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} aria-hidden="true" className="size-4 fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink/70">{c.quote}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <CtaLink href={t.cta.href} variant="dark" size="lg">
            {t.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/** Live second "perks_section": KIMP Perks (six <h3>). */
export function CanvaPerks() {
  return (
    <section aria-labelledby="cv-perks-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="container-page">
        <SectionHeading id="cv-perks-title" eyebrow={CV_PERKS.eyebrow} title={CV_PERKS.title} intro={lines(CV_PERKS.introLines)} />
        <IconCards items={CV_PERKS.items} cols="3" />
      </div>
    </section>
  );
}

/** Live "whatwedo-section": <h2>, the team line and the graphics / videos tabs (an <h4> in each). */
export function CanvaTeam() {
  return (
    <section aria-labelledby="cv-team-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="cv-team-title" eyebrow={CV_TEAM.eyebrow} title={CV_TEAM.title} intro={lines(CV_TEAM.introLines)} align="center" twoTone={false} />
        <CanvaTabs tabs={CV_TEAM.tabs} />
      </div>
    </section>
  );
}

/** Live "addcanva_banner_section": <h2> + Book A Call, on the dark hero panel style. */
export function CanvaCallBanner() {
  const b = CV_CALL_BANNER;
  return (
    <section aria-labelledby="cv-banner-title" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
        <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="container-page flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-white">
            <h2 id="cv-banner-title" data-fx="reveal" className="text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] sm:text-5xl">
              {b.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">{lines(b.bodyLines)}</p>
          </div>
          <CtaLink href={b.cta.href} target="_blank" rel="noopener" size="lg" className="self-start lg:self-center">
            <CalendarDays aria-hidden="true" />
            {b.cta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/** Live "pricepage_f_section" (#plans-pricing): two plan cards (<h3>) and the enterprise card (<h2>). */
export function CanvaPlans() {
  const p = CV_PLANS;
  return (
    <section id="canvaprice" aria-labelledby="cv-plans-title" className="relative isolate scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-32">
      <div id="plans-pricing" className="container-page scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="cv-plans-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {p.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">
            {p.intro.before}
            <b className="font-bold text-ink">{p.intro.bold}</b>
            {p.intro.after}
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-2">
          {p.plans.map((plan, i) => {
            const featured = "badge" in plan;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-[2rem] p-8 ring-1 sm:p-10",
                  featured ? "bg-ink text-white ring-ink shadow-[0_40px_70px_-40px_rgb(27_30_35/0.8)]" : "bg-white text-ink ring-border",
                )}
              >
                {featured && (
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                    <div className="absolute -top-24 -right-24 size-72 rounded-full bg-brand/30 blur-3xl" />
                  </div>
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className={cn("grid size-12 place-items-center rounded-2xl", featured ? "bg-brand text-white" : "bg-brand-soft text-brand")}
                  >
                    {i === 0 ? <PenTool className="size-6" /> : <Clock className="size-6" />}
                  </span>
                  {featured && <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">{plan.badge}</span>}
                </div>
                <h3 className="relative mt-7 text-3xl font-bold">{plan.name}</h3>
                <p className={cn("relative mt-3 leading-relaxed", featured ? "text-white/70" : "text-ink/65")}>{plan.body}</p>
                <ul className={cn("relative mt-7 flex-1 space-y-3 border-t pt-7", featured ? "border-white/10" : "border-border")}>
                  {plan.features.map((f) => {
                    const label = typeof f === "string" ? f : f.label;
                    return (
                      <li key={label} className="flex items-start gap-3 text-[0.95rem] font-medium">
                        <span
                          aria-hidden="true"
                          className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", featured ? "bg-white/10 text-brand" : "bg-teal-soft text-teal-brand")}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className={featured ? "text-white/85" : "text-ink/80"}>
                          {label}
                          {typeof f !== "string" && <InfoTip text={f.tip} label={label} tone={featured ? "dark" : "light"} className="ml-1.5" />}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <CtaLink href={plan.cta.href} variant={featured ? "primary" : "dark"} size="lg" className="relative mt-9 w-full">
                  {plan.cta.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
              </div>
            );
          })}

          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 text-center ring-1 ring-brand/15 sm:p-10 lg:col-span-2 lg:flex-row lg:text-left">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">{p.enterprise.title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">{p.enterprise.body}</p>
            </div>
            <CtaLink href={p.enterprise.cta.href} target="_blank" rel="noopener" variant="dark" size="lg">
              {p.enterprise.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "support_section": the Adobe / other subscriptions prompt (<h2>). */
export function CanvaOtherSubscriptions() {
  return (
    <section aria-labelledby="cv-other-title" className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-teal-brand px-8 py-12 text-center text-white sm:px-14 sm:py-16">
          <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 opacity-20" />
          <h2 id="cv-other-title" data-fx="reveal" className="mx-auto max-w-4xl text-2xl leading-snug font-bold sm:text-[2.1rem]">
            {CV_OTHER.title}
          </h2>
          <CtaLink href={CV_OTHER.cta.href} size="lg" className="mt-9 max-w-full whitespace-normal">
            {CV_OTHER.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/** Live "videoSamples_section": nine muted, looping Canva clips. */
export function CanvaVideos() {
  const v = CV_VIDEOS;
  return (
    <section aria-labelledby="cv-videos-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="cv-videos-title" eyebrow={v.eyebrow} title={v.title} intro={v.intro} twoTone={false} />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {v.items.map((it) => (
            <li key={it.src} className="overflow-hidden rounded-[1.5rem] bg-ink p-1.5 ring-1 ring-ink/10">
              <LoopVideo src={it.src} poster={it.poster} className="aspect-[350/237] w-full rounded-[1.1rem] object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "Canva Graphic Design Samples": the 44 slider images, here two rows drifting in opposite directions. */
export function CanvaSamples() {
  const s = CV_SAMPLES;
  const half = Math.ceil(s.images.length / 2);
  const rows = [s.images.slice(0, half), s.images.slice(half)];
  return (
    <section aria-labelledby="cv-samples-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="cv-samples-title" eyebrow={s.eyebrow} title={s.title} intro={lines(s.introLines)} align="center" twoTone={false} />
      </div>
      <div className="mt-14 space-y-5 sm:mt-16">
        {rows.map((row, r) => (
          <div key={r} className="review-marquee overflow-hidden py-2">
            <div className={cn("logo-marquee-track flex w-max", r === 1 && "[animation-direction:reverse]")} style={{ animationDuration: `${120 + r * 16}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-5 pr-5">
                  {row.map((src) => (
                    <li key={src} className="size-56 shrink-0 overflow-hidden rounded-[1.5rem] bg-white p-1.5 ring-1 ring-border transition-transform duration-500 hover:-translate-y-1 sm:size-72">
                      {/* eslint-disable-next-line @next/next/no-img-element -- WordPress uploads (template slider), shown as on live */}
                      <img src={src} alt="" loading="lazy" decoding="async" className="size-full rounded-[1.1rem] object-cover" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Live "faq-section": <h2> FAQs, one <h4> per question; questions and answers come from WordPress. */
export function CanvaFaq({ items }: { items: FaqItem[] | null }) {
  return (
    <section aria-labelledby="cv-faq-title" className="relative isolate overflow-clip bg-surface py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="cv-faq-title" eyebrow={CV_FAQ.eyebrow} title={CV_FAQ.title} align="left" />
          <a href={CV_FAQ.cta.href} className="group mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-brand">
            {CV_FAQ.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
        {items ? (
          <div className="min-w-0 space-y-3">
            {items.map((item, i) => (
              <details
                key={item.q}
                name="cv-faq"
                className="group rounded-[1.4rem] bg-white ring-1 ring-border transition-[box-shadow] open:shadow-[0_24px_44px_-30px_rgb(27_30_35/0.4)] open:ring-brand/30"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-6 py-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                  <span aria-hidden="true" className="w-7 shrink-0 text-sm font-bold text-ink/30 tabular-nums transition-colors group-open:text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="flex-1 text-lg font-bold text-ink">{item.q}</h4>
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white"
                  >
                    <Plus className="size-4" strokeWidth={2.5} />
                  </span>
                </summary>
                <div className="px-6 pb-6 sm:pl-[4.25rem]">
                  <FaqRichText nodes={item.a} />
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="rounded-[1.75rem] bg-white px-6 py-16 text-center text-lg text-ink/70">{CV_FAQ.unavailable}</p>
        )}
      </div>
    </section>
  );
}
