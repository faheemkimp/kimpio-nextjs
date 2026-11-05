"""Print href/src values found within N chars around a text match on a live page.

Usage: python -I scripts/audit/links_near.py <url> <text> [chars]
"""
import re
import sys
from urllib.request import Request, urlopen

html = urlopen(Request(sys.argv[1], headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
n = int(sys.argv[3]) if len(sys.argv) > 3 else 900
sys.stdout.reconfigure(encoding="utf-8")
for m in re.finditer(re.escape(sys.argv[2]), html):
    chunk = html[max(0, m.start() - n): m.end() + 200]
    print("-----")
    for a in re.findall(r"(?:href|data-lazy-src|src)=\"([^\"]+)\"", chunk):
        if not a.startswith("data:"):
            print("  ", a)
