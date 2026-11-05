"""List third-party integrations, IDs and verification tags found in a live page's HTML.

Usage: python -I scripts/seo-baseline/detect_integrations.py <url>
"""
import re
import sys
from collections import Counter
from urllib.request import Request, urlopen

html = urlopen(Request(sys.argv[1], headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
PATTERNS = [
    r"GTM-[A-Z0-9]{5,}", r"\bG-[A-Z0-9]{8,}", r"\bAW-[0-9]{6,}", r"\bUA-[0-9]+-[0-9]+",
    r"fbq\(\s*['\"]init['\"]\s*,\s*['\"][0-9]+", r"clarity\.ms/tag/[a-z0-9]+", r"hotjar[^\"' ]{0,30}",
    r"client\.crisp\.chat[^\"' ]*", r"CRISP_WEBSITE_ID[^;]{0,60}", r"hyros[^\"' ]{0,60}", r"ahrefs[^\"' ]{0,60}",
    r"snap\.licdn\.com[^\"' ]*", r"_linkedin_partner_id\s*=\s*\"?[0-9]+", r"analytics\.tiktok\.com[^\"' ]*",
    r"redditstatic[^\"' ]*", r"bat\.bing\.com[^\"' ]*", r"js\.stripe\.com[^\"' ]*", r"calendly[^\"' ]{0,40}",
    r"recaptcha[^\"' ]{0,40}", r"wp-rocket|rocket-lazy[a-z-]*", r"cdn-cgi/[^\"' ]{0,40}",
    r"<meta name=\"(?:google-site-verification|msvalidate\.01|facebook-domain-verification|p:domain_verify|yandex-verification)\"[^>]+>",
    r"wp-content/plugins/[a-z0-9_-]+", r"<link[^>]+rel=['\"](?:preconnect|dns-prefetch)['\"][^>]+>",
    r"youtube\.com/embed/[A-Za-z0-9_-]+", r"vimeo\.com/[0-9]+", r"wistia[^\"' ]{0,30}", r"lottie[^\"' ]{0,30}",
    r"fonts\.googleapis\.com/css[^\"' ]*", r"use\.typekit[^\"' ]*", r"font-family:\s*['\"]?[A-Za-z ]+",
]
c = Counter()
for p in PATTERNS:
    for m in re.findall(p, html, re.I):
        c[m[:160]] += 1
sys.stdout.reconfigure(encoding="utf-8")
print("bytes", len(html))
for k, v in c.most_common():
    print(f"{v:4} {k}")
