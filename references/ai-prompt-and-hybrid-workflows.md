# Prompt Engineering, Hybrid Workflows & Pre-Send Quality Gates

Actionable workflows synthesized from Presentations.AI, Perceptis, Envato, BrandsUntamed, Penchan, and AI-to-PPTX creators.

---

## 1. The 5-Element Prompt Scaffold (`AC-IOC`)

Never send a 1-line prompt like *"Create a 10-slide deck about X"*. Always supply:
1. **Audience:** Exact role, seniority, and decision style (*"CFO & Operations Director evaluating in-house vs commercial ERP"*).
2. **Context:** What they already know and the current trigger.
3. **Input:** Grounded source documents, metrics, or exact constraints (*"Do not invent any number not present in the source data"*).
4. **Outcome:** Concrete decision needed at the end of the meeting.
5. **Constraints:** Exact slide count, meeting duration, 5×5 / 6×6 brevity, hex palette, and banned AI patterns.

---

## 2. Preventing AI Hallucinations & "Slop"

- **Source-Grounding Line:** Every data or benchmark slide must cite its exact source (`Source: Internal ERP Ledger, Q3 2026`) in `9pt` muted type.
- **Placeholder Reservation:** When real data/code/quotes are missing, explicitly write `"[INSERT REAL METRIC]"` or `"[QUOTE PENDING]"` instead of letting AI fabricate round numbers or fake customer claims.
- **Deletion Rule (PlusAI):** *If deleting a bar, icon, subtitle, or border leaves the slide equally clear, delete it.*
- **Deck vs. Document Litmus Test (BrandsUntamed):** *If a slide makes complete sense with nobody presenting it, you wrote a document. Move prose to `speakerNotes`.*

---

## 3. The 20-Minute Anti-Generic Quick-Fix Pass

1. **Cut 1/3 of the Slides:** Ask *"What happens if I delete this slide?"* If *"Nothing"*, delete it.
2. **Thumbnail View Test:** Zoom out to see all slides at once:
   - Read **only the Action Titles** top-to-bottom — do they form a complete argument?
   - Are >2 consecutive slides visually identical? Break the rhythm with a Statement Slide, Hero KPI, or Photo/Diagram split.
3. **Visual-Must-Clarify-Headline Gate (5 Questions):**
   - Does this visual clarify the headline?
   - Does it make the point easier to remember?
   - Does it reduce explanation time?
   - Does it show evidence, structure, contrast, or sequence?
   - Would the slide be stronger without it?
4. **10-Minute Pre-Send 7-Area Audit:**
   1. Facts & source citations verified (zero fabricated stats)
   2. Story & audience fit (SCQA + Decision slide)
   3. Slide density (35–55% negative space, 5×5 / 6×6 cap)
   4. Charts (<2-second rule, zero gridlines, proper axis breaks & rounding)
   5. Brand & system coherence (consistent palette, fonts, corner style)
   6. Accessibility (manual WCAG contrast check, non-color encoding)
   7. Export & governance check (test `.pptx` on target machine for font/line-wrap shifts; zero PII/secrets leaked to public tools).
