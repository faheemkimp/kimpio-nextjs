import { ArrowRight, ArrowUpRight, MonitorSmartphone, PenTool, Printer, Star } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";

/*
 * Sections of the "team" audience templates (/small-business/, /startups/,
 * /marketing/). They sit beside ./sections.tsx (shared with the other "Kimp For"
 * pages) and keep the live heading levels of these templates, which differ
 * (e.g. "Book A Call With Us" is an <h2> here, an <h3> there).
 */

type Img = { src: string; width: number; height: number };
type Link = { label: string; href: string };
type Head = { eyebrow: string; title: string; intro: string };

/** Live icon boxes: section <h2> + intro, six perks (icon, <h4> title, text). */
export function IconPerkGrid({ data }: { data: Head & { id: string; items: readonly { icon: string; title: string; body: string }[] } }) {
  return (
    <section id={data.id} aria-labelledby={`${data.id}-title`} className="relative isolate scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id={`${data.id}-title`} eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {data.items.map((p) => (
            <li
              key={p.title}
              className="group flex flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] transition-shadow duration-300 hover:shadow-[0_30px_60px_-40px_rgb(27_30_35/0.45)] sm:p-8"
            >
              <span aria-hidden="true" className="grid size-16 place-items-center rounded-2xl bg-surface ring-1 ring-ink/[0.05] transition-transform duration-300 group-hover:-rotate-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG icon */}
                <img src={p.icon} alt="" width={44} height={44} loading="lazy" className="size-11" />
              </span>
              <h4 className="mt-6 text-xl font-bold text-ink">{p.title}</h4>
              <p className="mt-2.5 leading-relaxed text-ink/65">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Live "Your Dedicated Design Team" block: section <h2>, then four features whose titles are also <h2>s. */
export function TeamFeatures({ data }: { data: Head & { items: readonly { icon: string; title: string; body: string }[] } }) {
  return (
    <section aria-labelledby="aud-team-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="aud-team-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-5">
          {data.items.map((f, i) => (
            <li key={f.title} className="flex items-start gap-5 rounded-[1.6rem] bg-white p-6 ring-1 ring-ink/[0.06] sm:gap-6 sm:p-8">
              <span aria-hidden="true" className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static icon */}
                <img src={f.icon} alt="" width={128} height={128} loading="lazy" className="size-20 rounded-2xl sm:size-24" />
                <span className="absolute -top-2 -left-2 grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-white tabular-nums">
                  {i + 1}
                </span>
              </span>
              <div>
                <h2 className="text-xl font-bold text-ink sm:text-2xl">{f.title}</h2>
                <p className="mt-2.5 leading-relaxed text-ink/65">{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const KIND_STYLE = {
  print: { Icon: Printer, tile: "bg-teal-soft text-teal-brand", card: "bg-white" },
  digital: { Icon: MonitorSmartphone, tile: "bg-white/15 text-white", card: "hero-frame text-white" },
  illustration: { Icon: PenTool, tile: "bg-brand-soft text-brand", card: "bg-white" },
} as const;

/** Live "We’ve got a design for that" (<h2>): three cards, each title an <h2>. */
export function DesignForThat({ data }: { data: Head & { cards: readonly { kind: keyof typeof KIND_STYLE; title: string; body: string }[] } }) {
  return (
    <section aria-labelledby="aud-designs-title" className="relative isolate py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="aud-designs-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {data.cards.map((c) => {
            const s = KIND_STYLE[c.kind];
            const dark = c.kind === "digital";
            return (
              <li key={c.title} className={`relative isolate flex flex-col overflow-hidden rounded-[1.6rem] p-7 ring-1 ring-ink/[0.06] sm:p-9 ${s.card}`}>
                <span aria-hidden="true" className={`grid size-14 place-items-center rounded-2xl ${s.tile}`}>
                  <s.Icon className="size-7" />
                </span>
                <h2 className={`mt-8 text-2xl font-bold sm:text-[1.75rem] ${dark ? "text-white" : "text-ink"}`}>{c.title}</h2>
                <p className={`mt-3 leading-relaxed ${dark ? "text-white/75" : "text-ink/65"}`}>{c.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live Google review pair: company <h4>, reviewer <h6>, five stars, quote; "View More" opens the Google listing. */
export function GoogleReviewPair({
  data,
}: {
  data: { items: readonly { avatar: string; company: string; person: string; quote: string }[]; cta: Link };
}) {
  return (
    <section aria-label="Client reviews" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] py-16 sm:rounded-[3rem] sm:py-24">
        <div className="container-page">
          <ul data-fx="stagger" className="grid gap-4 md:grid-cols-2 lg:gap-5">
            {data.items.map((r) => (
              <li key={r.company} className="flex flex-col rounded-[1.6rem] bg-white/[0.06] p-7 text-white ring-1 ring-white/10 backdrop-blur sm:p-8">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element -- small static avatar, as on live */}
                  <img src={r.avatar} alt="" width={56} height={56} loading="lazy" className="size-14 rounded-full ring-2 ring-white/20" />
                  <div className="flex-1">
                    <h4 className="text-xl font-bold">{r.company}</h4>
                    <h6 className="text-sm font-medium text-white/60">{r.person}</h6>
                  </div>
                </div>
                <div role="img" aria-label="5 out of 5 stars" className="mt-5 flex gap-1">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} aria-hidden="true" className="size-5 fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-lg leading-relaxed text-white/80">{r.quote}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <CtaLink href={data.cta.href} target="_blank" rel="noopener noreferrer" variant="light" size="lg">
              {data.cta.label}
              <ArrowUpRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "Book A Call With Us" as an <h2> (these templates), with the mascot-and-calendar artwork. */
export function CallBand({ data }: { data: { title: string; body: string; cta: Link; image: Img } }) {
  return (
    <section aria-labelledby="aud-call2-title" className="py-24 sm:py-28">
      <div className="container-page">
        <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 ring-1 ring-brand/15 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div aria-hidden="true" className="mx-auto w-full max-w-sm">
            <Image src={data.image.src} alt="" width={data.image.width} height={data.image.height} sizes="(min-width: 1024px) 24rem, 80vw" className="w-full" />
          </div>
          <div>
            <h2 id="aud-call2-title" className="text-3xl font-bold text-ink sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/70">{data.body}</p>
            <CtaLink href={data.cta.href} size="lg" className="mt-8">
              {data.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
