import { ArrowRight, Building2, Megaphone, Rocket, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { TEAMS } from "@/content/home-sections";

import { SectionHeading } from "./section-heading";

const AUDIENCE_ICONS = [Building2, Megaphone, Rocket] as const;

/** "Who it's for": three audience cards, each with an animated bento scene on a tinted stage. */
export function TeamUseCases() {
  return (
    <section aria-labelledby="teams-title" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="teams-title" eyebrow={TEAMS.eyebrow} title={TEAMS.title} intro={TEAMS.intro} />

        <ul data-fx="stagger" className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-3 lg:gap-5">
          {TEAMS.audiences.map((a, i) => {
            const Icon = AUDIENCE_ICONS[i];
            const Scene = SCENES[i];
            return (
              <li
                key={a.kicker}
                style={{ "--aud": a.color } as CSSProperties}
                className="group relative flex flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-border transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-34px_var(--aud)]"
              >
                <div
                  aria-hidden="true"
                  className="relative isolate h-52 overflow-hidden rounded-[1.35rem] bg-[color-mix(in_oklab,var(--aud)_7%,white)] p-3"
                >
                  <div className="grid h-full grid-cols-3 gap-2">
                    <Scene Icon={Icon} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-4 pt-6 pb-5 sm:px-5">
                  <p className="text-xs font-bold tracking-[0.14em] text-(--aud) uppercase">{a.kicker}</p>
                  <h3 className="mt-2 text-2xl leading-tight font-bold text-ink">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/65">{a.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {a.chips.map((c) => (
                      <li key={c} className="rounded-full bg-surface px-3 py-1.5 text-[0.8rem] font-semibold text-ink/75 ring-1 ring-border">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={a.cta.href}
                    className="mt-auto inline-flex items-center gap-2 pt-7 font-bold text-ink transition-colors hover:text-(--aud)"
                  >
                    {a.cta.label}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ audience bento scenes (decorative) */

type SceneProps = { Icon: LucideIcon };

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function Tile({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("min-w-0 rounded-2xl bg-white p-3 ring-1 ring-black/5", className)}>{children}</div>;
}

/** Narrow side tile: icon, one figure, one caption. */
function StatTile({ Icon, value, caption }: { Icon: LucideIcon; value: string; caption: string }) {
  return (
    <Tile className="flex flex-col justify-between">
      <Icon className="size-4 text-(--aud)" />
      <div>
        <p className="text-xl leading-none font-bold text-ink">{value}</p>
        <p className="mt-1 text-[0.68rem] font-medium text-ink/50">{caption}</p>
      </div>
    </Tile>
  );
}

/* Agencies: one team across many client brands; a soft highlight moves from brand to brand */
function AgencyScene({ Icon }: SceneProps) {
  return (
    <>
      <Tile className="col-span-2 grid grid-cols-3 grid-rows-2 gap-1.5 p-2">
        {["N", "A", "L", "M", "S", "R"].map((t, k) => (
          <span
            key={t}
            className="relative grid place-items-center overflow-hidden rounded-xl bg-surface text-sm font-bold text-ink/70"
          >
            <span
              className="aud-hl absolute inset-0 bg-[color-mix(in_oklab,var(--aud)_14%,white)]"
              style={delay(k * 0.8)}
            />
            <span className="relative">{t}</span>
          </span>
        ))}
      </Tile>
      <StatTile Icon={Icon} value="12" caption="client brands" />
    </>
  );
}

/* Marketing teams: the week's campaign work, each bar filling in turn */
function MarketingScene({ Icon }: SceneProps) {
  const rows = [
    ["Ad creatives", "80%"],
    ["Email design", "60%"],
    ["Shorts & reels", "92%"],
  ];
  return (
    <>
      <Tile className="col-span-2 flex flex-col justify-center gap-3">
        {rows.map(([label, w], k) => (
          <div key={label}>
            <p className="text-[0.7rem] font-semibold text-ink/70">{label}</p>
            <span className="mt-1.5 block h-1 rounded-full bg-ink/6">
              <span className="aud-grow-x block h-full rounded-full bg-(--aud)" style={{ width: w, ...delay(k * 0.4) }} />
            </span>
          </div>
        ))}
      </Tile>
      <StatTile Icon={Icon} value="3/3" caption="on schedule" />
    </>
  );
}

/* Growth teams: variant B pulls ahead of A */
function GrowthScene({ Icon }: SceneProps) {
  const variants = [
    ["A", [0.3, 0.42, 0.5], false],
    ["B", [0.5, 0.72, 1], true],
  ] as const;
  return (
    <>
      <Tile className="col-span-2 grid grid-cols-2 gap-3">
        {variants.map(([v, bars, win]) => (
          <div key={v} className="flex flex-col">
            <p className="text-[0.7rem] font-semibold text-ink/70">Variant {v}</p>
            <div className="mt-auto flex h-20 items-end gap-1">
              {bars.map((h, k) => (
                <span
                  key={k}
                  className={cn("aud-grow-y flex-1 rounded-t-[4px]", win ? "bg-(--aud)" : "bg-ink/10")}
                  style={{ height: `${h * 100}%`, ...delay(k * 0.12) }}
                />
              ))}
            </div>
          </div>
        ))}
      </Tile>
      <StatTile Icon={Icon} value="+24%" caption="CTR lift" />
    </>
  );
}

const SCENES = [AgencyScene, MarketingScene, GrowthScene] as const;
