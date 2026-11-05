"""Emit a Markdown table of the live SEO values for every URL in page-sitemap.xml.

Usage: python -I scripts/audit/pages_seo_table.py <page-sitemap.xml> > table.md
"""
import json
import re
import sys
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding="utf-8")
paths = [urlparse(u).path for u in re.findall(r"<loc>([^<]+)</loc>", open(sys.argv[1], encoding="utf-8").read()) if "wp-content" not in u]
crawl = {urlparse(r["url"]).path: r for r in json.load(open("scripts/seo-baseline/baseline.json", encoding="utf-8"))}
pages = {urlparse(p["link"]).path: p for p in json.load(open("scripts/seo-baseline/wp/pages.json", encoding="utf-8"))}


def cell(s):
    return (s or "—").replace("|", "\\|").replace("\n", " ")


print("| # | URL | Status | Title (live) | Meta description (live) | Robots | H1s | Template |")
print("|---|---|---|---|---|---|---|---|")
seen = set()
i = 0
for path in paths:
    if path in seen:  # page-sitemap.xml lists "/" twice
        continue
    seen.add(path)
    i += 1
    r = crawl.get(path, {})
    robots = r.get("robots") or ""
    robots = "noindex" if "noindex" in robots else ("index" if robots else "—")
    tpl = (pages.get(path) or {}).get("template") or "default"
    tpl = tpl.replace("page-templates/", "")
    print(f"| {i} | `{path}` | {r.get('status', '—')} | {cell(r.get('title'))} | {cell(r.get('description'))} | {robots} | {len(r.get('h1') or [])} | {tpl} |")
