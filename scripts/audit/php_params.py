"""Inventory $_GET params, setcookie() names and JS cookie writes across the WP theme.

Usage: python -I scripts/audit/php_params.py <theme_dir>
"""
import os
import re
import sys
from collections import Counter, defaultdict

root = sys.argv[1]
gets, cookies, where = Counter(), Counter(), defaultdict(set)
for dp, dn, fn in os.walk(root):
    if any(x in dp for x in ("vendor", "node_modules", ".git", "old", "backup")):
        continue
    for f in fn:
        if not f.endswith((".php", ".js")) or f.endswith(".min.js"):
            continue
        p = os.path.join(dp, f)
        s = open(p, encoding="utf-8", errors="replace").read()
        rel = os.path.relpath(p, root)
        for m in re.findall(r"\$_GET\[\s*['\"]([A-Za-z0-9_-]+)['\"]", s):
            gets[m] += 1
            where[m].add(rel)
        for m in re.findall(r"setcookie\(\s*['\"]([A-Za-z0-9_-]+)['\"]", s):
            cookies[m] += 1
            where["cookie:" + m].add(rel)
        for m in re.findall(r"document\.cookie\s*=\s*['\"]?([A-Za-z0-9_-]+)=", s):
            cookies["js:" + m] += 1
            where["cookie:js:" + m].add(rel)
print("== $_GET params")
for k, v in gets.most_common(60):
    print(f"{v:4} {k:28} {sorted(where[k])[:4]}")
print("== cookies")
for k, v in cookies.most_common(40):
    print(f"{v:4} {k:28} {sorted(where['cookie:' + k])[:4]}")
