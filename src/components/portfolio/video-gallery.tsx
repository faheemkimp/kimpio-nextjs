"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { youTubeEmbed, youTubeId } from "@/lib/youtube";

type Category = { slug: string; label: string };
type Sample = { poster: string; video: string };

/**
 * Live video portfolio: category list (an <h4> "Our Work" heads it), poster
 * grid, and a player popup (YouTube embed or the .mp4 file, as live opens
 * them in Fancybox). Video lists come from WordPress (props).
 */
export function VideoGallery({
  data,
  categories,
  initial,
  listTitle,
  play,
}: {
  data: Record<string, Sample[]>;
  categories: readonly Category[];
  initial: string;
  listTitle: string;
  play: string;
}) {
  const [active, setActive] = useState(initial);
  const [open, setOpen] = useState<Sample | null>(null);
  const items = data[active] ?? [];
  const current = categories.find((c) => c.slug === active);
  const yt = open ? youTubeId(open.video) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      <nav aria-labelledby="vs-list-title" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <h4 id="vs-list-title" className="text-sm font-bold tracking-[0.14em] text-ink/45 uppercase">
          {listTitle}
        </h4>
        <ul className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0">
          {categories.map((c) => {
            const on = c.slug === active;
            const count = data[c.slug]?.length ?? 0;
            return (
              <li key={c.slug} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c.slug)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-full px-4 py-2.5 text-left text-sm font-bold whitespace-nowrap ring-1 transition-colors lg:rounded-xl lg:ring-0",
                    on ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-border hover:bg-surface",
                  )}
                >
                  {c.label}
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[0.7rem] leading-none tabular-nums", on ? "bg-white/15" : "bg-surface text-ink/55")}>
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="min-w-0">
        <p aria-live="polite" className="text-sm font-semibold text-ink/55">
          {current?.label} · {items.length} videos
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((s, i) => (
            <li key={`${active}-${s.video}`}>
              <button
                type="button"
                onClick={() => setOpen(s)}
                data-click-sound=""
                aria-label={`${play}: ${current?.label} ${i + 1}`}
                className="group relative block aspect-video w-full overflow-hidden rounded-[1.25rem] bg-ink ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(27_30_35/0.5)]"
              >
                <Image
                  src={s.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 22rem, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_3px_0_#b84d08,0_12px_24px_-8px_rgb(0_0_0/0.5)] transition-transform duration-300 group-hover:scale-110"
                >
                  <Play className="size-6 translate-x-0.5 fill-current" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Dialog.Title className="sr-only">{`${current?.label ?? ""} video`}</Dialog.Title>
            {open && (
              <div className="aspect-video max-h-[85vh]">
                {yt ? (
                  <iframe
                    src={youTubeEmbed(yt)}
                    title={`${current?.label ?? ""} video`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <video src={open.video} poster={open.poster} controls autoPlay playsInline className="size-full bg-black object-contain" />
                )}
              </div>
            )}
            <Dialog.Close aria-label="Close video" className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white">
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
