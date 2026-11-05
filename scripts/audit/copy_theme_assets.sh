#!/usr/bin/env bash
# Copy brand assets reused from the WordPress theme (kimpan_2025) into the Next.js app.
# Usage: bash scripts/audit/copy_theme_assets.sh "<path to kimpan_2025>"
set -euo pipefail
cd "$(dirname "$0")/../.."
THEME="$1/assets"
mkdir -p src/fonts public/images/brand public/images/home public/images/clients

for w in regular medium semibold bold; do
  cp "$THEME/css/fonts/gilroy-$w-webfont.woff2" src/fonts/
done
cp "$THEME/images/favicon.png" public/favicon.png

copy() { # copy <src-relative-to-images> <dest-dir>
  if [ -f "$THEME/images/$1" ]; then cp "$THEME/images/$1" "$2/"; else echo "missing: $1"; fi
}
copy kimp_logo_white.svg public/images/brand
copy KimpLogo.svg public/images/brand
copy kimpch.webp public/images/home
copy new-banner-img-left.webp public/images/home
copy yspace-color.png public/images/brand
copy microsoft.png public/images/brand
copy sales-team.png public/images/home
for f in gdimg.png Illustrationimg.png branding.png videoService.png Landing-Page-showcasa.png \
         cta-character.png steptowppl.png support_bg_new.png google_logo.svg trust_stars.svg \
         clutchco_logo.svg group-star.svg; do
  copy "$f" public/images/home
done
for f in abboott.svg aldi.svg client_logo3.svg client_logo4.svg client_logo5.svg client_logo6.svg \
         client_logo7.svg client_logo8.svg client_logo9.svg targus.svg; do
  copy "$f" public/images/clients
done
ls -la src/fonts public/images/brand public/images/home public/images/clients
