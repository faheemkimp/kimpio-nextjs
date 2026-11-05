import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Line = { top: string; left: string; width: string; delay: number; color: string };

/** Default streaks, for a box whose subject flies toward its RIGHT edge (lines trail off the left). */
const LINES: Line[] = [
  { top: "34%", left: "-42%", width: "46%", delay: 0, color: "rgb(255 255 255 / 0.85)" },
  { top: "46%", left: "-58%", width: "56%", delay: 0.3, color: "#ff9f55" },
  { top: "57%", left: "-36%", width: "38%", delay: 0.55, color: "rgb(255 255 255 / 0.7)" },
  { top: "68%", left: "-62%", width: "60%", delay: 0.15, color: "#f1731e" },
  { top: "79%", left: "-40%", width: "40%", delay: 0.45, color: "rgb(255 255 255 / 0.6)" },
];

/**
 * Speed lines that shoot backwards from a flying subject and fade (`.fly-line` in
 * globals.css; hidden under reduced motion). Fills its positioned parent; `angle`
 * turns the flight direction (0 = flying right, -50 = up and to the right).
 */
export function SpeedLines({
  angle = 0,
  lines = LINES,
  className,
  style,
}: {
  angle?: number;
  lines?: Line[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)} style={{ rotate: `${angle}deg`, ...style }}>
      {lines.map((l, i) => (
        <span
          key={i}
          className="fly-line absolute h-[3px] rounded-full"
          style={{
            top: l.top,
            left: l.left,
            width: l.width,
            animationDelay: `${l.delay}s`,
            backgroundImage: `linear-gradient(to left, ${l.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
