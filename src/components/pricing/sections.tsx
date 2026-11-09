import { ArrowRight, Clapperboard, Layers3, MessageCircle, Palette, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { ServiceStage, type ServiceScene } from "@/components/home/sections/service-scenes";
import { CtaLink } from "@/components/ui/cta-button";
import { PRICING_CATALOGUE, PRICING_INCLUDED, PRICING_VOLUME } from "@/content/pricing";

import { BundleStage } from "./bundle-scene";
import { CatalogueTabs } from "./catalogue-tabs";

import "./pricing.css";

/**
 * Each subscription gets one of the homepage's animated service scenes
 * (service-scenes.tsx): graphics, video, and web/app for Graphics + Video
 * (its answer adds "website & app development"). Chips summarise what the
 * live answer says; they are decorative, not headings.
 */
const INCLUDED_ART = [
  { scene: "graphic", tint: "#fff1e7", accent: "#f1731e", Icon: Palette, chips: ["Print & digital", "Custom illustrations", "Landing pages", "GIFs"] },
  { scene: "video", tint: "#ffeef3", accent: "#e8436b", Icon: Clapperboard, chips: ["Footage editing", "Animation", "Motion graphics", "Social video"] },
  { scene: "bundle", tint: "#f1eeff", accent: "#7c69e8", Icon: Layers3, chips: ["All of Graphics", "All of Video", "Web & app development"] },
] as const satisfies readonly { scene: ServiceScene | "bundle"; tint: string; accent: string; Icon: LucideIcon; chips: readonly string[] }[];

/**
 * Live "faq-section" #1: "What's included with my subscription fee?" with one
 * <h4> per subscription. Live hides the answers in an accordion; here all three
 * are open cards in the homepage services style (same text, all in the DOM).
 * Each answer continues its heading, as on live ("Kimp Graphics" / "is our power-packed…").
 */
export function IncludedSection() {
  return (
    <section aria-labelledby="pricing-included-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute top-40 left-1/2 -z-10 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(241_115_30/0.07),transparent)]" />
      <div className="container-page">
        <SectionHeading id="pricing-included-title" eyebrow={PRICING_INCLUDED.eyebrow} title={PRICING_INCLUDED.title} intro={PRICING_INCLUDED.intro} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PRICING_INCLUDED.items.map((item, i) => {
            const { scene, tint, accent, Icon, chips } = INCLUDED_ART[i];
            const [answer, ...extra] = item.body;
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-2 shadow-[0_1px_2px_rgb(27_30_35/0.04)] ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(15_118_110/0.35)] md:last:col-span-2 lg:last:col-span-1"
              >
                <div className="relative">
                  {scene === "bundle" ? (
                    <BundleStage tint={tint} className="h-64 rounded-[1.35rem] sm:h-72" />
                  ) : (
                    <ServiceStage scene={scene} tint={tint} className="h-64 rounded-[1.35rem] sm:h-72" />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold text-ink shadow-sm backdrop-blur"
                  >
                    <Icon className="size-3.5" style={{ color: accent }} />
                    Included
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-5 pt-5 pb-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="text-xl font-bold text-ink">{item.title}</h4>
                    <span aria-hidden="true" className="text-sm font-semibold text-ink/30 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <ul aria-hidden="true" className="mt-3 flex flex-wrap gap-1.5">
                    {chips.map((c) => (
                      <li key={c} className="rounded-full px-2.5 py-1 text-[0.72rem] font-bold" style={{ background: tint, color: accent }}>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 leading-relaxed text-ink/60">{answer}</p>
                  {extra.length > 0 && (
                    <div className="mt-auto pt-5">
                      {extra.map((p) => (
                        <p key={p} className="flex gap-3 rounded-2xl bg-surface p-4 text-[0.95rem] leading-relaxed font-medium text-ink/75">
                          <Users className="mt-0.5 size-5 shrink-0 text-teal-brand" aria-hidden="true" />
                          <span>{p}</span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live "whatwedo-section": Graphics / Videos tabs, chat note and samples link. */
export function CatalogueSection() {
  const c = PRICING_CATALOGUE;
  return (
    <section aria-labelledby="pricing-catalogue-title" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#edf5f3] py-24 ring-1 ring-[#0f766e]/10 sm:rounded-[3rem] sm:py-32">
        <div className="container-page">
          <SectionHeading id="pricing-catalogue-title" eyebrow={c.eyebrow} title={c.title} intro={c.intro} align="center" twoTone={false} />
          <CatalogueTabs />
          <div data-fx="reveal" className="mt-12 flex flex-col items-center gap-6 text-center">
            <p className="flex max-w-2xl items-start gap-3 text-left leading-relaxed text-ink/70 sm:items-center">
              <MessageCircle className="mt-1 size-5 shrink-0 text-teal-brand sm:mt-0" aria-hidden="true" />
              <span>
                {c.note.before}
                <a href={c.note.link.href} className="font-semibold text-teal-brand underline decoration-teal-brand/30 underline-offset-4 hover:decoration-teal-brand">
                  {c.note.link.label}
                </a>
                {c.note.after}
              </span>
            </p>
            <CtaLink href={c.samplesCta.href} variant="dark" size="lg">
              {c.samplesCta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "support_section": "Have A High Volume Of Work?" (<h2>) with Contact Us. */
export function VolumeSection() {
  const v = PRICING_VOLUME;
  return (
    <section aria-labelledby="pricing-volume-title" className="relative isolate py-24 sm:py-28">
      <div className="container-page">
        <div
          data-fx="reveal"
          className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#04463d,#032f2a_60%,#021f1c)] px-8 py-12 text-white ring-1 ring-ink/10 sm:px-12 sm:py-14 lg:pr-[30rem]"
        >
          <div aria-hidden="true" className="absolute -top-24 -left-16 -z-10 size-72 rounded-full bg-teal-brand/50 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-10 -bottom-24 -z-10 size-72 rounded-full bg-brand/30 blur-3xl" />
          <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 opacity-30 invert" />

          {/* stacked subscription cards: one more slides onto the pile (decorative) */}
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 right-10 hidden w-72 -translate-y-1/2 lg:block">
            {["Brand A", "Brand B", "Agency client"].map((b, k) => (
              <div
                key={b}
                className="pr-stack absolute inset-x-0 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-[0_24px_40px_-24px_rgb(0_0_0/0.8)]"
                style={{ top: `${k * 4.25 - 6.4}rem`, ["--i" as string]: k }}
              >
                <span className="grid size-9 place-items-center rounded-xl text-xs font-bold text-white" style={{ background: ["#f1731e", "#00806c", "#7c69e8"][k] }}>
                  {k + 1}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold">Subscription {k + 1}</span>
                  <span className="block text-xs font-medium text-ink/50">{b}</span>
                </span>
                <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[0.65rem] font-bold text-teal-brand">Active</span>
              </div>
            ))}
            <Image src="/images/mascot/support.webp" alt="" width={720} height={860} sizes="12rem" className="absolute -left-44 top-[-2.5rem] w-48 drop-shadow-[0_24px_28px_rgb(0_0_0/0.45)]" />
          </div>

          <h2 id="pricing-volume-title" className="max-w-xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            {v.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{v.body}</p>
          <CtaLink href={v.cta.href} size="lg" className="mt-8">
            {v.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
