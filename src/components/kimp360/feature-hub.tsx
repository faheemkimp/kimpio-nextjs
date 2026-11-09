import { Check, FileArchive, Lock, MessageSquareText, MousePointer2, Palette, Sparkles, UserPlus } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { VideoDialog } from "@/components/home/video-dialog";
import { K360_HUB, type FeatureId } from "@/content/kimp360-platform";
import { cn } from "@/lib/utils";

import { HubNav } from "./hub-nav";

import "./kimp360.css";

/** A floating status chip per feature: what that screen "does" (decorative). */
const CHIPS: Record<FeatureId, { Icon: typeof Check; text: string; tone: string; pos: string }> = {
  kanban: { Icon: Check, text: "Moved to In Review", tone: "#00806c", pos: "-bottom-5 left-6" },
  collaboration: { Icon: UserPlus, text: "Sarah joined as Admin", tone: "#7c69e8", pos: "-top-5 right-6" },
  requests: { Icon: Sparkles, text: "AI suggested 3 sizes", tone: "#f1731e", pos: "-bottom-5 right-8" },
  feedback: { Icon: MessageSquareText, text: "“Make the logo bigger”", tone: "#e8436b", pos: "-top-5 left-8" },
  brands: { Icon: Palette, text: "Brand kit saved", tone: "#00806c", pos: "-bottom-5 left-8" },
  files: { Icon: FileArchive, text: "Source files ready", tone: "#4da3ff", pos: "-top-5 right-8" },
};

/**
 * Live "howtowork_section": six features, each an <h3> label + <h2> title +
 * copy + product screenshot. Live shows them as tabs; here every feature is a
 * full row (all in the DOM, in live order) with a sticky label bar that
 * tracks and jumps between them.
 */
export function FeatureHub() {
  return (
    <section aria-labelledby="k360-hub-title" className="relative isolate py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="k360-hub-title" eyebrow={K360_HUB.eyebrow} title={K360_HUB.title} intro={K360_HUB.intro} />
      </div>

      <HubNav items={K360_HUB.features.map((f) => ({ id: f.id, label: f.label }))} />

      <div className="container-page mt-10 space-y-24 sm:mt-14 sm:space-y-32">
        {K360_HUB.features.map((f, i) => {
          const chip = CHIPS[f.id];
          const flip = i % 2 === 1;
          return (
            <article
              key={f.id}
              id={`k360-${f.id}`}
              aria-labelledby={`k360-${f.id}-title`}
              className="grid scroll-mt-40 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
            >
              <div data-fx="reveal" className={cn(flip && "lg:order-2")}>
                {/* The number sits outside the <h3> so the heading text stays exactly as on live. */}
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-3.5 py-1.5 text-sm font-bold text-teal-brand">
                  <span aria-hidden="true" className="tabular-nums text-teal-brand/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{f.label}</h3>
                </div>
                <h2 id={`k360-${f.id}-title`} className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
                  {f.title}
                </h2>
                {f.body.map((p) => (
                  <p key={p} className="mt-4 text-lg leading-relaxed text-ink/65">
                    {p}
                  </p>
                ))}
              </div>

              <div className={cn("relative", flip && "lg:order-1")}>
                <div aria-hidden="true" className={cn("absolute -inset-6 -z-10 rounded-[3rem] blur-2xl", i % 3 === 0 ? "bg-teal-brand/10" : i % 3 === 1 ? "bg-brand/10" : "bg-[#7c69e8]/10")} />
                <BrowserFrame>
                  <Image
                    src={f.image.src}
                    alt={`KIMP360 ${f.label}`}
                    width={f.image.width}
                    height={f.image.height}
                    sizes="(min-width: 1024px) 40rem, 92vw"
                    className="w-full"
                  />
                  {f.id === "feedback" && <FeedbackPins />}
                </BrowserFrame>
                <span
                  aria-hidden="true"
                  className={cn("k360-chip absolute z-10 inline-flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-bold text-ink shadow-[0_20px_40px_-20px_rgb(27_30_35/0.5)] ring-1 ring-ink/5", chip.pos)}
                >
                  <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: chip.tone }}>
                    <chip.Icon className="size-4" strokeWidth={2.5} />
                  </span>
                  {chip.text}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div data-fx="reveal" className="mt-20 flex justify-center">
        <VideoDialog label={K360_HUB.video.label} src={K360_HUB.video.src} />
      </div>
    </section>
  );
}

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_50px_80px_-50px_rgb(4_70_61/0.55)] ring-1 ring-ink/10 sm:rounded-[1.4rem]">
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-ink/5 bg-surface px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[0.7rem] font-semibold text-ink/50 ring-1 ring-ink/5">
          <Lock className="size-3" /> kimp.io/kimp360
        </span>
        <span className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** Point-and-click comment pins over the feedback screenshot. */
function FeedbackPins() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {[
        { top: "34%", left: "38%", n: 1 },
        { top: "58%", left: "62%", n: 2 },
      ].map((p) => (
        <span key={p.n} className="k360-pin absolute" style={{ top: p.top, left: p.left, ["--i" as string]: p.n }}>
          <span className="grid size-7 place-items-center rounded-full rounded-bl-none bg-brand text-xs font-bold text-white shadow-lg ring-2 ring-white">{p.n}</span>
        </span>
      ))}
      <MousePointer2 className="k360-cursor absolute top-[46%] left-[46%] size-6 fill-ink text-white" strokeWidth={1.5} />
    </div>
  );
}
