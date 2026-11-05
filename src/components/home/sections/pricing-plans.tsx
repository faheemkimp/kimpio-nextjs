import { ArrowRight, Building2, Check, Sparkles } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-button";
import { PRICING } from "@/content/home-sections";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

/**
 * Subscription plans: each card opens with a "price stage" (light sweep on
 * hover), features below. The best-value plan is the dark featured card.
 * Enterprise follows as a wide band.
 */
export function PricingPlans() {
  const ent = PRICING.enterprise;
  return (
    <section aria-labelledby="pricing-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="pricing-title" eyebrow={PRICING.eyebrow} title={PRICING.title} intro={PRICING.intro} align="center" />

        <ul data-fx="stagger" className="mt-16 grid items-stretch gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5">
          {PRICING.plans.map((plan) => {
            const best = Boolean(plan.badge);
            return (
              <li
                key={plan.name}
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
                    best ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-[linear-gradient(160deg,#fff6ee,#f2f5f8_60%)]",
                    best && "lg:pt-9",
                  )}
                >
                  {best && (
                    <div aria-hidden="true" className="absolute -top-24 -right-16 -z-10 size-64 rounded-full bg-brand/40 blur-3xl" />
                  )}
                  <span aria-hidden="true" className="price-sheen pointer-events-none absolute inset-0 -z-10" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className={cn("text-lg font-bold", best ? "text-white" : "text-ink")}>{plan.name}</h3>
                    {best && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-xs font-bold whitespace-nowrap text-white">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span data-fx="count" className="text-5xl leading-none font-bold tracking-tight tabular-nums sm:text-[3.4rem]">
                      {plan.price}
                    </span>
                    <span className={cn("font-semibold", best ? "text-white/55" : "text-slate-brand")}>/month</span>
                  </p>
                  <p className={cn("mt-4 min-h-12 leading-relaxed", best ? "text-white/70" : "text-ink/65")}>{plan.blurb}</p>
                  <CtaLink href={PRICING.cta.href} variant={best ? "primary" : "dark"} className="mt-6 w-full">
                    {PRICING.cta.label}
                  </CtaLink>
                </div>
                <ul className="space-y-3 px-5 pt-6 pb-6 text-[0.95rem] sm:px-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          best ? "bg-brand text-white" : "bg-teal-soft text-teal-brand",
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className={best ? "text-white/85" : "text-ink/80"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* Enterprise */}
        <div
          data-fx="reveal"
          className="relative isolate mt-10 grid gap-8 overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-border sm:p-10 lg:grid-cols-[1fr_1fr_auto] lg:items-center"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-[#a594f9]/25 blur-3xl" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f1eeff] px-3 py-1 text-xs font-bold tracking-[0.12em] text-[#5b48c9] uppercase">
              <Building2 className="size-3.5" aria-hidden="true" />
              {ent.name}
            </span>
            <p className="mt-4 text-4xl font-bold text-ink">{ent.price}</p>
            <p className="mt-3 leading-relaxed text-ink/65">{ent.blurb}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {ent.features.map((f) => (
              <li key={f} className="flex gap-3 font-medium text-ink">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#7c69e8] text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <CtaLink href={ent.cta.href} variant="dark" size="lg">
            {ent.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">{PRICING.footnote}</p>
      </div>
    </section>
  );
}
