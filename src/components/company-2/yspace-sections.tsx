import { ArrowRight, Check, Headset, Mail, MapPin, Phone, Quote } from "lucide-react";
import Image from "next/image";

import { Eyebrow } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { GDS_WORK } from "@/content/graphic-design-services";
import { YS_PARTNER, YS_UI } from "@/content/yspace";
import type { YspaceContent } from "@/lib/wp/yspace";
import { cn } from "@/lib/utils";

/*
 * /yspace/ sections. The copy comes from the WordPress editor content
 * (lib/wp/yspace.ts) and keeps the live heading levels: <h4> lead, <h5>
 * features, <h2> + <h4> steps, <h2> samples, <h2> pricing with <h3>
 * testimonials and an <h4> support line. Images are the page's own uploads.
 */

const TINTS = ["#f1731e", "#00806c", "#7c69e8", "#4da3ff"] as const;

/** Live "scale" block: the <h4> lead line and four <h5> promises. */
export function YsFeatures({ intro }: { intro: YspaceContent["intro"] }) {
  return (
    <section aria-labelledby="ys-lead" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>{YS_UI.featuresEyebrow}</Eyebrow>
          <h4 id="ys-lead" data-fx="reveal" className="mt-6 text-2xl leading-snug font-bold tracking-[-0.01em] text-ink sm:text-[2.1rem]">
            {intro.lead}
          </h4>
        </div>
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {intro.features.map((f, i) => (
            <li
              key={f.title}
              style={{ ["--tint" as string]: TINTS[i % TINTS.length] }}
              className="group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white p-7 ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_var(--tint)]"
            >
              <div className="flex items-start justify-between">
                <span aria-hidden="true" className="grid size-16 place-items-center rounded-2xl bg-[color-mix(in_oklab,var(--tint)_10%,white)] ring-1 ring-[color-mix(in_oklab,var(--tint)_22%,white)]">
                  {f.icon && (
                    // eslint-disable-next-line @next/next/no-img-element -- WordPress upload from the editor content (small icon)
                    <img src={f.icon.src} alt="" width={f.icon.width} height={f.icon.height} loading="lazy" className="h-9 w-auto" />
                  )}
                </span>
                <span aria-hidden="true" className="text-sm font-bold text-ink/25 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h5 className="mt-8 text-xl font-bold text-ink">{f.title}</h5>
              <p className="mt-3 leading-relaxed text-ink/60">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "howitworks": <h2> and three illustrated <h4> steps joined by a dashed path. */
export function YsSteps({ steps }: { steps: YspaceContent["steps"] }) {
  return (
    <section aria-labelledby="ys-steps-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{YS_UI.stepsEyebrow}</Eyebrow>
          <h2 id="ys-steps-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {steps.title}
          </h2>
        </div>
        <ol className="relative mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          <span aria-hidden="true" className="absolute top-[6.5rem] right-[16%] left-[16%] hidden border-t-2 border-dashed border-brand/30 md:block" />
          {steps.items.map((s, i) => (
            <li key={s.lines.join(" ")} data-fx="reveal" data-delay={String(i * 0.1)} className="relative flex flex-col items-center rounded-[1.75rem] bg-white px-7 pt-8 pb-9 text-center ring-1 ring-border">
              <span className="absolute top-5 left-5 grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-white shadow-[0_3px_0_#b84d08]">
                {i + 1}
              </span>
              <div aria-hidden="true" className="relative grid h-44 w-full place-items-center">
                <span className="absolute size-40 rounded-full bg-[radial-gradient(circle,#fff1e7,transparent_70%)]" />
                {s.image && (
                  // eslint-disable-next-line @next/next/no-img-element -- WordPress upload from the editor content
                  <img src={s.image.src} alt="" width={s.image.width} height={s.image.height} loading="lazy" className="relative h-40 w-auto" />
                )}
              </div>
              <h4 className="mt-6 text-2xl leading-tight font-bold text-ink">
                {s.lines.map((l, k) => (
                  <span key={l}>
                    {k > 0 && <br />}
                    {l}
                  </span>
                ))}
              </h4>
              <p className="mt-3 max-w-xs leading-relaxed text-ink/60">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Live "kimp-samples": <h2>, intro and "View More". The live grid is a broken
 * shortcode that renders nothing, so the strip shows the same Kimp samples as
 * /graphic-design-services/ (decorative).
 */
export function YsSamples({ samples }: { samples: YspaceContent["samples"] }) {
  const rows = [GDS_WORK.samples.slice(0, 8), GDS_WORK.samples.slice(8)];
  return (
    <section aria-labelledby="ys-samples-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{YS_UI.samplesEyebrow}</Eyebrow>
          <h2 id="ys-samples-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {samples.title}
          </h2>
          {samples.intro && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">{samples.intro}</p>}
        </div>
      </div>
      <div aria-hidden="true" className="mt-14 space-y-5">
        {rows.map((row, r) => (
          <div key={r} className="review-marquee overflow-hidden py-2">
            <div className={cn("logo-marquee-track flex w-max", r === 1 && "[animation-direction:reverse]")} style={{ animationDuration: `${70 + r * 12}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 gap-5 pr-5">
                  {row.map((s) => {
                    const wide = s.width / s.height > 1.6;
                    return (
                      <li key={s.src} className={cn("h-52 shrink-0 overflow-hidden rounded-[1.5rem] bg-white p-1.5 ring-1 ring-border sm:h-64", wide ? "w-[26rem] sm:w-[32rem]" : "w-52 sm:w-64")}>
                        <Image src={s.src} alt="" width={s.width} height={s.height} sizes={wide ? "32rem" : "16rem"} className="size-full rounded-[1.1rem] object-cover" />
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
      {samples.more && (
        <div className="mt-12 flex justify-center">
          <CtaLink href={samples.more.href} variant="dark" size="lg">
            {samples.more.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      )}
    </section>
  );
}

/** Live "free-trial": <h2> pricing, the testimonial slider (<h3> per client), <h4> support line and the price box. */
export function YsPricing({ pricing }: { pricing: YspaceContent["pricing"] }) {
  return (
    <section id="pricing" aria-labelledby="ys-pricing-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{YS_UI.pricingEyebrow}</Eyebrow>
          <h2 id="ys-pricing-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {pricing.title}
          </h2>
          {pricing.intro && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/60">{pricing.intro}</p>}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-8">
          <div className="min-w-0">
            <ul className="grid gap-4 sm:grid-cols-2">
              {pricing.testimonials.map((t) => (
                <li key={t.name} className="flex flex-col rounded-[1.6rem] bg-white p-6 ring-1 ring-border">
                  <Quote aria-hidden="true" className="size-7 fill-brand/10 text-brand" />
                  <p className="mt-4 flex-1 leading-relaxed text-ink/70">
                    {t.quote.map((l, k) => (
                      <span key={k}>
                        {k > 0 && <br />}
                        {l}
                      </span>
                    ))}
                  </p>
                  <h3 className="mt-5 flex flex-col text-base font-bold text-ink">
                    {t.name} <span className="text-sm font-medium text-ink/50">{t.company}</span>
                  </h3>
                </li>
              ))}
            </ul>
            {pricing.support && (
              <div className="mt-4 flex items-start gap-4 rounded-[1.6rem] bg-ink p-6 text-white sm:p-7">
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand">
                  <Headset className="size-6" />
                </span>
                <div>
                  <h4 className="text-xl font-bold">{pricing.support.title}</h4>
                  <p className="mt-1.5 leading-relaxed text-white/70">{pricing.support.body}</p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 ring-2 ring-brand/40 shadow-[0_40px_70px_-45px_rgb(241_115_30/0.7)] sm:p-10">
              <div aria-hidden="true" className="absolute -top-20 -right-20 size-56 rounded-full bg-brand/15 blur-3xl" />
              {pricing.price && (
                <p className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-5xl font-bold tracking-[-0.02em] text-ink tabular-nums">{pricing.price.now}</span>
                  {pricing.price.was && <s className="text-xl font-semibold text-ink/40 tabular-nums">{pricing.price.was}</s>}
                </p>
              )}
              {pricing.body && <p className="relative mt-4 text-lg leading-relaxed text-ink/70">{pricing.body}</p>}
              <ul className="relative mt-7 space-y-3 border-t border-border pt-7">
                {pricing.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-medium text-ink/80">
                    <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-brand">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {pricing.cta && (
                <CtaLink href={pricing.cta.href} size="lg" className="mt-9 w-full">
                  {pricing.cta.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live landing footer ("footer-yspace"): partner logo, contact and address, each under its live <h4>. */
export function YsPartner() {
  const { collab, contact, address } = YS_PARTNER;
  return (
    <section aria-label={collab.title} className="py-20 sm:py-24">
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex flex-col justify-between gap-6 rounded-[1.75rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 ring-1 ring-brand/15">
            <Eyebrow>{YS_UI.partnerEyebrow}</Eyebrow>
            <div>
              <h4 className="text-2xl font-bold text-ink">{collab.title}</h4>
              <a href={collab.href} target="_blank" rel="noopener" className="mt-5 inline-block rounded-2xl bg-white p-4 ring-1 ring-border transition hover:ring-brand/40">
                <Image src={collab.logo.src} alt={collab.logo.alt} width={collab.logo.width} height={collab.logo.height} className="h-12 w-auto" />
              </a>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white p-8 ring-1 ring-border">
            <h4 className="text-2xl font-bold text-ink">{contact.title}</h4>
            <ul className="mt-5 space-y-3">
              {contact.links.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-3 font-semibold text-ink/75 transition hover:text-brand">
                    <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-surface text-brand">
                      {i === 0 ? <Mail className="size-4" /> : <Phone className="size-4" />}
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] bg-white p-8 ring-1 ring-border">
            <h4 className="text-2xl font-bold text-ink">{address.title}</h4>
            <p className="mt-5 flex gap-3 leading-relaxed text-ink/70">
              <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface text-brand">
                <MapPin className="size-4" />
              </span>
              <span>
                {address.lines.map((l, i) => (
                  <span key={l}>
                    {i > 0 && <br />}
                    {l}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
