"""Print selected fields of baseline records. Usage: python -I scripts/audit/show_record.py <baseline.json> <path> [<path> ...]"""
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")
data = {r["url"].replace("https://www.kimp.io", ""): r for r in json.load(open(sys.argv[1], encoding="utf-8"))}
for path in sys.argv[2:]:
    r = data.get(path)
    if not r:
        print(path, "NOT IN BASELINE")
        continue
    print(f"\n{path} status={r.get('status')} title={r.get('title')!r}")
    print("  desc:", r.get("description"))
    print("  canonical:", r.get("canonical"), "robots:", r.get("robots"))
    print("  h1:", r.get("h1"))
    print("  headings:", r.get("headings", [])[:8])
    print("  schema:", r.get("jsonld_types"), "og:image:", r.get("og", {}).get("og:image"))
