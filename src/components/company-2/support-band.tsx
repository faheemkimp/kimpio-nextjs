import { ArrowRight, MessageCircle } from "lucide-react";

import { CtaLink } from "@/components/ui/cta-button";

/**
 * Live "support_section": a closing <h2> with a line of copy and one button,
 * on a teal card (used by /design-categories/ and /brand-assets/).
 */
export function SupportBand({
  id,
  titleLines,
  bodyLines,
  cta,
  newTab = false,
  chat = false,
}: {
  id: string;
  titleLines: readonly string[];
  bodyLines: readonly string[];
  cta: { label: string; href: string };
  /** Open the link in a new tab (as live, e.g. the Media Kit PDF). */
  newTab?: boolean;
  /** Chat icon on the button (the live chat link). */
  chat?: boolean;
}) {
  const br = (ls: readonly string[]) =>
    ls.map((l, i) => (
      <span key={l}>
        {i > 0 && <br className="hidden sm:block" />}
        {i > 0 && " "}
        {l}
      </span>
    ));
  return (
    <section aria-labelledby={id} className="py-20 sm:py-24">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-teal-brand px-8 py-14 text-center text-white sm:px-14 sm:py-20">
          <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 opacity-20" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-brand/30 blur-3xl" />
          <h2 id={id} data-fx="reveal" className="mx-auto max-w-3xl text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] sm:text-5xl">
            {br(titleLines)}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{br(bodyLines)}</p>
          <CtaLink href={cta.href} size="lg" className="mt-9" {...(newTab ? { target: "_blank", rel: "noopener" } : {})}>
            {chat && <MessageCircle aria-hidden="true" />}
            {cta.label}
            {!chat && <ArrowRight aria-hidden="true" />}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
