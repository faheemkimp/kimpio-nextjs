"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Loader2, Play, Quote, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { ctaButtonVariants } from "@/components/ui/cta-button";
import type { Testimonial } from "@/lib/wp/testimonials";
import { youTubeEmbed, youTubeId } from "@/lib/youtube";

type Video = Extract<Testimonial, { kind: "video" }>;

/**
 * Live testimonial wall: a masonry of written and video testimonials (each
 * client's name is an <h3>, as live) and "View More", which loads the next
 * WordPress batch through /api/reviews (the same admin-ajax call live makes).
 */
export function TestimonialWall({ initial, viewMore, play }: { initial: Testimonial[]; viewMore: string; play: string }) {
  const [items, setItems] = useState(initial);
  const [next, setNext] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState<Video | null>(null);
  const yt = open ? youTubeId(open.video) : null;

  async function loadMore() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/reviews?set=${next}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { items: Testimonial[]; done: boolean };
      setItems((prev) => [...prev, ...data.items]);
      setNext((n) => n + 1);
      setDone(data.done);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ul className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
        {items.map((t, i) => (
          <li key={`${t.name}-${i}`} className="mb-5 break-inside-avoid">
            {t.kind === "text" ? (
              <figure className="rounded-[1.6rem] bg-white p-7 ring-1 ring-ink/[0.06] shadow-[0_24px_48px_-38px_rgb(27_30_35/0.35)]">
                <Quote aria-hidden="true" className="size-7 text-brand/70" />
                <blockquote className="mt-4 space-y-3 leading-relaxed text-ink/75">
                  {t.paragraphs.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">
                    {t.initials}
                  </span>
                  <span>
                    <h3 className="font-bold text-ink">{t.name}</h3>
                    {t.company && <p className="text-sm text-ink/55">{t.company}</p>}
                  </span>
                </figcaption>
              </figure>
            ) : (
              <figure className="overflow-hidden rounded-[1.6rem] bg-white p-2 ring-1 ring-ink/[0.06] shadow-[0_24px_48px_-38px_rgb(27_30_35/0.35)]">
                <button
                  type="button"
                  onClick={() => setOpen(t)}
                  data-click-sound=""
                  aria-label={`${play} ${t.name}`}
                  className="group relative block w-full overflow-hidden rounded-[1.25rem] bg-ink"
                >
                  <Image
                    src={t.thumb.src}
                    alt=""
                    width={t.thumb.width}
                    height={t.thumb.height}
                    sizes="(min-width: 1024px) 24rem, (min-width: 768px) 45vw, 92vw"
                    className="w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_3px_0_#b84d08,0_12px_24px_-8px_rgb(0_0_0/0.5)] transition-transform duration-300 group-hover:scale-110"
                  >
                    <Play className="size-6 translate-x-0.5 fill-current" />
                  </span>
                </button>
                <figcaption className="px-4 pt-4 pb-3">
                  <h3 className="font-bold text-ink">{t.name}</h3>
                  {t.company && <p className="text-sm text-ink/55">{t.company}</p>}
                </figcaption>
              </figure>
            )}
          </li>
        ))}
      </ul>

      {!done && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <button type="button" onClick={loadMore} disabled={loading} data-click-sound="" className={ctaButtonVariants({ size: "lg" })}>
            {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
            {viewMore}
          </button>
          {error && (
            <p role="alert" className="text-sm font-semibold text-red-600">
              Couldn’t load more testimonials. Please try again.
            </p>
          )}
        </div>
      )}

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
          <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Dialog.Title className="sr-only">{open ? `Video testimonial: ${open.name}` : ""}</Dialog.Title>
            {open && (
              <div className="aspect-video">
                {yt ? (
                  <iframe src={youTubeEmbed(yt)} title={`Video testimonial: ${open.name}`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="size-full" />
                ) : (
                  <video src={open.video} controls autoPlay playsInline className="size-full bg-black object-contain" />
                )}
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
