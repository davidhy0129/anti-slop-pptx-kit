# Workflow: Visual QA Render & Validation Loop (`v17.0`)

1. **Export PDF + Slide PNGs from HTML:**
   ```bash
   node scripts/render-deck-pdf-and-pngs.mjs deck.html <Deck>.pdf qa-slides
   ```
2. **Inspect every `qa-slides/slide-*.png`** with `read_file` (or image viewer) to verify:
   - Zero clipped headlines, zero overlapping text, zero stretched images, zero broken `[X]` icons, zero bordered card grids, and strong contrast.
3. **Validate the compiled `.pptx`:**
   ```bash
   node scripts/audit-pptx-code.mjs .
   node scripts/validate-pptx.mjs <Deck>.pptx
   ```
4. Fix any visual or automated error and re-run before delivering.
