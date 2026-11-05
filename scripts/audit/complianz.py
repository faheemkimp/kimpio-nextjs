"""Print the Complianz cookie-consent config object embedded in a live page.

Usage: python -I scripts/audit/complianz.py <url>
"""
import json
import re
import sys
from urllib.request import Request, urlopen

html = urlopen(Request(sys.argv[1], headers={"User-Agent": "Mozilla/5.0 Chrome/130 KimpSEOBaseline"}), timeout=60).read().decode("utf-8", "replace")
m = re.search(r"var complianz = (\{.*?\});\s*\n", html, re.S)
cfg = json.loads(m.group(1))
keep = {k: v for k, v in cfg.items() if not isinstance(v, str) or len(v) < 200}
for k in ("css_file", "page_links", "banner"):
    keep.pop(k, None)
sys.stdout.reconfigure(encoding="utf-8")
print(json.dumps(keep, indent=1)[:5000])
print("GTM consent default present:", bool(re.search(r"gtag\(\s*['\"]consent['\"]\s*,\s*['\"]default", html)))
