"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { youTubeEmbed, youTubeId } from "@/lib/youtube";

type Item = { video: string; thumb: { src: string; width: number; height: number } };

/** Grid of video thumbnails; each opens its YouTube video in a popup (live: Fancybox). */
export function VideoThumbs({ items, label, single = false }: { items: readonly Item[]; label: string; /** One large video instead of a 2-column grid. */ single?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = open === null ? null : youTubeId(items[open].video);
  return (
    <>
      <ul className={single ? "grid" : "grid grid-cols-2 gap-3 sm:gap-4"}>
        {items.map((it, i) => (
          <li key={it.video}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              data-click-sound=""
              aria-label={single ? label : `${label} ${i + 1}`}
              className="group relative block w-full overflow-hidden rounded-[1.4rem] bg-ink ring-1 ring-ink/[0.06]"
            >
              <Image src={it.thumb.src} alt="" width={it.thumb.width} height={it.thumb.height} sizes={single ? "(min-width: 1024px) 36rem, 92vw" : "(min-width: 1024px) 16rem, 45vw"} className="w-full transition-transform duration-700 group-hover:scale-[1.05]" />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_3px_0_#b84d08] transition-transform duration-300 group-hover:scale-110"
              >
                <Play className="size-5 translate-x-0.5 fill-current" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Dialog.Title className="sr-only">{label}</Dialog.Title>
            {id && (
              <div className="aspect-video">
                <iframe src={youTubeEmbed(id)} title={label} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="size-full" />
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
