import { ArrowRight, Check, Gift, Quote, Star } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";

import { VideoThumbs } from "./video-thumbs";

/*
 * Sections shared by the "Kimp For" audience pages (agencies, entrepreneurs,
 * fitness/health, professional services). Each takes the page's live copy as
 * props and keeps the live heading levels.
 */

type Img = { src: string; width: number; height: number };
type Link = { label: string; href: string };

/**
 * Live case-study feature: optional section <h2> + intro, then the story card
 * (<h2> title, <h4> client). Without a section heading (e.g. the second case
 * study on /professional-services/) the story title labels the section.
 */
export function CaseStudyFeature({
  data,
}: {
  data: {
    id: string;
    eyebrow?: string;
    title?: string;
    intro?: string;
    image: Img;
    logo: Img & { alt: string };
    storyTitle: string;
    quote: string;
    name: string;
    role: string;
    cta: Link;
  };
}) {
  const head = data.title !== undefined;
  return (
    <section id={data.id} aria-labelledby={`${data.id}-${head ? "title" : "story"}`} className="relative isolate scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        {head && <SectionHeading id={`${data.id}-title`} eyebrow={data.eyebrow ?? "Case study"} title={data.title} intro={data.intro} align="center" twoTone={false} />}
        <div data-fx="reveal" className={`${head ? "mt-14 " : ""}grid overflow-hidden rounded-[2rem] bg-white ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-60px_rgb(27_30_35/0.45)] lg:grid-cols-[0.9fr_1.1fr]`}>
          <div className="relative min-h-72 bg-surface">
            <Image src={data.image.src} alt="" fill sizes="(min-width: 1024px) 34rem, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col p-8 sm:p-12">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG logo */}
            <img src={data.logo.src} alt={data.logo.alt} width={data.logo.width} height={data.logo.height} className="h-8 w-auto self-start" />
            <h2 id={`${data.id}-story`} className="mt-6 text-3xl leading-tight font-bold text-ink sm:text-4xl">
              {data.storyTitle}
            </h2>
            <Quote aria-hidden="true" className="mt-6 size-8 text-brand/70" />
            <p className="mt-3 text-lg leading-relaxed text-ink/70">{data.quote}</p>
            <div className="mt-6">
              <h4 className="font-bold text-ink">{data.name}</h4>
              <p className="text-sm text-ink/55">{data.role}</p>
            </div>
            <CtaLink href={data.cta.href} variant="dark" size="lg" className="mt-8 self-start">
              {data.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live Trustpilot review pair: title <h4>, reviewer <h6> with country. */
export function ReviewPair({ reviews }: { reviews: readonly { title: string; body: string; name: string; country: string }[] }) {
  return (
    <section aria-label="Trustpilot reviews" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] py-16 sm:rounded-[3rem] sm:py-24">
        <div className="container-page">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo, as on live */}
          <img src="/images/graphics/trustpilot-white.svg" alt="Trustpilot" width={199} height={98} className="mx-auto h-12 w-auto" />
          <ul data-fx="stagger" className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
            {reviews.map((r) => (
              <li key={r.title} className="flex flex-col rounded-[1.6rem] bg-white/[0.06] p-7 text-white ring-1 ring-white/10 backdrop-blur sm:p-8">
                <div aria-hidden="true" className="flex gap-1">
                  {Array.from({ length: 5 }, (_, k) => (
                    <span key={k} className="grid size-5 place-items-center bg-[#00b67a]">
                      <Star className="size-3.5 fill-white text-white" />
                    </span>
                  ))}
                </div>
                <h4 className="mt-5 text-2xl font-bold">{r.title}</h4>
                <p className="mt-3 flex-1 leading-relaxed text-white/70">{r.body}</p>
                <h6 className="mt-6 font-bold">
                  {r.name} <span className="font-medium text-white/60">{r.country}</span>
                </h6>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type Service = { title: string; body: string; list: readonly string[]; cta: Link };

function ServiceCopy({ s }: { s: Service }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-ink sm:text-4xl">{s.title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/65">{s.body}</p>
      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {s.list.map((l) => (
          <li key={l} className="flex items-center gap-2.5 font-medium text-ink/80">
            <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-brand">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {l}
          </li>
        ))}
      </ul>
      <CtaLink href={s.cta.href} size="lg" className="mt-8">
        {s.cta.label}
        <ArrowRight aria-hidden="true" />
      </CtaLink>
    </div>
  );
}

/** Live graphics + video service blocks (each title an <h2>) under a section <h2>. */
export function ServicesShowcase({
  data,
}: {
  data: {
    /** Section heading; omitted on pages whose live services block has none. */
    eyebrow?: string;
    title?: string;
    intro?: string;
    graphics: Service & { images: readonly Img[] };
    video: Service & { videos: readonly { video: string; thumb: Img }[] };
  };
}) {
  const head = data.title !== undefined;
  return (
    <section aria-labelledby={head ? "aud-services-title" : undefined} aria-label={head ? undefined : "Design services"} className="relative isolate bg-surface py-24 sm:py-32">
      <div className="container-page">
        {head && <SectionHeading id="aud-services-title" eyebrow={data.eyebrow ?? "Graphics + video"} title={data.title} intro={data.intro} align="center" twoTone={false} />}
        <div className={`${head ? "mt-16" : ""} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            {data.graphics.images.map((img) => (
              <li key={img.src} className="overflow-hidden rounded-[1.4rem] bg-white ring-1 ring-ink/[0.06]">
                <Image src={img.src} alt="" width={img.width} height={img.height} sizes="(min-width: 1024px) 16rem, 45vw" className="w-full" />
              </li>
            ))}
          </ul>
          <ServiceCopy s={data.graphics} />
        </div>
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <VideoThumbs items={data.video.videos} label={`${data.video.title} sample`} />
          </div>
          <ServiceCopy s={data.video} />
        </div>
      </div>
    </section>
  );
}

/** Live "Why Pay Upfront? Try Kimp 100% Free!" (<h3>) trial band. */
export function TrialBand({ data }: { data: { title: string; body: string; cta: Link } }) {
  return (
    <section aria-labelledby="aud-trial-title" className="pb-24 sm:pb-28">
      <div className="container-page">
        <div className="relative isolate flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 ring-1 ring-brand/15 sm:p-12 md:flex-row md:items-center">
          <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-sm">
            <Gift className="size-7" />
          </span>
          <div className="flex-1">
            <h3 id="aud-trial-title" className="text-3xl font-bold text-ink">
              {data.title}
            </h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink/70">{data.body}</p>
          </div>
          <CtaLink href={data.cta.href} size="lg" className="self-start md:self-center">
            {data.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/** Live "We Design Just About Everything" portfolio strip (WordPress uploads) with "View All". */
export function WorkWall({ data }: { data: { eyebrow: string; title: string; intro: string; cta: Link; images: readonly string[] } }) {
  return (
    <section aria-labelledby="aud-work-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="aud-work-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" twoTone={false} />
        <ul className="mt-14 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-5">
          {data.images.map((src) => (
            <li key={src} className="mb-3 break-inside-avoid overflow-hidden rounded-[1.2rem] bg-white ring-1 ring-ink/[0.06] sm:mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- WordPress uploads without known dimensions; natural aspect in a masonry */}
              <img src={src} alt="" loading="lazy" decoding="async" className="w-full" />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <CtaLink href={data.cta.href} variant="dark" size="lg">
            {data.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

type VideoItem = { video: string; thumb: Img; quote: string; name: string; role: string };

/**
 * Live video testimonials: section <h2> (optionally preceded by a kicker <h2>,
 * as on /professional-services/), then alternating rows of video + quote with
 * the client's name (<h3>) and role (<h6>).
 */
export function VideoTestimonials({ data }: { data: { kicker?: string; intro?: string; titleLines: readonly string[]; items: readonly VideoItem[] } }) {
  return (
    <section aria-labelledby="aud-videos-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          {data.kicker && <h2 className="text-sm font-bold tracking-[0.14em] text-brand uppercase">{data.kicker}</h2>}
          {data.intro && <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-ink/65">{data.intro}</p>}
          <h2 id="aud-videos-title" data-fx="words" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl">
            {data.titleLines.map((l, i) => (
              <span key={l}>
                {i > 0 && <br />}
                {l}
              </span>
            ))}
          </h2>
        </div>
        <div className="mt-14 grid gap-16">
          {data.items.map((it, i) => (
            <div key={it.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={i % 2 ? "lg:order-2" : undefined}>
                <VideoThumbs items={[it]} label={`Video testimonial from ${it.name}`} single />
              </div>
              <figure>
                <Quote aria-hidden="true" className="size-9 text-brand/70" />
                <blockquote className="mt-4 text-xl leading-relaxed text-ink/75">{it.quote}</blockquote>
                <figcaption className="mt-6">
                  <h3 className="text-xl font-bold text-ink">{it.name}</h3>
                  <h6 className="text-sm font-medium text-ink/55">{it.role}</h6>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Live "What Our Clients Have To Say": company <h3>, person, five stars, quote; "View All Reviews". */
export function ClientReviewGrid({
  data,
}: {
  data: { eyebrow: string; title: string; intro: string; cta: Link; items: readonly { avatar: string; company: string; person: string; quote: string }[] };
}) {
  return (
    <section aria-labelledby="aud-clients-title" className="relative isolate bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="aud-clients-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-5">
          {data.items.map((c) => (
            <li key={c.company} className="flex flex-col rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-8">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG avatar, as on live */}
                <img src={c.avatar} alt="" width={48} height={48} loading="lazy" className="size-12 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-bold text-ink">{c.company}</h3>
                  <p className="text-sm text-ink/55">{c.person}</p>
                </div>
                <div role="img" aria-label="5 out of 5 stars" className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} aria-hidden="true" className="size-4 fill-[#f5a623] text-[#f5a623]" />
                  ))}
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink/70">{c.quote}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <CtaLink href={data.cta.href} variant="dark" size="lg">
            {data.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/** Live single Trustpilot review (title <h4>) beside the mascot-with-stars artwork. */
export function SingleReview({ data }: { data: { title: string; body: string; image: Img } }) {
  return (
    <section aria-label="Trustpilot review" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
        <div className="container-page grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="text-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo, as on live */}
            <img src="/images/graphics/trustpilot-white.svg" alt="Trustpilot" width={199} height={98} className="h-12 w-auto" />
            <div aria-hidden="true" className="mt-6 flex gap-1">
              {Array.from({ length: 5 }, (_, k) => (
                <span key={k} className="grid size-6 place-items-center bg-[#00b67a]">
                  <Star className="size-4 fill-white text-white" />
                </span>
              ))}
            </div>
            <h4 className="mt-5 text-3xl font-bold sm:text-4xl">{data.title}</h4>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{data.body}</p>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-[16rem] lg:max-w-xs">
            <Image src={data.image.src} alt="" width={data.image.width} height={data.image.height} sizes="20rem" className="w-full drop-shadow-[0_30px_30px_rgb(0_0_0/0.4)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "Book A Call With Us" (<h3>) card with the mascot-and-calendar artwork. */
export function CallCard({ data }: { data: { title: string; body: string; cta: Link; image: Img } }) {
  return (
    <section aria-labelledby="aud-call-title" className="py-24 sm:py-28">
      <div className="container-page">
        <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-8 ring-1 ring-brand/15 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 id="aud-call-title" className="text-3xl font-bold text-ink sm:text-4xl">
              {data.title}
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/70">{data.body}</p>
            <CtaLink href={data.cta.href} size="lg" className="mt-8">
              {data.cta.label}
              <ArrowRight aria-hidden="true" />
            </CtaLink>
          </div>
          <div aria-hidden="true" className="mx-auto w-full max-w-sm">
            <Image src={data.image.src} alt="" width={data.image.width} height={data.image.height} sizes="(min-width: 1024px) 24rem, 80vw" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
