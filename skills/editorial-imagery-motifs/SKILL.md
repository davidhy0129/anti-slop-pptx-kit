---
name: editorial-imagery-motifs
description: Applies Picture Superiority Effect (full-bleed vs pasted-on photos), Rule of Thirds framing, B&W photo contrast, Split-Slide Color Swap, Merge Shapes masking, crisp code slides, vector recoloring, and the 5-Question Visual Gate.
---

# Editorial Imagery, Vectors & Studio Visual Motifs

Graphic designers make slides feel bespoke through deliberate framing, visual restraint, and system coherence—never stock handshakes, uncanny AI faces, or tiny corner thumbnails (*"efecto pegote"*).

## 1. The "Visual Must Clarify the Headline" 5-Question Gate

Before keeping any photo, icon, vector, or animation:
1. Does it clarify the headline?
2. Does it make the message easier to remember?
3. Does it reduce explanation time?
4. Does it show evidence, structure, contrast, or sequence?
5. Would the slide be stronger without it?
*If no, delete it. Clean typography + whitespace beats decorative filler every time.*

---

## 2. Photography & Framing Rules

- **Kill the *"Efecto Pegote"* (Picture Superiority Effect):** Never paste a small rectangular stock photo next to a bullet box. Either size photos **full-bleed** (`13.333" × 7.5"`) with a bottom/side scrim and place concise text inside the photo's **negative space**, or split cleanly (`50/50` or `60/40`) with zero border gap.
- **Rule of Thirds Guides:** Divide the 16:9 canvas into thirds (`~5.63cm` & `~3.20cm` inner offsets on a `33.8×19cm` grid) and place focal subjects and headlines on intersections.
- **B&W 0% Saturation Contrast Trick:** When placing colored or white text over a busy photo, convert the photo to **0% saturation (grayscale)** + subtle dark scrim so the colored accent headline pops cleanly.
- **No Uncanny AI Assets:** Inspect every generated image for garbled text on screens/signs or extra fingers; ban stock handshakes, lightbulbs, puzzle pieces, and glowing 3D blobs.
- **Technical Code Slides:** Never paste blurry screenshots or tiny 10pt code. Isolate code cleanly using high-contrast blocks (or Carbon / VS Code syntax-preserved exports) in monospace (`Consolas` / `JetBrains Mono` / `Fira Code`).

---

## 3. Bespoke Studio Motifs & Vector Craft

1. **Split-Slide Color Swap (Figma Idea 13):** Divide a slide 50/50 with two contrasting colors; **swap their left/right or top/bottom positions** on key callout slides to signal a turning point.
2. **Recolor Vectors to Palette:** When using vector icons or illustrations, recolor every shape fill/stroke to match your exact 3-color palette (*"no chile, mole y pozole"*). Match icon style to corners (outlined icons with sharp `0px` corners; solid/soft icons with rounded corners).
3. **`Merge Shapes` Typography Masking & Cutouts:** Mask high-res photography inside oversized display letters (`80–140 pt`), or let a background-removed subject cutout break slightly outside its card/ring border.
4. **CAD / Figma Selection-Box Callouts & Concentric Target Rings:** Frame micro-tags (`[CONTEXT]`) with `1px` bounding boxes + `3–4px` corner handles, and connect nodes with `1px` hairlines ending in concentric circles instead of fat PowerPoint block arrows.
5. **Motion & PDF-Fallback Restraint:** Use **Morph** (`Transformar`) for chapter spotlights or image-focus zooms, and prefer simple **Appear** animations when slides must also export cleanly to PDF.
