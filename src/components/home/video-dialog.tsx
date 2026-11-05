"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Play, X } from "lucide-react";

import { ctaButtonVariants } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";

/**
 * "How it works" button + modal player (replaces the live site's Fancybox popup).
 * The YouTube iframe is only mounted while the dialog is open, so it never
 * slows down the initial page load.
 */
export function VideoDialog({ label, src, glass = false }: { label: string; src: string; glass?: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger data-click-sound="" className={cn(ctaButtonVariants({ variant: glass ? "glass" : "light", size: "lg" }), "pl-2.5")}>
        <span className="grid size-9 place-items-center rounded-lg bg-[linear-gradient(180deg,#ff9f55,#e8650f)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_2px_0_#b84d08]">
          <Play className="size-4 fill-current" aria-hidden="true" />
        </span>
        {label}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-black shadow-2xl transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <Dialog.Title className="sr-only">{label}</Dialog.Title>
          <div className="aspect-video">
            <iframe
              src={`${src}?autoplay=1&rel=0`}
              title={label}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="size-full"
            />
          </div>
          <Dialog.Close
            aria-label="Close video"
            className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink transition hover:bg-white"
          >
            <X className="size-5" />
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
