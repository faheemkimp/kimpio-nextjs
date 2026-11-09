import { ArrowRight, CalendarDays, Plus } from "lucide-react";
import Image from "next/image";

import { CtaLink } from "@/components/ui/cta-button";
import { FAQ } from "@/content/home-sections";

import { SectionHeading } from "./section-heading";

/**
 * FAQ as native <details> (works without JS, fully crawlable). They share a
 * `name`, so opening one closes the others in supporting browsers.
 */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="relative isolate overflow-clip bg-surface py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={FAQ.eyebrow} title={FAQ.title} intro={FAQ.intro} align="left" />
          <a href={FAQ.cta.href} className="group mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-brand">
            {FAQ.cta.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>

          <div data-fx="reveal" className="relative isolate mt-10 hidden overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white lg:block">
            <div aria-hidden="true" className="absolute -right-10 -bottom-16 -z-10 size-56 rounded-full bg-brand/45 blur-3xl" />
            <Image
              src="/images/home/cta-character.png"
              alt=""
              width={782}
              height={642}
              sizes="160px"
              className="fx-float pointer-events-none absolute -right-6 -bottom-2 w-40"
            />
            <p className="max-w-[12rem] text-lg leading-snug font-bold">Still deciding? Talk it through with a human.</p>
            <CtaLink href="/book-a-call" variant="primary" size="sm" className="mt-4">
              <CalendarDays aria-hidden="true" />
              Book a Call
            </CtaLink>
          </div>
        </div>

        <div data-fx="stagger" className="space-y-3">
          {FAQ.items.map((item, i) => (
            <details
              key={item.q}
              name="home-faq"
              className="group rounded-[1.4rem] bg-white ring-1 ring-border transition-[box-shadow] open:shadow-[0_24px_44px_-30px_rgb(27_30_35/0.4)] open:ring-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-6 py-5 text-left text-lg font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="w-7 shrink-0 text-sm font-bold text-ink/30 tabular-nums transition-colors group-open:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </summary>
              <p className="px-6 pb-6 text-[1.02rem] leading-relaxed text-ink/70 sm:pl-[4.25rem]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
