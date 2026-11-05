"""Print inline <script> blocks that mention known tracking vendors, for exact re-implementation.

Usage: python -I scripts/seo-baseline/snippets.py <url> [vendor_regex]
"""
import re
import sys
from urllib.request import Request, urlopen

url = sys.argv[1]
rx = re.compile(sys.argv[2] if len(sys.argv) > 2 else r"GTM-|crisp|hyros|pagesense|swarmcdn|gtag|dataLayer|clarity|fbq", re.I)
html = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
sys.stdout.reconfigure(encoding="utf-8")
for m in re.finditer(r"<script\b([^>]*)>(.*?)</script>|<noscript>(.*?)</noscript>|<script\b[^>]*src=[\"']([^\"']+)", html, re.S | re.I):
    blob = m.group(0)
    if rx.search(blob):
        print("-----", html[: m.start()].count("\n") + 1)
        print(blob[:1800])
