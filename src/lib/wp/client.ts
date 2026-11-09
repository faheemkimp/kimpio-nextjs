import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { WP_API, WP_ORIGIN } from "@/lib/site";

export class WPError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

interface WPResponse<T> {
  data: T;
  total: number;
  totalPages: number;
}

const RETRYABLE = new Set([429, 502, 503, 504]);

/**
 * Per-attempt time limit. Some WordPress endpoints (Yoast get_head, admin-ajax)
 * can take a minute when the server is busy; a timed-out call is not retried, so
 * the caller's fallback (SEO baseline, "couldn't load" note) kicks in instead of
 * the page hanging.
 */
const TIMEOUT_MS = 20_000;

async function request<T>(
  url: string,
  init: { body?: URLSearchParams; text?: boolean; timeoutMs?: number } = {},
): Promise<WPResponse<T>> {
  const timeoutMs = init.timeoutMs ?? TIMEOUT_MS;
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        method: init.body ? "POST" : "GET",
        body: init.body,
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          Accept: init.text ? "text/html" : "application/json",
          "User-Agent": "kimp-nextjs/1.0 (+https://www.kimp.io)",
        },
      });
      if (RETRYABLE.has(res.status)) {
        lastError = new WPError(`WordPress responded ${res.status} for ${url}`, res.status);
        await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
        continue;
      }
      if (!res.ok) throw new WPError(`WordPress responded ${res.status} for ${url}`, res.status);
      return {
        data: (init.text ? await res.text() : await res.json()) as T,
        total: Number(res.headers.get("X-WP-Total") ?? 0),
        totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0),
      };
    } catch (err) {
      if (err instanceof WPError && !RETRYABLE.has(err.status)) throw err;
      if (err instanceof DOMException && err.name === "TimeoutError") throw new WPError(`WordPress timed out after ${timeoutMs}ms for ${url}`, 504);
      lastError = err;
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
  }
  throw lastError;
}

/**
 * Cached GET against the WordPress REST API.
 *
 * Every response is tagged `wp` plus the caller's tags so the `/api/revalidate`
 * webhook (fired by WordPress on publish/update) can refresh exactly what changed.
 * Errors are thrown, not swallowed: a failed refresh keeps serving the last good
 * page instead of caching an empty one.
 */
export async function wpGet<T>(path: string, tags: string[] = []): Promise<WPResponse<T>> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp", ...tags);
  return request<T>(`${WP_API}${path}`);
}

/**
 * Cached GET of a JSON file served by WordPress outside the REST API (e.g. the
 * salary data in /json/), with the same caching and revalidation tags as wpGet.
 */
export async function wpGetFile<T>(path: string, tags: string[] = []): Promise<T> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp", ...tags);
  return (await request<T>(`${WP_ORIGIN}${path}`)).data;
}

/**
 * Cached GET of a page WordPress renders (HTML), for content that only exists in
 * a WordPress template and has no API (e.g. the first /reviews/ testimonials).
 */
export async function wpGetHtml(path: string, tags: string[] = []): Promise<string> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp", ...tags);
  return (await request<string>(`${WP_ORIGIN}${path}`, { text: true })).data;
}

/** Cached POST to a WordPress admin-ajax action that returns HTML (as the live theme's "View More" buttons call it). */
export async function wpAjaxHtml(params: Record<string, string>, tags: string[] = []): Promise<string> {
  "use cache";
  cacheLife("hours");
  cacheTag("wp", ...tags);
  // Called only from user actions (never during prerender), so it may wait longer than page data.
  return (await request<string>(`${WP_ORIGIN}/wp-admin/admin-ajax.php`, { body: new URLSearchParams(params), text: true, timeoutMs: 45_000 })).data;
}
