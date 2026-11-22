# Claude Code Instructions — `anti-slop-pptx-kit` v5.0

@AGENTS.md

## Execution Protocol
1. Read `AGENTS.md` and the relevant `skills/*/SKILL.md` + `references/*.md` before writing a single line of deck or PDF code.
2. You MUST import `templates/pptxgenjs-studio-kit.mjs` (Node), `templates/python_pptx_studio.py` (Python), or `templates/editorial-pdf-studio.html` (PDF). Never hand-roll custom polygon diagrams (`triangle`/`trapezoid` icebergs), drop-shadowed shapes, vertical accent bars, uppercase eyebrows, or repeated footer banners.
3. Coordinate specialized reviews using `agents/`:
   - `agents/deck-narrative-strategist.md`
   - `agents/slide-art-director.md`
   - `agents/data-viz-specialist.md`
   - `agents/pptx-code-builder.md`
   - `agents/visual-slide-qa.md`
4. Run `node scripts/audit-pptx-code.mjs .` (must exit `0`) and visually verify rendered PNG/PDF pages before reporting completion.
