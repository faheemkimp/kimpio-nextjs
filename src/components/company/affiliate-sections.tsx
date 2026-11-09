import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { SpeedLines } from "@/components/home/fx/speed-lines";
import { Eyebrow, SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { AF_BIG, AF_EARN, AF_EASY, AF_STEPS, AF_SUPPORT } from "@/content/affiliates";

import "./company.css";

/** Live "perks_section": three perks (<h3>) with the live icons. */
export function EarnPerks() {
  const d = AF_EARN;
  return (
    <section aria-labelledby="af-earn-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="af-earn-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 md:grid-cols-3 lg:gap-5">
        {d.items.map((p, i) => (
          <li
            key={p.title}
            className={
              i === 0
                ? "relative overflow-hidden rounded-[1.6rem] bg-ink p-7 text-white sm:p-8"
                : "relative overflow-hidden rounded-[1.6rem] bg-white p-7 text-ink ring-1 ring-border sm:p-8"
            }
          >
            {i === 0 && <div aria-hidden="true" className="absolute -top-16 -right-16 size-44 rounded-full bg-brand/40 blur-3xl" />}
            <span className="relative grid size-14 place-items-center rounded-2xl bg-brand-soft ring-1 ring-brand/20">
              {/* eslint-disable-next-line @next/next/no-img-element -- small live SVG icon */}
              <img src={p.icon} alt="" width={32} height={32} loading="lazy" className="size-8" />
            </span>
            <h3 className="relative mt-8 text-2xl font-bold">{p.title}</h3>
            <p className={i === 0 ? "relative mt-3 leading-relaxed text-white/70" : "relative mt-3 leading-relaxed text-ink/65"}>{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Live "affliate_sec_two": three tools beside the mascot holding the payout coin. */
export function EasyTools() {
  const d = AF_EASY;
  return (
    <section aria-labelledby="af-easy-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="container-page">
        <SectionHeading id="af-easy-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
        <div className="mt-14 grid items-center gap-10 sm:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <ol data-fx="stagger" className="space-y-4">
            {d.items.map((t, i) => (
              <li key={t.title} className="flex gap-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-border sm:p-7">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-brand/10 ring-1 ring-teal-brand/20">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small live SVG icon */}
                  <img src={t.icon} alt="" width={32} height={32} loading="lazy" className="size-8" />
                </span>
                <div>
                  <span aria-hidden="true" className="text-xs font-bold text-ink/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/65">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-fx="parallax" data-speed="0.12" className="relative hidden lg:block">
            <div aria-hidden="true" className="absolute inset-[15%] -z-10 rounded-full bg-brand/20 blur-3xl" />
            <Image
              src={d.image.src}
              alt={d.image.alt}
              title={d.image.title}
              width={d.image.width}
              height={d.image.height}
              sizes="(min-width: 1024px) 55vw, 1px"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "affliate_howtowork_section": three steps (each title an <h2>, as live) and Apply Now. */
export function HowItWorks() {
  const d = AF_STEPS;
  return (
    <section aria-labelledby="af-steps-title" className="container-page py-24 sm:py-32">
      <SectionHeading id="af-steps-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} align="center" twoTone={false} />
      <ol data-fx="stagger" className="af-steps isolate mt-14 grid gap-5 sm:mt-20 lg:grid-cols-3">
        {d.items.map((s, i) => (
          <li key={s.title} className="flex flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-border sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-brand text-lg font-bold text-white shadow-[0_10px_22px_-8px_rgb(241_115_30/0.7)]">
              {i + 1}
            </span>
            <div className="mt-6 overflow-hidden rounded-2xl bg-surface p-5 ring-1 ring-border">
              <Image src={s.image.src} alt="" width={s.image.width} height={s.image.height} sizes="(min-width: 1024px) 26vw, 80vw" className="mx-auto w-full max-w-[16rem]" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-ink">{s.title}</h2>
            <p className="mt-3 leading-relaxed text-ink/65">{s.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex justify-center">
        <CtaLink href={d.cta.href} size="lg">
          {d.cta.label}
          <ArrowRight aria-hidden="true" />
        </CtaLink>
      </div>
    </section>
  );
}

/** Live "gobig_banana_sec": the mascot surfing a card, and the affiliate email. */
export function GoBig() {
  const d = AF_BIG;
  return (
    <section aria-labelledby="af-big-title" className="px-2 sm:px-3">
      <div className="relative isolate mx-2 overflow-hidden rounded-[1.75rem] bg-ink py-20 text-white sm:mx-3 sm:rounded-[2.5rem] sm:py-24 lg:mx-7">
        <div aria-hidden="true" className="absolute -top-24 -left-24 -z-10 size-96 rounded-full bg-teal-brand/40 blur-3xl" />
        <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="relative mx-auto w-full max-w-xl">
            <SpeedLines angle={-30} />
            <Image src={d.image.src} alt="" width={d.image.width} height={d.image.height} sizes="(min-width: 1024px) 45vw, 92vw" className="relative w-full drop-shadow-[0_30px_30px_rgb(0_0_0/0.45)]" />
          </div>
          <div>
            <Eyebrow tone="dark">{d.eyebrow}</Eyebrow>
            <h2 id="af-big-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] sm:text-5xl">
              {d.title}
            </h2>
            <p data-fx="reveal" className="mt-6 text-lg leading-relaxed text-white/75">
              {d.before}
              <a href={d.email.href} target="_blank" rel="noopener" className="font-semibold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
                {d.email.label}
              </a>
              {d.after}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "support_section": You Can Count On Kimp + Apply Now (opens in a new tab, as live). */
export function AffiliateSupport() {
  const d = AF_SUPPORT;
  return (
    <section aria-labelledby="af-support-title" className="container-page py-24 text-center sm:py-32">
      <div className="flex justify-center">
        <Eyebrow>{d.eyebrow}</Eyebrow>
      </div>
      <h2 id="af-support-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl">
        {d.title}
      </h2>
      <p data-fx="reveal" className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
        {d.lines[0]}
        <br />
        {d.lines[1]}
      </p>
      <div className="mt-9 flex justify-center">
        <CtaLink href={d.cta.href} target="_blank" rel="noopener" size="lg">
          {d.cta.label}
          <ArrowRight aria-hidden="true" />
        </CtaLink>
      </div>
    </section>
  );
}
