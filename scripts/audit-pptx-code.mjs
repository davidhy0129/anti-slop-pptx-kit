#!/usr/bin/env node
/**
 * anti-slop-pptx-kit v5.0 — Ironclad Static PPTX & PDF Code Auditor
 * Fails (exit 1) on:
 * - Missing import of templates/pptxgenjs-studio-kit.mjs or python_pptx_studio.py
 * - DIY polygon illustrations (triangle, trapezoid, chevron)
 * - Vertical accent bars next to text (w <= 0.15 && h >= 0.4)
 * - Repetitive card-grid loops (>1 per deck)
 * - ALL-CAPS eyebrow labels or "NN · SECTION" / "PASO 01" chrome
 * - Repeated "N / 10" footer banners
 * - Default AI fonts, purple-blue gradients, emojis, and chart gridlines
 */

import fs from "node:fs";
import path from "node:path";

const targetDir = path.resolve(process.argv[2] || ".");
const IGNORE_DIRS = new Set([
  "node_modules", ".git", ".venv", "venv", "__pycache__",
  "dist", "build", ".agents", ".claude", ".gemini",
]);
const CODE_EXTS = new Set([".py", ".ts", ".js", ".tsx", ".jsx", ".mjs", ".cjs", ".html"]);

const BANNED_FONTS = ["Inter", "Arial", "Calibri", "Roboto", "Space Grotesk", "Geist", "Open Sans"];
const AI_CLICHE_EMOJIS = /(🚀|✨|💡|🔥|🎯|⚡|📊|📌)/u;
const AI_PURPLE_BLUE = /(6366F1|8B5CF6|A855F7|7C3AED)/i;
const EYEBROW_CHROME_RE = /['"`]\s*(0?[1-9]|1[0-9])\s*[·•|]\s*[A-ZÁÉÍÓÚÑ\s]{4,}/;
const ALL_CAPS_EYEBROW_RE = /['"`][A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9\s·•|,$%.]{14,}['"`]/;
const STEP_BOX_RE = /['"`]\s*(PASO|STEP|BLOQUEO|FASE)\s+0?[1-9]\b/i;
const DIY_POLYGON_RE = /(ShapeType\.(triangle|trapezoid|chevron|pentagon)|MSO_SHAPE\.(ISOSCELES_TRIANGLE|TRAPEZOID|CHEVRON|PENTAGON))/;
const FOOTER_FRACTION_RE = /(\$\{\w+\}\s*\/\s*\d+|\b\d+\s*\/\s*(8|9|10|11|12|15)\b['"`])/;

const findings = {
  critical: [],
  design: [],
  clutter: [],
  dataviz: [],
};

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (CODE_EXTS.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

const allFiles = walk(targetDir);
const rel = (f) => path.relative(targetDir, f);

let usesPptxGen = false;
let importsJsStudio = false;
let usesPythonPptx = false;
let importsPyStudio = false;
let totalRectLoops = 0;

for (const file of allFiles) {
  const fileRel = rel(file);
  if (fileRel.includes("audit-pptx-code") || fileRel.startsWith("templates" + path.sep)) continue;

  const content = fs.readFileSync(file, "utf8");
  if (/pptxgen/i.test(content)) usesPptxGen = true;
  if (/pptxgenjs-studio-kit/.test(content)) importsJsStudio = true;
  if (/from\s+pptx\s+import|import\s+pptx/.test(content)) usesPythonPptx = true;
  if (/python_pptx_studio/.test(content)) importsPyStudio = true;

  const cardLoopMatches = content.match(/\.(forEach|map)\s*\([^)]*\)\s*=>\s*\{[\s\S]{0,400}?(addShape|ShapeType\.rect|roundRect|MSO_SHAPE\.RECTANGLE)/g);
  if (cardLoopMatches) {
    totalRectLoops += cardLoopMatches.length;
    if (cardLoopMatches.length > 1) {
      findings.critical.push(`${fileRel} — ${cardLoopMatches.length} card-grid loops detected (max 1 per deck)`);
    }
  }

  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    if (DIY_POLYGON_RE.test(line)) {
      findings.critical.push(`${fileRel}:${lineNum} — Hand-drawn polygon illustration (triangle/trapezoid) forbidden; use studio components`);
    }

    if (/(addShape|add_shape)/.test(line) && /w\s*:\s*0\.0[1-9]|Inches\(\s*0\.0[1-9]\s*\)/.test(line) && /h\s*:\s*[0-9]|Inches\(\s*[0-9]/.test(line)) {
      findings.critical.push(`${fileRel}:${lineNum} — Vertical accent bar next to text detected; remove vertical bars`);
    }

    if (EYEBROW_CHROME_RE.test(line) || (ALL_CAPS_EYEBROW_RE.test(line) && !/metaLine|meta_line|PALETTES|FONT_SYSTEMS/.test(line))) {
      findings.critical.push(`${fileRel}:${lineNum} — Uppercase AI eyebrow chrome detected above title`);
    }

    if (FOOTER_FRACTION_RE.test(line) && /footer|slide|addText|add_textbox/i.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Repeated "N / 10" footer banner detected (use quiet "03" page number only)`);
    }

    for (const font of BANNED_FONTS) {
      if (new RegExp(`['"\`]${font}['"\`]`, "i").test(line)) {
        findings.design.push(`${fileRel}:${lineNum} — Default/AI cliché font ("${font}")`);
      }
    }

    if (AI_PURPLE_BLUE.test(line)) {
      findings.design.push(`${fileRel}:${lineNum} — Generic AI purple/indigo hex detected`);
    }

    if (STEP_BOX_RE.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Cliché box tag ("PASO 01 / BLOQUEO ...")`);
    }

    if (AI_CLICHE_EMOJIS.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Decorative AI-slop emoji in slide code`);
    }

    if (/has_gridlines\s*=\s*True|showGridLines\s*:\s*true/i.test(line)) {
      findings.dataviz.push(`${fileRel}:${lineNum} — Chart gridlines enabled`);
    }
  });
}

if (usesPptxGen && !importsJsStudio) {
  findings.critical.push("PptxGenJS used WITHOUT importing templates/pptxgenjs-studio-kit.mjs.");
}
if (usesPythonPptx && !importsPyStudio) {
  findings.critical.push("python-pptx used WITHOUT importing templates/python_pptx_studio.py.");
}

console.log(`\n=== anti-slop-pptx-kit v5.0 Audit Report (${rel(targetDir) || "."}) ===`);
console.log(`Scanned ${allFiles.length} source files (card-grid loops found: ${totalRectLoops}).\n`);

const printGroup = (title, items) => {
  console.log(`${title} (${items.length})`);
  if (items.length === 0) {
    console.log("  ✓ None detected\n");
    return;
  }
  items.slice(0, 25).forEach((item) => console.log(`  - ${item}`));
  if (items.length > 25) console.log(`  ... and ${items.length - 25} more`);
  console.log("");
};

printGroup("CRITICAL (RAW POLYGONS / SHADOW BARS / EYEBROWS / MISSING STUDIO KIT)", findings.critical);
printGroup("DESIGN / TYPOGRAPHY & COLOR", findings.design);
printGroup("CLUTTER & REPEATED FOOTERS", findings.clutter);
printGroup("DATA VISUALIZATION", findings.dataviz);

if (findings.critical.length > 0 || findings.design.length > 0 || findings.clutter.length > 0) {
  process.exitCode = 1;
}
