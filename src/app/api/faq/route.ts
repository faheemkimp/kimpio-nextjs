import type { NextRequest } from "next/server";

import { searchFaqs } from "@/lib/wp/faqs";

/**
 * FAQ search on /faq/: the same WordPress admin-ajax action the live search box
 * calls (`searchfaqs`), cached per keyword, as JSON.
 * GET /api/faq?q=trial
 */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").replace(/\s+/g, " ").trim();
  if (!q || q.length > 100) {
    return Response.json({ error: "q must be 1 to 100 characters" }, { status: 400 });
  }
  try {
    return Response.json({ items: await searchFaqs(q.toLowerCase()) });
  } catch (err) {
    console.error(`[faq] search "${q}" unavailable`, err);
    return Response.json({ error: "Search is unavailable right now" }, { status: 502 });
  }
}
