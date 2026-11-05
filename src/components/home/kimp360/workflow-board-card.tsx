"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { BentoCard } from "./bento-card";
import { Check, Cursor } from "./icons";
import { useCardLoop } from "./use-card-loop";

type Req = { title: string; tag: string; who: number };

const COLUMNS: { name: string; color: string; cards: Req[] }[] = [
  {
    name: "Drafts",
    color: "#8E97A8",
    cards: [
      { title: "Spring sale banner", tag: "Web", who: 0 },
      { title: "Menu redesign", tag: "Print", who: 1 },
    ],
  },
  {
    name: "In progress",
    color: "#F07422",
    cards: [
      { title: "Explainer video", tag: "Video", who: 2 },
      { title: "Podcast cover", tag: "Social", who: 3 },
    ],
  },
  { name: "In review", color: "#7C6CF2", cards: [{ title: "Email header", tag: "Email", who: 1 }] },
  {
    name: "Completed",
    color: "#03816D",
    cards: [
      { title: "Booth graphics", tag: "Print", who: 2 },
      { title: "Logo refresh", tag: "Brand", who: 0 },
    ],
  },
];

const STATUS = ["New request", "Designer on it", "Ready to review", "Delivered"];
const AVATARS = ["#F6C7A1", "#C9C2F6", "#A9DCCB", "#F4B4C3"];

const REST = "0 1px 2px rgba(16,24,40,0.06), 0 0 0 rgba(20,40,80,0)";
const LIFT = "0 1px 2px rgba(16,24,40,0.06), 0 22px 34px -14px rgba(20,40,80,0.42)";

/** Every card, the traveller and the drop slot share this box. */
const CARD = "flex h-[5.5rem] shrink-0 flex-col rounded-[10px] p-2.5";

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex h-3.5 items-center rounded-[4px] bg-[#F1F3F7] px-1.5 text-[0.55rem] font-semibold tracking-wide text-[#5B6577]">
      {children}
    </span>
  );
}

function Avatar({ i, className = "", ...rest }: { i: number; className?: string; [k: `data-${string}`]: unknown }) {
  return <i {...rest} className={`block size-4 rounded-full ring-2 ring-white ${className}`} style={{ background: AVATARS[i % 4] }} />;
}

function RequestCard({ title, tag, who }: Req) {
  return (
    <div className={`${CARD} border border-[#E6EAF0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]`}>
      <span>
        <Tag>{tag}</Tag>
      </span>
      <p className="mt-1.5 truncate text-[0.68rem] leading-4 font-semibold text-[#1E1F2B]">{title}</p>
      <div className="mt-auto flex h-4 shrink-0 items-center justify-between">
        <span className="h-[3px] w-10 rounded-full bg-[#EDF0F4]" />
        <Avatar i={who} />
      </div>
    </div>
  );
}

/**
 * "Streamlined Workflow": a Kimp 360 request board in an app window. A new
 * request is dragged from Drafts to Completed; each target column opens a
 * drop slot and its count rolls as the card lands.
 */
