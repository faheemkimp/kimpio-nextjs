"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ctaButtonVariants } from "@/components/ui/cta-button";
import { youTubeEmbed, youTubeId } from "@/lib/youtube";

type Item = { video: string; thumb: { src: string; width: number; height: number } };

/**
 * Live "kimpvedioadd-section": a 3-column grid of video ads, each opening its
 * YouTube video in a popup (live: Fancybox), with "Load more videos". Every
 * video is in the HTML; the extra rows are only hidden until asked for.
 */
export function AdVideos({ items, initial = 6, more, play }: { items: readonly Item[]; initial?: number; more: string; play: string }) {
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const id = open === null ? null : youTubeId(items[open].video);
  return (
    <>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {items.map((it, i) => (
          <li key={it.video} hidden={!all && i >= initial}>
            <a
              href={it.video}
              onClick={(e) => {
                e.preventDefault();
                setOpen(i);
              }}
              data-click-sound=""
              aria-label={`${play} ${i + 1}`}
              className="group relative block overflow-hidden rounded-[1.5rem] bg-ink p-1.5 ring-1 ring-ink/10"
            >
              <Image src={it.thumb.src} alt="" width={it.thumb.width} height={it.thumb.height} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw" className="w-full rounded-[1.1rem] transition-transform duration-700 group-hover:scale-[1.03]" />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_3px_0_#b84d08] transition-transform duration-300 group-hover:scale-110"
              >
                <Play className="size-6 translate-x-0.5 fill-current" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {!all && items.length > initial && (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => setAll(true)} data-click-sound="" className={ctaButtonVariants({ variant: "dark", size: "lg" })}>
            {more}
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      )}
      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Dialog.Title className="sr-only">{play}</Dialog.Title>
            {id && (
              <div className="aspect-video">
                <iframe src={youTubeEmbed(id)} title={play} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="size-full" />
              </div>
            )}
            <Dialog.Close aria-label="Close video" className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white">
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
