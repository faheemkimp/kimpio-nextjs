import { ArrowRight, MessagesSquare, Star } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import { CS_ALTERNATIVES, CS_CONTACT, CS_TESTIMONIALS, type Testimonial } from "@/content/compare-service";
import { cn } from "@/lib/utils";

import "./compare.css";

/** Live "They tried the others first": two rows of quotes sliding in opposite directions. */
export function TestimonialsMarquee() {
  const t = CS_TESTIMONIALS;
  return (
    <section id={t.id} aria-labelledby={`${t.id}-title`} className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id={`${t.id}-title`} eyebrow={t.eyebrow} title={t.title} intro={t.intro} align="center" twoTone={false} />
      </div>
      <div className="mt-14 grid gap-5">
        {t.rows.map((row, r) => (
          <div key={r} className="cs-mq">
            <ul className="cs-mq-track" data-reverse={r % 2 === 1 ? "" : undefined} style={{ ["--cs-mq-dur" as string]: `${row.length * 9}s` }}>
              {row.map((q) => (
                <Quote key={q.name + q.quote.slice(0, 20)} q={q} />
              ))}
              {/* Second copy for the seamless loop; hidden from assistive tech. */}
              {row.map((q) => (
                <Quote key={`dup-${q.name}${q.quote.slice(0, 20)}`} q={q} dup />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Quote({ q, dup = false }: { q: Testimonial; dup?: boolean }) {
  return (
    <li aria-hidden={dup || undefined} className={cn("w-[22rem] shrink-0 sm:w-[26rem]", dup && "cs-mq-dup")}>
      <figure className="flex h-full flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] shadow-[0_24px_48px_-36px_rgb(27_30_35/0.35)]">
        <div role="img" aria-label="5 out of 5 stars" className="flex gap-1">
          {Array.from({ length: 5 }, (_, k) => (
            <Star key={k} aria-hidden="true" className="size-4 fill-[#f5a623] text-[#f5a623]" />
          ))}
        </div>
        <blockquote className="mt-4 flex-1 leading-relaxed text-ink/75">{q.quote}</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">
            {q.initials}
          </span>
          <span className="font-bold text-ink">{q.name}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/** Live "Beyond subscriptions": KIMP vs freelancers vs traditional agencies vs AI tools. */
export function AlternativesTable() {
  const a = CS_ALTERNATIVES;
  const [criteria, kimp, ...others] = a.columns;
  return (
    <section id={a.id} aria-labelledby={`${a.id}-title`} className="relative isolate scroll-mt-24 bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id={`${a.id}-title`}
          eyebrow={a.eyebrow}
          title={
            <>
              {a.titleLines[0]}
              <br />
              {a.titleLines[1]}
            </>
          }
          intro={a.intro}
          align="center"
          twoTone={false}
        />
        <div className="mt-14 overflow-x-auto rounded-[2rem] bg-white ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-60px_rgb(27_30_35/0.45)]">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <caption className="sr-only">{a.caption}</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 w-44 bg-white px-6 py-6 text-xs font-bold tracking-[0.14em] text-ink/40 uppercase">
                  {criteria}
                </th>
                <th scope="col" className="bg-[linear-gradient(160deg,#04463d,#032f2a)] px-6 py-6 text-xl font-bold text-white">
                  {kimp}
                </th>
                {others.map((c) => (
                  <th key={c} scope="col" className="px-6 py-6 text-base font-bold text-ink">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.rows.map((row) => (
                <tr key={row.criteria} className="border-t border-border">
                  <th scope="row" className="sticky left-0 z-10 bg-white px-6 py-5 align-top font-bold text-ink">
                    {row.criteria}
                  </th>
                  {row.cells.map((c, i) => (
                    <td
                      key={i}
                      colSpan={c.span > 1 ? c.span : undefined}
                      className={cn("px-6 py-5 align-top leading-relaxed", i === 0 ? "bg-teal-soft/60 font-semibold text-ink" : "text-ink/65")}
                    >
                      {c.text}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/**
 * Live contact card under the FAQ ("Still have some questions?" <h3>), shown as
 * a compact teal card in the FAQ's sticky title column, the support mascot
 * leaning over its top edge.
 */
export function ContactCard() {
  const c = CS_CONTACT;
  return (
    <div className="relative mt-8 pt-16 lg:mt-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-6 right-5 z-10 w-28 sm:w-32">
        <Image src="/images/mascot/support.webp" alt="" width={720} height={860} sizes="8rem" className="w-full drop-shadow-[0_18px_22px_rgb(0_40_34/0.35)]" />
      </div>
      <div className="hero-frame relative isolate overflow-hidden rounded-[1.75rem] p-7 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 ring-1 ring-white/15">
          <MessagesSquare aria-hidden="true" className="size-3.5 text-brand" />
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Kimp support
        </span>
        <h3 className="mt-5 max-w-[14rem] text-2xl leading-tight font-bold text-white sm:text-[1.7rem]">{c.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">{c.body}</p>
        <CtaLink href={c.cta.href} className="mt-6 w-full justify-center sm:w-auto">
          {c.cta.label}
          <ArrowRight aria-hidden="true" />
        </CtaLink>
      </div>
    </div>
  );
}
