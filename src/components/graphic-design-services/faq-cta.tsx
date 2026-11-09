import { ArrowRight, CalendarDays, Check, Headset, Mail, MessageCircle, Plus } from "lucide-react";
import Image from "next/image";
import { Fragment, type ReactNode } from "react";

import { SpeedLines } from "@/components/home/fx/speed-lines";
import { Eyebrow, SectionHeading } from "@/components/home/sections/section-heading";
import { FooterPanel } from "@/components/layout/site-footer";
import { CtaLink } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { GDS_CALL, GDS_FAQ, GDS_FINAL_CTA, GDS_SUPPORT, type FaqBlock, type FaqItem } from "@/content/graphic-design-services";

/**
 * Live "cat2_bookcall_section" (<h3>) and "support_section" (<h2>) side by side:
 * a warm call card and a teal support card.
 */
export function ContactCards() {
  return (
    <section aria-label="Talk to Kimp" className="relative isolate py-24 sm:py-28">
      <div className="container-page">
      <div
        data-fx="stagger"
        className="grid items-center gap-8 rounded-[2rem] bg-[linear-gradient(150deg,#fff1e7,#ffe2cc)] p-3 ring-1 ring-brand/15 sm:p-4 lg:grid-cols-2 lg:gap-6"
      >
        <div className="p-5 sm:p-8 lg:p-10">
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-white text-brand shadow-sm">
            <CalendarDays className="size-6" />
          </span>
          <h3 className="mt-7 text-3xl font-bold text-ink sm:text-4xl">{GDS_CALL.title}</h3>
          <p className="mt-4 max-w-md leading-relaxed text-ink/70">{GDS_CALL.body}</p>
          <CtaLink href={GDS_CALL.cta.href} size="lg" className="mt-8">
            {GDS_CALL.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>

        <div className="hero-frame relative isolate overflow-hidden rounded-[1.6rem] p-8 sm:p-12">
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
            <Headset className="size-6" />
          </span>
          <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">{GDS_SUPPORT.title}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-white/75">
            {GDS_SUPPORT.body.before}
            <a href={GDS_SUPPORT.body.link.href} className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              {GDS_SUPPORT.body.link.label}
            </a>
            {GDS_SUPPORT.body.after}
          </p>
          <SupportBento />
        </div>
      </div>
      </div>
    </section>
  );
}

/**
 * Decorative support thread: a client request, the team typing, the reply and a
 * booked call play out in order on a loop (`gds-thread` in globals.css), then the
 * three real channels as pills. Static final state under reduced motion.
 */
const CHANNELS: { Icon: typeof Mail; label: string; live?: boolean }[] = [
  { Icon: CalendarDays, label: "Book a call" },
  { Icon: Mail, label: "Email" },
  { Icon: MessageCircle, label: "Live chat", live: true },
];

function SupportBento() {
  return (
    <div aria-hidden="true" className="gds-thread mt-8 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">K</span>
        <span className="flex-1 leading-tight">
          <span className="block text-sm font-semibold text-white">Your account team</span>
          <span className="flex items-center gap-1.5 text-xs text-white/55">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Online now
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-2.5 px-4 py-4 text-[0.82rem] leading-snug">
        <p className="gds-msg-1 max-w-[80%] self-end rounded-2xl rounded-br-md bg-white/12 px-3.5 py-2 text-white/90">
          Can we see the logo in teal before Friday&apos;s launch?
        </p>
        <div className="grid max-w-[85%] self-start">
          <span className="gds-msg-typing bento-typing col-start-1 row-start-1 flex w-fit gap-1 self-end rounded-2xl rounded-bl-md bg-brand px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-white" />
            <span className="size-1.5 rounded-full bg-white" />
            <span className="size-1.5 rounded-full bg-white" />
          </span>
          <p className="gds-msg-2 col-start-1 row-start-1 rounded-2xl rounded-bl-md bg-brand px-3.5 py-2 text-white">
            On it! Two teal versions are in your dashboard now.
          </p>
        </div>
        <span className="gds-msg-3 flex w-fit items-center gap-2 self-start rounded-full bg-white/[0.07] px-3 py-1.5 text-xs text-white/75 ring-1 ring-white/10">
          <CalendarDays className="size-3.5 text-brand" />
          Review call booked · Thu, 11:00 AM
          <Check className="size-3.5 text-emerald-400" strokeWidth={3} />
        </span>
      </div>

      <div className="grid grid-cols-3 border-t border-white/10">
        {CHANNELS.map(({ Icon, label, live }, i) => (
          <span key={label} className={cn("flex items-center justify-center gap-1.5 px-2 py-3 text-xs font-semibold text-white/80 sm:text-[0.8rem]", i > 0 && "border-l border-white/10")}>
            <Icon className="size-3.5 shrink-0 text-brand" />
            <span className="truncate">{label}</span>
            {live && <span className="gds-live size-1.5 shrink-0 rounded-full bg-emerald-400" />}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The only live FAQ links: the site address and the support email in "business hours". */
const LINKS: Record<string, string> = {
  "https://www.kimp.io/": "https://www.kimp.io/",
  "info@kimp.io": "mailto:info@kimp.io",
};
const LINK_PATTERN = new RegExp(`(${Object.keys(LINKS).map((k) => k.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|")})`);

function withLinks(text: string): ReactNode {
  return text.split(LINK_PATTERN).map((part, i) =>
    LINKS[part] ? (
      <a key={i} href={LINKS[part]} className="font-semibold text-teal-brand underline decoration-teal-brand/30 underline-offset-4 hover:decoration-teal-brand">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="space-y-4 px-6 pb-6 text-[1.02rem] leading-relaxed text-ink/70 sm:pl-[4.25rem]">
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i}>{withLinks(b)}</p>;
        if ("p" in b)
          return (
            <p key={i}>
              {b.p.map((part, k) =>
                typeof part === "string" ? (
                  <Fragment key={k}>{part}</Fragment>
                ) : (
                  <a key={k} href={part.href} className="font-semibold text-teal-brand underline decoration-teal-brand/30 underline-offset-4 hover:decoration-teal-brand">
                    {part.label}
                  </a>
                ),
              )}
            </p>
          );
        if ("list" in b)
          return (
            <ul key={i} className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {b.list.map((li) => (
                <li key={li} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          );
        return (
          <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-border">
            <iframe
              src={b.video}
              title="How to submit and manage requests on KIMP360"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Live "faq-section": every question (<h4>) and full answer, as native
 * <details> so it works without JS and stays crawlable.
 */
export function GdsFaq() {
  return <FaqSection id="gds-faq" data={GDS_FAQ} />;
}

export type FaqData = {
  eyebrow: string;
  title: string;
  intro: string;
  /** "Read All FAQs" link; omitted on pages whose live FAQ has none. */
  cta?: { label: string; href: string };
  items: FaqItem[];
};

/** `aside`: extra content under the title in the sticky left column (e.g. the /compare-service/ contact card). */
export function FaqSection({ id, data, aside }: { id: string; data: FaqData; aside?: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate overflow-clip bg-surface py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={`${id}-title`} eyebrow={data.eyebrow} title={data.title} intro={data.intro} align="left" />
          {data.cta && (
            <a href={data.cta.href} className="group mt-6 inline-flex items-center gap-2 font-bold text-ink hover:text-brand">
              {data.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          )}
          {aside}
        </div>

        <div className="space-y-3">
          {data.items.map((item, i) => (
            <details
              key={item.q}
              name={id}
              className="group rounded-[1.4rem] bg-white ring-1 ring-border transition-[box-shadow] open:shadow-[0_24px_44px_-30px_rgb(27_30_35/0.4)] open:ring-brand/30"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 rounded-2xl px-6 py-5 text-left marker:hidden [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="w-7 shrink-0 text-sm font-bold text-ink/30 tabular-nums transition-colors group-open:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="flex-1 text-lg font-bold text-ink">{item.q}</h4>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white"
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </span>
              </summary>
              <Answer blocks={item.a} />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Live "news_letter_section": closing <h2> with the email sign-up form
 * (GET to /register-now/ with `email`, as the live form submits).
 */
export function GdsFinalCta({ titleAs: Title = "h2" }: { titleAs?: "h2" | "p" } = {}) {
  const { eyebrow, title, form, features } = GDS_FINAL_CTA;
  return (
    <FooterPanel>
      <section aria-labelledby="gds-final-title" className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            {/* <h2> where the live page has this heading; a styled <p> where it doesn't (e.g. /kimp360-platform/). */}
            <Title id="gds-final-title" data-fx="reveal" className="mt-6 text-[2.2rem] leading-[1.06] font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {title}
            </Title>
            <form action={form.action} method="get" data-fx="reveal" data-delay="0.1" className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label htmlFor="gds-trial-email" className="sr-only">
                Email address
              </label>
              <input
                id="gds-trial-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={form.placeholder}
                className="h-14 min-w-0 flex-1 rounded-xl bg-white/10 px-5 text-base text-white ring-1 ring-white/20 transition outline-none placeholder:text-white/50 focus:bg-white/15 focus:ring-2 focus:ring-brand"
              />
              <button
                type="submit"
                data-click-sound=""
                className="relative inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-[#c4560a] bg-[linear-gradient(180deg,#ff9f55_0%,#f7802c_45%,#e8650f_100%)] px-7 font-semibold whitespace-nowrap text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_4px_0_#b84d08,0_10px_22px_-6px_rgb(241_115_30/0.55)] transition-[transform,box-shadow] duration-150 [text-shadow:0_1px_0_rgb(150_60_0/0.35)] hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-[inset_0_2px_6px_rgb(0_0_0/0.15),0_1px_0_#b84d08]"
              >
                {form.button}
                <ArrowRight className="size-[1.1em]" aria-hidden="true" />
              </button>
            </form>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/70">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4 text-brand" strokeWidth={3} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Same flying mascot + trailing speed lines as the homepage footer. */}
          <div aria-hidden="true" className="cta-rise pointer-events-none relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:max-w-[23rem]">
            <SpeedLines angle={-42} />
            <Image
              src="/images/mascot/takeoff.webp"
              alt=""
              width={400}
              height={523}
              unoptimized
              className="relative w-full rotate-[52deg] drop-shadow-[0_30px_30px_rgb(0_0_0/0.5)]"
            />
          </div>
        </div>
      </section>
    </FooterPanel>
  );
}
