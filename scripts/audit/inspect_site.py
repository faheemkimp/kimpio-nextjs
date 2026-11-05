"""Inspect a reference site's platform, scripts and animation libraries.

Usage: python -I scripts/audit/inspect_site.py <url> <out_dir>
Saves the HTML plus each same-site/known-CDN script into out_dir and prints a summary.
"""
import os
import re
import sys
from collections import Counter
from urllib.parse import urljoin
from urllib.request import Request, urlopen

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36"}
url, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
html = urlopen(Request(url, headers=UA), timeout=60).read().decode("utf-8", "replace")
open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(html)
sys.stdout.reconfigure(encoding="utf-8")
print("html bytes:", len(html))

gen = re.findall(r'<meta[^>]+name="generator"[^>]+content="([^"]+)"', html, re.I)
print("generator:", gen)
print("platform hints:", Counter(m.lower() for m in re.findall(r"webflow|framer|wix|squarespace|shopify|wp-content|__next|nuxt|gatsby|elementor", html, re.I)).most_common())

scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
print("\nscripts:")
for s in scripts:
    print("  ", s)

LIBS = r"gsap|ScrollTrigger|ScrollSmoother|SplitText|lenis|locomotive|barba|swup|lottie|three|framer-motion|motion|aos|swiper|splide|rive|spline|anime\.js|typed|scrollreveal|ix2|webflow\.js"
print("\nanimation library mentions in HTML:", Counter(m.lower() for m in re.findall(LIBS, html, re.I)).most_common())
print("data-attributes:", Counter(re.findall(r"\b(data-(?:w-id|animation|aos|scroll|speed|lenis|split|reveal|parallax)[a-z-]*)", html)).most_common(15))
print("css classes w/ anim words:", Counter(re.findall(r'class="[^"]*\b((?:reveal|fade|split|marquee|parallax|sticky|pin|stagger|line|char|word)[a-z_-]*)', html)).most_common(15))

print("\ndownloading scripts:")
for i, s in enumerate(scripts):
    full = urljoin(url, s)
    try:
        body = urlopen(Request(full, headers=UA), timeout=60).read().decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        print("  fail", full, e)
        continue
    name = f"script_{i:02d}.js"
    open(os.path.join(out, name), "w", encoding="utf-8").write(body)
    found = Counter(m.lower() for m in re.findall(LIBS, body, re.I)).most_common(8)
    print(f"  {name} {len(body):>8}  {full[:90]}  {found}")
