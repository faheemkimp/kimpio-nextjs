import { Fragment, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Eyebrow pill + H2 + optional intro, shared by every homepage section so the
 * page reads as one system.
 *
 * - `align="split"` puts the intro beside the title on large screens.
 * - `tone="dark"` is for ink panels.
 * - String titles are two-tone: the first sentence in ink, the rest softened
 *   (the "Take full control of your / payments with smarter" pattern). Each word
 *   sits in a mask so <ScrollFx> can raise it in; the text itself is unchanged,
 *   so crawlers and screen readers get the plain heading.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "split",
  tone = "light",
  twoTone = true,
  className,
  titleClassName,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center" | "split";
  tone?: "light" | "dark";
  twoTone?: boolean;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <header
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-3xl",
        align === "split" && "grid items-end gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16",
        className,
      )}
    >
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          id={id}
          data-fx="words"
          className={cn(
            "mt-5 text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[3.35rem]",
            dark ? "text-white" : "text-ink",
            titleClassName,
          )}
        >
          {typeof title === "string" ? <SplitTitle text={title} twoTone={twoTone} dark={dark} /> : title}
        </h2>
      </div>
      {intro && (
        <p
          data-fx="reveal"
          data-delay="0.15"
          className={cn(
            "text-base leading-relaxed sm:text-lg",
            align !== "split" && "mt-5",
            align === "center" && "mx-auto max-w-2xl",
            align === "split" && "max-w-md lg:justify-self-end lg:pb-2",
            dark ? "text-white/65" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}

export function Eyebrow({ tone = "light", children }: { tone?: "light" | "dark"; children: ReactNode }) {
  const dark = tone === "dark";
  return (
    <p
      data-fx="reveal"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-semibold shadow-[0_1px_2px_rgb(27_30_35/0.06)] ring-1",
        dark ? "bg-white/[0.07] text-white/80 ring-white/15" : "bg-white text-ink/75 ring-border",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-5 place-items-center rounded-full ring-1",
          dark ? "bg-brand/20 ring-brand/40" : "bg-brand-soft ring-brand/25",
        )}
      >
        <span className="size-1.5 rounded-full bg-brand" />
      </span>
      {children}
    </p>
  );
}

/** "First sentence. The rest" -> [ink words][soft words], each word masked. */
function SplitTitle({ text, twoTone, dark }: { text: string; twoTone: boolean; dark: boolean }) {
  const cut = twoTone ? text.search(/[.!?]\s+\S/) : -1;
  const lead = cut === -1 ? text : text.slice(0, cut + 1);
  const rest = cut === -1 ? "" : text.slice(cut + 2);
  return (
    <>
      <Words text={lead} />
      {rest && (
        <>
          {" "}
          <span className={dark ? "text-white/45" : "text-slate-brand"}>
            <Words text={rest} />
          </span>
        </>
      )}
    </>
  );
}

function Words({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="fx-word">
        <span>{w}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}
