import "server-only";

import { wpGet, WPError } from "./client";
import type { YoastHead } from "./types";

interface YoastHeadResponse {
  status: number;
  json?: YoastHead;
}

/**
 * Yoast metadata for any public URL, straight from the Yoast plugin that
 * manages SEO on kimp.io today. Returns null when Yoast reports the URL missing.
 */
export async function getYoastHeadForUrl(url: string): Promise<YoastHead | null> {
  try {
    const { data } = await wpGet<YoastHeadResponse>(`/yoast/v1/get_head?url=${encodeURIComponent(url)}`, [
      `head:${url}`,
    ]);
    return data.status === 200 && data.json ? data.json : null;
  } catch (err) {
    if (err instanceof WPError && err.status === 404) return null;
    throw err;
  }
}
