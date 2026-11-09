"use client";

import { MessagesSquare } from "lucide-react";

import { ctaButtonVariants } from "@/components/ui/cta-button";

type Crisp = { push: (cmd: unknown[]) => void };

/**
 * Live "Chat Now" (.chat-us): opens the Crisp chat. This Next.js site does not
 * load Crisp, so when the widget is absent the link falls back to its href
 * (an email to hello@kimp.io) instead of doing nothing.
 */
export function ChatButton({ label, fallback }: { label: string; fallback: string }) {
  return (
    <a
      href={fallback}
      data-click-sound=""
      className={ctaButtonVariants({ size: "md" })}
      onClick={(e) => {
        const crisp = (window as unknown as { $crisp?: Crisp }).$crisp;
        if (!crisp) return;
        e.preventDefault();
        crisp.push(["do", "chat:open"]);
      }}
    >
      <MessagesSquare aria-hidden="true" />
      {label}
    </a>
  );
}
