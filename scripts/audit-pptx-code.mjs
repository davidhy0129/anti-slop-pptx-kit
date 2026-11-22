#!/usr/bin/env node
/**
 * anti-slop-pptx-kit v2.0 — Strict Static PPTX Code Auditor
 * Detects AI-slop giveaways: repetitive card-grid loops, "02 · EYEBROW" chrome,
 * "PASO 01" boxes, AI fonts, purple-blue gradients, emojis, and chart gridlines.
 * Usage: node scripts/audit-pptx-code.mjs [target-directory]
 */

import fs from "node:fs";
import path from "node:path";

const targetDir = path.resolve(process.argv[2] || ".");
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".venv",
  "venv",
  "__pycache__",
  "dist",
  "build",
  ".agents",
  ".claude",
  ".gemini",
]);
const CODE_EXTS = new Set([".py", ".ts", ".js", ".tsx", ".jsx", ".mjs", ".cjs", ".html"]);

const BANNED_FONTS = ["Inter", "Arial", "Calibri", "Roboto", "Space Grotesk", "Geist", "Open Sans"];
const AI_CLICHE_EMOJIS = /(🚀|✨|💡|🔥|🎯|⚡|📊|📌)/u;
const AI_PURPLE_BLUE = /(6366F1|8B5CF6|A855F7|7C3AED)/i;
const EYEBROW_CHROME_RE = /['"`]\s*(0?[1-9]|1[0-9])\s*[·•|]\s*[A-ZÁÉÍÓÚÑ\s]{4,}/;
const STEP_BOX_RE = /['"`]\s*(PASO|STEP|BLOQUEO|FASE)\s+0?[1-9]\b/i;

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
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (CODE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk(targetDir);
const rel = (f) => path.relative(targetDir, f);

let usesPptxGen = false;
let hasStudioOrMaster = false;
let usesPythonPptx = false;
let hasPyStudioOrTemplate = false;
let totalRectLoops = 0;

for (const file of allFiles) {
  const fileRel = rel(file);
  if (fileRel.includes("audit-pptx-code") || fileRel.startsWith("templates" + path.sep)) continue;

  const content = fs.readFileSync(file, "utf8");
  if (/pptxgen/i.test(content)) usesPptxGen = true;
  if (/defineSlideMaster|pptxgenjs-studio-kit/.test(content)) hasStudioOrMaster = true;
  if (/from\s+pptx\s+import|import\s+pptx/.test(content)) usesPythonPptx = true;
  if (/Presentation\([^)]+\.pptx|python_pptx_studio/.test(content)) hasPyStudioOrTemplate = true;

  // Detect repetitive card-grid loops drawing rectangles inside loops
  const cardLoopMatches = content.match(/\.(forEach|map)\s*\([^)]*\)\s*=>\s*\{[\s\S]{0,400}?(addShape|ShapeType\.rect|roundRect|MSO_SHAPE\.RECTANGLE)/g);
  if (cardLoopMatches) {
    totalRectLoops += cardLoopMatches.length;
    if (cardLoopMatches.length > 1) {
      findings.critical.push(
        `${fileRel} — ${cardLoopMatches.length} repetitive card/box loops detected (max 1 card-grid slide per deck; use studio archetypes instead)`
      );
    }
  }

  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    for (const font of BANNED_FONTS) {
      const re = new RegExp(`['"\`]${font}['"\`]`, "i");
      if (re.test(line)) {
        findings.design.push(`${fileRel}:${lineNum} — Cliché/default font ("${font}")`);
      }
    }

    if (AI_PURPLE_BLUE.test(line)) {
      findings.design.push(`${fileRel}:${lineNum} — Generic AI purple/indigo hex (${line.match(AI_PURPLE_BLUE)?.[0]})`);
    }

    if (EYEBROW_CHROME_RE.test(line)) {
      findings.critical.push(`${fileRel}:${lineNum} — Numbered AI eyebrow chrome ("NN · SECTION") detected`);
    }

    if (STEP_BOX_RE.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Cliché box tag ("PASO 01 / BLOQUEO ...") — use Node Timeline or Architecture Diagram`);
    }

    if (AI_CLICHE_EMOJIS.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Decorative AI-slop emoji in slide code`);
    }

    if (/has_gridlines\s*=\s*True|showGridLines\s*:\s*true/i.test(line)) {
      findings.dataviz.push(`${fileRel}:${lineNum} — Chart gridlines enabled`);
    }
  });
}

if (usesPptxGen && !hasStudioOrMaster) {
  findings.critical.push("PptxGenJS detected without defineSlideMaster() or templates/pptxgenjs-studio-kit.mjs.");
}
if (usesPythonPptx && !hasPyStudioOrTemplate) {
  findings.critical.push("python-pptx detected without base .pptx template or templates/python_pptx_studio.py.");
}

console.log(`\n=== anti-slop-pptx-kit v2.0 Audit Report (${rel(targetDir) || "."}) ===`);
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

printGroup("CRITICAL (AI-SLOP ARCHITECTURE / EYEBROWS / CARD LOOPS)", findings.critical);
printGroup("DESIGN / TYPOGRAPHY & COLOR", findings.design);
printGroup("CLUTTER & CLICHÉ TAGS", findings.clutter);
printGroup("DATA VISUALIZATION", findings.dataviz);

if (findings.critical.length > 0 || findings.design.length > 0) {
  process.exitCode = 1;
}
