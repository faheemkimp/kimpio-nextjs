#!/usr/bin/env bash
# Local SEO/routing smoke test for the redesigned site.
# Usage: bash scripts/audit/check_local.sh [base_url]
set -u
BASE="${1:-http://localhost:3005}"
cd "$(dirname "$0")/../.."

for i in $(seq 1 15); do curl -s -o /dev/null "$BASE/" && break; sleep 2; done

echo "== Head tags on /"
python -I scripts/audit/head_tags.py "$BASE/" | grep -E "article:|canonical|robots"

echo "== Routing"
check() { printf "%-28s %s\n" "$1" "$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$BASE$1")"; }
check "/"
check "/pricing"
check "/pricing/"
check "/custom-logo/"
check "/robots.txt"
check "/sitemap_index.xml"
check "/?s=design"

echo "== Proxied page title (should be the live WordPress title)"
curl -s "$BASE/pricing/" | grep -o "<title>[^<]*</title>"
echo "== H1 count on /"
curl -s "$BASE/" | grep -o "<h1" | wc -l
