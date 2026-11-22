# Color Harmonies, Typography & Visual System Coherence

Complete specification synthesized from Dribbble, Figma, TikTok design creators, BetterPPT, GetAlai, and Penchan.

---

## 1. The 80 / 10 / 10 & 60 / 30 / 10 Color Rules

- **80% Dominant Canvas:** Matte dark (`#0B0C0E`, `#111111`, `#0B1325`) or warm off-white (`#F5F4F0`, `#F4F5F3`, `#FAF8F3`).
- **10% Structural Neutrals:** Derived via **4-step opacity ramps (`100% / 60% / 30% / 10%`)** of the foreground ink for subtitles, `1px` hairlines, and subtle surfaces.
- **10% Single Protagonist Accent:** Used **exclusively on the focal point** (hero figure, turning headline clause, winning bar/column). *Test: if you cannot justify why an element has the accent color, turn it neutral.*

### 13 Verified Studio HEX Palettes
| Palette Key | Dark Base | Light Base | Protagonist Accent | Best For |
|---|---|---|---|---|
| `OBSIDIAN_CITRINE` | `#0B0C0E` | `#F4F5F3` | `#C8D636` | Tech, Engineering, ERPs |
| `SWISS_ORANGE` | `#111111` | `#F5F4F0` | `#FF4D00` | Product, Bold Pitch, Startups |
| `INDIGO_BONE` | `#0B1325` | `#F6F5F1` | `#F2B53A` | Executive, Finance, Consulting |
| `DEEP_TEAL_CREAM` | `#013330` | `#F3EBDD` | `#FF6A1F` | Studio, Craft, Architecture |
| `NAVY_STEEL` | `#26364D` | `#F4F7F9` | `#547182` | B2B Enterprise, Logistics |
| `PLUM_LAVENDER` | `#342952` | `#F7F5FC` | `#4E4074` | Editorial, Creative Strategy |
| `BLUSH_OLIVE` | `#2E3320` | `#FAF3F4` | `#7A8450` | Hospitality, Wellness, Food |
| `CERULEAN_BUTTER` | `#183145` | `#FFF9E6` | `#4282AA` | Education, Research, SaaS |
| `OFFWHITE_TEAL_INTRO` | `#1A365D` | `#F7FAFC` | `#38B2AC` | Client Product Intro |
| `NAVY_CORAL_PROPOSAL` | `#0F2A44` | `#FAF8F3` | `#F06A3A` | Client Proposals |
| `WARM_CORAL_TEACH` | `#2D3748` | `#FFF8F0` | `#E53E3E` | Training & Onboarding |
| `CHARCOAL_MINT_TECH` | `#1A202C` | `#F4F6F8` | `#48BB78` | Engineering Tech Share |
| `BLACK_YELLOW_MORPH` | `#111111` | `#F2F2F0` | `#F5D000` | High-Contrast B&W Photography |

---

## 2. Accessibility & Non-Color Encoding

- Comply with **WCAG AA (`>= 4.5:1`) / APCA** contrast between text and background.
- **Never convey meaning by color alone** (for color-blindness and B&W printouts): pair color differences with **solid vs. dotted lines**, **bold vs. muted weight**, or **direct text/symbol labels**.
- **Hardware Check:** Verify contrast on the actual projector/room screen (not just a high-gamut laptop display).

---

## 3. Typography & System Coherence

- **Extreme Scale Contrast (5x–10x):** Hero figures/covers `56–108pt` (`100–190px` on 1080p) vs. Body `12–18pt` (or `>= 24pt` for large conference rooms per NCSL). Restrict each slide to **3–4 font sizes total**.
- **Sharp vs. Rounded Corner Coherence (GetAlai Rule):**
  - **Sharp `0px` corners:** Corporate / Swiss / Engineering tone — pair with `1px` structured borders and **outlined icons**.
  - **Rounded corners:** Friendly / Consumer / Modern SaaS tone — pair with soft geometric sans (`Poppins`, `DM Sans`) and warm photography.
- **Ban Italic Serif Flourishes:** Never end a sans-serif headline with an italicized serif word (`"Seventy years, *five waves*"` — instant Claude/AI tell).
- **Ban All-Caps Body Copy:** Use sentence case for readability; reserve uppercase strictly for short `9–10pt` micro-tags.
