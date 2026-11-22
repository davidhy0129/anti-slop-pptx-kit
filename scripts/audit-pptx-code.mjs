#!/usr/bin/env node
/**
 * anti-slop-pptx-kit — Zero-dependency Static PPTX Code Auditor
 * Scans PptxGenJS / python-pptx / HTML slide generators for AI-slop giveaways.
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

const findings = {
  architecture: [],
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
let hasSlideMaster = false;
let usesPythonPptx = false;
let hasTemplateOrLayouts = false;

for (const file of allFiles) {
  const fileRel = rel(file);
  if (fileRel.includes("audit-pptx-code")) continue;

  const content = fs.readFileSync(file, "utf8");
  if (/pptxgen/i.test(content)) usesPptxGen = true;
  if (/defineSlideMaster/.test(content)) hasSlideMaster = true;
  if (/from\s+pptx\s+import|import\s+pptx/.test(content)) usesPythonPptx = true;
  if (/Presentation\([^)]+\.pptx|slide_layouts\[/.test(content)) hasTemplateOrLayouts = true;

  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    for (const font of BANNED_FONTS) {
      const re = new RegExp(`['"\`]${font}['"\`]`, "i");
      if (re.test(line)) {
        findings.design.push(`${fileRel}:${lineNum} — Default/AI cliché font ("${font}")`);
      }
    }

    if (AI_PURPLE_BLUE.test(line)) {
      findings.design.push(`${fileRel}:${lineNum} — Generic AI purple/indigo hex detected (${line.match(AI_PURPLE_BLUE)?.[0]})`);
    }

    if (AI_CLICHE_EMOJIS.test(line)) {
      findings.clutter.push(`${fileRel}:${lineNum} — Decorative AI-slop emoji in slide code`);
    }

    if (/has_gridlines\s*=\s*True|showGridLines\s*:\s*true/i.test(line)) {
      findings.dataviz.push(`${fileRel}:${lineNum} — Chart gridlines enabled (strip gridlines for clean editorial look)`);
    }

    if (/fontSize\s*:\s*([1-9]|10|11)\b|Pt\(\s*([1-9]|10|11)\s*\)/.test(line)) {
      findings.design.push(`${fileRel}:${lineNum} — Very small slide font (<12pt) — verify readability`);
    }
  });
}

if (usesPptxGen && !hasSlideMaster) {
  findings.architecture.push("PptxGenJS detected without defineSlideMaster() — define reusable Dark/Light masters.");
}
if (usesPythonPptx && !hasTemplateOrLayouts) {
  findings.architecture.push("python-pptx detected without base .pptx template or slide_layouts usage.");
}

console.log(`\n=== anti-slop-pptx-kit Audit Report (${rel(targetDir) || "."}) ===`);
console.log(`Scanned ${allFiles.length} source files.\n`);

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

printGroup("ARCHITECTURE & MASTERS", findings.architecture);
printGroup("DESIGN / TYPOGRAPHY & COLOR", findings.design);
printGroup("AI-SLOP CLUTTER", findings.clutter);
printGroup("DATA VISUALIZATION", findings.dataviz);
