"""Reorder the plan so URL + SEO sections come first, renumber sections/links, rebuild the contents list.

Usage: python -I scripts/audit/reorder_plan.py <in.md> <out.md>
"""
import re
import sys

OLD_TO_NEW = {1: 7, 2: 4, 3: 1, 4: 2, 5: 3, 6: 5, 7: 6, 8: 8, 9: 9, 10: 10, 11: 11}

text = open(sys.argv[1], encoding="utf-8").read()
parts = re.split(r"(?m)^(?=## )", text)
header, sections = parts[0], parts[1:]
numbered, appendices = {}, []
for s in sections:
    m = re.match(r"## (\d+)\. ", s)
    if m:
        numbered[int(m.group(1))] = s
    elif not s.startswith("## Contents"):
        appendices.append(s)


def renumber(s):
    # Headings: "## 3. " and "### 3.1 "
    s = re.sub(r"(?m)^## (\d+)\. ", lambda m: f"## {OLD_TO_NEW[int(m.group(1))]}. ", s)
    s = re.sub(r"(?m)^### (\d+)\.(\d+) ", lambda m: f"### {OLD_TO_NEW[int(m.group(1))]}.{m.group(2)} ", s)
    # Cross references: "[Section 5, issue 1](#5-...)" / "Section 10" / "(#4-...)"
    s = re.sub(r"Section (\d+)\b", lambda m: f"Section {OLD_TO_NEW[int(m.group(1))]}", s)
    s = re.sub(r"\(#(\d+)-", lambda m: f"(#{OLD_TO_NEW[int(m.group(1))]}-", s)
    return s


body = [renumber(numbered[old]) for old, _ in sorted(OLD_TO_NEW.items(), key=lambda kv: kv[1])]
appendices = [renumber(a) for a in appendices]
header = renumber(header).replace("[Section 10]", "[Section 10]")


def anchor(title):
    a = title.strip().lower()
    a = re.sub(r"[^\w\- ]", "", a)
    return a.replace(" ", "-")


toc = ["## Contents\n"]
for s in body + appendices:
    title = s.splitlines()[0][3:]
    if title[0].isdigit():
        toc.append(f"{title.split('.')[0]}. [{title.split('. ', 1)[1]}](#{anchor(title)})")
    else:
        toc.append(f"- [{title}](#{anchor(title)})")
toc_text = "\n".join(toc) + "\n\n---\n\n"

out = header + toc_text + "".join(body) + "".join(appendices)
open(sys.argv[2], "w", encoding="utf-8").write(out)
print(re.findall(r"(?m)^## .*", out))
