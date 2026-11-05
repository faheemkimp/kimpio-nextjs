import {
  BadgeCheck,
  Briefcase,
  Check,
  Headset,
  Infinity as InfinityIcon,
  Users,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";

import { WHY_KIMP } from "@/content/home";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./sections/section-heading";

const { tiles } = WHY_KIMP;

/** The four supporting benefits; `color` drives the icon, accent bar and tint via --c. */
const BENEFITS: {
  key: "requests" | "firstTime" | "agency" | "support";
  icon: LucideIcon;
  color: string;
  /** bento position on lg (team card owns the middle 2×2) */
  place: string;
}[] = [
  { key: "requests", icon: InfinityIcon, color: "#f1731e", place: "lg:col-start-1 lg:row-start-1" },
  { key: "firstTime", icon: BadgeCheck, color: "#7c69e8", place: "lg:col-start-4 lg:row-start-1" },
  { key: "agency", icon: Briefcase, color: "#00a88e", place: "lg:col-start-1 lg:row-start-2" },
  { key: "support", icon: Headset, color: "#4da3ff", place: "lg:col-start-4 lg:row-start-2" },
];

const ROLES = [
  { label: "Creative PM", color: "#f1731e" },
  { label: "Graphic Designers", color: "#7c69e8" },
  { label: "Video Editors", color: "#00a88e" },
];

/**
 * "Discover KIMP's Key Benefits":
 *   1. bento grid: Dedicated Team ink card (mascot) in the middle 2×2, four
 *      benefit cards around it, each with its own accent colour + highlight line
 *   2. 100+ categories row with scrolling chips
 * Entrance motion comes from the shared <ScrollFx> data-fx attributes.
 * Benefit headings stay <h2>s for parity with the live page.
 */
export function WhyKimp() {
  return (
    <section
      aria-labelledby="why-kimp-title"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div className="container-page">
        <SectionHeading
          id="why-kimp-title"
          eyebrow={WHY_KIMP.eyebrow}
          title={WHY_KIMP.title}
          intro={WHY_KIMP.intro}
        />

        <div className="mt-14 space-y-4 sm:mt-20 lg:space-y-5">
          {/*
            bento (lg, 4 cols):   requests  team team  firstTime
                                  agency    team team  support
            sm: team full-width on top, cards 2×2 below; mobile: stacked
          */}
          <ul
            data-fx="stagger"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            <TeamCard />
            {BENEFITS.map(({ key, icon: Icon, color, place }, i) => {
              const { title, body, highlight } = tiles[key];
              return (
                <li
                  key={key}
                  style={{ "--c": color } as CSSProperties}
                  className={cn(
                    "group relative flex flex-col rounded-[1.75rem] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--c)_9%,white)_0%,white_42%)] p-7 ring-1 ring-border transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:ring-[color-mix(in_oklab,var(--c)_45%,white)]",
                    place,
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-white text-(--c) ring-1 ring-[color-mix(in_oklab,var(--c)_25%,white)] transition duration-300 group-hover:bg-(--c) group-hover:text-white">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={2.25} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-4xl leading-none font-bold text-[color-mix(in_oklab,var(--c)_22%,white)] tabular-nums transition-colors duration-300 group-hover:text-(--c)"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-7 text-xl leading-snug font-bold text-ink">{title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{body}</p>
                  <div className="grow" />
                  <p className="mt-6 flex items-center gap-2 border-t border-dashed border-border pt-5 text-sm font-semibold text-ink">
                    <span className="grid size-5 place-items-center rounded-full bg-(--c) text-white">
                      <Check aria-hidden="true" className="size-3" strokeWidth={3.5} />
                    </span>
                    {highlight}
                  </p>
                </li>
              );
            })}
          </ul>

          <CategoriesBand />
        </div>
      </div>
    </section>
  );
}

function TeamCard() {
  const { title, body, image } = tiles.team;
  return (
    <li className="relative isolate flex flex-col overflow-hidden rounded-[1.75rem] bg-ink text-white sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute -bottom-32 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-brand/50 blur-3xl" />
        <div className="absolute -top-24 left-1/3 size-72 rounded-full bg-[#7c69e8]/25 blur-3xl" />
      </div>

      <div className="p-7 sm:p-10">
        <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white">
          <Users aria-hidden="true" className="size-6" strokeWidth={2.25} />
        </span>
        <h2 className="mt-6 text-2xl font-bold sm:text-[2.25rem] sm:leading-tight">
          {title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-white/70 sm:text-lg">
          {body}
        </p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {ROLES.map((r) => (
            <li
              key={r.label}
              className="flex items-center gap-2 rounded-full bg-white/[0.08] px-4 py-2 text-sm font-semibold ring-1 ring-white/15"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ background: r.color }}
              />
              {r.label}
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="relative h-64 grow sm:h-80 lg:h-auto lg:min-h-64">
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain"
        />
      </div>
    </li>
  );
}

const CHIP_COLORS = [
  "#f1731e",
  "#7c69e8",
  "#00a88e",
  "#ff5c8a",
  "#4da3ff",
  "#e89a00",
];

function CategoriesBand() {
  const { title, body, chips } = tiles.categories;
  const rows = [chips.slice(0, 6), chips.slice(6, 11), chips.slice(11)];
  return (
    <article
      data-fx="reveal"
      className="relative isolate grid gap-8 overflow-hidden pt-8 text-ink sm:pt-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-12"
    >
      <div>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>
      </div>

      {/* decorative scrolling chips (the body copy already names the categories);
          .logo-marquee gives the edge fade + pause on hover, middle row runs reversed */}
      <div
        aria-hidden="true"
        className="logo-marquee flex min-w-0 flex-col gap-2.5 overflow-hidden py-1.5"
      >
        {rows.map((row, r) => {
          const loop = [...row, ...row];
          return (
            <div
              key={r}
              className={cn(
                "logo-marquee-track flex w-max",
                r === 1 && "[animation-direction:reverse]",
              )}
              style={{ animationDuration: `${34 + r * 6}s` }}
            >
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 gap-2.5 pr-2.5">
                  {loop.map((c, k) => (
                    <li
                      key={`${c}-${k}`}
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-ink ring-1 ring-border"
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{
                          background:
                            CHIP_COLORS[(k + r * 2) % CHIP_COLORS.length],
                        }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          );
        })}
      </div>
    </article>
  );
}
