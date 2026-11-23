# Gemini CLI & Antigravity Instructions — `anti-slop-pptx-kit` v15.0

@AGENTS.md

## Execution Protocol
- Craft bespoke, prompt-driven layouts, color harmonies, real editorial photography, and typography per presentation — never force every deck into one fixed slide template or dark-navy card grid.
- Always initialize with `createDeck(PptxGenJS)` (`LAYOUT_WIDE`, `13.333" × 7.5"`), use `addTextBox()` (`valign: "top"`), verify colors with `assertContrast()`, and render icons with `renderSvgIconsToPng()`.
- Always pass BOTH `node scripts/audit-pptx-code.mjs .` (`exit 0`) AND `node scripts/validate-pptx.mjs <deck.pptx>` (`exit 0`) before delivering.
