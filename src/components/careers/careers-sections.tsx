import { ArrowUpRight, Briefcase, Check, Flag, Globe, HeartHandshake, ShieldAlert, Target, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CR_NOTICE, CR_PERKS, CR_POSITIONS, type FactIcon } from "@/content/careers";
import { cn } from "@/lib/utils";

/*
 * Sections of the /careers/ landing page. Copy and heading levels come from
 * src/content/careers.ts (live: <h2> section titles, <h3> fact titles).
 */

const ICONS: Record<FactIcon, LucideIcon> = {
  users: Users,
  flag: Flag,
  briefcase: Briefcase,
  globe: Globe,
  target: Target,
  heart: HeartHandshake,
};

const TINTS = ["#f1731e", "#00806c", "#7c69e8"] as const;

/** Live notice under the hero: employment-scam warning with its "click here" link (new tab, as live). */
export function ScamNotice() {
  return (
    <div className="container-page mt-8 sm:mt-10">
      <p className="flex items-start gap-3 rounded-[1.4rem] bg-[#fff6e8] px-5 py-4 text-sm leading-relaxed text-ink/80 ring-1 ring-[#f5c27a]/60 sm:items-center sm:px-6 sm:text-base">
        <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-brand ring-1 ring-[#f5c27a]/60">
          <ShieldAlert className="size-5" />
        </span>
        <span>
          {CR_NOTICE.text}{" "}
          <a
            href={CR_NOTICE.link.href}
            target="_blank"
            data-click-sound=""
            className="font-bold text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
          >
            {CR_NOTICE.link.label}
          </a>
        </span>
      </p>
    </div>
  );
}

/** Three fact / value cards, each title an <h3> as on live. */
export function FactCards({
  id,
  eyebrow,
  title,
  intro,
  items,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  items: readonly { icon: FactIcon; title: string; body: string }[];
  tone?: "light" | "surface";
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn("relative isolate overflow-hidden py-24 sm:py-32", tone === "surface" && "bg-surface")}
    >
      {tone === "surface" && (
        <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      )}
      <div className="container-page">
        <SectionHeading id={id} eyebrow={eyebrow} title={title} intro={intro} align="center" twoTone={false} />
        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li
                key={item.title}
                style={{ ["--tint" as string]: TINTS[i % TINTS.length] }}
                className="group relative flex flex-col overflow-hidden rounded-[1.6rem] bg-white p-7 ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_var(--tint)] sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="grid size-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--tint)_12%,white)] text-[var(--tint)]"
                >
                  <Icon className="size-6" strokeWidth={2.2} />
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-[-0.01em] text-ink sm:text-[1.7rem]">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/65">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Live "Ready For More Perks?": intro, eight perks and the relaxing-mascot illustration. */
export function PerksSplit() {
  const p = CR_PERKS;
  return (
    <section aria-labelledby="cr-perks-title" className="px-2 sm:px-4">
      <div className="hero-frame relative isolate overflow-hidden rounded-[2rem] py-20 sm:rounded-[3rem] sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <SectionHeading id="cr-perks-title" eyebrow={p.eyebrow} title={p.title} intro={p.intro} align="left" tone="dark" twoTone={false} />
            <ul data-fx="stagger" className="mt-10 grid gap-3 sm:grid-cols-2">
              {p.items.map((perk) => (
                <li
                  key={perk}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 font-semibold text-white/90 ring-1 ring-white/10"
                >
                  <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
          <div data-fx="reveal" className="relative mx-auto w-full max-w-xl">
            <div aria-hidden="true" className="absolute inset-[12%_8%_4%] -z-10 rounded-full bg-brand/25 blur-3xl" />
            <Image
              src={p.image.src}
              alt=""
              width={p.image.width}
              height={p.image.height}
              sizes="(min-width: 1024px) 36rem, 90vw"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Live "Positions Available": intro (with its line breaks) and the six role links (kimp.me, new tab). */
export function Positions() {
  const p = CR_POSITIONS;
  return (
    <section id="positions" aria-labelledby="cr-positions-title" className="relative isolate scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.6fr)] lg:gap-10">
          <SectionHeading
            id="cr-positions-title"
            eyebrow={p.eyebrow}
            title={p.title}
            align="left"
            className="lg:max-w-none"
            twoTone={false}
            intro={p.introLines.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          />
          <div data-fx="reveal" className="relative hidden lg:block">
            <Image
              src={p.image.src}
              alt=""
              width={p.image.width}
              height={p.image.height}
              sizes="32rem"
              className="h-auto w-full"
            />
          </div>
        </div>
        <ul data-fx="stagger" className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {p.roles.map((role, i) => (
            <li key={role.href}>
              <a
                href={role.href}
                target="_blank"
                data-click-sound=""
                className="group flex items-center justify-between gap-4 rounded-[1.4rem] bg-white px-6 py-5 ring-1 ring-border transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-[0_24px_40px_-30px_rgb(241_115_30/0.8)] hover:ring-brand/30"
              >
                <span className="flex items-center gap-4">
                  <span aria-hidden="true" className="text-sm font-bold text-ink/35 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-bold text-ink">{role.label}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-ink/70 transition-colors group-hover:bg-brand group-hover:text-white"
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
