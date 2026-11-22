# Workflow: Create a Studio-Grade PPTX Deck from Scratch

Usa este flujo cuando vayas a crear una presentación nueva desde cero (en código `PptxGenJS` / `python-pptx` o diseñando el guion visual slide a slide).

## Paso 1 — Narrativa y Títulos de Acción (`deck-narrative-strategist`)
Lee `skills/narrative-storytelling-decks/SKILL.md`:
1. Define el objetivo del deck (Pitch, Board Review, Propuesta Comercial, Keynote) y el total de slides (`8–12`).
2. Redacta el **Action Title** de cada slide (una conclusión real, nunca una etiqueta vaga).
3. Marca qué 1–2 palabras de cada titular llevan resaltado de acento (*inline turn highlight*).
4. Limita el texto por bloque a `1–2` líneas (`8–15` palabras). Cero muros de viñetas.

## Paso 2 — Dirección de Arte y Sistema Visual (`slide-art-director`)
Lee `skills/anti-ai-slop-slides/SKILL.md`, `skills/slide-grid-typography/SKILL.md` y `skills/slide-color-pacing/SKILL.md`:
1. Elige **1 par tipográfico** fuera de la lista prohibida (ej. `Switzer` + `IBM Plex Mono` micro-tags, o `Archivo Black` + `Montserrat`).
2. Elige **1 paleta 60-30-10** (máximo 2–3 colores + rampa de opacidad `100%/60%/30%/10%`), cero degradados morado-azul ni neón.
3. Traza el **ritmo oscuro/claro** de las slides (Portada oscura -> Agenda Morph -> Contexto claro -> Métrica Hero oscura -> Datos claros -> Cita/Respiro -> Cierre minimalista).
4. Asegura `35–55%` de espacio negativo y cero píldoras `●` ni emojis encima de los títulos.

## Paso 3 — Datos y Visualización (`data-viz-specialist`)
Lee `skills/data-viz-hero-metrics/SKILL.md`:
1. Convierte métricas clave en slides de **1 cifra gigante** (`100–190 px`).
2. Sustituye gráficos por defecto con ejes/cuadrículas por **Dot-Matrix (`10×4`)**, curvas Bezier con hitos, barras horizontales con etiqueta directa o líneas de tiempo nodales.

## Paso 4 — Generación Modular y QA Visual (`pptx-code-builder` + `visual-slide-qa`)
Lee `skills/pptx-code-architecture/SKILL.md` (y `skills/editorial-pdf-design/SKILL.md` si el entregable es PDF):
1. **Importa obligatoriamente** `templates/pptxgenjs-studio-kit.mjs`, `templates/python_pptx_studio.py` o `templates/editorial-pdf-studio.html` (prohibido dibujar polígonos `triangle`/`trapezoid`, barras verticales con sombra o tarjetas manuales).
2. Mueve el detalle denso a `speakerNotes` / `speaker_notes`, dejando 15–45 palabras visibles por slide.
3. Ejecuta `node scripts/audit-pptx-code.mjs .` (**debe salir en `exit 0`**) y renderiza vista previa (`workflows/visual-qa-render-loop.md`) para confirmar cero solapamientos.
