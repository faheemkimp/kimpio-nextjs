import { BookOpen, FolderOpen, History, Palette, Target, TrendingUp } from "lucide-react";
import type { CSSProperties } from "react";

import { KIMP360 } from "@/content/home-sections";

const { memory } = KIMP360;

/** Per item: icon, colour, illustrative fill level, and its node position on the hub (% of the square). */
const ITEM_META = [
  { icon: BookOpen, color: "#f1731e", level: 100, x: 24, y: 20 },
  { icon: FolderOpen, color: "#4da3ff", level: 94, x: 76, y: 16 },
  { icon: History, color: "#7c69e8", level: 86, x: 78, y: 70 },
  { icon: Target, color: "#e89a00", level: 78, x: 46, y: 88 },
  { icon: Palette, color: "#00a88e", level: 64, x: 22, y: 62 },
] as const;

/**
 * KIMP360 "Brand memory" panel: what KIMP remembers and why it matters (each
 * bar fills as it appears), beside a brand-profile hub whose connectors draw
 * in on scroll.
 */
export function BrandMemoryPanel() {
  return (
    <article data-fx="reveal" className="relative grid gap-2 rounded-[1.75rem] bg-white p-2 ring-1 ring-border lg:grid-cols-[1.1fr_0.9fr]">
      {/* what KIMP remembers */}
      <div className="flex flex-col px-4 pt-5 pb-3 sm:px-6 sm:pt-7">
        <h3 className="text-2xl leading-tight font-bold text-ink sm:text-[1.75rem]">{memory.title}</h3>
        <p className="mt-3 max-w-xl leading-relaxed text-ink/65">{memory.body}</p>

        <div className="mt-6 overflow-hidden rounded-[1.25rem] ring-1 ring-border">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{memory.title}: what KIMP remembers and why it matters</caption>
            <thead className="bg-surface">
              <tr className="text-xs font-bold tracking-[0.12em] text-ink/50 uppercase">
                <th scope="col" className="px-4 py-3 sm:px-5">
                  {memory.columns.what}
                </th>
                <th scope="col" className="hidden px-4 py-3 sm:table-cell sm:px-5">
                  {memory.columns.why}
                </th>
              </tr>
            </thead>
            <tbody data-fx="stagger" className="divide-y divide-border">
              {memory.items.map((item, i) => {
                const { icon: Icon, color, level } = ITEM_META[i];
                return (
                  <tr key={item.what} className="align-top">
                    <th scope="row" className="px-4 py-4 sm:w-[40%] sm:px-5">
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="grid size-9 shrink-0 place-items-center rounded-xl"
                          style={{ background: `color-mix(in oklab, ${color} 14%, white)`, color }}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="font-bold text-ink">{item.what}</span>
                      </span>
                      <span aria-hidden="true" className="mt-3 block h-1.5 overflow-hidden rounded-full bg-ink/8">
                        <span data-fx="fill" className="block h-full rounded-full" style={{ width: `${level}%`, background: color }} />
                      </span>
                      {/* below sm the "why" sits under the label */}
                      <span className="mt-2 block text-[0.9rem] leading-snug font-normal text-ink/65 sm:hidden">{item.why}</span>
                    </th>
                    <td className="hidden px-4 py-4 text-[0.95rem] leading-snug text-ink/65 sm:table-cell sm:px-5">{item.why}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 flex items-center gap-2 px-1 text-sm font-semibold text-ink">
          <TrendingUp className="size-4 text-teal-brand" aria-hidden="true" />
          Request #48 · briefed from memory, no re-briefing needed
        </p>
      </div>

      {/* hub */}
      <div
        aria-hidden="true"
        className="relative isolate flex items-center overflow-hidden rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_50%,#fff6ee,#f2f5f8_70%)]"
      >
        <div className="fx-dots absolute inset-0 -z-10 opacity-60" />
        <span className="absolute top-4 left-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold text-ink shadow-sm ring-1 ring-border">
          Northwind · brand profile
        </span>
        <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
          <svg viewBox="0 0 100 100" fill="none" data-fx="draw" data-start="top 75%" data-end="center 45%" className="absolute inset-0 size-full">
            <circle
              data-static=""
              cx="50"
              cy="50"
              r="24"
              stroke="rgb(27 30 35 / 0.08)"
              strokeWidth="0.3"
              strokeDasharray="1 1.5"
              className="fx-spin-slow origin-center [transform-box:fill-box]"
            />
            <circle data-static="" cx="50" cy="50" r="38" stroke="rgb(27 30 35 / 0.06)" strokeWidth="0.3" strokeDasharray="1 2" />
            {ITEM_META.map((m) => (
              <path
                key={m.color}
                d={`M50 50 Q ${(50 + m.x) / 2 + (m.y - 50) * 0.25} ${(50 + m.y) / 2 - (m.x - 50) * 0.25} ${m.x} ${m.y}`}
                stroke={m.color}
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <span className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-[1.4rem] bg-ink text-3xl font-bold text-white shadow-[0_20px_40px_-12px_rgb(27_30_35/0.6),0_0_0_10px_rgb(255_255_255/0.8)] sm:size-24">
            N
          </span>
          {memory.items.map((item, i) => {
            const { icon: Icon, color, x, y } = ITEM_META[i];
            return (
              <span
                key={item.what}
                style={{ left: `${x}%`, top: `${y}%`, "--c": color } as CSSProperties}
                className="absolute flex -translate-1/2 items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-1.5 text-xs font-bold whitespace-nowrap text-ink shadow-[0_10px_24px_-12px_rgb(27_30_35/0.45)] ring-1 ring-border"
              >
                <span className="grid size-7 place-items-center rounded-full bg-(--c) text-white">
                  <Icon className="size-3.5" />
                </span>
                <span className="hidden sm:inline">{item.what}</span>
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
