#!/usr/bin/env node
/**
 * anti-slop-pptx-kit — Headless Browser HTML -> PDF & PNG Slide Renderer
 * Uses installed Microsoft Edge or Google Chrome (zero npm dependencies).
 * Usage: node scripts/render-html-slides.mjs <input.html> [output.pdf] [preview.png]
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const inputHtml = path.resolve(process.argv[2] || "index.html");
const outputPdf = path.resolve(process.argv[3] || inputHtml.replace(/\.html?$/i, ".pdf"));
const previewPng = path.resolve(process.argv[4] || inputHtml.replace(/\.html?$/i, "-preview.png"));

if (!fs.existsSync(inputHtml)) {
  console.error(`Input file not found: ${inputHtml}`);
  process.exit(1);
}

const candidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "google-chrome",
  "chromium",
  "microsoft-edge",
];

const browser = candidates.find((p) => p.startsWith("/") || p.includes(":\\") ? fs.existsSync(p) : false) || "msedge";
const fileUrl = "file:///" + inputHtml.replace(/\\/g, "/");

try {
  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--print-to-pdf-no-header",
    `--print-to-pdf=${outputPdf}`,
    fileUrl,
  ], { stdio: "inherit" });

  execFileSync(browser, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--window-size=1280,720",
    `--screenshot=${previewPng}`,
    fileUrl,
  ], { stdio: "inherit" });

  console.log(`\nRendered PDF: ${outputPdf}`);
  console.log(`Rendered PNG preview: ${previewPng}`);
} catch (err) {
  console.error("Failed to render with headless Edge/Chrome:", err.message);
  process.exit(1);
}
