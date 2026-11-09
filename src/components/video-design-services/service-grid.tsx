"use client";

import { ChevronDown, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { VDS_SERVICES, type VideoService } from "@/content/video-design-services";
import { cn } from "@/lib/utils";

import "./vds.css";

/**
 * The 16 video types (<h3> each). Every card is server-rendered; the ones past
 * `initial` are collapsed until "Show More Services" (as on live) but stay in
 * the HTML, so crawlers read all of them.
 */
export function VideoServiceGrid() {
  const [open, setOpen] = useState(false);
  const { items, initial, showMore } = VDS_SERVICES;
  return (
    <>
      <ul id="vds-service-list" className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.map((s, i) => (
          <li key={s.slug} className={cn(!open && i >= initial && "hidden")}>
            <ServiceCard service={s} index={i} />
          </li>
        ))}
      </ul>
      {!open && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            aria-controls="vds-service-list"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="group inline-flex h-13 items-center gap-2 rounded-full bg-ink px-7 font-bold text-white transition-colors hover:bg-brand"
          >
            {showMore}
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs tabular-nums">+{items.length - initial}</span>
            <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

function ServiceCard({ service, index }: { service: VideoService; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  /* Only fetch and play a clip while its card is on screen; reduced motion keeps the poster. */
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView) {
      if (!video.getAttribute("src")) video.src = service.clip;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, service.clip]);

  return (
    <article className="group relative flex h-full flex-col rounded-[1.75rem] bg-white p-2 ring-1 ring-border transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_40px_60px_-40px_rgb(27_30_35/0.45)]">
      <div className="relative aspect-[349/236] overflow-hidden rounded-[1.35rem] bg-[#032f2a]">
        <video
          ref={ref}
          poster={service.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlaying={() => setLoaded(true)}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.12em] text-white uppercase backdrop-blur",
          )}
        >
          {loaded ? (
            <span className="vds-rec size-1.5 rounded-full bg-[#ff4d4d]" />
          ) : (
            <Play className="size-3 fill-white" />
          )}
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pt-5 pb-5 sm:px-5">
        <h3 className="text-xl font-bold text-ink">{service.title}</h3>
        <p className="mt-2.5 leading-relaxed text-ink/65">{service.body}</p>
      </div>
    </article>
  );
}
