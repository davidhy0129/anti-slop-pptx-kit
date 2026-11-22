# Prompts Maestros para Crear Presentaciones Sin Estética de IA

Copia y pega cualquiera de estos prompts en **Antigravity, Claude Code, Codex, Cursor o Gemini CLI** dentro de un proyecto con `anti-slop-pptx-kit` instalado.

---

## 1. Crear una Presentación Nueva de Nivel Estudio (Español)
```markdown
Lee `AGENTS.md` y sigue `workflows/create-deck-from-scratch.md` junto con las skills `anti-ai-slop-slides`, `slide-grid-typography`, `slide-color-pacing`, `data-viz-hero-metrics` y `pptx-code-architecture`.

Quiero crear una presentación PPTX profesional (16:9) sobre: **[DESCRIBE TU TEMA, PÚBLICO Y OBJETIVO]**.

Reglas obligatorias:
1. Cero estética de IA: nada de degradados morado-azul, nada de cajas glassmorphism, nada de píldoras `●` ni emojis en los títulos, nada de fuentes `Inter`/`Arial`/`Space Grotesk`, y nada de repetir tarjetas idénticas de 3 columnas.
2. Usa **Action Titles** (conclusiones reales) con resaltado de acento solo en la frase clave (*inline turn highlight*) y máximo 1 idea por slide.
3. Aplica una paleta de estudio 60-30-10 con rampa de opacidad (`100%/60%/30%/10%`), alternando slides oscuros mate y slides claros cálidos (`#F5F4F0`), con `35–55%` de espacio negativo.
4. Para datos: usa al menos 1 slide de **Hero KPI gigante**, gráficos limpios sin ejes/cuadrículas (Dot-Matrix, barras con etiqueta directa o curva de hitos) y tablas sin líneas verticales.
5. Genera el código modular (`PptxGenJS` o `python-pptx`) con `Slide Master` y tokens centralizados, audítalo con `node scripts/audit-pptx-code.mjs .` y renderiza vista previa si hay herramientas disponibles.
```

## 2. Arreglar un Script / Presentación que "Parece Hecha con IA" (Español)
```markdown
Lee `AGENTS.md` y ejecuta `workflows/redesign-existing-pptx.md` sobre este proyecto.
1. Corre primero `node scripts/audit-pptx-code.mjs .` y dime qué síntomas de AI-Slop encontró.
2. Rediseña tipografía, colores (paleta 60-30-10 sin degradados IA), retícula modular 16:9, Action Titles y gráficos limpios siguiendo `skills/anti-ai-slop-slides/SKILL.md` y `skills/data-viz-hero-metrics/SKILL.md`.
3. Vuelve a ejecutar `node scripts/audit-pptx-code.mjs .` y regenera el `.pptx` verificando que no haya desbordamientos de texto.
```

---

## 3. Studio-Grade PPTX Generator Prompt (English)
```markdown
Read `AGENTS.md` and follow `workflows/create-deck-from-scratch.md` using `anti-ai-slop-slides`, `slide-grid-typography`, `slide-color-pacing`, `data-viz-hero-metrics`, and `pptx-code-architecture`.

Build a modular 16:9 `.pptx` generator (`PptxGenJS` or `python-pptx`) for: **[TOPIC / AUDIENCE / GOAL]**.
- Purge all AI clichés (purple-blue gradients, dot+pill eyebrows, heading emojis, glassmorphism boxes, `Inter`/`Arial`/`Space Grotesk`, repetitive 3-card icon grids, bullet walls).
- Use insight-driven Action Titles with inline turn highlighting, 35–55% negative space, 5x–10x display-to-body type contrast, a 60-30-10 palette with 4-step opacity ramps, and alternating matte-dark / warm-off-white slides.
- Strip all chart junk (use Hero KPI breathers, dot-matrix grids, axis-free milestone curves, or direct-labeled horizontal bars).
- Audit with `node scripts/audit-pptx-code.mjs .` and run headless visual QA before finishing.
```
