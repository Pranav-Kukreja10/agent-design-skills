# Archetype: dark-obsidian-technical

**ID:** `dark-obsidian-technical`  
**Name:** Dark Obsidian Technical  
**Polarity:** `dark`  
**Description:** High-precision developer and financial consoles, cryptographic tooling, forensic telemetry workspaces. Crisp 1px hairlines, carbon surfaces pulled toward hue 250, zero decorative fluff.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** High-density data grid, collapsible telemetry sidebar, compact horizontal summary bar with 1px dividers.

---

## 2. surface
- **Neutral Tint:** Carbon neutrals pulled toward hue `250`
- **Surfaces:**
  - `bg-canvas`: `oklch(0.12 0.015 250)`
  - `bg-elevated`: `oklch(0.18 0.015 250)`
  - `bg-surface-active`: `oklch(0.22 0.018 250)`
  - `bg-glass`: `oklch(0.18 0.015 250 / 0.72)`
  - `bg-sunken`: `oklch(0.09 0.012 250)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.96 0.005 250)` (Contrast $\ge 14:1$, AAA)
  - `text-muted`: `oklch(0.68 0.015 250)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.52 0.018 250)`
  - `text-inverse`: `oklch(0.12 0.015 250)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Uppercase allowed only on $\le 3$-word `--font-mono` eyebrows with `/` prefix.
- **Numbers:** Mandatory `font-variant-numeric: tabular-nums`.

### De-converged Font Pairings
- **Pairing A (Default - Minimalist Technical):**
  - `display`: `Geist`, provider: `google`, package: `@fontsource/geist-sans`
  - `sans`: `Instrument Sans`, provider: `google`, package: `@fontsource/instrument-sans`
  - `mono`: `Geist Mono`, provider: `google`, package: `@fontsource/geist-mono`
- **Pairing B (Geometric Density):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing C (Industrial Precision):**
  - `display`: `Satoshi`, provider: `fontshare`, package: `@fontsource/satoshi`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.28 0.015 250)` (1px solid container borders)
  - `border-subtle`: `oklch(0.22 0.012 250)` (internal cell dividers)
  - `border-focus`: `oklch(0.65 0.20 250 / 0.75)` (2px accessible focus ring)
  - `highlight-specular`: `oklch(1 0 0 / 0.18)` (top 1px specular reflection)
- **Radius Scale (Subtle Technical):**
  - `radius-outer`: `6px`
  - `radius-inner`: `4px`
  - `radius-badge`: `4px`
- **Depth & Blur:**
  - `surface-blur`: `8px`
  - `shadow-surface`: `0 1px 2px 0 oklch(0 0 0 / 0.45), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 4px 12px 0 oklch(0 0 0 / 0.50), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `110ms`
  - `normal`: `180ms`
- **Signature Moment:** 180ms single-sweep scanline commitment pulse across primary batch cards.

---

## Curated OKLCH Accent Palettes
1. **electric-indigo (Default):**
   - `accent-primary`: `oklch(0.65 0.20 250)`
   - `accent-subtle`: `oklch(0.65 0.20 250 / 0.15)`
   - `accent-hover`: `oklch(0.70 0.22 250)`
2. **cyan-telemetry:**
   - `accent-primary`: `oklch(0.72 0.16 215)`
   - `accent-subtle`: `oklch(0.72 0.16 215 / 0.15)`
   - `accent-hover`: `oklch(0.76 0.18 215)`
3. **emerald-settled:**
   - `accent-primary`: `oklch(0.70 0.17 145)`
   - `accent-subtle`: `oklch(0.70 0.17 145 / 0.15)`
   - `accent-hover`: `oklch(0.74 0.19 145)`
4. **amber-audit:**
   - `accent-primary`: `oklch(0.75 0.18 75)`
   - `accent-subtle`: `oklch(0.75 0.18 75 / 0.15)`
   - `accent-hover`: `oklch(0.79 0.20 75)`

