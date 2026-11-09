import { ArrowRight, CalendarDays, Check, Clapperboard, Palette, Quote, Star } from "lucide-react";
import Image from "next/image";

import { Eyebrow, SectionHeading } from "@/components/home/sections/section-heading";
import { FooterPanel } from "@/components/layout/site-footer";
import { UpdateCard } from "@/components/kimp360/update-card";
import { CtaLink } from "@/components/ui/cta-button";
import { K360_DEMO, K360_REVIEWS, K360_SUBSCRIPTIONS, K360_UPDATES } from "@/content/kimp360-platform";
import { getLatestPostsInCategory, type PostCard } from "@/lib/wp/queries";
import { cn } from "@/lib/utils";

/** Live "trustpilot_section user_experiance_sec": four reviews; title and reviewer are <h4>s. */
export function ReviewsSection() {
  const r = K360_REVIEWS;
  return (
    <section aria-label="KIMP360 reviews" className="px-2 py-2 sm:px-4 sm:py-4">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#04463d,#032f2a_55%,#021f1c)] py-20 text-white sm:rounded-[3rem] sm:py-28">
        <div aria-hidden="true" className="absolute -top-32 -left-24 -z-10 size-96 rounded-full bg-teal-brand/40 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="container-page">
          <div data-fx="reveal" className="flex flex-col items-center gap-3 text-center">
            <Image src={r.source.logo} alt={r.source.name} width={r.source.width} height={r.source.height} className="h-14 w-auto" />
          </div>
          <ul data-fx="stagger" className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
            {r.items.map((it, i) => (
              <li
                key={it.author}
                className={cn(
                  "relative flex flex-col rounded-[1.6rem] p-7 ring-1 sm:p-8",
                  i === 0 ? "bg-white text-ink ring-white md:row-span-2" : "bg-white/[0.06] ring-white/10 backdrop-blur",
                )}
              >
                <Quote aria-hidden="true" className={cn("size-8", i === 0 ? "text-brand" : "text-white/25")} />
                <div aria-hidden="true" className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }, (_, k) => (
                    <span key={k} className="grid size-5 place-items-center bg-[#00b67a]">
                      <Star className="size-3.5 fill-white text-white" />
                    </span>
                  ))}
                </div>
                <h4 className={cn("mt-5 font-bold", i === 0 ? "text-3xl" : "text-xl")}>{it.title}</h4>
                <p className={cn("mt-3 flex-1 leading-relaxed", i === 0 ? "text-lg text-ink/70" : "text-white/70")}>{it.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("grid size-10 place-items-center rounded-full text-sm font-bold", i === 0 ? "bg-brand text-white" : "bg-white/10 text-white")}
                  >
                    {it.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <h4 className="font-bold">{it.author}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Live "blog-sec-360": the 3 latest "Kimp 360 Product" posts. Fetched from
 * WordPress at render (cached, see lib/wp/client.ts); if WordPress is
 * unreachable the cards are left out and the "View All" link remains.
 */
export async function UpdatesSection() {
  const u = K360_UPDATES;
  let posts: PostCard[] = [];
  try {
    posts = await getLatestPostsInCategory(u.categoryId, u.count);
  } catch (err) {
    console.error("[kimp360] latest updates unavailable", err);
  }
  return (
    <section aria-labelledby="k360-updates-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="k360-updates-title" eyebrow={u.eyebrow} title={u.title} intro={u.intro} />
        {posts.length > 0 && (
          <ul data-fx="stagger" className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <li key={p.id}>
                <UpdateCard post={p} more={u.more} latest={i === 0} />
              </li>
            ))}
          </ul>
        )}
        <div data-fx="reveal" className="mt-12 flex justify-center">
          <CtaLink href={u.cta.href} variant="dark" size="lg">
            {u.cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

const KIND = {
  graphics: { Icon: Palette, bg: "#fff1e7", fg: "#f1731e" },
  video: { Icon: Clapperboard, bg: "#ffeef3", fg: "#e8436b" },
  canva: { Icon: null, bg: "#e8f7fb", fg: "#00c4cc" },
} as const;

/** Live "subscriptions_includes": a section <h2>, then one <h2> per subscription. */
export function SubscriptionsSection() {
  const s = K360_SUBSCRIPTIONS;
  return (
    <section aria-labelledby="k360-subs-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="k360-subs-title" eyebrow={s.eyebrow} title={s.title} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mx-auto mt-14 grid max-w-6xl gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-6">
          {s.items.map((it, i) => {
            const k = KIND[it.kind];
            return (
              <li
                key={it.name}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(27_30_35/0.35)]",
                  i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                )}
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: k.fg }} />
                <div className="flex items-center justify-between">
                  {k.Icon ? (
                    <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl" style={{ background: k.bg, color: k.fg }}>
                      <k.Icon className="size-6" />
                    </span>
                  ) : (
                    <span className="grid h-12 place-items-center rounded-2xl px-3" style={{ background: k.bg }}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG logo, as on live */}
                      <img src="/images/kimp360/canvalogo.svg" alt="Canva Logo" width={92} height={46} loading="lazy" className="h-8 w-auto" />
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[0.7rem] font-bold text-teal-brand">
                    <span className="size-1.5 rounded-full bg-teal-brand" /> KIMP360 included
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-ink">{it.name}</h2>
                <p className="mt-2 leading-relaxed text-ink/65">{it.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * Live "cat2_bookcall_360" (<h3> demo card) as this page's closing panel: it
 * sits inside the shared dark CTA + footer panel, the same way every other
 * page closes, instead of a separate card plus a generic sign-up block.
 */
export function DemoFooter() {
  const d = K360_DEMO;
  return (
    <FooterPanel>
      <section aria-labelledby="k360-demo-title" className="container-page relative pt-20 sm:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="pb-4 lg:pb-20">
            <Eyebrow tone="dark">Live demo · KIMP360</Eyebrow>
            <h3 id="k360-demo-title" data-fx="reveal" className="mt-6 text-[2.2rem] leading-[1.06] font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {d.title}
            </h3>
            <p data-fx="reveal" className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {d.body}
            </p>
            <div data-fx="reveal" className="mt-9 flex flex-wrap items-center gap-4">
              <CtaLink href={d.cta.href} size="lg">
                <CalendarDays aria-hidden="true" />
                {d.cta.label}
                <ArrowRight aria-hidden="true" />
              </CtaLink>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/65">
                {["Full platform walkthrough", "Ask us anything"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="size-4 text-brand" strokeWidth={3} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Live artwork; its flat bottom edge fades into the footer below. */}
          <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-x-[10%] top-[18%] bottom-0 -z-10 rounded-full bg-brand/25 blur-3xl" />
            <Image
              src={d.image.src}
              alt=""
              width={d.image.width}
              height={d.image.height}
              sizes="(min-width: 1024px) 36rem, 92vw"
              className="w-full [mask-image:linear-gradient(#000_72%,transparent)]"
            />
          </div>
        </div>
      </section>
    </FooterPanel>
  );
}
