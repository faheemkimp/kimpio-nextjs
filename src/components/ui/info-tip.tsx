import { Info } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * The live theme's info-circle tooltip: an (i) button whose text shows on
 * hover and keyboard focus. Text is in the DOM (role="tooltip"), as on live.
 */
export function InfoTip({ text, label, tone = "light", className }: { text: string; label: string; tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  return (
    <span className={cn("relative inline-flex align-middle", className)}>
      <button
        type="button"
        aria-describedby={id}
        className={cn("peer grid place-items-center rounded-full", tone === "dark" ? "text-white/55 hover:text-white" : "text-ink/40 hover:text-brand")}
      >
        <Info className="size-4" aria-hidden="true" />
        <span className="sr-only">About {label}</span>
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-xl bg-ink px-3.5 py-2.5 text-xs leading-relaxed font-medium text-white opacity-0 shadow-xl ring-1 ring-white/10 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