export function WorkflowBoardCard({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useCardLoop(
    root,
    (q) => {
      const card = q("[data-wf-traveller]");
      const cursor = q("[data-wf-cursor]");
      const slotEl = (i: number) => q(`[data-wf-slot="${i}"]`)[0] as HTMLElement;
      const slot = (i: number) => q(`[data-wf-slot="${i}"]`);
      const count = (i: number) => q(`[data-wf-count="${i}"]`);
      const label = (i: number) => q(`[data-wf-label="${i}"]`);
      // slots are laid out in the board (the traveller's offset parent), so offsets are transform-proof
      const at = (i: number) => ({
        x: () => slotEl(i).offsetLeft,
        y: () => slotEl(i).offsetTop,
        width: () => slotEl(i).offsetWidth,
      });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, repeatRefresh: true, defaults: { ease: "power2.inOut" } });

      // reset (also the start of every repeat)
      tl.set(card, { ...at(0), autoAlpha: 0, scale: 0.94, rotation: 0, boxShadow: REST })
        .set(q("[data-wf-label]"), { autoAlpha: 0, y: 4 })
        .set(label(0), { autoAlpha: 1, y: 0 })
        .set(q("[data-wf-done]"), { autoAlpha: 0, scale: 0.4 })
        .set(q("[data-wf-avatar]"), { autoAlpha: 0, scale: 0.4 })
        .set(q("[data-wf-count]"), { yPercent: 0 })
        .set(q("[data-wf-slot]"), { autoAlpha: 0 })
        .set(cursor, { autoAlpha: 0, x: 104, y: 76, scale: 1 });

      // a new request lands in Drafts, and the Drafts count rolls with it
      tl.to(card, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, 0.15).to(
        count(0),
        { yPercent: -50, duration: 0.35, ease: "power2.out" },
        "<0.15",
      );

      for (let i = 1; i < COLUMNS.length; i++) {
        tl.to(cursor, { autoAlpha: 1, x: 70, y: 28, duration: 0.5 }, "+=0.85")
          .to(cursor, { scale: 0.86, duration: 0.1 })
          .to(card, { scale: 1.03, rotation: -2, boxShadow: LIFT, duration: 0.2, ease: "power2.out" }, "<")
          .to(slot(i), { autoAlpha: 1, duration: 0.25 }, "<0.1")
          .to(card, { ...at(i), duration: 0.9 }, "<")
          .to(count(i - 1), { yPercent: 0, duration: 0.35, ease: "power2.out" }, "<0.2")
          .to(card, { scale: 1, rotation: 0, boxShadow: REST, duration: 0.3, ease: "back.out(2)" })
          .to(slot(i), { autoAlpha: 0, duration: 0.2 }, "<")
          .to(count(i), { yPercent: -50, duration: 0.35, ease: "power2.out" }, "<")
          .to(cursor, { scale: 1, duration: 0.15 }, "<")
          .to(cursor, { autoAlpha: 0, x: 112, y: 84, duration: 0.35 })
          .to(label(i - 1), { autoAlpha: 0, y: -4, duration: 0.2 }, "<")
          .to(label(i), { autoAlpha: 1, y: 0, duration: 0.25 }, "<0.1");
        if (i === 1) tl.to(q("[data-wf-avatar]"), { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, "<");
        if (i === 3) tl.to(q("[data-wf-done]"), { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, "<");
      }

      // delivered: the card is filed away and Completed settles back
      tl.to(card, { autoAlpha: 0, scale: 0.95, duration: 0.4 }, "+=1.8").to(
        count(COLUMNS.length - 1),
        { yPercent: 0, duration: 0.35, ease: "power2.out" },
        "<0.1",
      );
      return tl;
    },
    (q) => {
      const last = COLUMNS.length - 1;
      const s = q(`[data-wf-slot="${last}"]`)[0] as HTMLElement;
      gsap.set(q("[data-wf-traveller]"), { x: s.offsetLeft, y: s.offsetTop, width: s.offsetWidth, autoAlpha: 1 });
      gsap.set(q(`[data-wf-label="${last}"]`), { autoAlpha: 1 });
      gsap.set(q(`[data-wf-count="${last}"]`), { yPercent: -50 });
      gsap.set(q("[data-wf-done], [data-wf-avatar]"), { autoAlpha: 1 });
    },
  );

  return (
    <BentoCard
      tone="sky"
      title="Streamlined Workflow"
      body="Requests move from draft to in progress, review and completed on one board. Get a 360° view, organized your way."
      className={className}
    >
      <div ref={root} aria-hidden="true" className="relative mt-auto flex min-h-[340px] flex-1 flex-col overflow-hidden pt-6 pl-6 sm:pl-7">
        {/* app window: anchored top-left, running off the card's right and bottom edges */}
        <div className="flex min-w-[600px] flex-1 flex-col rounded-tl-[16px] border-t border-l border-[#D9E4F1] bg-white text-[#1E1F2B] shadow-[0_24px_50px_-26px_rgba(30,70,140,0.45)]">
          {/* toolbar */}
          <div className="flex h-11 shrink-0 items-center gap-3 border-b border-[#EEF1F5] px-3.5">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-[#FF6159]" />
              <i className="size-2.5 rounded-full bg-[#FFBD2E]" />
              <i className="size-2.5 rounded-full bg-[#28C941]" />
            </span>
            <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold">
              <span className="grid size-4 place-items-center rounded-[5px] bg-[#16161E] text-[0.5rem] font-bold text-white">N</span>
              Northwind
              <svg viewBox="0 0 12 12" className="size-2.5 text-[#8A93A6]" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m3 4.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="flex rounded-[7px] bg-[#F1F3F7] p-0.5 text-[0.62rem] font-medium text-[#6B7487]">
              <span className="rounded-[5px] bg-white px-2 py-0.5 text-[#1E1F2B] shadow-[0_1px_2px_rgba(16,24,40,0.1)]">Board</span>
              <span className="px-2 py-0.5">List</span>
              <span className="px-2 py-0.5">Calendar</span>
            </span>
            <span className="ml-auto flex items-center gap-2.5 pr-1">
              <span className="flex">
                <Avatar i={0} />
                <Avatar i={2} className="-ml-1" />
                <Avatar i={1} className="-ml-1" />
              </span>
              <span className="inline-flex h-6 items-center gap-1 rounded-[7px] bg-[#F07422] px-2.5 text-[0.62rem] font-semibold text-white">
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2.5v7M2.5 6h7" strokeLinecap="round" />
                </svg>
                New request
              </span>
            </span>
          </div>

          {/* board: the traveller's offset parent, so columns stay unpositioned */}
          <div data-wf-board className="relative flex flex-1 gap-2 p-2.5 pb-0">
            {COLUMNS.map((c, ci) => (
              <div key={c.name} className="flex min-w-[136px] flex-1 flex-col gap-1.5 rounded-t-[12px] bg-[#F4F6FA] p-1.5">
                <p className="flex h-6 items-center gap-1.5 px-1 text-[0.68rem] font-semibold text-[#1E2B40]">
                  <span className="size-1.5 rounded-full" style={{ background: c.color }} />
                  {c.name}
                  <span className="ml-auto h-4 min-w-4 overflow-hidden rounded-full bg-[#E6EAF1] px-1.5 text-center text-[0.58rem] font-semibold text-[#6B7487]">
                    <span data-wf-count={ci} className="flex flex-col leading-4">
                      <span>{c.cards.length}</span>
                      <span>{c.cards.length + 1}</span>
                    </span>
                  </span>
                </p>
                {c.cards.map((r) => (
                  <RequestCard key={r.title} {...r} />
                ))}
                {/* drop slot: always laid out, shown while a card is dragged over this column */}
                <div
                  data-wf-slot={ci}
                  className={`${CARD} invisible border-[1.5px] border-dashed`}
                  style={{ borderColor: `${c.color}73`, background: `${c.color}0F` }}
                />
              </div>
            ))}

            {/* the travelling request */}
            <div
              data-wf-traveller
              className={`${CARD} invisible absolute top-0 left-0 z-10 w-[136px] border border-[#F2D4BE] bg-white`}
            >
              <div className="flex items-center justify-between">
                <Tag>Social</Tag>
                <span data-wf-done className="invisible grid size-3.5 place-items-center rounded-full bg-[#03816D] text-white">
                  <Check className="size-2.5" />
                </span>
              </div>
              <p className="mt-1.5 truncate text-[0.68rem] leading-4 font-semibold">Instagram carousel</p>
              <div className="mt-auto flex h-4 shrink-0 items-center justify-between gap-2">
                <span className="relative h-4 flex-1">
                  {COLUMNS.map((c, i) => (
                    <span
                      key={c.name}
                      data-wf-label={i}
                      className="invisible absolute inset-0 flex items-center gap-1 text-[0.58rem] font-semibold whitespace-nowrap"
                      style={{ color: c.color }}
                    >
                      <span className="size-1 rounded-full" style={{ background: c.color }} />
                      {STATUS[i]}
                    </span>
                  ))}
                </span>
                <Avatar i={2} data-wf-avatar className="invisible" />
              </div>
              <Cursor data-wf-cursor className="pointer-events-none invisible absolute top-0 left-0 size-5 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]" />
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
