"""Report whether key SEO tags sit inside <head> or leak into <body> on live pages.

Usage: python -I scripts/audit/head_position.py <url> [<url> ...]
Browsers (and Google) treat <link rel=canonical>/<meta> after the first body
content as body elements; Google ignores canonical/robots outside <head>.
"""
import re
import sys
from urllib.request import Request, urlopen

TAGS = {
    "canonical": r"<link[^>]+rel=[\"']canonical[\"'][^>]*>",
    "description": r"<meta[^>]+name=[\"']description[\"'][^>]*>",
    "og:title": r"<meta[^>]+property=[\"']og:title[\"'][^>]*>",
    "og:image": r"<meta[^>]+property=[\"']og:image[\"'][^>]*>",
    "twitter:card": r"<meta[^>]+name=[\"']twitter:card[\"'][^>]*>",
    "schema": r"<script[^>]+application/ld\+json[^>]*>",
}
sys.stdout.reconfigure(encoding="utf-8")
for url in sys.argv[1:]:
    html = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
    head_end = html.find("</head>")
    body_start = re.search(r"<body\b", html)
    body_start = body_start.start() if body_start else -1
    print(f"\n{url}  </head>@{head_end}  <body>@{body_start}")
    for name, rx in TAGS.items():
        hits = [m.start() for m in re.finditer(rx, html, re.I)]
        where = ["head" if h < head_end else "BODY" for h in hits]
        sample = re.search(rx, html, re.I)
        print(f"  {name:13} {list(zip(hits, where)) or 'MISSING'}  {sample.group(0)[:110] if sample else ''}")
