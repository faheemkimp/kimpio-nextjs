import { ChevronDown } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import type { RichElement, RichNode } from "@/lib/wp/page-content";

const LINK =
  "font-semibold break-words text-teal-brand underline decoration-teal-brand/30 underline-offset-4 transition-colors hover:decoration-teal-brand";

/** Off-site links open in a new tab, as they do on live (the editor sets target="_blank" on most of them). */
function external(href: string) {
  return /^https?:/.test(href) && !/^https?:\/\/(www\.)?kimp\.io(\/|$)/.test(href) ? { target: "_blank", rel: "noopener" } : {};
}

function render(nodes: RichNode[]): ReactNode {
  return nodes.map((n, i) => (typeof n === "string" ? <Fragment key={i}>{n}</Fragment> : <El key={i} n={n} />));
}

function El({ n }: { n: RichElement }) {
  const kids = render(n.c);
  switch (n.t) {
    case "br":
      return <br />;
    case "p":
      return n.kind === "subtitle" ? <p className="legal-subtitle">{kids}</p> : <p>{kids}</p>;
    case "h1":
      return <h1 className="legal-h2">{kids}</h1>;
    case "h2":
      return (
        <h2 id={n.id} className="legal-h2">
          {kids}
        </h2>
      );
    case "h3":
      return <h3 className="legal-h3">{kids}</h3>;
    case "h4":
      return <h4 className="legal-h4">{kids}</h4>;
    case "h5":
      return <h5 className="legal-h5">{kids}</h5>;
    case "h6":
      return <h6 className="legal-h5">{kids}</h6>;
    case "strong":
      return n.id ? (
        <strong id={n.id} className="legal-label">
          {kids}
        </strong>
      ) : (
        <strong className="font-semibold text-ink">{kids}</strong>
      );
    case "em":
      return <em>{kids}</em>;
    case "a":
      return n.href ? (
        <a href={n.href} {...external(n.href)} className={LINK}>
          {kids}
        </a>
      ) : (
        <>{kids}</>
      );
    case "ul":
      return <ul className="legal-ul">{kids}</ul>;
    case "ol":
      return (
        <ol start={n.start} className="legal-ol">
          {kids}
        </ol>
      );
    case "li":
      return <li>{kids}</li>;
    case "table":
      return (
        <div className="legal-table">
          <table>{kids}</table>
        </div>
      );
    case "thead":
      return <thead>{kids}</thead>;
    case "tbody":
      return <tbody>{kids}</tbody>;
    case "tr":
      return <tr>{kids}</tr>;
    case "th":
      return <th>{kids}</th>;
    case "td":
      return <td>{kids}</td>;
    case "details":
      return <details className="legal-service">{kids}</details>;
    case "summary":
      return (
        <summary className="legal-service-head">
          <span className="min-w-0 flex-1">{kids}</span>
          <span aria-hidden="true" className="legal-service-chevron">
            <ChevronDown className="size-4" strokeWidth={2.4} />
          </span>
        </summary>
      );
    case "div":
      return <div className={`legal-${n.kind}`}>{kids}</div>;
  }
}

/** A WordPress page's editor content, rendered from its whitelisted node tree (lib/wp/page-content.ts). */
export function RichContent({ nodes }: { nodes: RichNode[] }) {
  return <div className="legal-prose">{render(nodes)}</div>;
}
