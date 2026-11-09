import { ArrowRight, ArrowUpRight, Check, FolderKanban, LayoutDashboard, MessageCircleQuestion, Plus, Quote, Sparkles, Star, Users } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { FaqRichText } from "@/components/faq/faq-rich-text";
import { Eyebrow } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { InfoTip } from "@/components/ui/info-tip";
import {
  ENT_BRAND,
  ENT_CASES,
  ENT_FAQ,
  ENT_INTEGRATIONS,
  ENT_PRICING,
  ENT_SAMPLES,
  ENT_SERVICES,
  ENT_SMARTER,
  ENT_TESTIMONIALS,
  ENT_WHAT_WE_DO,
} from "@/content/enterprise-clients";
import type { FaqItem } from "@/lib/wp/faqs";
import { cn } from "@/lib/utils";

import { WhatWeDoTabs } from "./what-we-do-tabs";

import "./enterprise.css";

/*
 * /enterprise-clients/ sections, in live order, keeping every live heading
 * (including the <h6> kickers and the <h2> plan prices) at its live level.
 */

const H2 = "text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]";

/** Section head: optional live <h6> kicker (styled like the site eyebrow) over the live <h2>. */
function Head({ id, eyebrow, children, intro }: { id: string; eyebrow?: string; children: ReactNode; intro?: string }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      {eyebrow && <Eyebrow as="h6">{eyebrow}</Eyebrow>}
      <h2 id={id} data-fx="reveal" className={cn(H2, eyebrow && "mt-5")}>
        {children}
      </h2>
      {intro && (
        <p data-fx="reveal" data-delay="0.15" className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </header>
  );
}

/** Live banner marquee of design samples (decorative; alt="" on live). */
export function SampleMarquee() {
  const row = [...ENT_SAMPLES, ...ENT_SAMPLES];
  return (
    <section aria-label="Design samples" className="ent-marquee-wrap relative overflow-hidden py-10 sm:py-14">
      <ul className="ent-marquee flex w-max gap-4">
        {row.map((src, i) => (
          <li key={i} aria-hidden={i >= ENT_SAMPLES.length || undefined} className="w-40 shrink-0 overflow-hidden rounded-[1.2rem] ring-1 ring-ink/[0.06] sm:w-52">
            <Image src={src} alt="" width={526} height={622} sizes="13rem" className="w-full" />
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-32" />
    </section>
  );
}

/** Live "Your Brand Deserves The Best" (<h6>) / "Everything You Need to Create High Quality Designs" (<h2>): three <h3> cards. */
export function BrandCards() {
  return (
    <section aria-labelledby="ent-brand-title" className="relative isolate py-20 sm:py-28">
      <div className="container-page">
        <Head id="ent-brand-title" eyebrow={ENT_BRAND.eyebrow}>
          Everything You Need to <br className="hidden sm:block" />
          Create High Quality Designs
        </Head>
        <ul data-fx="stagger" className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {ENT_BRAND.items.map((c) => (
            <li key={c.title} className="flex flex-col overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-ink/[0.06]">
              <div className="flex h-60 items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#fff7f0,#f4f6f9)] p-6">
                <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 24rem, 90vw" className="h-full w-auto max-w-full object-contain" />
              </div>
              <div className="p-7 sm:p-8">
                <h3 className="text-2xl font-bold text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LoopVideo({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-60px_rgb(27_30_35/0.45)]">
      <video src={src} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="aspect-[16/10] w-full object-cover" />
    </div>
  );
}

const SMART_ICONS = { hub: LayoutDashboard, progress: FolderKanban, team: Users } as const;

/** Live "A Smarter, Faster Way to Manage Your Creative Work" (<h2>): two video rows (<h3> each) and three <h3> features. */
export function SmarterWay() {
  const { first, second, items } = ENT_SMARTER;
  return (
    <section aria-labelledby="ent-smarter-title" className="relative isolate bg-surface py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-smarter-title">
          <span className="text-brand">{ENT_SMARTER.titleAccent}</span> Way to <br className="hidden sm:block" />
          Manage Your Creative Work
        </Head>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <LoopVideo src={first.video} />
          <div>
            <h3 className="text-3xl leading-tight font-bold text-ink sm:text-4xl">{first.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/65">{first.body}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {first.points.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink/[0.06]">
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-brand text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <p className="font-semibold text-ink/85">{p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <LoopVideo src={second.video} />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.12em] text-brand uppercase">
              <Sparkles aria-hidden="true" className="size-4" />
              {second.label}
            </span>
            <h3 className="mt-4 text-3xl leading-tight font-bold text-ink sm:text-4xl">{second.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/65">{second.body}</p>
            <CtaLink href={second.cta.href} size="lg" className="mt-8">
              {second.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>

        <ul data-fx="stagger" className="mt-20 grid gap-4 md:grid-cols-3 lg:gap-5">
          {items.map((it) => {
            const Icon = SMART_ICONS[it.icon];
            return (
              <li key={it.title} className="hero-frame relative isolate overflow-hidden rounded-[1.6rem] p-7 text-white sm:p-8">
                <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{it.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{it.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live "At KIMP, We Design It All" (<h6>) / repeat of "Everything You Need to…" (<h2>): six <h3> services. */
export function ServiceGrid() {
  return (
    <section aria-labelledby="ent-services-title" className="relative isolate py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-services-title" eyebrow={ENT_SERVICES.eyebrow}>
          Everything You Need to <br className="hidden sm:block" />
          Create High Quality Designs
        </Head>
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {ENT_SERVICES.items.map((s) => (
            <li key={s.title} className="flex flex-col overflow-hidden rounded-[1.6rem] bg-surface ring-1 ring-ink/[0.06]">
              <div className="p-7 pb-0 sm:p-8 sm:pb-0">
                <h3 className="text-2xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{s.body}</p>
              </div>
              <div className="relative mt-6 flex h-64 flex-1 items-end justify-center overflow-hidden px-6">
                {"strip" in s ? (
                  <div className="flex h-full w-full flex-col justify-center gap-3 overflow-hidden">
                    {s.strip.alts.map((alt, k) => (
                      <div key={alt} className={cn("ent-strip flex w-max", k === 1 && "[animation-direction:reverse]")}>
                        {[0, 1].map((dup) => (
                          <Image
                            key={dup}
                            src={s.strip.src}
                            alt={dup ? "" : alt}
                            width={s.strip.width}
                            height={s.strip.height}
                            sizes="60rem"
                            className="h-20 w-auto max-w-none"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : s.images.length === 2 ? (
                  <>
                    <Image src={s.images[0].src} alt={s.images[0].alt} width={s.images[0].width} height={s.images[0].height} sizes="16rem" className="absolute top-0 left-6 w-44 rounded-t-xl shadow-xl" />
                    <Image src={s.images[1].src} alt={s.images[1].alt} width={s.images[1].width} height={s.images[1].height} sizes="9rem" className="absolute right-6 bottom-3 w-28 rounded-xl shadow-[0_20px_60px_rgb(0_0_0/0.35)]" />
                  </>
                ) : (
                  <Image src={s.images[0].src} alt={s.images[0].alt} width={s.images[0].width} height={s.images[0].height} sizes="(min-width: 1024px) 22rem, 80vw" className="max-h-full w-auto object-contain" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "Enjoy Premium Designs" (<h6>) + case-study <h2>: a swipeable rail of twelve client cards (<h3>), each opening its case study. */
export function CaseRail() {
  return (
    <section aria-labelledby="ent-cases-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-cases-title" eyebrow={ENT_CASES.eyebrow}>
          {ENT_CASES.title}
        </Head>
      </div>
      <ul className="ent-rail mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-px-4 sm:gap-5 sm:px-6 sm:scroll-px-6 lg:px-10 lg:scroll-px-10 xl:px-20 xl:scroll-px-20">
        {ENT_CASES.items.map((c) => (
          <li key={c.name} className="w-[82vw] max-w-[22rem] shrink-0 snap-start">
            <a
              href={c.href}
              target="_blank"
              className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-ink/[0.06] transition-shadow hover:shadow-[0_30px_60px_-40px_rgb(27_30_35/0.5)]"
            >
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image src={c.cover} alt="" fill sizes="22rem" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="flex items-center justify-between gap-3 text-xl font-bold text-ink">
                  {c.name}
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink/40 transition-colors group-hover:text-brand" />
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink/65">{c.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {c.tags.map((t, k) => (
                    <li key={k} className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink/65">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Live pricing (id="pricing", the hero's "Learn More" target): per plan an <h3> name with the old price inside, and an <h2> price. */
export function EnterprisePricing() {
  return (
    <section id="pricing" aria-labelledby="ent-pricing-title" className="relative isolate scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-pricing-title">
          <span className="text-brand">{ENT_PRICING.titleAccent}</span> How You <br className="hidden sm:block" />
          Manage Design Projects
        </Head>
        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-start">
          {ENT_PRICING.plans.map((p) => {
            const dark = "featured" in p;
            return (
              <li
                key={p.name}
                className={cn(
                  "relative isolate flex flex-col overflow-hidden rounded-[1.8rem] p-7 sm:p-9",
                  dark ? "hero-frame text-white lg:-mt-4" : "bg-white text-ink ring-1 ring-ink/[0.08]",
                )}
              >
                <h3 className="flex flex-wrap items-baseline justify-between gap-2 text-xl font-bold">
                  {p.name}
                  <span className={cn("text-base font-semibold line-through", dark ? "text-white/45" : "text-ink/35")}>{p.was}</span>
                </h3>
                <h2 className="mt-5 text-5xl font-bold tracking-[-0.02em] tabular-nums">
                  {p.price}
                  <span className={cn("ml-1 text-lg font-semibold tracking-normal", dark ? "text-white/60" : "text-ink/50")}>{p.per}</span>
                </h2>
                <div className="mt-4 self-start rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">{p.save}</div>
                <div aria-hidden="true" className={cn("my-7 h-px", dark ? "bg-white/15" : "bg-border")} />
                <ul className="grid gap-3">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <span aria-hidden="true" className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", dark ? "bg-brand text-white" : "bg-teal-soft text-teal-brand")}>
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className={dark ? "text-white/85" : "text-ink/80"}>
                        {f.label}
                        {"tip" in f && f.tip && <InfoTip text={f.tip} label={f.label} tone={dark ? "dark" : "light"} className="ml-1.5" />}
                      </span>
                    </li>
                  ))}
                </ul>
                <CtaLink href={ENT_PRICING.cta.href} variant={dark ? "primary" : "dark"} size="lg" className="mt-9">
                  {ENT_PRICING.cta.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live "Get Unlimited Graphics, Videos & Development Work Done" (<h2>) with the Graphics / Dev / Videos tabs. */
export function WhatWeDo() {
  return (
    <section aria-labelledby="ent-wwd-title" className="relative isolate bg-surface py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-wwd-title" intro={ENT_WHAT_WE_DO.intro}>
          Get Unlimited Graphics, <br className="hidden sm:block" />
          Videos &amp; Development Work Done
        </Head>
        <WhatWeDoTabs />
      </div>
    </section>
  );
}

/** Live "Testimonials" (<h6>) / "What Clients Say" (<h2>): three quotes, names in <h3>. */
export function Testimonials() {
  return (
    <section aria-labelledby="ent-testimonials-title" className="relative isolate py-24 sm:py-32">
      <div className="container-page">
        <Head id="ent-testimonials-title" eyebrow={ENT_TESTIMONIALS.eyebrow} intro={ENT_TESTIMONIALS.intro}>
          {ENT_TESTIMONIALS.title}
        </Head>
        <ul data-fx="stagger" className="mt-14 grid gap-4 lg:grid-cols-3 lg:gap-5">
          {ENT_TESTIMONIALS.items.map((t) => (
            <li key={t.name} className="flex flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-8">
              <div className="flex items-center justify-between">
                <div role="img" aria-label="star rating" className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} aria-hidden="true" className="size-4 fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <Quote aria-hidden="true" className="size-7 text-brand/60" />
              </div>
              <p className="mt-5 flex-1 leading-relaxed text-ink/75">{t.quote}</p>
              <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny static logo, as on live */}
                <img src={t.logo.src} alt={t.logo.alt} width={72} height={40} loading="lazy" className="h-10 w-auto" />
                <div>
                  <h3 className="font-bold text-ink">{t.name}</h3>
                  <p className="text-sm text-ink/55">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "Integrations" (<h6>) + <h2>, the tool logos and the line under them. */
export function Integrations() {
  return (
    <section aria-labelledby="ent-integrations-title" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] py-20 sm:rounded-[3rem] sm:py-28">
        <div className="container-page text-center">
          <Eyebrow as="h6" tone="dark">
            {ENT_INTEGRATIONS.eyebrow}
          </Eyebrow>
          <h2 id="ent-integrations-title" data-fx="reveal" className="mx-auto mt-5 max-w-4xl text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-white sm:text-5xl">
            Easily centralize the platforms, people, <br className="hidden md:block" />
            and processes your team uses
          </h2>
          <ul data-fx="stagger" className="mx-auto mt-12 grid max-w-2xl grid-cols-5 gap-3 sm:gap-4">
            {ENT_INTEGRATIONS.logos.map((src) => (
              <li key={src} className="grid aspect-square place-items-center rounded-2xl bg-white p-3 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)] sm:rounded-3xl sm:p-5">
                {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo; alt="" as on live */}
                <img src={src} alt="" width={64} height={64} loading="lazy" className="size-full max-h-14 object-contain" />
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/75">{ENT_INTEGRATIONS.body}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Live FAQs (<h2>): every WordPress question (<h4>) and answer as native
 * <details> (works without JS, stays crawlable), "Read All FAQs", and the
 * "Still have questions?" (<h3>) card.
 */
export function EnterpriseFaq({ items }: { items: FaqItem[] | null }) {
  const { help } = ENT_FAQ;
  return (
    <section aria-labelledby="ent-faq-title" className="relative isolate overflow-clip bg-surface py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
        <div>
          <h2 id="ent-faq-title" data-fx="reveal" className={H2}>
            {ENT_FAQ.title}
          </h2>
          {items && items.length > 0 ? (
            <div className="mt-10 space-y-3">
              {items.map((item, i) => (
                <details
                  key={item.q}
                  name="ent-faq"
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
            <p className="mt-10 rounded-[1.4rem] bg-white p-6 text-ink/65 ring-1 ring-border">
              We couldn’t load the questions right now. Please see all our answers on the FAQ page.
            </p>
          )}
          <CtaLink href={ENT_FAQ.cta.href} size="lg" className="mt-10">
            {ENT_FAQ.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="hero-frame relative isolate overflow-hidden rounded-[1.8rem] p-8 text-white sm:p-10">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <MessageCircleQuestion className="size-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{help.title}</h3>
            <p className="mt-3 leading-relaxed text-white/75">{help.body}</p>
            <CtaLink href={help.cta.href} variant="light" size="lg" className="mt-8">
              {help.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </aside>
      </div>
    </section>
  );
}
