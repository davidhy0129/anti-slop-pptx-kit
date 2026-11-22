# `anti-slop-pptx-kit` (v5.0 — PPTX & Editorial PDF Studio Kit)

> **Kit universal de dirección de arte, diseño editorial, narrativa ejecutiva e ingeniería de código para generar presentaciones `.pptx` (`PptxGenJS` / `python-pptx`) y documentos `PDF` (HTML/CSS `@page` / LibreOffice) con acabado de estudio gráfico — jamás hechos con estética genérica de IA.**

Compatible desde el minuto cero con **Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf** y **Gemini CLI**.  
**100% agnóstico de industria:** sirve para *pitch decks*, reportes de junta directiva, propuestas comerciales, documentos ejecutivos en PDF, restaurantes, clubes, SaaS o ERPs.

---

## Qué prohíbe y qué exige `v5.0` (Cero Estética IA)

- **Prohibido dibujar ilustraciones con formas básicas (`triangle`, `trapezoid`, icebergs, embudos):** Las IAs desalinean polígonos y desbordan el texto. Usa componentes matemáticos probados (`renderWaterfallBridge`, `renderSplitColorSwap`, `renderArchitectureGateDiagram`, `renderConsultingColumns`).
- **Cero sombras por defecto de PowerPoint:** Todas las líneas, barras y contenedores son planos y nítidos (`shadow.inherit = False` / `shadow: { type: "none" }`).
- **Cero barras verticales de acento junto al texto** y **cero eyebrows en MAYÚSCULAS** (`DIAGNÓSTICO DE RIESGO`) encima de los títulos.
- **Cero pies de página largos repetidos** (`EMPRESA · TÍTULO · 3 / 10`) en cada diapositiva: solo un número discreto (`03`).
- **Soporte dual PPTX + PDF:** Incluye librería JS (`PptxGenJS`), librería Python (`python-pptx`) y **sistema editorial HTML/CSS `@page` para PDFs** (A4 / Letter / 16:9).
- **Auditor estricto (`scripts/audit-pptx-code.mjs`):** Falla con `exit 1` si el código no importa los templates del kit, si dibuja triángulos/trapecios o barras verticales a mano, si mete eyebrows en mayúsculas o fuentes cliché (`Inter`, `Arial`, `Calibri`, `Roboto`, `Space Grotesk`).

---

## Estructura del Repositorio

- `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` / `.cursor/rules/` — Contratos obligatorios para cualquier agente.
- `skills/` (**8 Skills**):
  - `anti-ai-slop-slides` — Purga estructural, prohibición de polígonos DIY, sombras, barras laterales y eyebrows.
  - `slide-grid-typography` — Retícula 16:9 (Suiza / Tercios), escala 5x–10x y pares tipográficos reales.
  - `slide-color-pacing` — Regla 80/10/10 y 60/30/10, 13 paletas HEX verificadas, rampas de opacidad y ritmo oscuro/claro.
  - `data-viz-hero-metrics` — Matriz de selección de gráficos (*Waterfall*, *Single-Focus Bars*, *Dot-Matrix*, *Milestone Curve*) y regla `<2 segundos`.
  - `editorial-imagery-motifs` — Fotos a sangre sin *efecto pegote*, B&N 0% saturación, *Split Color Swap*, vectores y compuerta de 5 preguntas.
  - `narrative-storytelling-decks` — SCQA, Pirámide de Minto, Regla 5×5 / 6×6, *Keyword Bolding*, *Action Titles* y *Speaker Notes*.
  - `pptx-code-architecture` — Arquitectura modular `PptxGenJS` / `python-pptx` y QA visual headless.
  - `editorial-pdf-design` — Diseño de PDFs ejecutivos, reportes, propuestas y exportación limpia 16:9 / A4 / Letter.
- `templates/`:
  - `pptxgenjs-studio-kit.mjs` (16 arquetipos planos sin sombras + 13 paletas + `speakerNotes`)
  - `python_pptx_studio.py` (paridad completa en Python con `shadow.inherit = False`)
  - `editorial-pdf-studio.html` (plantilla HTML/CSS `@page` lista para imprimir/exportar a PDF)
- `references/` — Planos por tipo de deck, sistemas de color/tipografía y flujos de prompts **AC-IOC**.
- `agents/` (**5 Roles**), `workflows/` (**3 Flujos**), `prompts/`, `examples/` y `scripts/`.

---

## Instalación en 1 comando

### Windows (PowerShell)
```powershell
Remove-Item -Recurse -Force "$env:TEMP\anti-slop-pptx-kit" -ErrorAction SilentlyContinue
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git "$env:TEMP\anti-slop-pptx-kit"
& "$env:TEMP\anti-slop-pptx-kit\scripts\install.ps1" -Target all -Scope project -Force
```

### macOS / Linux (Bash)
```bash
rm -rf /tmp/anti-slop-pptx-kit
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git /tmp/anti-slop-pptx-kit
bash /tmp/anti-slop-pptx-kit/scripts/install.sh --target all --scope project --force
```
