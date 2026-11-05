import type { ReactNode } from "react";

/** Pastel tones for the bento cards, each a soft two-stop gradient with tinted ink. */
export const TONES = {
  peach: {
    bg: "bg-[linear-gradient(160deg,#FFF1E4_0%,#FFDCC0_100%)]",
    title: "text-[#6E2E0C]",
    body: "text-[#7A4A2E]",
  },
  sky: {
    bg: "bg-[linear-gradient(160deg,#E6F4FF_0%,#C4E3FB_100%)]",
    title: "text-[#0D3A63]",
    body: "text-[#365A7C]",
  },
  lilac: {
    bg: "bg-[linear-gradient(160deg,#F1EDFF_0%,#D8CDFB_100%)]",
    title: "text-[#33237A]",
    body: "text-[#544883]",
  },
  mint: {
    bg: "bg-[linear-gradient(160deg,#E6F9EF_0%,#BFEBD5_100%)]",
    title: "text-[#0A4D40]",
    body: "text-[#2F6457]",
  },
} as const;

export type Tone = keyof typeof TONES;

export function BentoCard({
  tone,
  title,
  body,
  children,
  className = "",
  headerClassName = "",
}: {
  tone: Tone;
  title: string;
  body: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}) {
  const t = TONES[tone];
  return (
    <article
      data-cc-card
      className={`relative isolate flex min-w-0 flex-col overflow-clip rounded-[26px] ${t.bg} shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_0_0_1px_rgba(255,255,255,0.5),0_18px_40px_-30px_rgba(20,35,60,0.45)] ${className}`}
    >
      {/* glossy sheen, top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -left-1/4 -z-10 h-[90%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.75),rgba(255,255,255,0))]"
      />
      <header className={`px-6 pt-6 sm:px-7 sm:pt-7 ${headerClassName}`}>
        <h3 className={`font-heading text-[1.45rem] leading-tight font-semibold tracking-[-0.015em] sm:text-[1.6rem] ${t.title}`}>
          {title}
        </h3>
        <p className={`mt-2 max-w-[44ch] text-[0.95rem] leading-[1.6] ${t.body}`}>{body}</p>
      </header>
      {children}
    </article>
  );
}
