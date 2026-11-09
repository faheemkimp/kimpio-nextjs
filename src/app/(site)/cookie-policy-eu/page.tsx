import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL_PAGES } from "@/content/legal";
import { getPageSeo } from "@/lib/seo/page-seo";

const PAGE = LEGAL_PAGES["cookie-policy-eu"];

/** Title, description, robots, canonical, OG and schema come from Yoast for this exact URL. */
export async function generateMetadata(): Promise<Metadata> {
  return (await getPageSeo(PAGE.path)).metadata;
}

/** Cookie Policy (EU) (/cookie-policy-eu/): the WordPress editor content, fetched at render. See src/content/legal.ts. */
export default function CookiePolicyEuPage() {
  return <LegalPage slug="cookie-policy-eu" />;
}
