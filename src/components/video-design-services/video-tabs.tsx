"use client";

import { Check, Clapperboard, Clock, Film, Library, Music2, UserPlus, Users, Video, type LucideIcon } from "lucide-react";
import Image from "next/image";

import {
  AccordionStage,
  CollaborateBento,
  Tile,
  TileLabel,
  bento,
  idx,
} from "@/components/graphic-design-services/service-tabs";
import { VDS_SERVICES, VDS_TABS, type VideoTabId } from "@/content/video-design-services";
import { cn } from "@/lib/utils";

import "./vds.css";

const ICONS: Record<VideoTabId, LucideIcon> = {
  team: Users,
  request: Clapperboard,
  stock: Library,
  collaborate: UserPlus,
  live: Video,
};

const poster = (slug: string) => VDS_SERVICES.items.find((s) => s.slug === slug)!.poster;

/** Kimp Video's five selling points (live "service_sec vedio_service_sec"). */
export function VideoTabs() {
  return (
    <AccordionStage
      idPrefix="vds"
      tabs={VDS_TABS.tabs}
      icons={ICONS}
      stages={{
        team: <TeamStage />,
        request: <RequestStage />,
        stock: <StockStage />,
        collaborate: <CollaborateBento />,
        live: <LiveStage />,
      }}
    />
  );
}

