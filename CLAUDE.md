# Claude Code Instructions — `anti-slop-pptx-kit` v8.0

@AGENTS.md

## Execution Protocol
1. Run Step 0 (`skills/domain-art-direction-router/SKILL.md`): craft a bespoke Creative Brief (color harmony, 2-font pairing, imagery/chart plan, unique per-slide layouts) tailored directly to the prompt — **never** reuse a rigid template across different topics.
2. Use `helpers/pptx-primitives.mjs` / `helpers/pptx_primitives.py` for shadow-free flat shapes, SVG icon URIs, and clean native charts, or `templates/editorial-pdf-studio.html` for `@page` PDFs.
3. Run `node scripts/audit-pptx-code.mjs .` (must exit `0`) before reporting completion.
