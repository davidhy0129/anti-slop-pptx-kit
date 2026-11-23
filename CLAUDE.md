# Claude Code Instructions — `anti-slop-pptx-kit` v16.0

@AGENTS.md

## Execution Protocol
1. **Start with `agents/orchestrator.md`** and run the 6-phase multi-agent pipeline (`skills/orchestration-pipeline/SKILL.md`). Never jump straight into coding without Narrative, Art Direction, Colorimetry/WCAG, Typography, Imagery, and Layout Organization plans.
2. **Use `helpers/pptx-primitives.mjs`:** `createDeck()`, `addTextBox()`, `addFlatShape()`, `addTranslucentAccent()`, `assertContrast()`, `renderSvgIconsToPng()`, and `cleanChartOptions()`.
3. **Pass BOTH release gates before delivering:**
   - `node scripts/audit-pptx-code.mjs .` (`exit 0`)
   - `node scripts/validate-pptx.mjs <output.pptx>` (`exit 0`)
