"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

/** Full-size image viewer with previous/next (buttons and arrow keys). `index` null = closed. */
export function Lightbox({ items, index, onIndex, alt }: { items: readonly string[]; index: number | null; onIndex: (i: number | null) => void; alt: string }) {
  const n = items.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % n);
      if (e.key === "ArrowLeft") onIndex((index - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onIndex]);

  return (
    <Dialog.Root open={index !== null} onOpenChange={(o) => !o && onIndex(null)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-12">
          <Dialog.Title className="sr-only">{`${alt} sample ${index === null ? "" : index + 1} of ${n}`}</Dialog.Title>
          {index !== null && items[index] && (
            <div className="relative h-full w-full">
              <Image key={items[index]} src={items[index]} alt={alt} fill sizes="100vw" className="object-contain" />
            </div>
          )}
          <p className="absolute top-5 left-5 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white tabular-nums">{index === null ? "" : `${index + 1} / ${n}`}</p>
          <Dialog.Close aria-label="Close" className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:scale-105">
            <X className="size-5" />
          </Dialog.Close>
          {n > 1 && index !== null && (
            <>
              <button type="button" aria-label="Previous sample" onClick={() => onIndex((index - 1 + n) % n)} className="absolute top-1/2 left-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white sm:left-6">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" aria-label="Next sample" onClick={() => onIndex((index + 1) % n)} className="absolute top-1/2 right-3 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white sm:right-6">
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
