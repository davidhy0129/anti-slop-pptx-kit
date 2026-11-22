# `anti-slop-pptx-kit`

> **Kit universal de dirección de arte, diseño editorial, narrativa ejecutiva e ingeniería de código PPTX (`PptxGenJS` / `python-pptx`) para crear presentaciones que parezcan diseñadas por un estudio gráfico profesional — jamás generadas por IA.**

Funciona desde el minuto cero con **Antigravity**, **Claude Code**, **OpenAI Codex**, **Cursor**, **Windsurf** y **Gemini CLI**.  
Es **100% agnóstico de industria**: sirve para *pitch decks* de startups, reportes directivos, propuestas comerciales, restaurantes, clubes, lanzamientos de producto, charlas académicas o cualquier presentación profesional.

---

## ¿Qué problema resuelve?

Las presentaciones generadas por IA se delatan al instante por los mismos clichés:
- Degradados morado-azul genéricos, fondos negros con neón o cajas *glassmorphism*.
- Píldoras con puntico (`● INFORME Q3`) encima de cada título, subtítulos de relleno y emojis en cada línea (`🚀`, `✨`).
- Muros de viñetas (*bullet walls*) o cuadrículas idénticas de 3 tarjetas con íconos en todas las diapositivas.
- Fuentes por defecto (`Inter`, `Arial`, `Roboto`, `Space Grotesk`) sin contraste de escala ni retícula.
- Gráficos saturados de líneas de cuadrícula, leyendas redundantes y bordes por defecto.

**`anti-slop-pptx-kit`** codifica técnicas reales de diseñadores gráficos y estudios de producto (extraídas de Dribbble, Figma Community, Diseño Suizo y creadores especializados en presentaciones) directamente en **skills, agentes, flujos y un auditor automático**.

---

## ¿Qué incluye este kit?

1. **7 Skills especializadas (`skills/`):**
   - `anti-ai-slop-slides` — Purga de clichés IA, *Action Titles*, regla de 1 idea por slide, *inline turn highlighting* y rampas de opacidad (`100%/60%/30%/10%`).
   - `slide-grid-typography` — Retícula modular 16:9 (Suiza / 3×3), escala tipográfica `1920×1080` (`100–190px` display vs `18–24px` cuerpo), alineación estricta a la izquierda, 35–55% espacio negativo y pares tipográficos reales.
   - `slide-color-pacing` — Regla 60-30-10, +10 paletas HEX de estudio verificadas, ritmo alternado oscuro/claro y transiciones de agenda tipo *Morph Spotlight*.
   - `data-viz-hero-metrics` — KPIs gigantes ("1 cifra por slide"), gráficos *Dot-Matrix / Waffle*, curvas Bezier sin ejes, barras con etiqueta directa, líneas de tiempo nodales y tablas limpias.
   - `editorial-imagery-motifs` — Fotos a sangre con *scrim*, máscaras tipográficas (`Merge Shapes`), recortes que rompen bordes, citas con retrato monocromo, callouts tipo CAD/Figma y bloques Mondrian sin espacio.
   - `pptx-code-architecture` — Arquitectura modular para `PptxGenJS` y `python-pptx` (`Slide Master`, tokens de diseño, matemática dinámica de columnas, QA visual headless con LibreOffice -> PDF/PNG).
   - `narrative-storytelling-decks` — Estructuras narrativas para *Pitch*, *Board Review*, *Propuesta Comercial* y *Keynote*, con títulos de acción y narrativa basada en preguntas.
2. **5 Agentes por rol (`agents/`)** (`slide-art-director`, `deck-narrative-strategist`, `data-viz-specialist`, `pptx-code-builder`, `visual-slide-qa`).
3. **3 Workflows (`workflows/`)** (`create-deck-from-scratch`, `redesign-existing-pptx`, `visual-qa-render-loop`).
4. **Auditor automático (`scripts/audit-pptx-code.mjs`)** para revisar scripts `PptxGenJS` / `python-pptx` antes de generar el `.pptx`.
5. **Instaladores en 1 comando (`scripts/install.ps1` y `scripts/install.sh`)**.

---

## Instalación rápida (1 comando)

### Windows (PowerShell)
```powershell
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git "$env:TEMP\anti-slop-pptx-kit"
& "$env:TEMP\anti-slop-pptx-kit\scripts\install.ps1" -Target all -Scope project
```

### macOS / Linux (Bash)
```bash
git clone https://github.com/davidhy0129/anti-slop-pptx-kit.git /tmp/anti-slop-pptx-kit
bash /tmp/anti-slop-pptx-kit/scripts/install.sh --target all --scope project
```

Opciones: `-Target all|antigravity|claude|codex|cursor|gemini` y `-Scope project|global`.

---

## Uso rápido con tu IA

Una vez instalado en tu carpeta de proyecto, pídele a tu agente:
- *"Lee `AGENTS.md` y crea una presentación de 10 slides sobre [tema] usando `workflows/create-deck-from-scratch.md`."*
- *"Rediseña este script de PptxGenJS / python-pptx siguiendo `workflows/redesign-existing-pptx.md` para eliminar cualquier estética de IA."*
- *"Audita este proyecto con `node scripts/audit-pptx-code.mjs .` y ejecuta el loop visual de `workflows/visual-qa-render-loop.md`."*
