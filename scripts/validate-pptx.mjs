#!/usr/bin/env node
/**
 * anti-slop-pptx-kit v17.0 — Compiled PPTX XML Geometry, Overlap & Aspect-Ratio Validator
 * Inspects the actual generated .pptx archive (ppt/presentation.xml, ppt/slides/slide*.xml, ppt/media/*)
 * to catch:
 *   1. Wrong canvas size (LAYOUT_16x9 10x5.625" instead of LAYOUT_WIDE 13.333x7.5")
 *   2. Out-of-bounds shapes, charts, images, or text boxes
 *   3. Overlapping sibling text boxes (CRITICAL)
 *   4. Severe text height overflow (CRITICAL)
 *   5. Stretched/squished images without crop (CRITICAL)
 *
 * Usage: node scripts/validate-pptx.mjs <deck.pptx>
 */

import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";
import imageSize from "image-size";

const pptxPath = process.argv[2];
if (!pptxPath || !fs.existsSync(pptxPath)) {
  console.error("Usage: node scripts/validate-pptx.mjs <path-to-deck.pptx>");
  process.exit(2);
}

const EMU_PER_INCH = 914400;
const data = fs.readFileSync(pptxPath);
const zip = await JSZip.loadAsync(data);

const presXml = await zip.file("ppt/presentation.xml")?.async("string");
if (!presXml) {
  console.error("CRITICAL: Invalid PPTX — missing ppt/presentation.xml");
  process.exit(1);
}

const szMatch = presXml.match(/<p:sldSz\b[^>]*cx="(\d+)"[^>]*cy="(\d+)"/);
const slideW = szMatch ? Number(szMatch[1]) / EMU_PER_INCH : 10;
const slideH = szMatch ? Number(szMatch[2]) / EMU_PER_INCH : 5.625;

const errors = [];
const warnings = [];

if (Math.abs(slideW - 13.333) > 0.05 || Math.abs(slideH - 7.5) > 0.05) {
  errors.push(
    `Canvas size is ${slideW.toFixed(3)}" x ${slideH.toFixed(3)}" (likely LAYOUT_16x9). Must be 13.333" x 7.5" (LAYOUT_WIDE / createDeck()).`
  );
}

const slideFiles = Object.keys(zip.files)
  .filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f))
  .sort((a, b) => Number(a.match(/(\d+)/)[1]) - Number(b.match(/(\d+)/)[1]));

function estimateTextHeightInches(text, wInches, fontSizePt, lineMult = 1.25) {
  if (!text || wInches <= 0.2) return 0;
  const avgCharWidthIn = (fontSizePt * 0.58) / 72;
  const charsPerLine = Math.max(8, Math.floor(wInches / avgCharWidthIn));
  let totalLines = 0;
  for (const para of text.split(/\n/)) {
    totalLines += Math.max(1, Math.ceil(para.length / charsPerLine));
  }
  return totalLines * (fontSizePt / 72) * lineMult;
}

