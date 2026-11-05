# Archetype: scandinavian-warm-minimal

**ID:** `scandinavian-warm-minimal`  
**Name:** Scandinavian Warm Minimal  
**Polarity:** `light`  
**Description:** Soft birch/oat neutrals, natural Nordic daylight, functional humanism. Clean unhurried layouts, soft organic typography, serene clarity, zero chaotic visual noise.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1240px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3rem, 5vw, 4.5rem)`
  - `normal`: `clamp(5rem, 8vw, 7.5rem)`
  - `breathing`: `clamp(8rem, 13vw, 12rem)`
- **Grid Structure:** Open functional grids, broad daylight margins, harmonious vertical pacing.

---

## 2. surface
- **Neutral Tint:** Warm pale birch and oat neutrals (hue `85`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.008 85)` (Pale Nordic birch)
  - `bg-elevated`: `oklch(0.99 0.004 85)` (Clean white ceramic)
  - `bg-surface-active`: `oklch(0.93 0.010 85)`
  - `bg-glass`: `oklch(0.98 0.005 85 / 0.85)`
  - `bg-sunken`: `oklch(0.91 0.012 85)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.20 0.010 70)` (Deep peat charcoal, Contrast $\ge 12:1$, AAA)
  - `text-muted`: `oklch(0.48 0.012 75)` (Contrast $\ge 4.8:1$, AA)
  - `text-subtle`: `oklch(0.60 0.014 80)`
  - `text-inverse`: `oklch(0.98 0.004 85)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Balanced Nordic line wrapping.
- **Numbers:** Tabular figures on all tables (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Nordic Humanist):**
  - `display`: `Familjen Grotesk`, provider: `google`, package: `@fontsource/familjen-grotesk`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing B (Clean Functional):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `IBM Plex Mono`, provider: `google`, package: `@fontsource/ibm-plex-mono`
- **Pairing C (Literary Nordic):**
  - `display`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `sans`: `Work Sans`, provider: `google`, package: `@fontsource/work-sans`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.86 0.008 85)`
  - `border-subtle`: `oklch(0.90 0.006 85)`
  - `border-focus`: `oklch(0.54 0.14 235 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.6)`
- **Radius Scale (Soft Nordic Curve):**
  - `radius-outer`: `8px`
  - `radius-inner`: `5px`
  - `radius-badge`: `4px`
- **Depth & Blur:**
  - `surface-blur`: `6px`
  - `shadow-surface`: `0 2px 6px 0 oklch(0.20 0.01 70 / 0.05), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 10px 24px -4px oklch(0.20 0.01 70 / 0.07), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `140ms`
  - `normal`: `230ms`
- **Signature Moment:** Soft 230ms daylight fade-through on navigation tab switch.

---

## Curated OKLCH Accent Palettes
1. **nordic-fjord-blue (Default):**
   - `accent-primary`: `oklch(0.54 0.14 235)`
   - `accent-subtle`: `oklch(0.54 0.14 235 / 0.14)`
   - `accent-hover`: `oklch(0.48 0.16 235)`
2. **birch-amber:**
   - `accent-primary`: `oklch(0.74 0.14 75)`
   - `accent-subtle`: `oklch(0.74 0.14 75 / 0.14)`
   - `accent-hover`: `oklch(0.70 0.16 75)`
3. **forest-pine:**
   - `accent-primary`: `oklch(0.46 0.12 150)`
   - `accent-subtle`: `oklch(0.46 0.12 150 / 0.14)`
   - `accent-hover`: `oklch(0.40 0.14 150)`
4. **cloudberry:**
   - `accent-primary`: `oklch(0.66 0.18 50)`
   - `accent-subtle`: `oklch(0.66 0.18 50 / 0.14)`
   - `accent-hover`: `oklch(0.62 0.20 50)`

