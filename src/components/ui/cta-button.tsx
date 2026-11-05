import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Kimp's primary call-to-action: gradient fill, darker border, an inner top
 * highlight and a solid bottom "edge" so it reads as a raised 3D key. It lifts on
 * hover and presses down on click.
 */
export const ctaButtonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 rounded-xl border font-semibold whitespace-nowrap select-none",
    "transition-[transform,box-shadow,filter] duration-150 ease-out",
    "hover:-translate-y-0.5 active:translate-y-[3px]",
    "focus-visible:outline-2 focus-visible:outline-offset-3",
    "[&_svg]:size-[1.1em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-[#c4560a] text-white focus-visible:outline-brand",
          "bg-[linear-gradient(180deg,#ff9f55_0%,#f7802c_45%,#e8650f_100%)]",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.45),inset_0_-2px_0_rgb(0_0_0/0.08),0_4px_0_#b84d08,0_10px_22px_-6px_rgb(241_115_30/0.55)]",
          "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-2px_0_rgb(0_0_0/0.08),0_6px_0_#b84d08,0_16px_30px_-8px_rgb(241_115_30/0.6)]",
          "active:shadow-[inset_0_1px_0_rgb(255_255_255/0.3),inset_0_2px_6px_rgb(0_0_0/0.15),0_1px_0_#b84d08,0_4px_10px_-4px_rgb(241_115_30/0.5)]",
          "[text-shadow:0_1px_0_rgb(150_60_0/0.35)]",
        ],
        dark: [
          "border-black text-white focus-visible:outline-ink",
          "bg-[linear-gradient(180deg,#3a4049_0%,#22262c_50%,#15181c_100%)]",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_4px_0_#050607,0_10px_22px_-8px_rgb(27_30_35/0.6)]",
          "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_6px_0_#050607,0_16px_30px_-10px_rgb(27_30_35/0.6)]",
          "active:shadow-[inset_0_2px_6px_rgb(0_0_0/0.4),0_1px_0_#050607]",
        ],
        light: [
          "border-[#d9dee6] text-ink focus-visible:outline-ink",
          "bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fb_60%,#eceff4_100%)]",
          "shadow-[inset_0_1px_0_#fff,0_4px_0_#cfd5de,0_10px_20px_-10px_rgb(27_30_35/0.25)]",
          "hover:shadow-[inset_0_1px_0_#fff,0_6px_0_#cfd5de,0_16px_28px_-12px_rgb(27_30_35/0.3)]",
          "active:shadow-[inset_0_2px_5px_rgb(27_30_35/0.12),0_1px_0_#cfd5de]",
        ],
        glass: [
          "border-white/15 text-white focus-visible:outline-white",
          "bg-white/10 backdrop-blur-md",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_10px_24px_-12px_rgb(0_0_0/0.5)]",
          "hover:border-white/25 hover:bg-white/15",
          "active:bg-white/[0.08] active:shadow-[inset_0_2px_6px_rgb(0_0_0/0.25)]",
        ],
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base sm:text-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CtaProps = ComponentProps<"a"> & VariantProps<typeof ctaButtonVariants>;

/**
 * Link styled as a 3D CTA. Plain <a> on purpose: most destinations are WordPress pages.
 * `data-click-sound` makes <ClickSoundListener> play the game-style click on press.
 */
export function CtaLink({ className, variant, size, ...props }: CtaProps) {
  return <a data-click-sound="" className={cn(ctaButtonVariants({ variant, size }), className)} {...props} />;
}
