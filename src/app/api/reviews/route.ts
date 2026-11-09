import type { NextRequest } from "next/server";

import { getTestimonialSet } from "@/lib/wp/testimonials";

/**
 * "View More" on /reviews/: the next batch of testimonials, fetched from the same
 * WordPress admin-ajax action the live page calls (cached per set), as JSON.
 * GET /api/reviews?set=1
 */
export async function GET(request: NextRequest) {
  const set = Number(request.nextUrl.searchParams.get("set"));
  if (!Number.isInteger(set) || set < 1 || set > 100) {
    return Response.json({ error: "set must be an integer from 1 to 100" }, { status: 400 });
  }
  try {
    return Response.json(await getTestimonialSet(set));
  } catch (err) {
    console.error(`[reviews] set ${set} unavailable`, err);
    return Response.json({ error: "Testimonials are unavailable right now" }, { status: 502 });
  }
}
