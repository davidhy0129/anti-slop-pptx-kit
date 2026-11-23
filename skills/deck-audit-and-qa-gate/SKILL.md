---
name: deck-audit-and-qa-gate
description: Mandatory release gate for every presentation generated with anti-slop-pptx-kit. Requires passing audit-pptx-code.mjs, validate-pptx.mjs, and the 10-point qualitative checklist.
---

# Deck Audit & QA Release Gate

Do **NOT** deliver any `.pptx` until **both** automated scripts pass with `exit 0`:

1. **Static Code & Anti-Slop Audit:**
   ```bash
   node scripts/audit-pptx-code.mjs .
   ```
   Checks: `createDeck`/`LAYOUT_WIDE` (bans `LAYOUT_16x9`), `assertContrast()` usage, `addTextBox()` usage, real imagery (`addImage` with `.jpg`/`.png`), zero `data:image/svg+xml`, zero cliché fonts/palettes, zero mojibake, zero AI eyebrows/footers.

2. **Compiled `.pptx` XML Geometry & Overlap Validation:**
   ```bash
   node scripts/validate-pptx.mjs <output.pptx>
   ```
   Checks: exact `13.333" × 7.5"` slide dimensions, zero out-of-bounds shapes/text/charts, text-height overflow risk, and overlapping sibling text boxes.

3. **Visual & Editorial Check:**
   - Render slides to PNG/PDF if LibreOffice or PowerPoint is available and inspect visually.
   - Verify no consecutive slides repeat the same layout, all icons are crisp PNGs (zero `[X]`), and all photos use `sizing: { type: "cover" }`.
