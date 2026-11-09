"use client";

import { ArrowRight, Building2, Check, Sparkles, Tag } from "lucide-react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { InfoTip } from "@/components/ui/info-tip";
import { PRICING_ENTERPRISE, PRICING_PLANS, type Plan, type PriceBox } from "@/content/pricing";
import { cn } from "@/lib/utils";

import { useLivePricing } from "./live-pricing";

import "./pricing.css";

/** Live order: Graphics, Graphics + Video (best value, centre), Video. */
const ORDER = ["graphics", "graphics-video", "video"] as const;

/** "USD 698.50" / "USD 1397/mo" / "$1,397" -> code, amount, period. */
function splitPrice(s: string) {
  const m = s.match(/^([A-Z]{3})?\s*([^/]+?)\s*(\/\s*mo(?:nth)?)?$/i);
  if (!m) return { amount: s };
  return { code: m[1], amount: m[2], period: m[3]?.replace(/\s/g, "") };
}

/**
 * Live "pricepage_f_section" (id="plans-pricing"): <h2> "Pricing", three plans
 * (<h3> names) and the enterprise box (<h2>). Prices come from WordPress in the
 * visitor's currency once loaded (see live-pricing.ts).
 */
export function PricingPlansSection() {
  const live = useLivePricing();
  const plans = ORDER.map((id) => PRICING_PLANS.plans.find((p) => p.id === id)!);
  const currency = live?.currency ?? PRICING_PLANS.defaultCurrency;

  return (
    <section id={PRICING_PLANS.anchor} aria-labelledby="pricing-plans-title" className="relative isolate scroll-mt-24 overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 opacity-60 [mask-image:linear-gradient(#000,transparent)]" />
      <div className="container-page">
        <SectionHeading id="pricing-plans-title" eyebrow={PRICING_PLANS.eyebrow} title={PRICING_PLANS.title} align="center" twoTone={false} />

        {/* Live "offer-active" line: whatever offer WordPress is running (empty when none). */}
        <div aria-live="polite" className="mt-6 flex min-h-10 justify-center">
          {live?.offer && (
            <p className="pr-offer inline-flex items-center gap-2 rounded-full bg-[linear-gradient(90deg,#fff1e7,#ffe2cc)] px-4 py-2 text-sm font-bold text-[#a8480a] ring-1 ring-brand/25">
              <Tag className="size-4 text-brand" aria-hidden="true" />
              {live.offer}
            </p>
          )}
        </div>

        <ul data-fx="stagger" className="mt-10 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              box={live?.boxes[plan.id] ?? PRICING_PLANS.defaults[plan.id]}
              best={plan.id === PRICING_PLANS.bestValue}
              currency={currency}
            />
          ))}
        </ul>

        <Enterprise />
      </div>
    </section>
  );
}

function PlanCard({ plan, box, best, currency }: { plan: Plan; box: PriceBox; best: boolean; currency: string }) {
  const price = splitPrice(box.price);
  const period = price.period ?? (PRICING_PLANS.defaults[plan.id] as PriceBox).period;
  return (
    <li
      className={cn(
        "group relative flex flex-col rounded-[1.75rem] p-2 transition-[translate,box-shadow] duration-500 hover:-translate-y-1",
        best
          ? "bg-ink text-white shadow-[0_40px_70px_-35px_rgb(241_115_30/0.7)] lg:-my-4"
          : "bg-white ring-1 ring-border hover:shadow-[0_30px_50px_-34px_rgb(27_30_35/0.4)]",
      )}
    >
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[1.35rem] p-6 sm:p-7",
          best ? "bg-white/[0.06] ring-1 ring-white/10 lg:pt-8" : "bg-[linear-gradient(160deg,#fff6ee,#f2f5f8_60%)]",
        )}
      >
        {best && <div aria-hidden="true" className="absolute -top-24 -right-16 -z-10 size-64 rounded-full bg-brand/40 blur-3xl" />}
        <span aria-hidden="true" className="price-sheen pointer-events-none absolute inset-0 -z-10" />

        {box.strip && (
          <p className="mb-5 flex items-center gap-2 rounded-xl bg-white/[0.08] px-3.5 py-2.5 text-sm font-bold ring-1 ring-white/10">
            <Sparkles className="size-4 shrink-0 text-[#21f2d2]" aria-hidden="true" />
            <span>
              <span className="text-[#21f2d2]">{box.strip.label}</span> {box.strip.text}
            </span>
          </p>
        )}

        <h3 className={cn("text-lg font-bold tracking-[0.08em]", best ? "text-white" : "text-ink")}>{plan.name}</h3>

        <div className="mt-5 min-h-[5.5rem]">
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            {price.code && <span className={cn("text-lg font-bold", best ? "text-white/60" : "text-ink/50")}>{price.code}</span>}
            <span className="pr-price text-5xl leading-none font-bold tracking-tight tabular-nums sm:text-[3.2rem]">{price.amount}</span>
            {period && <span className={cn("font-semibold", best ? "text-white/55" : "text-slate-brand")}>{period}</span>}
          </p>
          {box.oldPrice && (
            <p className={cn("mt-2 text-sm font-semibold line-through decoration-2", best ? "text-white/45 decoration-brand" : "text-ink/40 decoration-brand")}>
              {box.oldPrice}
            </p>
          )}
          {box.note && (
            <p className="mt-2 inline-flex rounded-full bg-[#00806c] px-2.5 py-1 text-xs font-bold text-white">{box.note}</p>
          )}
        </div>

        <p className={cn("mt-4 min-h-12 leading-relaxed", best ? "text-white/70" : "text-ink/65")}>{plan.blurb}</p>
        <CtaLink href={PRICING_PLANS.cta.href} variant={best ? "primary" : "dark"} className="mt-6 w-full">
          {PRICING_PLANS.cta.label}
        </CtaLink>
        <p className={cn("mt-3 text-center text-xs font-medium", best ? "text-white/50" : "text-ink/45")}>
          {PRICING_PLANS.currencyNote} {currency}
        </p>
      </div>

      <ul className="flex-1 space-y-3 px-5 pt-6 pb-6 text-[0.95rem] sm:px-6">
        {plan.features.map((f) => (
          <li key={f.label} className="flex gap-3">
            <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full", best ? "bg-brand text-white" : "bg-teal-soft text-teal-brand")}>
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className={best ? "text-white/85" : "text-ink/80"}>
              {f.label}
              {f.tip && <InfoTip text={f.tip} label={f.label} tone={best ? "dark" : "light"} className="ml-1.5" />}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** Live "priceBookademowrap": its own <h2>, link opens in a new tab. */
function Enterprise() {
  const e = PRICING_ENTERPRISE;
  return (
    <div
      data-fx="reveal"
      className="relative isolate mx-auto mt-14 grid max-w-5xl gap-6 overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-border sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-[#a594f9]/25 blur-3xl" />
      <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-[#f1eeff] text-[#5b48c9]">
        <Building2 className="size-7" />
      </span>
      <div>
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">{e.title}</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/65">{e.body}</p>
      </div>
      <CtaLink href={e.cta.href} variant="dark" size="lg" target="_blank">
        {e.cta.label}
        <ArrowRight aria-hidden="true" />
      </CtaLink>
    </div>
  );
}
