---
name: layout-organization-and-grid
description: Millimetric slide organization, 12-column grid, centering, alignment, and anti-overlap rules on 13.333" x 7.5" LAYOUT_WIDE canvas.
---

# Layout Organization & 12-Column Grid (`13.333" × 7.5"`)

## 1. Canvas & Safe Zone
- **Mandatory Canvas:** Always use `createDeck(PptxGenJS)` (`LAYOUT_WIDE`, `13.333" × 7.5"`). **Never** use `LAYOUT_16x9` (`10" × 5.625"`).
- **Safe Margins:** `x` between `0.80"` and `12.53"` (`contentW = 11.73"`), `y` between `0.60"` and `6.90"`.

## 2. Preventing Text Overlap & Overflow
- Always use `addTextBox(slide, text, opts)` which sets `valign: "top"`, `wrap: true`, `margin: 0` and validates bounds.
- **2-Line Heading Rule:** Any `20–32 pt` heading that can wrap to 2 lines MUST have `h >= 0.85"` and leave at least `0.20"` vertical gap before the body paragraph below it (`body.y >= title.y + title.h + 0.15"`).
- **3-Column Grid Math (within `11.73"`):** `colW = 3.65"`, `gutter = 0.39"` -> `x = 0.80, 4.84, 8.88` (ends at `12.53"`).
- **2-Column Split Math (within `11.73"`):** `colW = 5.65"`, `gutter = 0.43"` -> `x = 0.80, 6.88` (ends at `12.53"`).

## 3. Rhythm & Centering
- Alternate full-bleed covers, asymmetric Rule-of-Thirds splits, native charts + callouts, horizontal rows, and optically centered quote/closing slides (`align: "center"`, `valign: "middle"`).
