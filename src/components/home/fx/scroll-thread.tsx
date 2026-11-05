import { cn } from "@/lib/utils";

/**
 * The bent line that ties one homepage section to the next. A faint dashed
 * track is always visible; an orange stroke draws over it with scroll
 * (data-fx="draw") and lands on a glowing node with a "next up" label.
 * `from`/`to` are the backgrounds of the sections above and below, so the
 * band blends into both. Decorative.
 */
export function ScrollThread({
  label,
  from = "#ffffff",
  to = "#ffffff",
  flip = false,
  className,
}: {
  label: string;
  from?: string;
  to?: string;
  flip?: boolean;
  className?: string;
}) {
  const d = "M100 0 C100 70 172 52 172 112 S100 150 100 210";
  return (
    <div
      aria-hidden="true"
      style={{ background: `linear-gradient(${from}, ${to})` }}
      className={cn("relative flex h-44 justify-center sm:h-56", className)}
    >
      <svg
        viewBox="0 0 200 210"
        data-fx="draw"
        data-start="top 90%"
        data-end="bottom 50%"
        className={cn("h-full w-auto overflow-visible", flip && "-scale-x-100")}
        fill="none"
      >
        <path
          data-static=""
          d={d}
          stroke="rgb(27 30 35 / 0.14)"
          strokeWidth="2"
          strokeDasharray="4 7"
        />
        <path
          d={d}
          stroke="url(#thread-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="thread-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f1731e" stopOpacity="0" />
            <stop offset="0.35" stopColor="#f1731e" />
            <stop offset="1" stopColor="#ff9f55" />
          </linearGradient>
        </defs>
      </svg>
      <span className="fx-thread-node absolute bottom-0 z-10 left-1/2 size-3.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand ring-4 ring-white" />
      <span
        data-fx="reveal"
        className="absolute bottom-0 left-1/2 z-10 ml-6 translate-y-1/2 max-w-[calc(50%-2.25rem)] truncate rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-semibold whitespace-nowrap sm:max-w-none text-ink/70 shadow-sm ring-1 ring-border sm:ml-8 sm:px-3 sm:text-xs"
      >
        <span className="hidden sm:inline">Next · </span>
        {label}
      </span>
    </div>
  );
}
