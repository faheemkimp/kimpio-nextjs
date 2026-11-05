"""Summarise the SEO baseline (HTML crawl + WP REST export) for the audit report.

Usage: python -I scripts/audit/analyze_baseline.py
"""
import json
import os
from collections import Counter, defaultdict
from urllib.parse import urlparse

B = "scripts/seo-baseline"
crawl = json.load(open(f"{B}/baseline.json", encoding="utf-8"))
posts = json.load(open(f"{B}/wp/posts.json", encoding="utf-8"))
pages = json.load(open(f"{B}/wp/pages.json", encoding="utf-8"))
sys_out = []


def p(*a):
    print(*a)


p("== HTML crawl:", len(crawl), "URLs")
p("status:", Counter(r.get("status") for r in crawl))
for r in crawl:
    if r.get("status") != 200 or (r.get("final_url") and r["final_url"].rstrip("/") != r["url"].rstrip("/")):
        p("  non-200/redirect:", r["url"], r.get("status"), r.get("final_url"), r.get("error", ""))

ok = [r for r in crawl if r.get("status") == 200]
noindex = [r for r in ok if r.get("robots") and "noindex" in r["robots"]]
p("\n== noindex pages in sitemap:", len(noindex))
for r in noindex:
    p("  ", urlparse(r["url"]).path, "|", r["robots"])

canon_mismatch = [r for r in ok if r.get("canonical") and r["canonical"] != r["url"]]
p("\n== canonical != URL:", len(canon_mismatch))
for r in canon_mismatch[:40]:
    p("  ", r["url"], "->", r["canonical"])
p("missing canonical:", [urlparse(r["url"]).path for r in ok if not r.get("canonical")][:30])

p("\n== titles/descriptions")
p("missing title:", [urlparse(r["url"]).path for r in ok if not r.get("title")])
p("missing description:", len([r for r in ok if not r.get("description")]))
for r in ok:
    if not r.get("description"):
        p("   no-desc:", urlparse(r["url"]).path)
dup_t = defaultdict(list)
dup_d = defaultdict(list)
for r in ok:
    dup_t[r.get("title")].append(urlparse(r["url"]).path)
    if r.get("description"):
        dup_d[r["description"]].append(urlparse(r["url"]).path)
p("duplicate titles:")
for t, us in dup_t.items():
    if len(us) > 1:
        p("  ", repr(t)[:90], us)
p("duplicate descriptions:")
for t, us in dup_d.items():
    if len(us) > 1:
        p("  ", repr(t)[:70], us[:6])

p("\n== H1")
h1c = Counter(len(r.get("h1") or []) for r in ok)
p("h1 count distribution:", h1c)
for r in ok:
    if len(r.get("h1") or []) != 1:
        p("   h1x%d" % len(r.get("h1") or []), urlparse(r["url"]).path, (r.get("h1") or [])[:3])

p("\n== schema types:", Counter(t for r in ok for t in r.get("jsonld_types", [])).most_common(30))
p("== trackers:", Counter(t for r in ok for t in r.get("trackers", [])).most_common())
p("== og:image missing:", len([r for r in ok if not r["og"].get("og:image")]))
p("== twitter card values:", Counter(r["twitter"].get("twitter:card") for r in ok))
p("== verification metas:", Counter(json.dumps(r.get("verification")) for r in ok))
p("== hreflang present:", sum(1 for r in ok if r.get("hreflang")))
imgs = sum(r.get("imgs", 0) for r in ok)
noalt = sum(r.get("imgs_no_alt", 0) for r in ok)
p(f"== images: {imgs}, missing alt: {noalt} ({noalt * 100 // max(imgs, 1)}%)")
p("== avg HTML bytes:", sum(r.get("bytes", 0) for r in ok) // max(len(ok), 1))

p("\n== WP REST: posts", len(posts), "pages", len(pages))
p("post robots:", Counter(json.dumps((x.get("yoast_head_json") or {}).get("robots", {}).get("index")) for x in posts))
p("posts canonical != link:", [x["link"] for x in posts if (x.get("yoast_head_json") or {}).get("canonical") not in (x["link"], None)][:20])
p("post titles dup:", [t for t, c in Counter((x.get("yoast_head_json") or {}).get("title") for x in posts).items() if c > 1][:20])
p("post desc missing:", sum(1 for x in posts if not (x.get("yoast_head_json") or {}).get("description")))
p("post schema types:", Counter(g.get("@type") if isinstance(g.get("@type"), str) else "/".join(g.get("@type")) for x in posts for g in ((x.get("yoast_head_json") or {}).get("schema") or {}).get("@graph", [])).most_common())
p("post slugs with non-ascii/upper:", [x["slug"] for x in posts if x["slug"] != x["slug"].lower() or "%" in x["slug"]][:20])
p("post link paths not /slug/:", [x["link"] for x in posts if urlparse(x["link"]).path != f"/{x['slug']}/"][:20])
p("\n== WP pages not in sitemap (status/robots/template):")
sitemap_paths = {urlparse(u.strip()).path for u in open(f"{B}/urls.txt", encoding="utf-8")}
for x in sorted(pages, key=lambda x: x["link"]):
    path = urlparse(x["link"]).path
    if path not in sitemap_paths:
        y = x.get("yoast_head_json") or {}
        p("  ", path, "|", (y.get("robots") or {}).get("index"), "|", x.get("template"))
p("\n== Page templates in use (sitemap pages):")
for x in sorted(pages, key=lambda x: x["link"]):
    path = urlparse(x["link"]).path
    if path in sitemap_paths:
        p("  ", path, "|", x.get("template") or "default")
