# Gemini CLI & Antigravity Instructions — `anti-slop-pptx-kit`

@AGENTS.md

## Execution Rules
- Treat `skills/*/SKILL.md` as authoritative specifications for slide art direction, narrative, data visualization, and programmatic PPTX code.
- Never deliver a `.pptx` without running `node scripts/audit-pptx-code.mjs .` and completing a visual render QA check (`workflows/visual-qa-render-loop.md`) when LibreOffice/renderer tools are available.
