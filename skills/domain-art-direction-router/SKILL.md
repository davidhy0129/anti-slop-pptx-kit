---
name: domain-art-direction-router
description: Analyzes the user's prompt (industry, audience, tone, data density) BEFORE designing any slide to select a tailored color harmony, font personality, imagery/icon direction, and native chart mix. Prevents one-size-fits-all generic decks.
---

# Domain & Context Art Direction Router (Step 0)

Never apply the exact same colors, fonts, or slide layouts to every presentation. **First**, read the user's prompt and classify the deck across 4 dimensions before writing any code:

## 1. Classify the Prompt

1. **Industry / Domain:**
   - *Mechanical / Industrial / Civil Engineering* (e.g., Inteckno, manufacturing, energy, logistics)
   - *Executive / Finance / Consulting*
   - *SaaS / Tech Startup / Digital Product*
   - *Hospitality / Restaurant / Food / Lifestyle*
   - *Healthcare / Education / Non-Profit*
   - *Creative / Architecture / Luxury*
2. **Deck Purpose:** Investor Pitch, Board Decision, Sales Proposal, Technical Review, or Keynote Talk.
3. **Visual Asset Availability:**
   - Does the user have real product/site photos? -> Use **full-bleed or 50/50 photo splits** with dark gradient scrims.
   - No user photos provided? -> Combine **crisp vector icons (SVG/PNG)**, **native editable PowerPoint charts (`addChart`)**, **bold tonal Bento/split panels**, and **high-contrast callout cards** so slides look rich, lively, and complete — NEVER empty white voids with 10 words!

---

## 2. Select Industry-Specific Art Direction (`references/industry-design-matrix.md`)

- **Industrial / Mechanical Engineering:** Deep Steel Navy (`#0F172A`) + Crisp Slate White (`#F8FAFC`) + Signal Amber/Orange (`#EA580C`) + Cobalt (`#1D4ED8`). Strong geometric sans (`Montserrat` + `Calibri` or `DM Sans`).
- **Executive / Finance:** Midnight Indigo (`#0B1325`) + Warm Bone (`#F6F5F1`) + Emerald (`#059669`) or Gold (`#D97706`).
- **Hospitality / Food / Club:** Deep Forest/Espresso (`#1C2B24`) + Warm Cream (`#FAF5EB`) + Terracotta (`#C2410C`).
- **Tech / SaaS:** Carbon (`#111827`) + Pure White (`#FFFFFF`) + Electric Blue (`#2563EB`) or Emerald (`#10B981`).

---

## 3. Non-Negotiable Visual Quality Rules (v6.0)

- **Readable Room-Scale Typography:** Body copy **14–16pt** minimum (never 10–12pt); tables **12–13pt** minimum; slide titles **26–34pt**; hero KPIs **56–80pt**. Use **one cohesive font pairing** across the entire deck (do NOT mix 3 unrelated fonts like `Consolas` + `Poppins` + `Montserrat`).
- **Complete, Balanced & Centered Framing:** Never leave 50% of a slide awkwardly blank at the bottom. Center standalone statements/KPIs vertically, or pair headlines with a **real native chart**, **icon-backed tonal cards**, or **bottom summary strip**.
- **High-Contrast Ink Only:** Never use faint gray text for key content. Use `#FFFFFF` / `#E2E8F0` on dark surfaces and `#0F172A` / `#334155` on light surfaces.
- **No Weird Abstract Lines or DIY Polygons:** Never draw concentric target rings, floating `1px` CAD boxes, vertical red accent stripes beside text, or triangle/trapezoid icebergs.
