"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Sticky label bar for the six features (the live page's tab labels). Each is
 * an in-page link; the active one follows the feature in view (scroll-spy).
 */
export function HubNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace(/^k360-/, ""));
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(`k360-${it.id}`);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="KIMP360 features" className="sticky top-20 z-20 mt-12 px-4 sm:top-24 sm:mt-16">
      <ul className="mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/85 p-1.5 shadow-[0_18px_40px_-24px_rgb(27_30_35/0.45)] ring-1 ring-ink/10 backdrop-blur-md [scrollbar-width:none]">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id} className="shrink-0">
              <a
                href={`#k360-${it.id}`}
                aria-current={on ? "true" : undefined}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold whitespace-nowrap transition-colors",
                  on ? "bg-ink text-white" : "text-ink/60 hover:text-ink",
                )}
              >
                <span className={cn("tabular-nums", on ? "text-brand" : "text-ink/30")}>{String(i + 1).padStart(2, "0")}</span>
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
