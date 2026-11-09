import { ArrowRight, Check, Sparkles } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { GDS_PLAN, GDS_WHAT_WE_DO, GDS_WORK } from "@/content/graphic-design-services";
import { cn } from "@/lib/utils";

import { WhatWeDoCatalogue } from "./what-we-do";

/** Live "whatwedo-section": intro heading, then the catalogue (client) with its own <h2>s. */
export function WhatWeDo() {
  return (
    <section aria-labelledby="gds-wwd-title" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#edf5f3] py-24 ring-1 ring-[#0f766e]/10 sm:rounded-[3rem] sm:py-32">
        <div className="container-page">
          <SectionHeading id="gds-wwd-title" eyebrow={GDS_WHAT_WE_DO.eyebrow} title={GDS_WHAT_WE_DO.title} intro={GDS_WHAT_WE_DO.intro} twoTone={false} />
          <WhatWeDoCatalogue />
        </div>
      </div>
    </section>
  );
}

/** Live "price_feature" on /graphic-design-services/. */
export function GraphicsPlan() {
  return <PlanSection id="gds-plan-title" plan={GDS_PLAN} />;
}

export type PlanData = {
  readonly eyebrow: string;
  readonly title: string;
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly blurb: string;
  readonly features: readonly string[];
  readonly cta: { readonly label: string; readonly href: string };
  readonly currencyNote: string;
};

/**
 * Live "price_feature": a single plan. Dark price stage on the left (same
 * figures as the homepage cards), the full feature list on the right.
 */
export function PlanSection({ id, plan }: { id: string; plan: PlanData }) {
  const GDS_PLAN = plan;
  const half = Math.ceil(GDS_PLAN.features.length / 2);
  const cols = [GDS_PLAN.features.slice(0, half), GDS_PLAN.features.slice(half)];
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id={id} eyebrow={GDS_PLAN.eyebrow} title={GDS_PLAN.title} align="center" twoTone={false} />

        <div
          data-fx="reveal"
          className="group relative mx-auto mt-14 grid max-w-6xl rounded-[2rem] bg-white p-2 ring-1 ring-border shadow-[0_50px_80px_-50px_rgb(27_30_35/0.45)] sm:mt-20 lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="relative isolate overflow-hidden rounded-[1.6rem] bg-ink p-8 text-white sm:p-10">
            <div aria-hidden="true" className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-brand/45 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-16 -z-10 size-64 rounded-full bg-teal-brand/40 blur-3xl" />
            <span aria-hidden="true" className="price-sheen pointer-events-none absolute inset-0 -z-10 opacity-30" />
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.16em] ring-1 ring-white/15">
              <Sparkles className="size-3.5 text-brand" aria-hidden="true" />
              {GDS_PLAN.name}
            </p>
            <p className="mt-8 flex items-baseline gap-2">
              <span data-fx="count" className="text-6xl leading-none font-bold tracking-tight tabular-nums sm:text-7xl">
                {GDS_PLAN.price}
              </span>
              <span className="font-semibold text-white/55">{GDS_PLAN.period}</span>
            </p>
            <p className="mt-5 max-w-sm leading-relaxed text-white/70">{GDS_PLAN.blurb}</p>
            <CtaLink href={GDS_PLAN.cta.href} size="lg" className="mt-9 w-full">
              {GDS_PLAN.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
            <p className="mt-4 text-center text-sm text-white/50">{GDS_PLAN.currencyNote}</p>
          </div>

          <div className="p-7 sm:p-10">
          <div className="grid gap-x-8 sm:grid-cols-2">
            {cols.map((col, c) => (
              <ul key={c} className={cn("space-y-3.5", c === 1 && "mt-3.5 sm:mt-0")}>
                {col.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.98rem] font-medium text-ink/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_4px_10px_-4px_rgb(241_115_30/0.7)]">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Live "graphicprojects-section": two rows of real Kimp work drifting in
 * opposite directions (pause on hover; static scroll under reduced motion).
 */
export function WorkGallery() {
  const rows = [GDS_WORK.samples.slice(0, 8), GDS_WORK.samples.slice(8)];
  return (
    <section aria-labelledby="gds-work-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="gds-work-title" eyebrow={GDS_WORK.eyebrow} title={GDS_WORK.title} intro={GDS_WORK.intro} twoTone={false} />
      </div>

      <div aria-hidden="true" data-fx="reveal" className="mt-14 space-y-5 sm:mt-16">
        {rows.map((row, r) => (
          <div key={r} className="review-marquee overflow-hidden py-2">
            <div className={cn("logo-marquee-track flex w-max", r === 1 && "[animation-direction:reverse]")} style={{ animationDuration: `${70 + r * 12}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 gap-5 pr-5">
                  {row.map((s) => {
                    const wide = s.width / s.height > 1.6;
                    return (
                      <li
                        key={s.src}
                        className={cn(
                          "h-56 shrink-0 overflow-hidden rounded-[1.5rem] bg-white p-1.5 ring-1 ring-border transition-transform duration-500 hover:-translate-y-1 sm:h-72",
                          wide ? "w-[28rem] sm:w-[36rem]" : "w-56 sm:w-72",
                        )}
                      >
                        <Image
                          src={s.src}
                          alt=""
                          width={s.width}
                          height={s.height}
                          sizes={wide ? "36rem" : "18rem"}
                          className="size-full rounded-[1.1rem] object-cover"
                        />
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div data-fx="reveal" className="mt-12 flex justify-center">
        <CtaLink href={GDS_WORK.cta.href} variant="dark" size="lg">
          {GDS_WORK.cta.label}
          <ArrowRight aria-hidden="true" />
        </CtaLink>
      </div>
    </section>
  );
}