for (const sf of slideFiles) {
  const slideNum = sf.match(/(\d+)/)[1];
  const xml = await zip.file(sf).async("string");
  const relsPath = `ppt/slides/_rels/slide${slideNum}.xml.rels`;
  const relsXml = (await zip.file(relsPath)?.async("string")) || "";

  const boxes = [];
  const blockRe = /<p:(sp|pic|graphicFrame)\b[\s\S]*?<\/p:\1>/g;
  let m;
  while ((m = blockRe.exec(xml)) !== null) {
    const block = m[0];
    const kind = m[1];
    const off = block.match(/<a:off\b[^>]*x="(-?\d+)"[^>]*y="(-?\d+)"/);
    const ext = block.match(/<a:ext\b[^>]*cx="(\d+)"[^>]*cy="(\d+)"/);
    if (!off || !ext) continue;

    const x = Number(off[1]) / EMU_PER_INCH;
    const y = Number(off[2]) / EMU_PER_INCH;
    const w = Number(ext[1]) / EMU_PER_INCH;
    const h = Number(ext[2]) / EMU_PER_INCH;

    const texts = [...block.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((t) => t[1]);
    const fullText = texts.join(" ").trim();
    const szMatches = [...block.matchAll(/\bsz="(\d+)"/g)].map((s) => Number(s[1]) / 100);
    const maxPt = szMatches.length ? Math.max(...szMatches) : 14;

    // 1. Bounds check
    if (x < -0.03 || y < -0.03 || x + w > slideW + 0.03 || y + h > slideH + 0.03) {
      const label = fullText ? `"${fullText.slice(0, 35)}"` : kind;
      errors.push(
        `Slide ${slideNum} OUT OF BOUNDS: ${label} reaches (${(x + w).toFixed(2)}", ${(y + h).toFixed(2)}") on ${slideW.toFixed(2)}"x${slideH.toFixed(2)}" slide`
      );
    }

    // 2. Image distortion check (when no <a:srcRect> crop is applied)
    if (kind === "pic" && !/<a:srcRect\b[^>]*[ltrb]=/.test(block)) {
      const embedMatch = block.match(/r:embed="(rId\d+)"/);
      if (embedMatch) {
        const targetMatch = relsXml.match(new RegExp(`Id="${embedMatch[1]}"[^>]*Target="([^"]+)"`));
        if (targetMatch) {
          const mediaZipPath = `ppt/${targetMatch[1].replace(/^\.\.\//, "")}`;
          const mediaFile = zip.file(mediaZipPath);
          if (mediaFile) {
            try {
              const buf = await mediaFile.async("nodebuffer");
              const dims = imageSize(buf);
              if (dims.width && dims.height) {
                const natRatio = dims.width / dims.height;
                const boxRatio = w / h;
                const diff = Math.abs(natRatio - boxRatio) / natRatio;
                if (diff > 0.22) {
                  errors.push(
                    `Slide ${slideNum} STRETCHED IMAGE (${path.basename(mediaZipPath)}): natural ${(natRatio).toFixed(2)} vs placed ${(boxRatio).toFixed(2)} without sizing:{type:"cover"}`
                  );
                }
              }
            } catch {}
          }
        }
      }
    }

    // 3. Text-height overflow & overlap tracking
    if (kind === "sp" && fullText.length > 0) {
      const estH = estimateTextHeightInches(fullText, Math.max(0.5, w - 0.1), maxPt, 1.25);
      if (estH > h + 0.5 && h < 3.0) {
        errors.push(
          `Slide ${slideNum} TEXT OVERFLOW: "${fullText.slice(0, 35)}..." (~${estH.toFixed(2)}" needed at ${maxPt}pt in w=${w.toFixed(2)}", box h=${h.toFixed(2)}")`
        );
      } else if (estH > h + 0.25 && h < 3.0) {
        warnings.push(
          `Slide ${slideNum} TEXT OVERFLOW RISK: "${fullText.slice(0, 35)}..." (~${estH.toFixed(2)}" needed, box h=${h.toFixed(2)}")`
        );
      }
      boxes.push({ x, y, w, h, text: fullText });
    }
  }

  // 4. Sibling text-box overlaps (CRITICAL)
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i];
      const b = boxes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 0.18 && overlapY > 0.12) {
        errors.push(
          `Slide ${slideNum} OVERLAPPING TEXT BOXES: "${a.text.slice(0, 25)}" and "${b.text.slice(0, 25)}" overlap by ${overlapX.toFixed(2)}"x${overlapY.toFixed(2)}"`
        );
      }
    }
  }
}

console.log(`\n=== anti-slop-pptx-kit v17.0 PPTX Validator (${path.basename(pptxPath)}) ===`);
console.log(`Canvas: ${slideW.toFixed(3)}" x ${slideH.toFixed(3)}" | Slides: ${slideFiles.length}`);

if (errors.length) {
  console.log(`\nCRITICAL ERRORS (${errors.length}):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
} else {
  console.log("\nCRITICAL ERRORS (0): ✓ None");
}

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
} else {
  console.log("WARNINGS (0): ✓ None");
}

if (errors.length > 0) {
  console.log("\n❌ PPTX Validation FAILED. Fix all critical errors before delivering.\n");
  process.exit(1);
}
console.log("\n✅ PPTX Validation PASSED.\n");
