import { Star } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { GDS_RATINGS, GDS_REVIEW } from "@/content/graphic-design-services";

/**
 * Live "trustpilot_section": one featured review on a dark-green panel. The
 * mascot leans on a 5-star review card giving a thumbs-up: the owner's transparent
 * PNG (byte copy of public/Superhero-Monkey-Five-Star-Review.png at mascot/review-five-star.png,
 * since src/proxy.ts only serves /images/ etc. from public), served as-is (unoptimized) so it
 * is never re-compressed. The review title stays an <h4> like the live page.
 */
export function FeaturedReview() {
  return (
    <section aria-label="Client review" className="px-2 sm:px-4 lg:pt-24">
      <figure
        data-fx="panel"
        className="relative isolate mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(160deg,rgb(12_70_57),rgb(8_53_44)_45%,rgb(5_45_39))] text-white sm:rounded-[2.5rem]"
      >
        {/* warm light behind the mascot, as in the live artwork (clipped to the panel) */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          <div className="absolute -top-1/2 right-[12%] h-[150%] w-[38%] rotate-[24deg] bg-[radial-gradient(closest-side,rgb(225_200_80/0.45),transparent)] blur-2xl" />
          <div className="absolute right-[2%] -bottom-1/3 size-[26rem] rounded-full bg-[#2fc3a5]/20 blur-3xl" />
        </div>

        <div className="px-6 pt-12 sm:px-14 sm:pt-16 lg:max-w-[46%] lg:py-14">
          <div data-fx="reveal">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG */}
            <img
              src={GDS_REVIEW.source.logo}
              alt={GDS_REVIEW.source.name}
              width={GDS_REVIEW.source.width}
              height={GDS_REVIEW.source.height}
              className="h-11 w-auto sm:h-12"
            />
          </div>
          <h4 data-fx="reveal" className="mt-5 text-3xl font-bold tracking-tight sm:text-[2.75rem]">
            {GDS_REVIEW.title}
          </h4>
          <blockquote data-fx="reveal" data-delay="0.1" className="mt-5 text-lg leading-relaxed text-white/85">
            {GDS_REVIEW.quote}
          </blockquote>
          <figcaption data-fx="reveal" data-delay="0.2" className="mt-7 flex items-center gap-3">
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-brand text-sm font-bold">
              PM
            </span>
            <span className="font-bold">{GDS_REVIEW.author}</span>
          </figcaption>
        </div>

        {/* mascot + elements: under the quote on phones; on desktop standing on the panel's bottom edge and rising above its top */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-4 mb-6 w-full max-w-sm px-4 lg:absolute lg:right-[4%] lg:bottom-8 lg:my-0 lg:w-[46%] lg:max-w-xl lg:px-0"
        >
          <div className="cta-rise">
            <Image
              src="/images/mascot/review-five-star.png"
              alt=""
              width={1536}
              height={1024}
              unoptimized
              className="w-full lg:drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
            />
          </div>
        </div>
      </figure>
    </section>
  );
}

/** Live "brand_section" ratings. The figures keep their live <h6> level. */
export function Ratings({
  id = "gds-ratings-title",
  eyebrow = GDS_RATINGS.eyebrow,
  title = GDS_RATINGS.title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  /** A page's own live <h2> above the same three rating cards (e.g. /reviews/). */
  title?: ReactNode;
  /** Extra content under the cards (e.g. the /reviews/ testimonial wall). */
  children?: ReactNode;
} = {}) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden py-24 sm:py-28">
      <div className="container-page">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">
          {GDS_RATINGS.items.map((r) => (
            <li
              key={r.name}
              className="group relative flex flex-col items-center rounded-[1.75rem] bg-white p-2 text-center ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_rgb(27_30_35/0.4)]"
            >
              <div className="grid h-24 w-full place-items-center rounded-[1.35rem] bg-[linear-gradient(160deg,#fff6ee,#f2f5f8_60%)]">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG logos */}
                <img src={r.logo} alt={r.alt} width={120} height={36} loading="lazy" className="h-8 w-auto" />
              </div>
              <div className="grid w-full grid-cols-2 divide-x divide-border py-6">
                <div>
                  <h6 data-fx="count" className="text-4xl leading-none font-bold text-ink tabular-nums">
                    {r.reviews}
                  </h6>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">Reviews</p>
                </div>
                <div>
                  <h6 className="inline-flex items-center gap-1.5 text-4xl leading-none font-bold text-ink tabular-nums">
                    {r.score}
                    <Star aria-hidden="true" className="size-6 fill-[#f5a623] text-[#f5a623]" />
                  </h6>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">Ratings</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </section>
  );
}
