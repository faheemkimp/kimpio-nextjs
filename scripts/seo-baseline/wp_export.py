"""Export WordPress content metadata (incl. Yoast `yoast_head_json`) via the public REST API.

Usage: python -I scripts/seo-baseline/wp_export.py <out_dir> [api_base]
Writes one JSON file per type: posts, pages, categories, tags, users, enterprise-case.
Post/page bodies are omitted; this is an SEO baseline, not a content backup.
"""
import json
import os
import sys
import time
from urllib.error import HTTPError
from urllib.request import Request, urlopen

API = sys.argv[2] if len(sys.argv) > 2 else "https://www.kimp.io/wp-json/wp/v2"
UA = "Mozilla/5.0 KimpSEOBaseline"
FIELDS = {
    "posts": "id,slug,link,status,date,modified,title,author,categories,tags,featured_media,yoast_head_json",
    "pages": "id,slug,link,status,parent,template,modified,title,yoast_head_json",
    "enterprise-case": "id,slug,link,modified,title,yoast_head_json",
    "categories": "id,slug,name,count,link,parent,yoast_head_json",
    "tags": "id,slug,name,count,link,yoast_head_json",
    "users": "id,slug,name,link,yoast_head_json",
}


def get(url):
    for attempt in range(6):
        try:
            res = urlopen(Request(url, headers={"User-Agent": UA}), timeout=60)
            return json.loads(res.read()), int(res.headers.get("X-WP-TotalPages") or 1)
        except HTTPError as e:
            if e.code in (429, 503) and attempt < 5:
                time.sleep(5 * 2 ** attempt)
                continue
            raise


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for kind, fields in FIELDS.items():
        items, page, pages = [], 1, 1
        while page <= pages:
            data, pages = get(f"{API}/{kind}?per_page=100&page={page}&_fields={fields}")
            items.extend(data)
            page += 1
            time.sleep(1)
        json.dump(items, open(os.path.join(out, f"{kind}.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
        print(kind, len(items), flush=True)


if __name__ == "__main__":
    main()
