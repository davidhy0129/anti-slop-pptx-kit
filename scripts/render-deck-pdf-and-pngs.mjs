#!/usr/bin/env node
/**
 * anti-slop-pptx-kit v17.0 — HTML-to-PDF & Visual QA Slide PNG Exporter
 * Renders a 13.333in x 7.5in HTML slide deck into:
 *   1. A crisp print-ready PDF (<out.pdf>) via headless Edge/Chrome (--print-to-pdf)
 *   2. Per-slide 1280x720 PNG screenshots (<outDir>/slide-01.png ...) for visual QA
 *
 * Usage: node scripts/render-deck-pdf-and-pngs.mjs <deck.html> <out.pdf> [qa-slides-dir]
 */

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const htmlPath = path.resolve(process.argv[2] || "deck.html");
const pdfOut = path.resolve(process.argv[3] || "deck.pdf");
const pngDir = path.resolve(process.argv[4] || "qa-slides");

if (!fs.existsSync(htmlPath)) {
  console.error(`Error: HTML file not found: ${htmlPath}`);
  process.exit(1);
}

const browserCandidates = [
  process.env.CHROME_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "google-chrome",
  "chromium",
].filter(Boolean);

const browser = browserCandidates.find((p) => (p.includes("/") || p.includes("\\") ? fs.existsSync(p) : true));
if (!browser) {
  console.error("Error: No headless Chromium/Edge binary found.");
  process.exit(1);
}

const fileUrl = `file://${htmlPath.replace(/\\/g, "/")}`;

// 1. Export high-res PDF
fs.mkdirSync(path.dirname(pdfOut), { recursive: true });
execFileSync(
  browser,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--virtual-time-budget=4000",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfOut}`,
    fileUrl,
  ],
  { stdio: "inherit" }
);
console.log(`PDF exported: ${pdfOut}`);

// 2. Count .slide elements and capture 1280x720 PNG per slide via temporary isolated view
fs.mkdirSync(pngDir, { recursive: true });
const rawHtml = fs.readFileSync(htmlPath, "utf8");
const slideMatches = rawHtml.match(/class=["'][^"']*\bslide\b[^"']*["']/g) || [];
const slideCount = Math.max(1, slideMatches.length);

for (let i = 0; i < slideCount; i++) {
  const slideUrl = `${fileUrl}?slide=${i + 1}`;
  const tmpHtml = path.join(os.tmpdir(), `qa-slide-${Date.now()}-${i}.html`);
  // Inject CSS so only slide (i+1) is visible at 1280x720 viewport
  const baseHref = `file://${path.dirname(htmlPath).replace(/\\/g, "/")}/`;
  const injected = rawHtml.replace(
    "<head>",
    `<head><base href="${baseHref}">`
  ).replace(
    "</head>",
    `<style>
      html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #000 !important; }
      .slide { display: none !important; width: 1280px !important; height: 720px !important; margin: 0 !important; page-break-after: auto !important; }
      .slide:nth-of-type(${i + 1}) { display: flex !important; }
    </style></head>`
  );
  fs.writeFileSync(tmpHtml, injected, "utf8");
  const outPng = path.join(pngDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
  try {
    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--virtual-time-budget=3000",
        "--window-size=1280,720",
        `--screenshot=${outPng}`,
        `file://${tmpHtml.replace(/\\/g, "/")}`,
      ],
      { stdio: "pipe" }
    );
  } finally {
    try { fs.unlinkSync(tmpHtml); } catch {}
  }
}

console.log(`QA PNGs exported (${slideCount} slides) to: ${pngDir}`);
