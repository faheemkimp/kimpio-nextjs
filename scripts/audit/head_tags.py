"""List every SEO-relevant tag a live page outputs, in document order, with its location (head/body).

Usage: python -I scripts/audit/head_tags.py <url> [<url> ...]
"""
import re
import sys
from urllib.request import Request, urlopen

RX = re.compile(
    r"<title>.*?</title>|<meta\b[^>]*(?:name|property)=[\"'](?:description|robots|googlebot|google-site-verification|og:[^\"']+|article:[^\"']+|twitter:[^\"']+)[\"'][^>]*>"
    r"|<link\b[^>]*rel=[\"'](?:canonical|alternate|shortlink|prev|next|icon|apple-touch-icon)[\"'][^>]*>"
    r"|<script[^>]+application/ld\+json[^>]*>",
    re.I | re.S,
)
sys.stdout.reconfigure(encoding="utf-8")
for url in sys.argv[1:]:
    html = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
    head_end = html.find("</head>")
    print(f"\n### {url}")
    for m in RX.finditer(html):
        where = "head" if m.start() < head_end else "BODY"
        print(f"  [{where}] {re.sub(r'\s+', ' ', m.group(0))[:220]}")
