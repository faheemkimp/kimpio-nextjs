#!/usr/bin/env bash
# Screenshot a page with headless Chrome at desktop and mobile widths.
# Usage: bash scripts/audit/screenshot.sh <url> <out_dir> [height]
set -eu
URL="$1"; OUT="$2"; H="${3:-1800}"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
mkdir -p "$OUT"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --window-size=1440,"$H" --screenshot="$(cygpath -w "$OUT")\\desktop.png" "$URL" 2>/dev/null
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --window-size=390,"$H" --screenshot="$(cygpath -w "$OUT")\\mobile.png" "$URL" 2>/dev/null
ls -la "$OUT"
