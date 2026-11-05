# Archetype: swiss-typographic-grid

**ID:** `swiss-typographic-grid`  
**Name:** Swiss Typographic Grid  
**Polarity:** `light`  
**Description:** Cold, mathematical, Josef Müller-Brockmann inspired layout. Exposed 1px architectural grid lines, high-contrast structural typography, objective clarity, zero ornamental decoration.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Mathematical 12-column modular grid with continuous exposed 1px border dividers.

---

## 2. surface
- **Neutral Tint:** Pure objective white canvas with stark black type
- **Surfaces:**
  - `bg-canvas`: `oklch(0.98 0.002 90)`
  - `bg-elevated`: `oklch(1 0 0)`
  - `bg-surface-active`: `oklch(0.94 0.005 90)`
  - `bg-glass`: `oklch(1 0 0 / 0.90)`
  - `bg-sunken`: `oklch(0.92 0.008 90)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.12 0.005 260)` (Contrast $\ge 15:1$, AAA)
  - `text-muted`: `oklch(0.42 0.010 260)` (Contrast $\ge 5.5:1$, AA)
  - `text-subtle`: `oklch(0.55 0.012 260)`
  - `text-inverse`: `oklch(0.98 0.002 90)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Mathematical uppercase numerals and category tags.
- **Numbers:** Tabular lining figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Swiss Geometric):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Space Grotesk`, provider: `google`, package: `@fontsource/space-grotesk`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (Objective Asymmetry):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing C (Constructivist):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.12 0.005 260)` (1px solid crisp black grid lines)
  - `border-subtle`: `oklch(0.85 0.005 90)`
  - `border-focus`: `oklch(0.55 0.22 25)`
  - `highlight-specular`: `oklch(0 0 0 / 0)`
- **Radius Scale (Pure Razor Sharp):**
  - `radius-outer`: `0px`
  - `radius-inner`: `0px`
  - `radius-badge`: `0px`
- **Depth & Blur:**
  - `surface-blur`: `0px` (Pure flat surfaces)
  - `shadow-surface`: `none`
  - `shadow-elevated`: `none`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `90ms`
  - `normal`: `160ms`
- **Signature Moment:** Instantaneous mathematical grid coordinate highlight upon state transition.

---

## Curated OKLCH Accent Palettes
1. **swiss-red (Default):**
   - `accent-primary`: `oklch(0.55 0.22 25)`
   - `accent-subtle`: `oklch(0.55 0.22 25 / 0.12)`
   - `accent-hover`: `oklch(0.50 0.24 25)`
2. **helvetica-blue:**
   - `accent-primary`: `oklch(0.50 0.18 245)`
   - `accent-subtle`: `oklch(0.50 0.18 245 / 0.12)`
   - `accent-hover`: `oklch(0.45 0.20 245)`
3. **concrete-amber:**
   - `accent-primary`: `oklch(0.72 0.16 80)`
   - `accent-subtle`: `oklch(0.72 0.16 80 / 0.15)`
   - `accent-hover`: `oklch(0.68 0.18 80)`
4. **stark-graphite:**
   - `accent-primary`: `oklch(0.30 0.01 250)`
   - `accent-subtle`: `oklch(0.30 0.01 250 / 0.12)`
   - `accent-hover`: `oklch(0.25 0.01 250)`

