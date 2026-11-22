# Claude Code Instructions — `anti-slop-pptx-kit`

@AGENTS.md

## Agent Delegation & Verification
- Load relevant `SKILL.md` files from `skills/` or `.claude/skills/`.
- Delegate multi-role deck creation or overhauls across `agents/`:
  - `agents/deck-narrative-strategist.md`
  - `agents/slide-art-director.md`
  - `agents/data-viz-specialist.md`
  - `agents/pptx-code-builder.md`
  - `agents/visual-slide-qa.md`
- Always run `node scripts/audit-pptx-code.mjs .` and verify rendered slide output before finishing.
