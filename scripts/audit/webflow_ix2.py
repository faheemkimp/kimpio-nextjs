"""Summarise Webflow IX2 interactions (triggers, actions, easings, durations) from a saved bundle.

Usage: python -I scripts/audit/webflow_ix2.py <dir with script_*.js + index.html>
"""
import glob
import json
import os
import re
import sys
from collections import Counter

d = sys.argv[1]
sys.stdout.reconfigure(encoding="utf-8")
blob = ""
for f in sorted(glob.glob(os.path.join(d, "script_*.js"))):
    s = open(f, encoding="utf-8", errors="replace").read()
    start = s.find('Webflow.require("ix2").init(')
    if start != -1:
        # Minified config uses unquoted keys ({eventTypeId:"..."}); quote them so the regexes below match.
        blob = re.sub(r"([{,])([A-Za-z_$][\w$]*):", r'\1"\2":', s[start:])
        print("ix2 config in", os.path.basename(f))
        break

events = Counter(re.findall(r'"eventTypeId":"([A-Z_]+)"', blob))
print("\nTRIGGERS (eventTypeId):")
for k, v in events.most_common():
    print(f"  {v:4} {k}")

actions = Counter(re.findall(r'"actionTypeId":"([A-Z_]+)"', blob))
print("\nEFFECTS (actionTypeId):")
for k, v in actions.most_common():
    print(f"  {v:4} {k}")

eases = Counter(re.findall(r'"easing":"([a-zA-Z]*)"', blob))
print("\nEASINGS:", eases.most_common(12))
durs = Counter(int(x) for x in re.findall(r'"duration":(\d+)', blob))
print("DURATIONS ms:", sorted(durs.items())[:25])
delays = Counter(int(x) for x in re.findall(r'"delay":(\d+)', blob))
print("DELAYS ms:", sorted(delays.items())[:25])

# Scroll-scrubbed interactions: continuous parameter groups tied to scroll position
print("\ncontinuousParameterGroups (scroll-scrubbed timelines):", blob.count('"continuousParameterGroups"'))
print("smoothing values:", Counter(re.findall(r'"smoothing":(\d+)', blob)).most_common())
print("scroll offsets:", Counter(re.findall(r'"scrollOffsetValue":(\d+)', blob)).most_common(8))
print("transform values sample (y moves):", Counter(re.findall(r'"yValue":(-?\d+)', blob)).most_common(10))
print("scale values:", Counter(re.findall(r'"xValue":(0\.\d+|1\.\d+)', blob)).most_common(8))
print("opacity values:", Counter(re.findall(r'"value":(0(?:\.\d+)?|1)\b', blob)).most_common(6))
print("units:", Counter(re.findall(r'"(?:x|y)Unit":"([A-Za-z%]+)"', blob)).most_common())

html = open(os.path.join(d, "index.html"), encoding="utf-8", errors="replace").read()
print("\nSTRUCTURE (section classes):")
for c in re.findall(r'<section[^>]+class="([^"]+)"', html)[:40]:
    print("  ", c[:110])
print("\nheadings:")
for lvl, txt in re.findall(r"<h([1-3])[^>]*>(.*?)</h\1>", html, re.S)[:30]:
    print(f"  h{lvl}:", re.sub(r"<[^>]+>|\s+", " ", txt).strip()[:100])
print("\nother motion tech in HTML:")
print("  rive canvases:", len(re.findall(r"rive", html, re.I)), " lottie:", len(re.findall(r"lottie", html, re.I)),
      " video:", len(re.findall(r"<video", html)), " spline:", len(re.findall(r"spline", html, re.I)))
print("  css transitions inline:", Counter(re.findall(r"transition:\s*([a-z-]+)", html)).most_common(6))
print("  styles with will-change/transform3d:", len(re.findall(r"translate3d|will-change", html)))
print("  smooth scroll css (scroll-behavior/lenis):", len(re.findall(r"scroll-behavior|lenis", html, re.I)))
