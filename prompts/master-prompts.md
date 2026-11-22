# Prompts Maestros (v7.0 — PPTX & PDF Editorial)

Copia y pega cualquiera de estos prompts en **Antigravity, Claude Code, Codex, Cursor o Gemini CLI** dentro de un proyecto con `anti-slop-pptx-kit` instalado.

---

## 1. Crear Presentación PPTX Adaptada a tu Industria (Español)
```markdown
Lee `AGENTS.md`, `skills/domain-art-direction-router/SKILL.md`, `skills/graphic-design-fundamentals/SKILL.md` y `skills/slide-color-pacing/SKILL.md`.

Quiero crear una presentación PPTX profesional (16:9) sobre: **[TEMA, EMPRESA/INDUSTRIA, PÚBLICO Y OBJETIVO]**.

Instrucciones obligatorias:
1. **Paso 0 (Dirección de arte según industria):** Clasifica la industria del prompt y elige en `references/industry-design-matrix.md` la paleta de color (teoría del color + alto contraste), el par tipográfico (máximo 2 fuentes), los íconos y el estilo de gráficos adecuados.
2. **Usa los templates del kit:** Importa `templates/pptxgenjs-studio-kit.mjs` (o `templates/python_pptx_studio.py`). Prohibido dibujar polígonos a mano (`triangle`/`trapezoid`), barras verticales con sombra, eyebrows en MAYÚSCULAS o pies repetidos `N / 10`.
3. **Legibilidad y composición viva:** Cuerpo mínimo `14–16pt`, tablas `13pt+`, títulos `28–40pt`, gráficos nativos editables de PowerPoint (`addChart`), íconos vectoriales reales, alto contraste y composición balanceada/centrada (cero slides vacías).
4. **Narrativa SCQA:** Títulos con conclusión (*Action Titles*) y detalle denso en `speakerNotes`.
5. **Auditoría:** Ejecuta `node scripts/audit-pptx-code.mjs .` hasta obtener **exit 0** antes de entregar el `.pptx`.
```

## 2. Crear Documento / Reporte / Propuesta en PDF Editorial (Español)
```markdown
Lee `AGENTS.md` y `skills/editorial-pdf-design/SKILL.md`, junto con `skills/graphic-design-fundamentals/SKILL.md`.
Usa `templates/editorial-pdf-studio.html` como base para generar un PDF editorial profesional sobre: **[TEMA, CLIENTE Y OBJETIVO]**.
- Adapta la paleta de `references/industry-design-matrix.md` al sector.
- Usa `@page` print CSS con `print-color-adjust: exact`, `break-inside: avoid` en tablas/KPIs, gráficos `<svg>` nítidos, numeración limpia en pie de página y cero sombras genéricas.
```

## 3. Studio-Grade Industry-Aware PPTX Prompt (English)
```markdown
Read `AGENTS.md`, `skills/domain-art-direction-router/SKILL.md`, and `skills/graphic-design-fundamentals/SKILL.md`.
Build a 16:9 `.pptx` using `templates/pptxgenjs-studio-kit.mjs` (or `templates/python_pptx_studio.py`) for: **[TOPIC / INDUSTRY / AUDIENCE]**.
- First select the matching palette and 2-font system from `references/industry-design-matrix.md`.
- Enforce `>=14pt` body copy, high-contrast ink, native editable PowerPoint charts (`addChart`), crisp SVG icons, balanced compositions, SCQA Action Titles, and `speakerNotes` separation.
- Zero drop shadows, zero hand-drawn triangles/trapezoids, zero vertical accent stripes, zero ALL-CAPS eyebrows.
- Pass `node scripts/audit-pptx-code.mjs .` (`exit 0`).
```
