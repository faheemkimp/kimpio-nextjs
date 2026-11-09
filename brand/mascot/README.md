# Kimp Hero mascot: brand rules

**Master render:** `public/images/mascot/fly-hero.webp` (1448 × 1086, transparent).
This is the one official character. His face, head, body, build, suit, cape and
flying pose never change. The locked traits are listed in `character.json`.

## The rule

Never send the character to an image model to redraw him. Every model, with or
without a mask, `input_fidelity: high` or "do not change him" prompts, comes back
with a slightly different face, head size, arms or knee pads.

Instead, each inner page gets **one page-themed prop**, generated on its own and
composited over his free left fist (`propAnchor` in `character.json`). The
character pixels are copied 1:1 from the master, so he is identical everywhere.

| Page | Mascot | File |
| --- | --- | --- |
| /graphic-design-services/ | master render (approved, keep) | `public/images/mascot/fly-hero.webp` |
| /video-design-services/ | camera + clapperboard (approved, keep) | `public/images/mascot/fly-video-camera.webp` |
| /pricing/ | dollar coin + banknotes (approved, keep) | `public/images/mascot/fly-pricing-dollar.webp` |
| /kimp360-platform/ | tablet with project dashboard (locked composite) | `public/images/mascot/inner/kimp360.webp` |
| /reviews/ | 5-star trophy (locked composite) | `public/images/mascot/inner/review.webp` |
| /compare-service/ | balance scale tipped toward a star (locked composite) | `public/images/mascot/inner/compare.webp` |
| /graphic-design-services/ review panel | leaning on a 5-star review card, thumbs-up (owner-supplied transparent PNG, served unoptimized) | `public/images/mascot/review-five-star.png` |

The three pages marked "approved, keep" use mascots the owner signed off on. Do not
replace them. The locked-composite method below is for **new** inner pages.
Cached props for alternative versions of those pages (palette, clapperboard,
coin) are in `brand/mascot/props/` if they are ever wanted.

## Adding or changing a page mascot

1. Add an entry to `ITEMS` in `scripts/generate-inner-mascots.py`: the prop
   description, plus `width`, `angle`, `dx` and `dy` for placement.
2. Run `python scripts/generate-inner-mascots.py <page>`. It needs
   `OPENAI_API_KEY` in `.env`. The raw prop is cached in `brand/mascot/props/`.
3. To change only the placement, edit the numbers and run with `--reuse`. That
   re-composites the cached prop without calling the API.
4. Pass `mascot={{ src: "/images/mascot/inner/<page>.webp", width: 1448, height: 1086 }}`
   to `InnerHero`.
