import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { WP_API } from "@/lib/site";

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

async function request<T>(url: string): Promise<WPResponse<T>> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", "User-Agent": "kimp-nextjs/1.0 (+https://www.kimp.io)" },
      });
      if (RETRYABLE.has(res.status)) {
        lastError = new WPError(`WordPress responded ${res.status} for ${url}`, res.status);
        await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
        continue;
      }
      if (!res.ok) throw new WPError(`WordPress responded ${res.status} for ${url}`, res.status);
      return {
        data: (await res.json()) as T,
        total: Number(res.headers.get("X-WP-Total") ?? 0),
        totalPages: Number(res.headers.get("X-WP-TotalPages") ?? 0),
      };
    } catch (err) {
      if (err instanceof WPError && !RETRYABLE.has(err.status)) throw err;
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
