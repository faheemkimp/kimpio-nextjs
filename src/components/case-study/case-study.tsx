import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

import { Eyebrow } from "@/components/home/sections/section-heading";
import { CS_DETAIL, CS_LIST, type CaseCard, type CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/utils";

/**
 * Live heading text with its markup kept: `*x*` is the live <span> highlight,
 * "\n" the live <br> (a line break from sm up; a space on phones).
 */
export function RichTitle({ text, accent = "text-brand" }: { text: string; accent?: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              {" "}
              <br className="hidden sm:inline" />
            </>
          )}
          {line.split(/(\*[^*]+\*)/).map((part, k) =>
            part.startsWith("*") && part.endsWith("*") && part.length > 1 ? (
              <span key={k} className={accent}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <Fragment key={k}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}

/** Live paragraph text: "\n" marks a live <br><br> break, rendered as separate paragraphs. */
function Paras({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split("\n").map((t) => (
        <p key={t} className={className}>
          {t}
        </p>
      ))}
    </>
  );
}

const isQuote = (t: string) => /^[“"]/.test(t.trim());

/* ------------------------------------------------------------------ list */

/** /case-study/: the live intro <h2> + <p> and the 12 cards (live <h3> titles), in live order. */
export function CaseGrid({ cards }: { cards: readonly CaseCard[] }) {
  return (
    <section aria-labelledby="cs-list-title" className="py-20 sm:py-28">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <Eyebrow>Client stories</Eyebrow>
          <h2 id="cs-list-title" data-fx="reveal" className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-5xl">
            <RichTitle text={CS_LIST.title} />
          </h2>
          <p data-fx="reveal" data-delay="0.1" className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {CS_LIST.intro}
          </p>
        </header>
        <ul data-fx="stagger" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cards.map((c, i) => (
            <li key={c.path}>
              <a
                href={c.path}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/[0.07] shadow-[0_30px_60px_-50px_rgb(27_30_35/0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-45px_rgb(27_30_35/0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <div className="relative aspect-[840/592] overflow-hidden bg-surface">
                  <Image
                    src={c.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                    priority={i < 3}
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <span className="flex h-9 items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element -- small client logo, any aspect */}
                    <img src={c.logo.src} alt="" width={c.logo.width} height={c.logo.height} className="h-full max-h-8 w-auto max-w-36 object-contain object-left" />
                  </span>
                  <h3 className="mt-5 text-xl leading-snug font-bold text-ink">{c.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-teal-brand">
                    {CS_LIST.cta}
                    <ArrowUpRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- detail */

/**
 * A case study page. Same sections, order, copy and heading levels as the live
 * template (all <h2>, the lead <h5>, the client role <h6>); eyebrows are <p>.
 */
export function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const e = CS_DETAIL.eyebrows;
  return (
    <>
      <CaseHero cs={cs} />

      {/* What type of business is … */}
      <section aria-labelledby="cs-about" className="py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow>{e.about}</Eyebrow>
            <h2 id="cs-about" data-fx="reveal" className={H2}>
              <RichTitle text={cs.about.title} />
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
              {cs.about.paragraphs.map((p) => (
                <Paras key={p} text={p} />
              ))}
            </div>
          </div>
          <Figure img={cs.about.image} className="lg:order-none" />
        </div>
      </section>

      {/* What problem did … need help solving? */}
      <section aria-labelledby="cs-problem" className="px-2 sm:px-3">
        <div className="rounded-[2rem] bg-surface py-20 sm:rounded-[3rem] sm:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Figure img={cs.problem.image} className="order-last lg:order-first" />
            <div>
              <Eyebrow>{e.problem}</Eyebrow>
              <h2 id="cs-problem" data-fx="reveal" className={H2}>
                <RichTitle text={cs.problem.title} />
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/70">
                {cs.problem.paragraphs.map((p) => (
                  <Paras key={p} text={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How was Kimp able to … */}
      <section aria-labelledby="cs-solution" className="py-20 sm:py-28">
        <div className="container-page">
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow>{e.solution}</Eyebrow>
            <h2 id="cs-solution" data-fx="reveal" className={H2}>
              <RichTitle text={cs.solution.title} />
            </h2>
            <h5 className="mt-5 text-lg font-semibold text-ink/75 sm:text-xl">{cs.solution.lead}</h5>
          </header>
          <ul data-fx="stagger" className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {cs.solution.items.map((item) =>
              isQuote(item) ? (
                <li key={item} className="relative rounded-[1.5rem] bg-teal-brand/[0.07] p-6 text-ink/80 ring-1 ring-teal-brand/15 md:col-span-2 sm:p-7">
                  <Quote aria-hidden="true" className="mb-3 size-6 text-teal-brand" />
                  <Paras text={item} className="text-lg leading-relaxed italic [&+p]:mt-3" />
                </li>
              ) : (
                <li key={item} className="flex gap-4 rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/[0.07] sm:p-7">
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <div className="space-y-3 text-base leading-relaxed text-ink/75">
                    <Paras text={item} className={cn("[&:not(:first-child)]:italic [&:not(:first-child)]:text-ink/60")} />
                  </div>
                </li>
              ),
            )}
          </ul>
          {cs.solution.gallery.length > 0 && (
            <div className={cn("mx-auto mt-12 grid max-w-5xl gap-4 sm:gap-5", cs.solution.gallery.length > 1 && "sm:grid-cols-2")}>
              {cs.solution.gallery.map((g) => (
                <Image
                  key={g.src}
                  src={g.src}
                  alt=""
                  width={g.width}
                  height={g.height}
                  sizes="(min-width: 1024px) 31rem, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-[1.5rem] ring-1 ring-ink/[0.07]"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What has been the impact of working with Kimp … */}
      <section aria-labelledby="cs-impact" className="px-2 sm:px-3">
        <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] py-20 text-white sm:rounded-[3rem] sm:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Image
              src={cs.impact.image.src}
              alt=""
              width={cs.impact.image.width}
              height={cs.impact.image.height}
              sizes="(min-width: 1024px) 28rem, 80vw"
              className="mx-auto h-auto w-full max-w-md"
            />
            <div>
              <Eyebrow tone="dark">{e.impact}</Eyebrow>
              <h2 id="cs-impact" data-fx="reveal" className={cn(H2, "text-white")}>
                <RichTitle text={cs.impact.title} accent="text-[#ffb27a]" />
              </h2>
              <div className="mt-6 space-y-5">
                {cs.impact.paragraphs.map((p) =>
                  p.quote ? (
                    <blockquote key={p.text} className="rounded-[1.5rem] bg-white/[0.07] p-6 ring-1 ring-white/10 sm:p-7">
                      <Quote aria-hidden="true" className="mb-3 size-6 text-[#ffb27a]" />
                      <Paras text={p.text} className="text-lg leading-relaxed text-white/90 italic [&+p]:mt-3" />
                    </blockquote>
                  ) : (
                    <Paras key={p.text} text={p.text} className="text-lg leading-relaxed text-white/75" />
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {cs.tips && (
        <section aria-labelledby="cs-tips" className="pt-20 sm:pt-28">
          <div className="container-page">
            <div className="mx-auto max-w-4xl rounded-[2rem] bg-brand-soft p-8 ring-1 ring-brand/15 sm:p-12">
              <Eyebrow>{e.tips}</Eyebrow>
              <h2 id="cs-tips" data-fx="reveal" className={H2}>
                <RichTitle text={cs.tips.title} />
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
                {cs.tips.paragraphs.map((p) => (
                  <Paras key={p} text={p} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <PostNav cs={cs} />
    </>
  );
}

const H2 = "mt-5 text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-[2.6rem]";

function Figure({ img, className }: { img: CaseStudy["about"]["image"]; className?: string }) {
  return (
    <div data-fx="reveal" className={cn("relative mx-auto w-full max-w-lg", className)}>
      <div aria-hidden="true" className="absolute inset-6 -z-10 rounded-[2.5rem] bg-brand/15 blur-3xl" />
      <Image
        src={img.src}
        alt=""
        width={img.width}
        height={img.height}
        sizes="(min-width: 1024px) 32rem, 90vw"
        className="h-auto w-full"
      />
    </div>
  );
}

/** Top of a case study: live title <h2>, banner, client quote, name <h2> and role <h6>. */
function CaseHero({ cs }: { cs: CaseStudy }) {
  const h = cs.hero;
  return (
    <section aria-labelledby="cs-title" className="relative isolate -mt-18 px-2 pt-28 sm:px-3 sm:pt-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:radial-gradient(70%_70%_at_50%_20%,#000,transparent)]" />
      <div className="container-page">
        <a href={CS_DETAIL.back.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition hover:text-brand">
          <ArrowLeft aria-hidden="true" className="size-4" />
          {CS_DETAIL.back.label}
        </a>
        <div className="mx-auto mt-8 max-w-4xl text-center">
          <Eyebrow>Case study</Eyebrow>
          <h2 id="cs-title" data-fx="reveal" className="mt-5 text-[2.1rem] leading-[1.06] font-bold tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.6rem]">
            <RichTitle text={h.title} />
          </h2>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-[78rem] sm:mt-16">
        <div className="hero-frame relative overflow-hidden rounded-[2rem] p-2 sm:rounded-[3rem] sm:p-3">
          <div className="relative aspect-[1808/938] overflow-hidden rounded-[1.6rem] sm:rounded-[2.5rem]">
            <Image src={h.image.src} alt="" fill priority sizes="(min-width: 1280px) 78rem, 100vw" className="object-cover" />
          </div>
          <figure className="mx-auto max-w-4xl px-4 py-10 text-center text-white sm:px-8 sm:py-14">
            <Quote aria-hidden="true" className="mx-auto size-9 text-[#ffb27a]" />
            <blockquote className="mt-5 text-xl leading-relaxed font-medium text-white/90 sm:text-2xl">
              <p>{h.quote}</p>
            </blockquote>
            <figcaption className="mt-7">
              <h2 className="text-lg font-bold text-white">{h.name}</h2>
              <h6 className="mt-1 text-sm font-medium text-white/60">{h.role}</h6>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Live "Previous Post" / "Next Post" links, same targets as live. */
function PostNav({ cs }: { cs: CaseStudy }) {
  if (!cs.prev && !cs.next) return null;
  const link = "group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink ring-1 ring-ink/10 transition hover:ring-brand hover:text-brand";
  return (
    <nav aria-label="Case studies" className="py-16 sm:py-20">
      <div className="container-page flex flex-wrap items-center justify-between gap-4">
        {cs.prev ? (
          <a href={cs.prev} rel="prev" className={link}>
            <ArrowLeft aria-hidden="true" className="size-4 transition group-hover:-translate-x-0.5" />
            {CS_DETAIL.prev}
          </a>
        ) : (
          <span />
        )}
        {cs.next && (
          <a href={cs.next} rel="next" className={cn(link, "ml-auto")}>
            {CS_DETAIL.next}
            <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </nav>
  );
}
