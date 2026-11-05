"""Fetch a site's main stylesheet and print rules for given class-name patterns.

Usage: python -I scripts/audit/css_rules.py <saved index.html> <class_regex> [max_rules]
"""
import re
import sys
from urllib.request import Request, urlopen

html = open(sys.argv[1], encoding="utf-8", errors="replace").read()
rx = re.compile(sys.argv[2])
limit = int(sys.argv[3]) if len(sys.argv) > 3 else 60
sys.stdout.reconfigure(encoding="utf-8")
for href in re.findall(r'<link[^>]+href="([^"]+\.css[^"]*)"', html):
    css = urlopen(Request(href, headers={"User-Agent": "Mozilla/5.0 Chrome/130"}), timeout=60).read().decode("utf-8", "replace")
    print("stylesheet:", href[:100], len(css))
    print("fonts:", sorted(set(re.findall(r"font-family:\s*([^;}]+)", css)))[:12])
    print("root vars:", re.findall(r"--[\w-]+:\s*[^;]+", css)[:40])
    n = 0
    for sel, body in re.findall(r"([^{}]+)\{([^{}]*)\}", css):
        if rx.search(sel) and n < limit:
            print(f"  {sel.strip()[:80]} {{ {body.strip()[:220]} }}")
            n += 1
