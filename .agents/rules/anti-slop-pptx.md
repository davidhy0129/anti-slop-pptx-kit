---
trigger: always_on
description: Enforces anti-slop-pptx-kit v17.0 multi-agent workflow, zero bordered cards, LAYOUT_WIDE, WCAG assertContrast, real imagery, and dual PDF + PPTX delivery.
---

# `anti-slop-pptx-kit` v17.0 Mandatory Rules

1. **Follow `agents/orchestrator.md` (6 Phases):** Narrative -> Art Direction/Colorimetry/Typography -> Imagery/PNG Icons -> Layout Organization -> HTML/PDF + PPTX Build -> Dual Audit Gate.
2. **Never Draw Bordered Card Grids:** Use borderless tonal surfaces (`line: { width: 0 }` / CSS `border: none`), translucent background shapes (`82–92%` transparency), and `0.14"` rounded corners (`innerRadius < outerRadius`). Never repeat `1px` separator lines.
3. **Always Deliver Dual Output (`PDF` + `PPTX`):**
   - Build `deck.html` (`13.333in × 7.5in`) and export `<Deck>.pdf` + `qa-slides/*.png` via `node scripts/render-deck-pdf-and-pngs.mjs`.
   - Build `<Deck>.pptx` using `createDeck(PptxGenJS)` (`LAYOUT_WIDE` `13.333" × 7.5"`, NEVER `LAYOUT_16x9`), `addTextBox()` (`valign: "top"`), `assertContrast()`, `renderSvgIconsToPng()`, and real photos (`sizing: { type: "cover" }`).
4. **Mandatory Release Gate:** Pass `node scripts/audit-pptx-code.mjs .` (`exit 0`) AND `node scripts/validate-pptx.mjs <Deck>.pptx` (`exit 0`), and visually inspect `qa-slides/*.png` before replying.
