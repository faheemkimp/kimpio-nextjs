"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { BentoCard } from "./bento-card";
import { Check, Cursor } from "./icons";
import { useCardLoop } from "./use-card-loop";

const SWATCHES = ["#14355C", "#F2A541", "#2F8F83", "#E9E2D3", "#F6F3EC"];

/** What the new request picks up from brand memory, and which profile sections it came from. */
const PICKED = [
  { label: "Logo & colours", detail: "Kit v3", from: ["logo", "colours"] },
  { label: "Fonts", detail: "Outfit, Inter", from: ["type"] },
  { label: "Tone of voice", detail: "Warm, plain", from: ["tone"] },
  { label: "Approved shots", detail: "4 files", from: ["assets"] },
];

const ASSETS = [
  "linear-gradient(150deg,#F7C77B,#F2A541)",
  "linear-gradient(150deg,#2F5A86,#14355C)",
  "linear-gradient(150deg,#7FC4B8,#2F8F83)",
  "linear-gradient(150deg,#F3EEE4,#DCD2BF)",
];

function Section({ id, label, className = "", children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <div className={`relative rounded-[12px] border border-[#EEF0F5] p-3 ${className}`}>
      <span data-bm-ring={id} className="pointer-events-none invisible absolute -inset-[3px] rounded-[14px] border-2 border-[#F07422]" />
      <p className="text-[0.56rem] font-semibold tracking-[0.08em] text-[#8A8FA8] uppercase">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/** Northwind's wordmark: a compass needle and lowercase name, not a letter in a box. */
function Wordmark({ dark = false }: { dark?: boolean }) {
  const ink = dark ? "#FFFFFF" : "#14355C";
  return (
    <span className="flex items-center gap-1 font-heading text-[0.8rem] font-bold tracking-[-0.02em] normal-case" style={{ color: ink }}>
      <svg viewBox="0 0 12 14" className="h-3.5 w-3" aria-hidden="true">
        <path d="M6 0.5 10.5 13 6 10.2 1.5 13Z" fill={ink} />
        <path d="M6 0.5 6 10.2 1.5 13Z" fill="#F2A541" />
      </svg>
      northwind
    </span>
  );
}

/**
 * "KIMP gets to know your brand": Northwind's brand profile in Kimp 360, and a
 * new request beside it. As the brief is written, each thing KIMP already knows
 * is added to the request and its source in the profile lights up; the request
 * goes out with nothing to re-brief.
 */
export function BrandMemoryCard({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useCardLoop(
    root,
    (q) => {
      const panel = q("[data-bm-panel]");
      const cursor = q("[data-bm-cursor]");
      const submit = () => q("[data-bm-submit]")[0] as HTMLElement;
      const ring = (id: string) => q(`[data-bm-ring="${id}"]`);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2, repeatRefresh: true, defaults: { ease: "power2.out" } });

      tl.set(panel, { autoAlpha: 0, y: 14 })
        .set(q("[data-bm-brief]"), { clipPath: "inset(0 100% 0 0)" })
        .set(q("[data-bm-item]"), { autoAlpha: 0, y: 6 })
        .set(q("[data-bm-ring]"), { autoAlpha: 0 })
        .set(q("[data-bm-sent]"), { autoAlpha: 0 })
        .set(cursor, { autoAlpha: 0, x: 210, y: 300, scale: 1 });

      // a new request opens and its brief is written
      tl.to(panel, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.1).to(
        q("[data-bm-brief]"),
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "steps(30)" },
        "+=0.2",
      );

      // KIMP fills in what it already knows, each item lighting its source
      PICKED.forEach((p, i) => {
        const at = `pick${i}`;
        const rings = p.from.flatMap(ring);
        tl.addLabel(at, i === 0 ? "+=0.35" : "-=0.3")
          .to(q(`[data-bm-item="${i}"]`), { autoAlpha: 1, y: 0, duration: 0.35 }, at)
          .to(rings, { autoAlpha: 1, duration: 0.25 }, at)
          .to(rings, { autoAlpha: 0, duration: 0.4 }, `${at}+=0.9`);
      });

      // sent, with nothing to re-brief
      tl.to(
        cursor,
        {
          autoAlpha: 1,
          x: () => submit().offsetLeft + submit().offsetWidth * 0.62,
          y: () => submit().offsetTop + submit().offsetHeight * 0.45,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "+=0.2",
      )
        .to(cursor, { scale: 0.86, duration: 0.1 })
        .to(q("[data-bm-submit]"), { scale: 0.97, duration: 0.1 }, "<")
        .to(q("[data-bm-sent]"), { autoAlpha: 1, duration: 0.25 })
        .to(q("[data-bm-submit]"), { scale: 1, duration: 0.2 }, "<")
        .to(cursor, { scale: 1, duration: 0.15 }, "<")
        .to(cursor, { autoAlpha: 0, x: "+=30", y: "+=24", duration: 0.4 }, "+=0.3")
        .to(panel, { autoAlpha: 0, y: -10, duration: 0.45, ease: "power2.in" }, "+=1.8");
      return tl;
    },
    (q) => {
      gsap.set(q("[data-bm-sent]"), { autoAlpha: 1 });
    },
  );

  return (
    <BentoCard
      tone="lilac"
      title="KIMP gets to know your brand"
      body="The longer you use KIMP, the better it knows your brand. Set it up once; every request after that starts on-brand, with no re-briefing."
      className={className}
      headerClassName="lg:max-w-[60%]"
    >
      <div ref={root} aria-hidden="true" className="relative mt-auto flex flex-col gap-4 px-4 pt-6 text-[#1E1F2B] sm:px-6 md:flex-row md:items-start md:gap-0">
        {/* brand profile window: runs off the card's bottom edge */}
        <div className="min-h-[330px] min-w-0 flex-1 self-stretch rounded-t-[16px] border border-b-0 border-white/90 bg-white shadow-[0_24px_50px_-28px_rgba(60,40,140,0.5)] max-md:order-2">
          <div className="flex h-11 items-center gap-2.5 border-b border-[#F0F2F6] px-4">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-[#FF6159]" />
              <i className="size-2.5 rounded-full bg-[#FFBD2E]" />
              <i className="size-2.5 rounded-full bg-[#28C941]" />
            </span>
            <p className="truncate text-[0.72rem] font-medium text-[#5B6478]">
              <span className="text-[#1E1F2B]">Northwind</span> · Brand profile
            </p>
            <span className="ml-auto shrink-0 text-[0.62rem] text-[#9AA1B2] max-sm:hidden">Learned from 47 requests</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 p-3.5 md:pr-12">
            <Section id="logo" label="Logo">
              <div className="flex gap-1.5">
                <span className="grid h-9 flex-1 place-items-center rounded-[8px] bg-[#F6F3EC]">
                  <Wordmark />
                </span>
                <span className="grid h-9 w-11 place-items-center rounded-[8px] bg-[#14355C] max-sm:hidden">
                  <svg viewBox="0 0 12 14" className="h-3.5 w-3" aria-hidden="true">
                    <path d="M6 0.5 10.5 13 6 10.2 1.5 13Z" fill="#fff" />
                    <path d="M6 0.5 6 10.2 1.5 13Z" fill="#F2A541" />
                  </svg>
                </span>
              </div>
            </Section>

            <Section id="colours" label="Colours">
              <div className="flex h-9 items-center gap-1.5">
                {SWATCHES.map((c) => (
                  <span key={c} className="size-6 rounded-full shadow-[inset_0_0_0_1px_rgba(20,30,50,0.08)]" style={{ background: c }} />
                ))}
              </div>
            </Section>

            <Section id="type" label="Typography">
              <div className="flex h-9 items-end gap-3">
                <span className="font-heading text-[1.6rem] leading-none font-semibold text-[#14355C]">Aa</span>
                <span className="pb-0.5 text-[0.62rem] leading-tight text-[#6B7489]">
                  Outfit <span className="text-[#B0B6C4]">headings</span>
                  <br />
                  Inter <span className="text-[#B0B6C4]">body</span>
                </span>
              </div>
            </Section>

            <Section id="tone" label="Tone of voice">
              <div className="flex h-9 flex-wrap content-center gap-1">
                {["Warm", "Plain-spoken", "Never salesy"].map((t) => (
                  <span key={t} className="rounded-full bg-[#F3F1EC] px-2 py-0.5 text-[0.6rem] font-medium text-[#5B5546]">
                    {t}
                  </span>
                ))}
              </div>
            </Section>

            <Section id="assets" label="Approved assets · 128" className="col-span-2">
              <div className="grid grid-cols-4 gap-1.5">
                {ASSETS.map((bg, i) => (
                  <span key={bg} className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[8px]" style={{ background: bg }}>
                    <span
                      className={`block rounded-[5px] bg-white/85 shadow-[0_6px_10px_-6px_rgba(0,0,0,0.4)] ${i % 2 ? "h-1/2 w-1/4" : "h-2/5 w-2/5 rounded-full"}`}
                    />
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {/* the new request, straddling the window's right edge */}
        <div
          data-bm-panel
          className="relative z-10 shrink-0 rounded-[16px] bg-white p-4 shadow-[0_30px_60px_-28px_rgba(50,30,120,0.55),0_0_0_1px_rgba(30,20,80,0.05)] max-md:order-1 md:mt-10 md:mb-6 md:-ml-8 md:w-[272px]"
        >
          <p className="flex items-center justify-between text-[0.58rem] font-semibold tracking-[0.08em] text-[#8A8FA8] uppercase">
            New request
            <Wordmark />
          </p>
          <p className="mt-2 text-[0.88rem] font-semibold">Instagram carousel</p>
          <div className="mt-2 rounded-[8px] border border-[#E6EAF0] bg-[#FAFBFD] px-2.5 py-2 text-[0.7rem] text-[#3A4256]">
            <span data-bm-brief className="block truncate">
              Spring sale, 5 slides, link in bio
            </span>
          </div>

          <p className="mt-3.5 text-[0.58rem] font-semibold tracking-[0.08em] text-[#8A8FA8] uppercase">Added from brand memory</p>
          <ul className="mt-1.5 space-y-0.5">
            {PICKED.map((p, i) => (
              <li key={p.label} data-bm-item={i} className="flex h-7 items-center gap-2 text-[0.7rem]">
                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-[#E3F4EE] text-[#03816D]">
                  <Check className="size-2.5" />
                </span>
                <span className="font-medium">{p.label}</span>
                <span className="ml-auto truncate text-[0.64rem] text-[#8A93A6]">{p.detail}</span>
              </li>
            ))}
          </ul>

          <span data-bm-submit className="relative mt-3.5 flex h-8 items-center justify-center overflow-hidden rounded-[9px] bg-[#16161E] text-[0.72rem] font-semibold text-white">
            Submit request
            <span data-bm-sent className="invisible absolute inset-0 flex items-center justify-center gap-1.5 bg-[#03816D]">
              <Check className="size-3" />
              Sent, nothing to re-brief
            </span>
          </span>

          <Cursor data-bm-cursor className="pointer-events-none invisible absolute top-0 left-0 size-5 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]" />
        </div>
      </div>
    </BentoCard>
  );
}