/* 01 — dedicated video team */
function TeamStage() {
  const people = [
    { n: "PM", c: "#f1731e", r: "Project Manager" },
    { n: "D1", c: "#00806c", r: "Motion" },
    { n: "D2", c: "#7c69e8", r: "Editing" },
    { n: "D3", c: "#4da3ff", r: "Social & ads" },
  ];
  return (
    <div className={bento}>
      <Tile i={0} className="col-span-2">
        <div className="flex items-center justify-between">
          <TileLabel>Your video team</TileLabel>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[0.7rem] font-bold text-teal-brand">
            <span className="gds-live size-1.5 rounded-full bg-teal-brand" /> Dedicated
          </span>
        </div>
        <ul className="mt-3 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
          {people.map((p, k) => (
            <li key={p.n} style={idx(k + 1)} className="gds-pop flex flex-col items-center justify-center gap-2 rounded-xl bg-surface px-2 py-3 text-center">
              <span className="relative grid size-10 place-items-center rounded-full text-xs font-bold text-white" style={{ background: p.c }}>
                {p.n}
                <span className="gds-ping absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-surface" style={idx(k)} />
              </span>
              <span className="text-[0.72rem] leading-tight font-semibold text-ink/75">{p.r}</span>
            </li>
          ))}
        </ul>
      </Tile>

      <Tile i={1}>
        <TileLabel>Brand & audience</TileLabel>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {["Tone", "Pacing", "Music", "Captions"].map((t, k) => (
            <li key={t} style={idx(k + 2)} className="gds-pop rounded-full bg-surface px-2.5 py-1 text-[0.7rem] font-bold text-ink/70 ring-1 ring-border">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-end gap-1 pt-3" aria-hidden="true">
          {[40, 70, 55, 90, 65, 80, 50].map((h, k) => (
            <span key={k} style={{ ...idx(k), height: `${h * 0.4}px` }} className="gds-grow w-full rounded-sm bg-[linear-gradient(#ffb47a,#f1731e)]" />
          ))}
        </div>
      </Tile>

      <Tile i={2} dark className="items-center justify-center text-center">
        <div className="relative">
          <svg viewBox="0 0 64 64" className="size-20 -rotate-90 sm:size-24">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="url(#vds-ring)" strokeWidth="6" strokeLinecap="round" className="gds-ring" />
            <defs>
              <linearGradient id="vds-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2fc3a5" />
                <stop offset="1" stopColor="#f1731e" />
              </linearGradient>
            </defs>
          </svg>
          <p className="absolute inset-0 grid place-items-center text-xl font-bold">88%</p>
        </div>
        <div className="mt-2">
          <TileLabel dark>Brand familiarity</TileLabel>
        </div>
      </Tile>
    </div>
  );
}

/* 02 — request all the videos you need: a timeline being cut, plus the three length limits */
function RequestStage() {
  const clips = [
    { slug: "animated-video-ads", w: "34%" },
    { slug: "social-media-videos", w: "22%" },
    { slug: "logo-animations", w: "16%" },
    { slug: "testimonial-videos", w: "28%" },
  ];
  const limits = [
    { v: "120s", l: "Videos" },
    { v: "15 min", l: "Edits" },
    { v: "1 hr", l: "Audiograms" },
  ];
  return (
    <div className="grid h-full grid-rows-[1.35fr_1fr] gap-3 sm:gap-4">
      <Tile i={0} className="gap-3">
        <div className="flex items-center justify-between">
          <TileLabel>Your edit</TileLabel>
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold text-ink/50 tabular-nums">
            <span className="vds-rec size-1.5 rounded-full bg-[#ff4d4d]" /> 00:58 / 02:00
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden rounded-xl bg-[#032f2a]">
          <Image src={poster("animated-video-ads")} alt="" fill sizes="(min-width: 1024px) 30rem, 90vw" className="object-cover opacity-90" />
        </div>
        {/* track: clips + audio, with a playhead sweeping across */}
        <div className="relative space-y-1.5">
          <div className="flex gap-1">
            {clips.map((c, k) => (
              <span key={c.slug} style={{ ...idx(k), width: c.w }} className="gds-pop relative h-8 overflow-hidden rounded-md ring-1 ring-ink/10">
                <Image src={poster(c.slug)} alt="" fill sizes="8rem" className="object-cover" />
              </span>
            ))}
          </div>
          <div className="flex h-4 items-center gap-[2px] rounded-md bg-teal-soft px-1.5">
            {Array.from({ length: 48 }, (_, k) => (
              <span key={k} className="w-full rounded-full bg-teal-brand/70" style={{ height: `${25 + ((k * 37) % 70)}%` }} />
            ))}
          </div>
          <span className="vds-playhead absolute -top-1 -bottom-1 left-0 w-0.5 rounded-full bg-brand shadow-[0_0_0_3px_rgb(241_115_30/0.2)]" />
        </div>
      </Tile>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {limits.map((m, k) => (
          <Tile key={m.l} i={k + 1} dark={k === 1} className="justify-between">
            <TileLabel dark={k === 1}>{m.l}</TileLabel>
            <p className="text-2xl leading-none font-bold sm:text-3xl">
              <span className="text-sm font-semibold opacity-60">up to </span>
              <br />
              {m.v}
            </p>
          </Tile>
        ))}
      </div>
    </div>
  );
}

/* 03 — stock footage, images, audio and elements, sourced for you */
function StockStage() {
  const footage = ["cinemagraphs", "demo-videos", "digital-display-loops", "motion-posters"];
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
      <Tile i={0} className="row-span-2 gap-3">
        <TileLabel>Stock footage</TileLabel>
        <ul className="grid flex-1 grid-cols-2 gap-2">
          {footage.map((slug, k) => (
            <li key={slug} style={idx(k + 1)} className="gds-pop relative overflow-hidden rounded-xl">
              <Image src={poster(slug)} alt="" fill sizes="10rem" className="object-cover" />
              <span className="absolute right-1.5 bottom-1.5 grid size-5 place-items-center rounded-full bg-teal-brand text-white">
                <Check className="size-3" strokeWidth={3} />
              </span>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-1.5 text-xs font-semibold text-ink/55">
          <Film className="size-3.5 text-brand" /> Licensed for your use
        </p>
      </Tile>

      <Tile i={1}>
        <TileLabel>Stock audio</TileLabel>
        <div className="mt-2 flex flex-1 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
            <Music2 className="size-4" />
          </span>
          <span className="flex h-8 flex-1 items-center gap-[3px]">
            {Array.from({ length: 18 }, (_, k) => (
              <span key={k} style={idx(k)} className="vds-wave w-full rounded-full bg-ink/25" />
            ))}
          </span>
        </div>
      </Tile>

      <Tile i={2} dark className="justify-between">
        <TileLabel dark>Assets sourced</TileLabel>
        <div className="h-9 overflow-hidden">
          <ul className="gds-ticker text-2xl leading-9 font-bold">
            <li>Footage</li>
            <li>Images</li>
            <li>Elements</li>
            <li className="text-brand">All of it</li>
          </ul>
        </div>
        <p className="text-xs font-semibold text-white/60">We find it. You approve it.</p>
      </Tile>
    </div>
  );
}

/* 05 — live with your team */
function LiveStage() {
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className={bento}>
      <Tile i={0} className="col-span-2 gap-2.5">
        <TileLabel>Live with your team</TileLabel>
        <div style={idx(1)} className="gds-pop flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-surface px-3.5 py-2 text-sm">Can we cut a 15s version for Reels?</p>
        </div>
        <div className="gds-blip flex items-end gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[0.6rem] font-bold text-white">PM</span>
          <span className="bento-typing flex gap-1 rounded-2xl rounded-bl-md bg-teal-brand px-3 py-2.5">
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="size-1.5 rounded-full bg-white/80" />
            <span className="size-1.5 rounded-full bg-white/80" />
          </span>
        </div>
        <div style={idx(15)} className="gds-pop flex items-end gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[0.6rem] font-bold text-white">PM</span>
          <p className="max-w-[80%] rounded-2xl rounded-bl-md bg-teal-brand px-3.5 py-2 text-sm text-white">Sure! Your editor is on it now.</p>
        </div>
        <div style={idx(24)} className="gds-pop flex items-end gap-2">
          <span className="size-7 shrink-0" />
          <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-white px-2 py-2 ring-1 ring-border">
            <span className="relative size-10 overflow-hidden rounded-lg">
              <Image src={poster("social-media-videos")} alt="" fill sizes="40px" className="object-cover" />
            </span>
            <span className="pr-2 leading-tight">
              <span className="block text-xs font-bold">Reel_15s_9x16.mp4</span>
              <span className="mt-0.5 flex items-center gap-1 text-[0.7rem] font-semibold text-teal-brand">
                <Check className="size-3" strokeWidth={3} /> Delivered
              </span>
            </span>
          </div>
        </div>
      </Tile>

      <Tile i={1}>
        <TileLabel>Design team</TileLabel>
        <div className="mt-3 flex flex-1 items-end justify-between gap-1">
          {week.map((d, k) => (
            <span key={k} className="flex flex-1 flex-col items-center gap-1">
              <span className="flex h-14 w-full items-end">
                <span
                  style={idx(k)}
                  className={cn("gds-grow block w-full rounded-md", k < 5 ? "h-full bg-[linear-gradient(#ffb47a,#f1731e)]" : "h-1.5 bg-ink/10")}
                />
              </span>
              <span className={cn("text-[0.6rem] font-bold", k < 5 ? "text-ink/70" : "text-ink/30")}>{d}</span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[0.7rem] font-semibold text-ink/50">Monday to Friday</p>
      </Tile>

      <Tile i={2} dark className="items-center justify-center gap-2 text-center">
        <span className="relative grid size-16 place-items-center rounded-full ring-2 ring-white/20">
          <Clock className="size-7 text-white/25" />
          <span className="flow-spin absolute top-1/2 left-1/2 h-6 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-brand" />
        </span>
        <p className="text-lg font-bold">7 days a week</p>
        <TileLabel dark>Customer service</TileLabel>
      </Tile>
    </div>
  );
}
