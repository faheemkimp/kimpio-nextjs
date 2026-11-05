#!/usr/bin/env bash
# Extract the visible content outline of live pages into content-audit/<slug>.txt
# Usage: bash scripts/audit/extract_pages.sh pricing about-us ...
set -u
cd "$(dirname "$0")/../.."
for slug in "$@"; do
  out="content-audit/${slug//\//_}.txt"
  python -I scripts/seo-baseline/extract_text.py "https://www.kimp.io/${slug}/" "$out"
  sleep 2
done
