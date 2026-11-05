"""Dump the visible text outline (headings, paragraphs, links, images) of a live page.

Usage: python -I scripts/seo-baseline/extract_text.py <url> [out.txt]
Used during the content audit so redesigned pages keep the same copy.
"""
import re
import sys
from html.parser import HTMLParser
from urllib.request import Request, urlopen

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130 KimpSEOBaseline"
SKIP = {"script", "style", "noscript", "svg", "head", "template"}
BLOCK = {"h1": "# ", "h2": "## ", "h3": "### ", "h4": "#### ", "h5": "##### ", "h6": "###### ",
         "p": "", "li": "- ", "button": "[btn] ", "summary": "[q] ", "label": "", "td": "| ", "th": "| "}


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.stack, self.buf = [], 0, [], []

    def flush(self):
        t = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if t and self.stack:
            self.out.append(BLOCK.get(self.stack[-1], "") + t)
        elif t:
            self.out.append(t)
        self.buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
            return
        if self.skip:
            return
        if tag in BLOCK or tag in ("div", "section", "header", "footer", "nav", "br", "span"):
            if tag in BLOCK or tag in ("section", "header", "footer", "nav", "div"):
                self.flush()
            if tag in BLOCK:
                self.stack.append(tag)
        if tag == "section":
            cls = a.get("class") or ""
            self.out.append(f"\n<<section {a.get('id') or ''} .{cls[:80]}>>")
        if tag == "a" and a.get("href"):
            self.buf.append(" ")
            self.out.append(f"  [link] {a['href']}")
        if tag == "img":
            self.out.append(f"  [img] {a.get('src') or a.get('data-src')} alt={a.get('alt')!r}")
        if tag == "iframe":
            self.out.append(f"  [iframe] {a.get('src') or a.get('data-src')}")

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
            return
        if self.skip:
            return
        if tag in BLOCK:
            self.flush()
            if self.stack and self.stack[-1] == tag:
                self.stack.pop()
        elif tag in ("div", "section"):
            self.flush()

    def handle_data(self, data):
        if not self.skip:
            self.buf.append(data)


html = urlopen(Request(sys.argv[1], headers={"User-Agent": UA}), timeout=60).read().decode("utf-8", "replace")
p = P()
p.feed(html)
p.flush()
lines = [l for l in p.out if l.strip()]
text = "\n".join(lines)
if len(sys.argv) > 2:
    open(sys.argv[2], "w", encoding="utf-8").write(text)
    print(len(lines), "lines ->", sys.argv[2])
else:
    sys.stdout.reconfigure(encoding="utf-8")
    print(text)
