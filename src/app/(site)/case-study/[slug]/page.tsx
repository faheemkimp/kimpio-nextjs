import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { TagManager } from "@/components/analytics/tag-manager";
import { CaseStudyDetail } from "@/components/case-study/case-study";
import { ScrollFx } from "@/components/home/fx/scroll-fx";
import { FinalCta } from "@/components/home/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { OgProperties } from "@/components/seo/og-properties";
import { CASE_STUDIES, CS_FINAL, caseStudyBySlug } from "@/content/case-studies";
import { getPageSeo } from "@/lib/seo/page-seo";

/** The 12 live case studies, prerendered; any other slug is a 404 (production sends it to WordPress anyway). */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

async function load(params: PageProps<"/case-study/[slug]">["params"]) {
  const cs = caseStudyBySlug((await params).slug);
  if (!cs) notFound();
  return cs;
}

/** Title, robots, OG (og:type article) come from Yoast for this exact URL. */
export async function generateMetadata({ params }: PageProps<"/case-study/[slug]">): Promise<Metadata> {
  const cs = await load(params);
  return (await getPageSeo(cs.path)).metadata;
}

/**
 * A case study (/case-study/{slug}/). Live hardcoded template copy, same
 * sections, headings and Previous/Next links (src/content/case-studies.ts),
 * then the live closing newsletter heading in the homepage CTA panel.
 */
export default function CaseStudyPage({ params }: PageProps<"/case-study/[slug]">) {
  return (
    <>
      <TagManager page={{ pagePostType: "casestudy", pagePostType2: "single-casestudy" }} />
      {/* The slug (URL data) is read inside Suspense so the shared shell stays URL-independent; every slug is prerendered, so the fallback never ships. */}
      <Suspense fallback={<main id="main" className="min-h-screen" />}>
        <CaseStudyBody params={params} />
      </Suspense>
      <FinalCta content={CS_FINAL} />
    </>
  );
}

/** ScrollFx sits in here so it mounts after this streamed content hydrates (it sets inline styles on [data-fx]). */
async function CaseStudyBody({ params }: { params: PageProps<"/case-study/[slug]">["params"] }) {
  const cs = await load(params);
  const { schema, yoast } = await getPageSeo(cs.path);
  return (
    <>
      <OgProperties yoast={yoast} />
      <JsonLd data={schema} />
      <main id="main">
        <CaseStudyDetail cs={cs} />
      </main>
      <ScrollFx />
    </>
  );
}
