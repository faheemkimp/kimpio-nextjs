import { ChevronDown, ListTree } from "lucide-react";

import { TagManager } from "@/components/analytics/tag-manager";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { InnerHero } from "@/components/inner/inner-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { LEGAL_PAGES, LEGAL_UI, type LegalSlug } from "@/content/legal";
import { getPageSeo } from "@/lib/seo/page-seo";
import { getLegalDocument, type LegalDocument, type OutlineItem } from "@/lib/wp/page-content";

import { LEGAL_SCENES } from "./hero-scenes";
import { RichContent } from "./rich-content";

import "./legal.css";

/**
 * Hero title from the document's <h1>: the part after an en dash (or the last
 * word) goes on its own line in brand orange. Text is unchanged, only split.
 */
function splitTitle(text: string): { lead: string; highlight: string } {
  const dash = text.lastIndexOf(" – ");
  if (dash > 0) return { lead: text.slice(0, dash + 2), highlight: text.slice(dash + 3) };
  const space = text.lastIndexOf(" ");
  return space > 0 ? { lead: text.slice(0, space), highlight: text.slice(space + 1) } : { lead: "", highlight: text };
}

/**
 * Shared page for the four template-common.php pages. Hero (the document's own
 * <h1> and opening line) + the WordPress editor content with an "on this page"
 * outline, closed by the homepage CTA and footer panel. See src/content/legal.ts.
 */
export async function LegalPage({ slug }: { slug: LegalSlug }) {
  const copy = LEGAL_PAGES[slug];
  const [{ schema, yoast }, doc] = await Promise.all([getPageSeo(copy.path), loadDocument(slug)]);
  return (
    <>
      <OgProperties yoast={yoast} />
      <TagManager page={{ pagePostType: "page", pagePostType2: "single-page" }} />
      <JsonLd data={schema} />
      <main id="main">
        {/* Live prints the editor's <h1> first: it is the hero title here (h1, same text). */}
        <InnerHero
          id="legal-hero-title"
          titleAs="h1"
          eyebrow={copy.eyebrow}
          title={splitTitle(doc?.title ?? copy.fallbackTitle)}
          intro={doc?.lead ?? copy.intro}
          marquee={copy.marquee}
          strip={copy.strip}
          mascot={copy.mascot}
          custom={LEGAL_SCENES[slug]}
          tall
        />
        <section aria-labelledby="legal-hero-title" className="relative isolate bg-surface py-16 sm:py-24">
          <div className="container-page">
            {doc ? (
              <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[18rem_minmax(0,1fr)]">
                {doc.outline.length > 1 && <Outline items={doc.outline} />}
                <article
                  className={`min-w-0 rounded-[1.6rem] bg-white px-5 py-8 ring-1 ring-border sm:px-10 sm:py-12 lg:px-14 ${doc.outline.length > 1 ? "" : "lg:col-span-2"}`}
                >
                  <div className="mx-auto max-w-3xl">
                    <RichContent nodes={doc.body} />
                  </div>
                </article>
              </div>
            ) : (
              <p className="rounded-[1.75rem] bg-white px-6 py-16 text-center text-lg text-ink/70">{LEGAL_UI.unavailable}</p>
            )}
          </div>
        </section>
      </main>
      {/* Homepage CTA + footer panel. Live has no heading here, so its title is a styled <p>. */}
      <FinalCta titleAs="p" />
      <ScrollFx />
    </>
  );
}

/** Jump list of the document's sections: a collapsible card on phones, a sticky column on desktop. Not headings. */
function Outline({ items }: { items: OutlineItem[] }) {
  const links = (
    <ol className="legal-toc mt-4 grid gap-0.5">
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} data-click-sound="">
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  );
  const label = (
    <span className="flex items-center gap-2 text-sm font-bold text-ink">
      <span className="grid size-8 place-items-center rounded-xl bg-brand-soft text-brand">
        <ListTree className="size-4" strokeWidth={2.4} aria-hidden="true" />
      </span>
      {LEGAL_UI.outline}
      <span className="ml-auto rounded-full bg-surface px-2 py-0.5 text-xs text-ink/55 tabular-nums">{items.length}</span>
    </span>
  );
  return (
    <nav aria-label={LEGAL_UI.outline} className="min-w-0">
      <details className="legal-toc-mobile rounded-[1.6rem] bg-white p-5 ring-1 ring-border lg:hidden">
        <summary className="flex cursor-pointer items-center gap-3" data-click-sound="">
          <span className="flex-1">{label}</span>
          <span aria-hidden="true" className="legal-service-chevron">
            <ChevronDown className="size-4" strokeWidth={2.4} />
          </span>
        </summary>
        {links}
      </details>
      <div className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-[1.6rem] bg-white p-5 ring-1 ring-border lg:block">
        {label}
        {links}
      </div>
    </nav>
  );
}

/** Fetched from WordPress at render (cached, see lib/wp/client.ts); a failure shows a fallback note, not a broken page. */
async function loadDocument(slug: LegalSlug): Promise<LegalDocument | null> {
  try {
    return await getLegalDocument(slug);
  } catch (err) {
    console.error(`[legal] ${slug} content unavailable`, err);
    return null;
  }
}
