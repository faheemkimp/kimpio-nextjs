"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { BentoCard } from "./bento-card";
import { Check, Message, Pen, UserPlus, Video } from "./icons";
import { useCardLoop } from "./use-card-loop";

/* Each person keeps one colour everywhere: avatar, cursor and thread. */
const TARA = "#13A386";
const MAYA = "#F07422";

const TEAM = [
  { initials: "You", bg: "#5B6478" },
  { initials: "MK", bg: MAYA },
  { initials: "JS", bg: "#6CA6F5" },
];

const TOOLS = [
  { label: "Comment", Icon: Message },
  { label: "Annotate", Icon: Pen },
  { label: "Record", Icon: Video },
];

const IDLE = "#5B6478";

/* Canvas geometry (px): the artboard sits at (16, 24); the ring, pin and cursors are placed on the same grid. */
const RING = { cx: 61, cy: 45, rx: 44, ry: 15 };

function Face({ initials, bg, className = "" }: { initials: string; bg: string; className?: string }) {
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-full text-[0.48rem] font-bold text-white ring-2 ring-white ${className}`}
      style={{ background: bg }}
    >
      {initials}
    </span>
  );
}

/** A collaborator's cursor: their colour, their name riding along. */
function NamedCursor({ id, name, color }: { id: string; name: string; color: string }) {
  return (
    <span data-tm-cur={id} className="pointer-events-none invisible absolute top-0 left-0 z-30 flex items-start">
      <svg viewBox="0 0 16 18" className="size-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <path d="M1.5 1.5v13.2l3.6-3.4 2.6 5.6 2.3-1-2.5-5.5h5z" fill={color} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span className="mt-3 -ml-0.5 rounded-[5px] px-1.5 py-0.5 text-[0.56rem] font-semibold text-white" style={{ background: color }}>
        {name}
      </span>
    </span>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-[3px] font-heading text-[11px] font-bold tracking-[-0.02em] text-white">
      <svg viewBox="0 0 12 14" className="h-[11px] w-[9px]" aria-hidden="true">
        <path d="M6 0.5 10.5 13 6 10.2 1.5 13Z" fill="#fff" />
        <path d="M6 0.5 6 10.2 1.5 13Z" fill="#F2A541" />
      </svg>
      northwind
    </span>
  );
}

/**
 * "Design better, as a team": a review in Kimp 360. Tara joins on a free seat,
 * circles the logo and leaves a comment; Maya, the designer, replies with a
 * screen recording, and v3 lands with the bigger logo.
 */
export function TeamCard({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useCardLoop(
    root,
    (q) => {
      const tara = q('[data-tm-cur="tara"]');
      const maya = q('[data-tm-cur="maya"]');
      const tool = (i: number, on: boolean) =>
        gsap
          .timeline()
          .to(q(`[data-tm-tool-on="${i}"]`), { autoAlpha: on ? 1 : 0, duration: 0.2 })
          .to(q(`[data-tm-tool="${i}"]`), { color: on ? "#FFFFFF" : IDLE, duration: 0.2 }, "<")
          .to(q(`[data-tm-tip="${i}"]`), { autoAlpha: on ? 1 : 0, duration: 0.2 }, "<");

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { ease: "power2.out" } });

      tl.set(q("[data-tm-new]"), { autoAlpha: 0, scale: 0.4 })
        .set(q("[data-tm-toast]"), { autoAlpha: 0, y: -6 })
        .set(tara, { autoAlpha: 0, x: 240, y: 300, scale: 1 })
        .set(maya, { autoAlpha: 0, x: 330, y: 330 })
        .set(q("[data-tm-ring]"), { drawSVG: "0%", autoAlpha: 1 })
        .set(q("[data-tm-pin]"), { autoAlpha: 0, scale: 0.4 })
        .set(q("[data-tm-thread]"), { autoAlpha: 0, y: 8 })
        .set(q("[data-tm-reply]"), { autoAlpha: 0, y: 6 })
        .set(q("[data-tm-rec]"), { autoAlpha: 0, scale: 0.8 })
        .set(q("[data-tm-resolved]"), { autoAlpha: 0 })
        .set(q("[data-tm-logo]"), { scale: 1 })
        .set(q("[data-tm-ver]"), { yPercent: 0 })
        .set(q("[data-tm-tool-on], [data-tm-tip]"), { autoAlpha: 0 })
        .set(q("[data-tm-tool]"), { color: IDLE });

      // Tara joins, on a free seat
      tl.to(q("[data-tm-new]"), { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" }, 0.3)
        .to(q("[data-tm-toast]"), { autoAlpha: 1, y: 0, duration: 0.35 }, "<0.1")
        .to(q("[data-tm-toast]"), { autoAlpha: 0, y: -6, duration: 0.3 }, "+=1.4")

        // she circles the logo
        .to(tara, { autoAlpha: 1, x: 14, y: 44, duration: 0.8, ease: "power2.inOut" }, "<")
        .add(tool(1, true), "<0.5")
        .to(q("[data-tm-ring]"), { drawSVG: "100%", duration: 0.9, ease: "power1.inOut" }, ">")
        .to(tara, { x: 104, y: 50, duration: 0.9, ease: "power1.inOut" }, "<")
        .add(tool(1, false), "+=0.2")

        // and leaves a comment on it
        .add(tool(0, true), "<")
        .to(tara, { x: 118, y: 26, duration: 0.3, ease: "power2.inOut" }, "<")
        .to(tara, { scale: 0.88, duration: 0.1 })
        .to(tara, { scale: 1, duration: 0.12 })
        .to(q("[data-tm-pin]"), { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, "<")
        .to(q("[data-tm-thread]"), { autoAlpha: 1, y: 0, duration: 0.35 }, "<0.1")
        .to(tara, { autoAlpha: 0, x: 220, y: 270, duration: 0.6 }, "+=0.7")
        .add(tool(0, false), "<")

        // Maya replies with a screen recording
        .to(maya, { autoAlpha: 1, x: 196, y: 196, duration: 0.8, ease: "power2.inOut" }, "<0.2")
        .add(tool(2, true), "<0.4")
        .to(q("[data-tm-reply]"), { autoAlpha: 1, y: 0, duration: 0.35 }, ">")
        .to(q("[data-tm-rec]"), { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, "+=0.3")
        .add(tool(2, false), "+=0.4")

        // v3 lands with the bigger logo; the thread resolves
        .to(q("[data-tm-logo]"), { scale: 1.2, duration: 0.6, ease: "power3.inOut" }, "+=0.3")
        .to(q("[data-tm-ring]"), { autoAlpha: 0, duration: 0.4 }, "<0.2")
        .to(q("[data-tm-ver]"), { yPercent: -50, duration: 0.35 }, "<")
        .to(q("[data-tm-resolved]"), { autoAlpha: 1, duration: 0.3 }, "<0.2")
        .to(maya, { autoAlpha: 0, x: 300, y: 320, duration: 0.6 }, "<")

        // the review closes and the file goes back to v2 for the next pass
        .to(q("[data-tm-pin], [data-tm-thread], [data-tm-new]"), { autoAlpha: 0, duration: 0.4 }, "+=2.2")
        .to(q("[data-tm-logo]"), { scale: 1, duration: 0.5, ease: "power2.inOut" }, "<")
        .to(q("[data-tm-ver]"), { yPercent: 0, duration: 0.35 }, "<");

      return tl;
    },
    (q) => {
      gsap.set(q("[data-tm-new], [data-tm-pin], [data-tm-thread], [data-tm-reply], [data-tm-rec], [data-tm-resolved]"), { autoAlpha: 1 });
      gsap.set(q("[data-tm-logo]"), { scale: 1.2 });
      gsap.set(q("[data-tm-ver]"), { yPercent: -50 });
    },
  );

  return (
    <BentoCard
      tone="mint"
      title="Design better, as a team"
      body="Invite unlimited collaborators to request and review alongside your dedicated design team, at no extra cost."
      className={className}
      headerClassName="pr-24 sm:pr-28"
    >
      {/* 3D accent, peeking from the top-right corner */}
      <div aria-hidden="true" className="cc-float pointer-events-none absolute top-3 right-3 size-24 sm:size-28">
        <Image src="/images/kimp360/bubbles-3d.png" alt="" fill sizes="112px" className="object-contain drop-shadow-[0_14px_18px_rgba(10,70,55,0.25)]" />
      </div>

      <div ref={root} aria-hidden="true" className="relative mt-auto flex min-h-[360px] flex-1 flex-col pt-6 pl-5 text-[#1E1F2B] sm:pl-6">
        {/* review window: runs off the card's right and bottom edges */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-tl-[16px] border-t border-l border-white bg-white shadow-[0_24px_50px_-26px_rgba(10,70,55,0.5)]">
          <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#EEF1F5] px-3">
            <p className="truncate text-[0.7rem] font-semibold">Spring sale post</p>
            <span className="h-4 shrink-0 overflow-hidden rounded-[4px] bg-[#F1F3F7] px-1 text-[0.56rem] font-semibold text-[#5B6577]">
              <span data-tm-ver className="flex flex-col leading-4">
                <span>v2</span>
                <span>v3</span>
              </span>
            </span>
            <span className="ml-auto flex pr-2">
              {TEAM.map((m, i) => (
                <Face key={m.initials} {...m} className={i ? "-ml-1.5" : ""} />
              ))}
              <span data-tm-new className="-ml-1.5">
                <Face initials="TA" bg={TARA} />
              </span>
            </span>
          </div>

          {/* canvas */}
          <div className="relative flex-1 bg-[#F3F5F8]">
            <p className="absolute top-[7px] left-4 text-[0.52rem] font-medium text-[#8A93A6]">Instagram · 4:5</p>

            {/* the artboard */}
            <div className="absolute top-6 left-4 h-[245px] w-[196px] overflow-hidden rounded-[4px] bg-[#14355C] shadow-[0_10px_24px_-14px_rgba(20,40,80,0.55)]">
              <span data-tm-logo className="absolute top-3.5 left-3 origin-left">
                <Wordmark />
              </span>
              <p className="absolute top-[54px] left-3 font-heading text-[30px] leading-[0.92] font-bold tracking-[-0.03em] text-white">
                Spring
                <br />
                sale
              </p>
              <p className="absolute top-[122px] left-3 text-[11px] font-semibold text-[#F2A541]">Up to 40% off</p>
              <span className="absolute -right-8 -bottom-8 size-[140px] rounded-full bg-[#F2A541]" />
              <span className="absolute right-[34px] bottom-[28px] h-[66px] w-[40px] rounded-[9px] bg-[#F6F3EC] shadow-[0_10px_16px_-8px_rgba(0,0,0,0.45)]" />
              <span className="absolute right-[44px] bottom-[74px] h-[8px] w-[20px] rounded-[3px] bg-[#14355C]" />
            </div>

            {/* Tara's annotation around the logo */}
            <svg viewBox="0 0 220 100" className="pointer-events-none absolute top-0 left-0 h-[100px] w-[220px] overflow-visible">
              <ellipse data-tm-ring className="invisible" cx={RING.cx} cy={RING.cy} rx={RING.rx} ry={RING.ry} fill="none" stroke={TARA} strokeWidth="2" strokeLinecap="round" />
            </svg>

            {/* comment pin */}
            <span
              data-tm-pin
              className="invisible absolute top-[14px] left-[110px] z-10 grid size-[22px] place-items-center rounded-full rounded-bl-[4px] text-[0.5rem] font-bold text-white ring-2 ring-white"
              style={{ background: TARA }}
            >
              TA
            </span>

            {/* the thread */}
            <div
              data-tm-thread
              className="invisible absolute top-[54px] left-[128px] z-20 w-[172px] rounded-[12px] bg-white p-2.5 shadow-[0_18px_34px_-16px_rgba(20,40,80,0.5),0_0_0_1px_rgba(20,40,80,0.06)]"
            >
              <div className="flex h-4 items-center justify-between text-[0.56rem] font-medium text-[#8A93A6]">
                Thread
                <span
                  data-tm-resolved
                  className="invisible inline-flex items-center gap-1 rounded-full bg-[#E3F4EE] px-1.5 py-px font-semibold text-[#03816D]"
                >
                  <Check className="size-2.5" />
                  Resolved
                </span>
              </div>
              <div className="mt-1.5 flex gap-1.5">
                <Face initials="TA" bg={TARA} className="ring-0" />
                <div className="min-w-0">
                  <p className="text-[0.58rem] font-semibold">
                    Tara <span className="font-normal text-[#9AA1B2]">now</span>
                  </p>
                  <p className="text-[0.64rem] leading-snug text-[#3A4256]">Logo a touch bigger?</p>
                </div>
              </div>
              <div data-tm-reply className="mt-2 flex gap-1.5 border-t border-[#F0F2F6] pt-2">
                <Face initials="MK" bg={MAYA} className="ring-0" />
                <div className="min-w-0">
                  <p className="text-[0.58rem] font-semibold">
                    Maya <span className="font-normal text-[#9AA1B2]">designer</span>
                  </p>
                  <p className="text-[0.64rem] leading-snug text-[#3A4256]">On it, done in v3.</p>
                  <span
                    data-tm-rec
                    className="mt-1.5 inline-flex items-center gap-1.5 rounded-[6px] bg-[#16161E] py-1 pr-2 pl-1 text-[0.54rem] font-semibold text-white"
                  >
                    <span className="grid size-3.5 place-items-center rounded-full bg-[#FF5A4E]">
                      <svg viewBox="0 0 8 8" className="ml-px size-1.5" fill="#fff">
                        <path d="M1.5 1v6l5-3z" />
                      </svg>
                    </span>
                    Walkthrough · 0:12
                  </span>
                </div>
              </div>
            </div>

            {/* review tools: a rail on the canvas edge; the tool in use shows its name */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-0.5 rounded-[10px] bg-white p-1 shadow-[0_8px_18px_-10px_rgba(20,40,80,0.45),0_0_0_1px_rgba(20,40,80,0.06)]">
              {TOOLS.map((t, i) => (
                <span key={t.label} data-tm-tool={i} className="relative grid size-7 place-items-center rounded-[7px]" style={{ color: IDLE }}>
                  <span data-tm-tool-on={i} className="invisible absolute inset-0 rounded-[7px] bg-[#1E1F2B]" />
                  <t.Icon className="relative size-3.5" />
                  <span
                    data-tm-tip={i}
                    className="invisible absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-[6px] bg-[#1E1F2B] px-1.5 py-0.5 text-[0.56rem] font-medium whitespace-nowrap text-white"
                  >
                    {t.label}
                  </span>
                </span>
              ))}
            </div>

            {/* a free seat, filled */}
            <span
              data-tm-toast
              className="invisible absolute top-2 left-[132px] z-20 inline-flex items-center gap-1.5 rounded-full bg-[#16161E] px-2.5 py-1 text-[0.58rem] font-medium whitespace-nowrap text-white shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
            >
              <UserPlus className="size-3" style={{ color: TARA }} />
              Tara joined · free seat
            </span>

            <NamedCursor id="tara" name="Tara" color={TARA} />
            <NamedCursor id="maya" name="Maya" color={MAYA} />
          </div>
        </div>
      </div>
      <p className="sr-only">Comments, annotations and screen recordings keep feedback precise.</p>
    </BentoCard>
  );
}
