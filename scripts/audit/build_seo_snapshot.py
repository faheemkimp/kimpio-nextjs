"""Build src/data/seo-baseline.json: path -> {t, d, img, noindex} fallback metadata.

Sources (pre-migration, captured from production):
  * scripts/seo-baseline/wp/*.json   Yoast data via REST (posts, pages, terms, users, enterprise-case)
  * scripts/seo-baseline/baseline.json  rendered-HTML crawl (covers CPTs not in REST)
Yoast REST values win; the HTML crawl fills the gaps.

Usage: python -I scripts/audit/build_seo_snapshot.py
"""
import html
import json
from urllib.parse import urlparse

B = "scripts/seo-baseline"
snap = {}


def put(path, title, desc=None, img=None, noindex=False):
    if not title:
        return
    entry = {"t": html.unescape(title)}
    if desc:
        entry["d"] = html.unescape(desc)
    if img:
        entry["img"] = img
    if noindex:
        entry["noindex"] = True
    snap[path] = entry


for kind in ("posts", "pages", "categories", "tags", "users", "enterprise-case"):
    for item in json.load(open(f"{B}/wp/{kind}.json", encoding="utf-8")):
        y = item.get("yoast_head_json") or {}
        path = urlparse(item["link"]).path
        img = (y.get("og_image") or [{}])[0].get("url")
        put(path, y.get("title"), y.get("description"), img, (y.get("robots") or {}).get("index") == "noindex")

for r in json.load(open(f"{B}/baseline.json", encoding="utf-8")):
    path = urlparse(r["url"]).path
    if r.get("status") == 200 and path not in snap and not path.endswith(".xml"):
        put(path, r.get("title"), r.get("description"), None, "noindex" in (r.get("robots") or ""))

json.dump(dict(sorted(snap.items())), open("src/data/seo-baseline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print("snapshot entries:", len(snap))





