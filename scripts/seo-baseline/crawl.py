"""Crawl every URL in the live Yoast sitemap and record its SEO baseline.

Usage: python -I scripts/seo-baseline/crawl.py <urls.txt> <out.json> [base_override]
If base_override is given (e.g. http://localhost:3000), each URL's origin is
replaced with it, so the same script validates the new site against the old one.
"""
import json
import os
import re
import sys
import time
import concurrent.futures as cf
from html.parser import HTMLParser
from urllib.request import Request, urlopen
from urllib.error import HTTPError

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36 KimpSEOBaseline"
TRACKERS = {
    "gtm": r"googletagmanager\.com/gtm\.js|GTM-[A-Z0-9]+",
    "ga4": r"gtag/js\?id=G-|G-[A-Z0-9]{6,}",
    "clarity": r"clarity\.ms",
    "hotjar": r"hotjar",
    "facebook": r"connect\.facebook\.net|fbq\(",
    "linkedin": r"snap\.licdn\.com|_linkedin_partner_id",
    "hubspot": r"hs-scripts|hubspot",
    "intercom": r"intercom",
    "tiktok": r"analytics\.tiktok\.com",
    "reddit": r"redditstatic",
    "twitter": r"static\.ads-twitter\.com",
    "bing": r"bat\.bing\.com",
    "vwo": r"visualwebsiteoptimizer",
    "rewardful_or_affiliate": r"affiliatewp|rewardful|firstpromoter",
}


class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.d = {"title": "", "meta": {}, "links": {}, "headings": [], "jsonld": [],
                  "imgs": 0, "imgs_no_alt": 0, "internal_links": 0, "hreflang": []}
        self._cap = None
        self._buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title" and not self.d["title"]:
            self._cap, self._buf = "title", []
        elif tag in ("h1", "h2", "h3"):
            self._cap, self._buf = tag, []
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._cap, self._buf = "jsonld", []
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key and "content" in a:
                self.d["meta"].setdefault(key.lower(), a["content"])
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            if rel == "alternate" and a.get("hreflang"):
                self.d["hreflang"].append([a["hreflang"], a.get("href")])
            elif rel in ("canonical", "shortlink", "next", "prev", "icon", "apple-touch-icon"):
                self.d["links"].setdefault(rel, a.get("href"))
        elif tag == "img":
            self.d["imgs"] += 1
            if not (a.get("alt") or "").strip():
                self.d["imgs_no_alt"] += 1
        elif tag == "a":
            href = a.get("href") or ""
            if "kimp.io" in href or href.startswith("/"):
                self.d["internal_links"] += 1

    def handle_data(self, data):
        if self._cap:
            self._buf.append(data)

    def handle_endtag(self, tag):
        if self._cap and (tag == self._cap or (self._cap == "jsonld" and tag == "script")):
            text = re.sub(r"\s+", " ", "".join(self._buf)).strip()
            if self._cap == "title":
                self.d["title"] = text
            elif self._cap == "jsonld":
                self.d["jsonld"].append(text)
            else:
                self.d["headings"].append([self._cap, text[:160]])
            self._cap = None


def ld_types(blobs):
    types = set()
    for b in blobs:
        for t in re.findall(r'"@type"\s*:\s*"([^"]+)"', b):
            types.add(t)
        for arr in re.findall(r'"@type"\s*:\s*\[([^\]]+)\]', b):
            types.update(re.findall(r'"([^"]+)"', arr))
    return sorted(types)


def fetch(url, base):
    target = url if not base else re.sub(r"^https?://[^/]+", base, url)
    rec = {"url": url}
    for attempt in range(6):
        try:
            res = urlopen(Request(target, headers={"User-Agent": UA}), timeout=40)
            rec["status"] = res.status
            rec["final_url"] = res.geturl()
            rec["x_robots"] = res.headers.get("X-Robots-Tag")
            html = res.read().decode("utf-8", "replace")
            break
        except HTTPError as e:
            if e.code in (429, 503) and attempt < 5:
                # Cloudflare rate limit: honour Retry-After, else back off exponentially.
                time.sleep(int(e.headers.get("Retry-After") or 0) or 5 * 2 ** attempt)
                continue
            rec["status"] = e.code
            return rec
        except Exception as e:  # noqa: BLE001 - record and continue
            rec["status"] = None
            rec["error"] = repr(e)
            return rec
    p = SEOParser()
    try:
        p.feed(html)
    except Exception as e:  # noqa: BLE001
        rec["parse_error"] = repr(e)
    d = p.d
    m = d["meta"]
    rec.update({
        "title": d["title"],
        "description": m.get("description"),
        "robots": m.get("robots"),
        "canonical": d["links"].get("canonical"),
        "og": {k: v for k, v in m.items() if k.startswith(("og:", "article:"))},
        "twitter": {k: v for k, v in m.items() if k.startswith("twitter:")},
        "verification": {k: v for k, v in m.items() if "verification" in k},
        "jsonld_types": ld_types(d["jsonld"]),
        "h1": [h[1] for h in d["headings"] if h[0] == "h1"],
        "headings": d["headings"][:40],
        "imgs": d["imgs"],
        "imgs_no_alt": d["imgs_no_alt"],
        "internal_links": d["internal_links"],
        "hreflang": d["hreflang"],
        "trackers": sorted(k for k, rx in TRACKERS.items() if re.search(rx, html, re.I)),
        "bytes": len(html),
    })
    return rec


def main():
    urls = [u.strip() for u in open(sys.argv[1], encoding="utf-8") if u.strip()]
    base = sys.argv[3] if len(sys.argv) > 3 else None
    workers = int(sys.argv[4]) if len(sys.argv) > 4 else 2
    # Resumable: keep records already fetched successfully in a previous run.
    done = {}
    if os.path.exists(sys.argv[2]):
        done = {r["url"]: r for r in json.load(open(sys.argv[2], encoding="utf-8")) if r.get("status") == 200}
    todo = [u for u in urls if u not in done]
    print(f"{len(done)} cached, {len(todo)} to fetch", flush=True)

    def slow_fetch(u):
        rec = fetch(u, base)
        if not base:
            time.sleep(0.6)  # be polite to the production origin
        return rec

    with cf.ThreadPoolExecutor(max_workers=workers) as ex:
        for i, rec in enumerate(ex.map(slow_fetch, todo), 1):
            done[rec["url"]] = rec
            if i % 50 == 0:
                print(f"{i}/{len(todo)}", flush=True)
    out = [done[u] for u in urls if u in done]
    json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print("done", len(out), "non-200:", sum(1 for r in out if r.get("status") != 200))


if __name__ == "__main__":
    main()
