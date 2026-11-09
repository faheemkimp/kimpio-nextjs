import {
  BadgeCheck,
  Check,
  Headset,
  ImageIcon,
  Infinity as InfinityIcon,
  LayoutDashboard,
  LayoutGrid,
  Star,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { GDS_PERKS, GDS_TEAM, type PerkIcon } from "@/content/graphic-design-services";
import { cn } from "@/lib/utils";

import "./gds.css";

const ICONS: Record<PerkIcon, LucideIcon> = {
  infinity: InfinityIcon,
  layout: LayoutDashboard,
  timer: Timer,
  users: Users,
  badge: BadgeCheck,
  grid: LayoutGrid,
  image: ImageIcon,
  headset: Headset,
  star: Star,
};

/* One accent per card, cycling through the homepage palette. */
const TINTS = ["#f1731e", "#00806c", "#7c69e8", "#4da3ff", "#e89a00", "#ff5c8a"] as const;

/** Live "perks_section": nine perks (<h3>) in a 3x3 grid; the first spans two rows on large screens. */
export function Perks() {
  return (
    <section aria-labelledby="gds-perks-title" className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div className="container-page">
        <SectionHeading id="gds-perks-title" eyebrow={GDS_PERKS.eyebrow} title={GDS_PERKS.title} intro={GDS_PERKS.intro} />

        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {GDS_PERKS.items.map((perk, i) => {
            const Icon = ICONS[perk.icon];
            const tint = TINTS[i % TINTS.length];
            const lead = i === 0;
            // The lead card spans two rows, so the last one runs full width to close the grid.
            const last = i === GDS_PERKS.items.length - 1;
            return (
              <li
                key={perk.title}
                style={{ ["--tint" as string]: tint }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 ring-1 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 sm:p-8",
                  last && "sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-8 lg:[&>h3]:mt-0 lg:[&>h3]:w-64 lg:[&>h3]:shrink-0 lg:[&>p]:mt-0",
                  lead
                    ? "bg-ink text-white ring-ink lg:row-span-2"
                    : "bg-white ring-border hover:shadow-[0_30px_50px_-34px_var(--tint)]",
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute -top-16 -right-16 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                    lead && "opacity-100",
                  )}
                  style={{ background: `color-mix(in oklab, ${tint} ${lead ? 55 : 25}%, transparent)` }}
                />
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-12 place-items-center rounded-2xl ring-1",
                      lead ? "bg-brand text-white ring-white/20" : "bg-[color-mix(in_oklab,var(--tint)_12%,white)] text-(--tint) ring-[color-mix(in_oklab,var(--tint)_25%,white)]",
                    )}
                  >
                    <Icon className="size-6" strokeWidth={2.2} />
                  </span>
                  <span aria-hidden="true" className={cn("text-sm font-bold tabular-nums", lead ? "text-white/30" : "text-ink/25", last && "lg:hidden")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={cn("mt-8 font-bold", lead ? "text-3xl sm:text-4xl" : "text-xl", lead ? "text-white" : "text-ink")}>{perk.title}</h3>
                <p className={cn("mt-3 leading-relaxed", lead ? "text-lg text-white/70" : "text-ink/60")}>{perk.body}</p>
                {lead && <UnlimitedMeter />}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Decorative: requests and revisions counters that never run out. */
function UnlimitedMeter() {
  const rows = [
    { label: "Requests", w: "w-[92%]" },
    { label: "Revisions", w: "w-[78%]" },
    { label: "Brands", w: "w-[64%]" },
  ];
  return (
    <div aria-hidden="true" className="mt-auto space-y-3 pt-10">
      {rows.map((r) => (
        <div key={r.label} className="rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-white/70">{r.label}</span>
            <span className="flex items-center gap-1 text-brand">
              <InfinityIcon className="size-4" strokeWidth={2.5} /> Unlimited
            </span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className={cn("memory-fill h-full rounded-full bg-[linear-gradient(90deg,#f1731e,#ffb47a)]", r.w)} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Routing loop: one brief per designer, each gets a SLOT-second turn. Keep in sync with gds.css (7.5s). */
const SLOT = 2.5;
const CYCLE = SLOT * 3;
const DEFAULT_JOBS = ["Brochure", "Instagram set", "App icons"] as const;
const PATHS = [50, 150, 250].map((x) => `M150 0 C150 40 ${x} 30 ${x} 70`);

type TeamMember = { role: string; note: string; initials: string; color: string };

/**
 * Live "teamincludes_section": the team as a small org chart, the Project
 * Manager above three designers, all orbiting "your brand". Heading and body
 * are the same on every service page; `members` and `jobs` are decorative and
 * can be themed per page (e.g. video roles on /video-design-services/).
 */
export function TeamChart({
  members = GDS_TEAM.members,
  jobs = DEFAULT_JOBS,
}: {
  members?: readonly TeamMember[];
  jobs?: readonly [string, string, string];
} = {}) {
  const JOBS = jobs;
  const [pm, ...designers] = members;
  return (
    <section aria-labelledby="gds-team-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading id="gds-team-title" eyebrow={GDS_TEAM.eyebrow} title={GDS_TEAM.title} align="left" twoTone={false} titleClassName="lg:text-[3rem]" />
          <p data-fx="reveal" className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {GDS_TEAM.body}
          </p>
          <dl data-fx="stagger" className="mt-10 grid max-w-md grid-cols-2 gap-3">
            {[
              ["1", "Project Manager"],
              ["3", "Designers"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-surface px-5 py-4 ring-1 ring-border">
                <dt className="text-sm font-semibold text-muted-foreground">{l}</dt>
                <dd className="mt-1 text-4xl font-bold text-ink tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div aria-hidden="true" className="relative mx-auto w-full max-w-xl">
          <div className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(241_115_30/0.16),transparent)]" />
          <div className="relative rounded-[2rem] bg-[#edf5f3] p-6 pt-14 ring-1 ring-[#0f766e]/10 sm:p-10 sm:pt-16">
            {/* PM, with incoming briefs dropping into it */}
            <div className="relative flex justify-center">
              {JOBS.map((job, k) => (
                <span
                  key={job}
                  className="gds-ticket absolute -top-10 left-1/2 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white shadow-lg"
                  style={{ ["--d" as string]: `${k * SLOT}s` }}
                >
                  <span className="size-1.5 rounded-full bg-brand" />
                  New request: {job}
                </span>
              ))}
              <Member {...pm} lead />
            </div>

            {/* connectors, with a brief travelling down each in turn */}
            <svg viewBox="0 0 300 70" data-fx="draw" data-start="top 80%" data-end="center 50%" className="mx-auto -my-1 h-16 w-full max-w-sm overflow-visible" fill="none">
              {PATHS.map((d) => (
                <path key={d} d={d} stroke="#f1731e" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
              ))}
              <g className="motion-reduce:hidden">
                {PATHS.map((d, k) => (
                  <circle key={d} r="5" fill={designers[k].color} stroke="#fff" strokeWidth="2" opacity="0">
                    <animateMotion path={d} dur={`${CYCLE}s`} begin={`${k * SLOT}s`} repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;0.07;0.16;1" />
                    <animate attributeName="opacity" dur={`${CYCLE}s`} begin={`${k * SLOT}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.065;0.075;0.15;0.17;1" />
                  </circle>
                ))}
              </g>
            </svg>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
              {designers.map((m, k) => (
                <Member key={m.initials} {...m} slot={k} />
              ))}
            </div>

            {/* the brand they all learn */}
            <div className="relative mt-8 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_20px_40px_-30px_rgb(15_118_110/0.6)] ring-1 ring-ink/5">
              {JOBS.map((job, k) => (
                <span
                  key={job}
                  className="gds-toast absolute -top-3.5 right-4 flex items-center gap-1 whitespace-nowrap rounded-full bg-teal-brand px-2.5 py-1 text-[11px] font-bold text-white shadow-md"
                  style={{ ["--d" as string]: `${k * SLOT}s` }}
                >
                  <Check className="size-3" strokeWidth={3} /> {job} delivered
                </span>
              ))}
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#ff9f55,#e8650f)] text-lg font-bold text-white">B</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm font-bold text-ink">
                  <span>Your brand(s)</span>
                  <span className="text-teal-brand">Pro level</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                  <div className="memory-fill h-full w-[88%] rounded-full bg-[linear-gradient(90deg,#00806c,#2fc3a5)]" />
                </div>
                <div className="mt-2 flex gap-1.5">
                  {["#1b1e23", "#f1731e", "#00806c", "#f2f5f8"].map((c) => (
                    <span key={c} className="size-4 rounded-full ring-1 ring-ink/10" style={{ background: c }} />
                  ))}
                  <span className="ml-1 text-xs font-semibold text-ink/45">Fonts, colours, tone</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function Member({
  role,
  note,
  initials,
  color,
  lead = false,
  slot,
}: {
  role: string;
  note: string;
  initials: string;
  color: string;
  lead?: boolean;
  /** Designer's turn in the routing loop. */
  slot?: number;
}) {
  const working = slot !== undefined;
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-2xl bg-white text-center ring-1 ring-ink/5",
        lead ? "w-56 px-5 py-5 shadow-[0_24px_40px_-26px_rgb(241_115_30/0.6)]" : "gds-work px-2 pt-4 pb-5 sm:px-3",
      )}
      style={working ? { ["--tint" as string]: color, ["--d" as string]: `${slot * SLOT}s` } : undefined}
    >
      <span
        className={cn("grid place-items-center rounded-full font-bold text-white", lead ? "gds-pulse size-14 text-base" : "size-11 text-sm")}
        style={{ background: color }}
      >
        {initials}
      </span>
      <span className={cn("mt-3 font-bold text-ink", lead ? "text-base" : "text-sm")}>{role}</span>
      <span className="mt-0.5 text-xs leading-snug text-ink/50">{note}</span>
      {working && (
        <>
          <span className="absolute inset-x-3 bottom-2 h-1 overflow-hidden rounded-full bg-surface">
            <span className="gds-work-bar block h-full rounded-full" style={{ background: color }} />
          </span>
          <span className="gds-work-done absolute -top-2 -right-2 grid size-6 place-items-center rounded-full text-white shadow" style={{ background: color }}>
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </>
      )}
    </div>
  );
}
