# Archetype: clinical-biotech-precision

**ID:** `clinical-biotech-precision`  
**Name:** Clinical Biotech Precision  
**Polarity:** `light`  
**Description:** Medical laboratory precision, genomic sequencing diagnostics, pharmaceutical research consoles. Sterile ultra-clean surfaces, diagnostic cyan accents, forensic tabular data tables.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Sterile split diagnostic panels, biomarker tables, clinical laboratory specimen feeds.

---

## 2. surface
- **Neutral Tint:** Sterile cool clean white (hue `220`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.98 0.004 220)`
  - `bg-elevated`: `oklch(1 0 0)`
  - `bg-surface-active`: `oklch(0.94 0.008 220)`
  - `bg-glass`: `oklch(1 0 0 / 0.90)`
  - `bg-sunken`: `oklch(0.92 0.008 220)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.14 0.015 230)` (Contrast $\ge 14:1$, AAA)
  - `text-muted`: `oklch(0.42 0.015 230)` (Contrast $\ge 5.2:1$, AA)
  - `text-subtle`: `oklch(0.56 0.018 230)`
  - `text-inverse`: `oklch(0.98 0.004 220)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and diagnostic labels. Monospaced specimen IDs and genomic sequences.
- **Numbers:** Tabular fixed-pitch figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Laboratory Diagnostics):**
  - `display`: `Instrument Sans`, provider: `google`, package: `@fontsource/instrument-sans`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `IBM Plex Mono`, provider: `google`, package: `@fontsource/ibm-plex-mono`
- **Pairing B (Genomic Sequencing):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing C (Clinical Research):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Work Sans`, provider: `google`, package: `@fontsource/work-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.85 0.010 220)`
  - `border-subtle`: `oklch(0.90 0.008 220)`
  - `border-focus`: `oklch(0.68 0.16 215 / 0.85)`
  - `highlight-specular`: `oklch(1 0 0 / 0.7)`
- **Radius Scale (Subtle Clean):**
  - `radius-outer`: `4px`
  - `radius-inner`: `2px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 1px 3px 0 oklch(0.14 0.01 230 / 0.04), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 6px 16px -2px oklch(0.14 0.01 230 / 0.06), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `100ms`
  - `normal`: `170ms`
- **Signature Moment:** Forensic scanline flash across diagnostic specimen rows upon assay completion.

---

## Curated OKLCH Accent Palettes
1. **sterile-cyan (Default):**
   - `accent-primary`: `oklch(0.68 0.16 215)`
   - `accent-subtle`: `oklch(0.68 0.16 215 / 0.12)`
   - `accent-hover`: `oklch(0.62 0.18 215)`
2. **cellular-amber:**
   - `accent-primary`: `oklch(0.76 0.16 75)`
   - `accent-subtle`: `oklch(0.76 0.16 75 / 0.12)`
   - `accent-hover`: `oklch(0.70 0.18 75)`
3. **diagnostic-red:**
   - `accent-primary`: `oklch(0.58 0.22 25)`
   - `accent-subtle`: `oklch(0.58 0.22 25 / 0.12)`
   - `accent-hover`: `oklch(0.52 0.24 25)`
4. **clinical-cobalt:**
   - `accent-primary`: `oklch(0.48 0.18 250)`
   - `accent-subtle`: `oklch(0.48 0.18 250 / 0.12)`
   - `accent-hover`: `oklch(0.42 0.20 250)`

