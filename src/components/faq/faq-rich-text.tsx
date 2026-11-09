import { Fragment, type ReactNode } from "react";

import type { FaqNode } from "@/lib/wp/faqs";

const LINK = "font-semibold text-teal-brand underline decoration-teal-brand/30 underline-offset-4 hover:decoration-teal-brand";

/** Plain-text URLs in answers (e.g. the KIMP360 guide video) become links, as they read on live. */
function linkify(text: string): ReactNode {
  const parts = text.split(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 ? (
      <a key={i} href={p} target="_blank" rel="noopener" className={`${LINK} break-all`}>
        {p}
      </a>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

function render(nodes: FaqNode[], inLink = false): ReactNode {
  return nodes.map((n, i) => {
    if (typeof n === "string") return <Fragment key={i}>{inLink ? n : linkify(n)}</Fragment>;
    const kids = render(n.c, inLink || n.t === "a");
    switch (n.t) {
      case "br":
        return <br key={i} />;
      case "p":
        return <p key={i}>{kids}</p>;
      case "div":
        return <div key={i} className="space-y-4">{kids}</div>;
      case "h3":
        return (
          <h3 key={i} className="text-lg font-bold text-ink">
            {kids}
          </h3>
        );
      case "strong":
      case "b":
        return (
          <strong key={i} className="font-semibold text-ink">
            {kids}
          </strong>
        );
      case "em":
      case "i":
        return <em key={i}>{kids}</em>;
      case "a":
        return n.href ? (
          <a key={i} href={n.href} {...(/^https?:/.test(n.href) && !/^https?:\/\/(www\.)?kimp\.io/.test(n.href) ? { target: "_blank", rel: "noopener" } : {})} className={LINK}>
            {kids}
          </a>
        ) : (
          <Fragment key={i}>{kids}</Fragment>
        );
      case "ul":
        return (
          <ul key={i} className="space-y-1.5 pl-1 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:top-[0.65em] [&>li]:before:left-0 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-brand">
            {kids}
          </ul>
        );
      case "ol":
        return (
          <ol key={i} start={n.value} className="list-decimal space-y-1.5 pl-6 marker:font-bold marker:text-brand">
            {kids}
          </ol>
        );
      case "li":
        return (
          <li key={i} value={n.value} className="[&>p+p]:mt-2 [&>ul]:mt-2 [&>ol]:mt-2">
            {kids}
          </li>
        );
    }
  });
}

/** A WordPress FAQ answer, rendered from its whitelisted node tree (lib/wp/faqs.ts). */
export function FaqRichText({ nodes }: { nodes: FaqNode[] }) {
  return <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink/70">{render(nodes)}</div>;
}
