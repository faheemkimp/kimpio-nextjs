import { NextResponse, type NextRequest } from "next/server";

import { isNextInternal, isReviewHost, resolveOwner } from "@/lib/routing/ownership";
import { WP_ORIGIN } from "@/lib/site";

/**
 * Sends every non-redesigned URL to WordPress untouched, and handles the
 * trailing-slash redirect for redesigned pages exactly like WordPress (301).
 */

function proxyToWordPress(req: NextRequest): NextResponse {
  const target = new URL(req.nextUrl.pathname + req.nextUrl.search, WP_ORIGIN);
  const headers = new Headers(req.headers);
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-real-ip");
  // www.kimp.io sits behind Cloudflare, which rejects any incoming request that
  // already carries its own headers (CF-Connecting-IP, CF-Ray, ...) with
  // "Error 1000". Cloudflare sets CF-Connecting-IP itself, so never forward them;
  // the real visitor IP travels in X-Forwarded-For / X-Real-IP instead.
  for (const name of [...headers.keys()]) if (name.startsWith("cf-")) headers.delete(name);
  if (ip) {
    headers.set("x-real-ip", ip);
    headers.set("x-forwarded-for", [req.headers.get("x-forwarded-for"), ip].filter(Boolean).join(", "));
  }
  headers.set("x-forwarded-host", req.headers.get("host") ?? "www.kimp.io");
  headers.set("x-forwarded-proto", "https");
  return NextResponse.rewrite(target, { request: { headers } });
}

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (isNextInternal(pathname)) return NextResponse.next();

  const host = req.headers.get("host");
  if (resolveOwner(pathname, searchParams, host) === "wordpress") return proxyToWordPress(req);

  if (!pathname.endsWith("/")) {
    // A plain URL, not req.nextUrl.clone(): NextURL strips the trailing slash when it
    // serializes, which turned this into a redirect to itself (an infinite 301 loop).
    const url = new URL(req.url);
    url.pathname = `${pathname}/`;
    return NextResponse.redirect(url, 301);
  }
  const res = withLoginFlag(req, NextResponse.next());
  // Review copies (*.vercel.app) must not compete with www.kimp.io in search.
  if (isReviewHost(host)) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

/**
 * WordPress' login cookie is HttpOnly, so expose a plain boolean (`kimp_li=1`)
 * for the GTM4WP `visitorLoginState` variable on redesigned pages.
 */
function withLoginFlag(req: NextRequest, res: NextResponse): NextResponse {
  const loggedIn = req.cookies.getAll().some((c) => c.name.startsWith("wordpress_logged_in_"));
  if (loggedIn && !req.cookies.has("kimp_li")) res.cookies.set("kimp_li", "1", { path: "/", sameSite: "lax" });
  if (!loggedIn && req.cookies.has("kimp_li")) res.cookies.delete("kimp_li");
  return res;
}

export const config = {
  // Everything except Next build assets, the image optimizer and files in /public.
  matcher: ["/((?!_next/static|_next/image|fonts/|images/|brand/|favicon\\.png).*)"],
};
