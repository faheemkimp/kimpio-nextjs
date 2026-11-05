"""Print context around regex matches in a live page's raw HTML.

Usage: python -I scripts/seo-baseline/grep_live.py <url> <regex> [context_chars]
"""
import re
import sys
from urllib.request import Request, urlopen

html = urlopen(Request(sys.argv[1], headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
ctx = int(sys.argv[3]) if len(sys.argv) > 3 else 300
sys.stdout.reconfigure(encoding="utf-8")
for m in re.finditer(sys.argv[2], html, re.I):
    print("-----", m.start())
    print(html[max(0, m.start() - ctx): m.end() + ctx])
