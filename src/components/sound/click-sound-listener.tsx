"use client";

import { useEffect } from "react";

import { playClickSound, playHoverSound, unlockAudio } from "@/lib/sound/click-sound";

const SELECTOR = "[data-click-sound]";

/**
 * Game-style UI sounds for every element marked `data-click-sound` (all CTA buttons):
 * - hover (mouse only): soft "tick"
 * - press (pointer, Enter, Space): two-note "blip"
 *
 * One listener for the whole page keeps the buttons server-rendered. Browsers keep
 * audio locked until the first click/tap/key press, so hover sounds start after that.
 */
export function ClickSoundListener() {
  useEffect(() => {
    const cta = (target: EventTarget | null) =>
      target instanceof Element ? target.closest(SELECTOR) : null;

    const onPointerDown = (e: PointerEvent) => {
      unlockAudio();
      if (e.button === 0 && cta(e.target)) playClickSound();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      unlockAudio();
      if ((e.key === "Enter" || e.key === " ") && !e.repeat && cta(e.target)) playClickSound();
    };
    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = cta(e.target);
      // Only when the pointer enters the button, not when moving between its children.
      if (el && !(e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) playHoverSound();
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    document.addEventListener("keydown", onKeyDown, { capture: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, { capture: true });
      document.removeEventListener("keydown", onKeyDown, { capture: true });
      document.removeEventListener("pointerover", onPointerOver);
    };
  }, []);

  return null;
}
