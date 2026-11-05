import { ArrowRight, Quote, Star } from "lucide-react";

import { REVIEWS } from "@/content/home-sections";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

const AVATAR_COLORS = ["#f1731e", "#7c69e8", "#00a88e", "#4da3ff", "#e89a00", "#ff5c8a"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Stars({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

type Review = (typeof REVIEWS.items)[number];

/**
 * Ratings summary, then a row of review cards drifting sideways
 * (pause on hover/focus). Each row's first copy is the real list;
 * the repeats that make the loop seamless are aria-hidden. Under reduced
 * motion the rows stop and scroll sideways instead.
 */
export function ReviewsWall() {
  const rows = [REVIEWS.items];
  return (
    <section aria-labelledby="reviews-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="reviews-title" eyebrow={REVIEWS.eyebrow} title={REVIEWS.title} align="center" />

        <ul data-fx="stagger" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {REVIEWS.ratings.map((r) => (
            <li key={r.source} className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-border">
              <span className="text-3xl leading-none font-bold text-ink tabular-nums">{r.score}</span>
              <span className="flex flex-col">
                <Stars className="flex text-[#f5a623]" />
                <span className="mt-1 text-sm font-semibold text-ink">
                  {r.source}
                  {r.detail && <span className="font-medium text-muted-foreground"> · {r.detail}</span>}
                </span>
              </span>
              <span className="sr-only">
                Rated {r.score} out of 5 on {r.source}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div data-fx="reveal" className="mt-10 space-y-5">
        {rows.map((row, r) => (
          // py gives the cards' border, shadow and hover lift room inside the clipped row
          <div key={r} className="review-marquee overflow-hidden py-6">
            <div
              className={cn("logo-marquee-track flex w-max", r === 1 && "[animation-direction:reverse]")}
              style={{ animationDuration: `${60 + r * 10}s` }}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 gap-5 pr-5">
                  {/* each half holds the row twice so it is always wider than the viewport */}
                  {[...row, ...row].map((item, k) => (
                    <li key={`${item.name}-${k}`} aria-hidden={(copy === 0 && k >= row.length) || undefined}>
                      <ReviewCard item={item} color={AVATAR_COLORS[(REVIEWS.items.indexOf(item) % AVATAR_COLORS.length)]} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a href={REVIEWS.cta.href} className="group inline-flex items-center gap-2 font-bold text-ink transition-colors hover:text-brand">
          {REVIEWS.cta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function ReviewCard({ item, color }: { item: Review; color: string }) {
  return (
    <figure className="flex h-full w-[19rem] flex-col rounded-[1.5rem] border border-[#d5dce6] bg-white p-2 shadow-[0_8px_24px_-18px_rgb(27_30_35/0.35)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-28px_rgb(27_30_35/0.45)] sm:w-[23rem]">
      <div className="relative flex-1 px-5 pt-5 pb-6">
        <Quote aria-hidden="true" className="absolute top-5 right-5 size-7 text-brand/20" />
        <Stars className="flex text-[#f5a623]" />
        <span className="sr-only">5 out of 5 stars</span>
        <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-ink">{item.quote}</blockquote>
      </div>
      <figcaption className="flex items-center gap-3 rounded-[1.1rem] bg-ink px-4 py-3 text-white">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-full text-sm font-bold" style={{ background: color }}>
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold">{item.name}</span>
          <span className="block truncate text-xs text-white/60">{item.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
