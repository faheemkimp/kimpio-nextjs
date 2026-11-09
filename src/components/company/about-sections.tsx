import { ArrowRight, Headset, Quote, Star } from "lucide-react";
import Image from "next/image";

import { Eyebrow, SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { InfoTip } from "@/components/ui/info-tip";
import { AB_CARES, AB_CLIENT, AB_COUNTRIES, AB_IMPACT, AB_STORY, AB_TEAM, AB_VALUES } from "@/content/about-us";

import { CountTo } from "./count-to";
import { CountryCards, CountryShowcase } from "./country-showcase";

import "./company.css";

/** Live "about_total_section": four counters (<h3>) that count up from the server value. */
export function GlobalImpact() {
  const d = AB_IMPACT;
  return (
    <section aria-labelledby="ab-impact-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="ab-impact-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <ul data-fx="stagger" className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4 lg:gap-5">
        {d.stats.map((s, i) => (
          <li
            key={s.label}
            className={
              i === 0
                ? "min-w-0 rounded-[1.6rem] bg-ink p-5 text-white sm:p-8"
                : "min-w-0 rounded-[1.6rem] bg-surface p-5 text-ink ring-1 ring-border sm:p-8"
            }
          >
            <h3 className="text-[1.65rem] leading-none font-bold tracking-[-0.03em] sm:text-5xl lg:text-4xl xl:text-5xl">
              <CountTo from={s.from} to={s.to} />
              <span className="text-brand">+</span>
            </h3>
            <p className={i === 0 ? "mt-4 font-semibold text-white/70" : "mt-4 font-semibold text-ink/60"}>{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Live "about_ourstoty_section": the meditating mascot beside the story. */
export function OurStory() {
  const d = AB_STORY;
  return (
    <section aria-labelledby="ab-story-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-fx="reveal" className="relative">
          <div aria-hidden="true" className="absolute inset-[10%] -z-10 rounded-full bg-teal-brand/15 blur-3xl" />
          <Image src={d.image.src} alt="" width={d.image.width} height={d.image.height} sizes="(min-width: 1024px) 40vw, 92vw" className="mx-auto w-full max-w-xl" />
        </div>
        <div>
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2 id="ab-story-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            {d.title}
          </h2>
          {d.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} data-fx="reveal" className="mt-6 text-lg leading-relaxed text-ink/65">
              {p}
            </p>
          ))}
          <ol aria-hidden="true" className="mt-10 flex flex-wrap gap-3">
            {d.milestones.map((m) => (
              <li key={m.year} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-border">
                <span className="text-2xl font-bold text-brand">{m.year}</span>
                <span className="text-sm font-semibold text-ink/60">{m.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Live "perks_section" (Client-Centred Design): rating, support and designs-per-year cards. */
export function ClientCentred() {
  const d = AB_CLIENT;
  const card = "flex flex-col rounded-[1.6rem] p-7 ring-1 sm:p-8";
  return (
    <section aria-labelledby="ab-client-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="ab-client-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3 lg:gap-5">
        <li className={`${card} bg-brand-soft ring-brand/20`}>
          <h3 className="flex items-center gap-3 text-5xl font-bold text-ink">
            {d.rating.value}
            <Star className="size-9 fill-[#f5a623] text-[#f5a623]" aria-hidden="true" />
            {/* Live heading text includes the Material Icons ligature name; kept for parity, never shown or read out. */}
            <span aria-hidden="true" className="sr-only">
              {d.rating.icon}
            </span>
          </h3>
          <p className="mt-4 text-[17px] font-semibold text-ink/65">{d.rating.label}</p>
        </li>
        <li className={`${card} bg-ink text-white ring-ink`}>
          <h3 className="flex items-center gap-3 text-5xl font-bold">
            {d.support.value}
            <Headset className="size-8 text-brand" aria-hidden="true" />
          </h3>
          <p className="mt-4 text-[17px] font-semibold text-white/70">{d.support.label}</p>
        </li>
        <li className={`${card} bg-white ring-border`}>
          <h3 className="text-5xl font-bold text-ink">
            {d.designs.value}
            <sup className="text-brand">+</sup>
          </h3>
          <p className="mt-4 flex items-center gap-1.5 text-[17px] font-semibold text-ink/65">
            {d.designs.label}
            {/* Tooltip anchored to the icon's right edge, so it never runs off a phone screen. */}
            <InfoTip
              text={d.designs.tip}
              label={d.designs.label}
              className="[&>[role=tooltip]]:right-0 [&>[role=tooltip]]:left-auto [&>[role=tooltip]]:translate-x-0"
            />
          </p>
        </li>
      </ul>
    </section>
  );
}

/** Live country sliders: the desktop banner slider and, as on live, a separate phone slider. */
export function Countries() {
  return (
    <section aria-label={AB_COUNTRIES.label} className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <div className="mb-10 flex justify-center">
          <Eyebrow>{AB_COUNTRIES.eyebrow}</Eyebrow>
        </div>
        <CountryShowcase />
        <CountryCards />
      </div>
    </section>
  );
}

/** Live "user_experiance_sec": six team quotes (title <h2>, name <h4>). */
export function TeamQuotes() {
  const d = AB_TEAM;
  return (
    <section aria-label={d.label} className="container-page py-24 sm:py-32">
      <div className="mb-12 flex justify-center">
        <Eyebrow>{d.eyebrow}</Eyebrow>
      </div>
      <ul data-fx="stagger" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {d.items.map((q, i) => (
          <li
            key={q.title}
            className={
              i % 3 === 1
                ? "flex flex-col rounded-[1.6rem] bg-ink p-7 text-white sm:p-8"
                : "flex flex-col rounded-[1.6rem] bg-white p-7 text-ink ring-1 ring-border sm:p-8"
            }
          >
            <Quote className="size-8 fill-brand/15 text-brand" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-bold">{q.title}</h2>
            <p className={i % 3 === 1 ? "mt-4 leading-relaxed text-white/70" : "mt-4 leading-relaxed text-ink/65"}>{q.body}</p>
            <div className="mt-auto flex items-center gap-3 pt-7">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand"
              >
                {q.name.charAt(0)}
              </span>
              <div>
                <h4 className="font-bold">{q.name}</h4>
                <p className={i % 3 === 1 ? "text-sm text-white/60" : "text-sm text-ink/55"}>{q.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Live "cares_section": three initiatives with their photos. */
export function KimpCares() {
  const d = AB_CARES;
  return (
    <section aria-labelledby="ab-cares-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="ab-cares-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
        <ul data-fx="stagger" className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3">
          {d.items.map((c) => (
            <li key={c.title} className="group overflow-hidden rounded-[1.6rem] bg-white ring-1 ring-border">
              <div className="overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  width={864}
                  height={946}
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "about_value_section": six values with their icons, then the trial button. */
export function OurValues() {
  const d = AB_VALUES;
  return (
    <section aria-labelledby="ab-values-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="ab-values-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {d.items.map((v, i) => (
          <li key={v.title} className="ab-value group relative overflow-hidden rounded-[1.6rem] bg-white p-7 ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_rgb(241_115_30/0.6)] sm:p-8">
            <span aria-hidden="true" className="absolute top-7 right-7 text-sm font-bold text-ink/20 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft ring-1 ring-brand/20">
                {/* eslint-disable-next-line @next/next/no-img-element -- small live SVG icon */}
                <img src={v.icon} alt="" width={28} height={28} loading="lazy" className="size-7" />
              </span>
              <h3 className="text-xl font-bold text-ink">{v.title}</h3>
            </div>
            <p className="mt-4 leading-relaxed text-ink/65">{v.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <CtaLink href={d.cta.href} size="lg">
          {d.cta.label}
          <ArrowRight aria-hidden="true" />
        </CtaLink>
      </div>
    </section>
  );
}
