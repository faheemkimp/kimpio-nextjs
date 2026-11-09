"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { CtaLink } from "@/components/ui/cta-button";
import type { BlogPostCard } from "@/lib/wp/queries";
import { cn } from "@/lib/utils";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
/** WordPress returns dates without a zone; they are the site's local time, shown as-is. */
const formatDate = (date: string) => dateFmt.format(new Date(`${date}Z`));
const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Grid areas: stacked on mobile (head, track, controls); on large screens the
 * left column holds head + controls and the track fills the right column,
 * running past the container to the viewport edge.
 */
const BLEED_RIGHT = "lg:-mr-[calc(max(0px,(100vw-80rem)/2)+2rem)] lg:pr-[calc(max(0px,(100vw-80rem)/2)+2rem)]";

/**
 * Scroll-snap carousel: native swipe/trackpad scrolling plus prev/next buttons,
 * a "01 / 09" counter and a progress bar. Without JS it is still a scrollable
 * row of links.
 */
export function BlogCarousel({
  posts,
  more,
  cta,
  header,
}: {
  posts: BlogPostCard[];
  more: string;
  cta: { label: string; href: string };
  header: ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ atStart: true, atEnd: false, progress: 0, index: 0 });

  const update = useCallback(() => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const max = el.scrollWidth - el.clientWidth;
    const stepW = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0);
    const atEnd = el.scrollLeft >= max - 4;
    setState({
      atStart: el.scrollLeft <= 4,
      atEnd,
      progress: max > 0 ? el.scrollLeft / max : 0,
      index: atEnd ? posts.length - 1 : Math.round(el.scrollLeft / stepW),
    });
  }, [posts.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: reduce ? "auto" : "smooth" });
  };

  const hasPosts = posts.length > 0;

  return (
    <div
      className={cn(
        "container-page grid gap-y-10 [grid-template-areas:'head'_'track'_'ctrl']",
        hasPosts &&
          "lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-x-14 lg:gap-y-8 lg:[grid-template-areas:'head_track'_'ctrl_track']",
      )}
    >
      <div className="[grid-area:head] lg:self-end">{header}</div>

      {hasPosts && (
        <div
          className="min-w-0 [grid-area:track]"
          role="region"
          aria-roledescription="carousel"
          aria-label="Latest blog posts"
        >
          <ul
            ref={track}
            id="blog-carousel-track"
            data-fx="stagger"
            className={cn(
              "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-ml-2 lg:scroll-pl-2 lg:pl-2 [&::-webkit-scrollbar]:hidden",
              BLEED_RIGHT,
            )}
          >
            {posts.map((p, i) => (
              <li
                key={p.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${posts.length}`}
                className="w-[78%] shrink-0 snap-start sm:w-[19rem] xl:w-[20rem]"
              >
                <BlogCard post={p} more={more} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-6 [grid-area:ctrl] lg:self-start">
        {hasPosts && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-ink tabular-nums" aria-hidden="true">
              {pad(state.index + 1)}
              <span className="text-ink/35"> / {pad(posts.length)}</span>
            </span>
            <div aria-hidden="true" className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] duration-150"
                style={{ width: `${Math.max(state.progress, 1 / posts.length) * 100}%` }}
              />
            </div>
            <div className="flex gap-2">
              <NavButton label="Previous posts" disabled={state.atStart} onClick={() => step(-1)}>
                <ArrowLeft className="size-[1.1rem]" aria-hidden="true" />
              </NavButton>
              <NavButton label="Next posts" disabled={state.atEnd} onClick={() => step(1)}>
                <ArrowRight className="size-[1.1rem]" aria-hidden="true" />
              </NavButton>
            </div>
          </div>
        )}
        <div data-fx="reveal">
          <CtaLink href={cta.href} variant="dark" size="lg">
            {cta.label}
            <ArrowRight aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-controls="blog-carousel-track"
      disabled={disabled}
      onClick={onClick}
      data-click-sound=""
      className={cn(
        "grid size-11 place-items-center rounded-full bg-white text-ink shadow-sm ring-1 ring-border transition-[background-color,color,translate,opacity] duration-300",
        "hover:-translate-y-0.5 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        "disabled:pointer-events-none disabled:opacity-35",
      )}
    >
      {children}
    </button>
  );
}

function BlogCard({ post, more }: { post: BlogPostCard; more: string }) {
  return (
    <a
      href={post.link}
      className="group flex h-full flex-col rounded-[1.5rem] bg-white p-2 ring-1 ring-ink/[0.08] transition-[box-shadow] duration-500 hover:shadow-[0_0_0_1px_rgb(241_115_30/0.35),0_0_14px_-2px_rgb(241_115_30/0.25)] hover:ring-transparent focus-visible:shadow-[0_0_0_1px_rgb(241_115_30/0.35),0_0_14px_-2px_rgb(241_115_30/0.25)] focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem] bg-surface">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(min-width: 1280px) 20rem, (min-width: 640px) 19rem, 78vw"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        )}
        {post.category && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold text-ink shadow-sm backdrop-blur">
            {post.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        <p className="line-clamp-3 flex-1 text-base leading-snug font-bold break-words text-ink sm:text-[1.05rem]">
          {post.title}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-3">
          <time dateTime={post.date} className="text-[0.8rem] font-semibold text-ink/45">
            {formatDate(post.date)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors group-hover:text-brand">
            {more}
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-full bg-brand-soft text-brand transition-[background-color,color,rotate] duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}
