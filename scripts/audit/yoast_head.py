"""Print Yoast's get_head JSON for a URL (what Yoast intends to output).

Usage: python -I scripts/audit/yoast_head.py <url>
"""
import json
import sys
from urllib.parse import quote
from urllib.request import Request, urlopen

api = f"https://www.kimp.io/wp-json/yoast/v1/get_head?url={quote(sys.argv[1], safe='')}"
data = json.loads(urlopen(Request(api, headers={"User-Agent": "Mozilla/5.0 KimpSEOBaseline"}), timeout=60).read())
sys.stdout.reconfigure(encoding="utf-8")
j = data.get("json", {})
schema = j.pop("schema", {})
print("status:", data.get("status"))
print(json.dumps(j, indent=1, ensure_ascii=False))
print("schema @graph types:", [g.get("@type") for g in schema.get("@graph", [])])
print(json.dumps(schema, indent=1, ensure_ascii=False)[:2500])
