"""List <img> real sources (incl. WP Rocket data-lazy-src) and alts on a live page.

Usage: python -I scripts/audit/img_sources.py <url> [alt_regex]
"""
import re
import sys
from urllib.request import Request, urlopen

html = urlopen(Request(sys.argv[1], headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
rx = re.compile(sys.argv[2], re.I) if len(sys.argv) > 2 else None
sys.stdout.reconfigure(encoding="utf-8")
for tag in re.findall(r"<img\b[^>]*>", html, re.I):
    alt = re.search(r'alt="([^"]*)"', tag)
    alt = alt.group(1) if alt else None
    src = re.search(r'data-lazy-src="([^"]+)"', tag) or re.search(r'\ssrc="([^"]+)"', tag)
    src = src.group(1) if src else None
    if rx and not rx.search(alt or ""):
        continue
    print(f"{alt!r:40} {src}")
