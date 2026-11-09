"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping clip (live: autoplaying video.js players). It only loads
 * and plays while on screen, and stays on its poster under reduced motion.
 */
export function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {
            /* autoplay blocked: the poster stays */
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className} />;
}
