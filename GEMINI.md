# Gemini CLI & Antigravity Instructions — `anti-slop-pptx-kit` v17.0

@AGENTS.md

## Execution Protocol
- **Follow `agents/orchestrator.md` (6 phases)** and `.agents/rules/anti-slop-pptx.md` (`always_on`).
- **Dual Output Required:** Always generate BOTH `<Deck>.pdf` (from `deck.html` via `node scripts/render-deck-pdf-and-pngs.mjs`, which also emits `qa-slides/*.png`) AND `<Deck>.pptx` (`createDeck(PptxGenJS)` -> `LAYOUT_WIDE` `13.333" × 7.5"`, `addTextBox()`, `assertContrast()`, `renderSvgIconsToPng()`, zero bordered cards).
- **Mandatory Dual Gate:** Pass BOTH `node scripts/audit-pptx-code.mjs .` (`exit 0`) AND `node scripts/validate-pptx.mjs <Deck>.pptx` (`exit 0`) and inspect `qa-slides/*.png` before delivering.
