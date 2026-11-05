# Archetype: warm-artisan-craft

**ID:** `warm-artisan-craft`  
**Name:** Warm Artisan Craft  
**Polarity:** `light`  
**Description:** Tactile ceramic studio, culinary journals, heritage workshops. Earthy linen canvas, warm terracotta accents, organic typography, tactile physical honesty.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1200px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3rem, 5vw, 4.5rem)`
  - `normal`: `clamp(5rem, 8vw, 7rem)`
  - `breathing`: `clamp(7.5rem, 12vw, 11rem)`
- **Grid Structure:** Organic asymmetric masonry, tactile product showcases, warm horizontal boundaries.

---

## 2. surface
- **Neutral Tint:** Unbleached linen and clay neutrals (hue `80`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.96 0.012 80)` (Warm raw linen paper)
  - `bg-elevated`: `oklch(0.98 0.008 80)` (Soft ceramic clay surface)
  - `bg-surface-active`: `oklch(0.92 0.015 80)`
  - `bg-glass`: `oklch(0.96 0.012 80 / 0.85)`
  - `bg-sunken`: `oklch(0.90 0.018 80)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.24 0.020 50)` (Warm walnut ink, Contrast $\ge 11:1$, AAA)
  - `text-muted`: `oklch(0.50 0.020 60)` (Contrast $\ge 4.6:1$, AA)
  - `text-subtle`: `oklch(0.62 0.018 70)`
  - `text-inverse`: `oklch(0.98 0.008 80)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Artisanal subtitles in warm italic serif.
- **Numbers:** Tabular figures on inventory and pricing (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Artisan Workshop):**
  - `display`: `Fraunces`, provider: `google`, package: `@fontsource/fraunces`
  - `sans`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
- **Pairing B (Literary Craft):**
  - `display`: `Source Serif 4`, provider: `google`, package: `@fontsource/source-serif-4`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing C (Heritage Studio):**
  - `display`: `Newsreader`, provider: `google`, package: `@fontsource/newsreader`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.85 0.015 80)`
  - `border-subtle`: `oklch(0.89 0.010 80)`
  - `border-focus`: `oklch(0.58 0.16 40 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.5)`
- **Radius Scale (Organic Soft Corner):**
  - `radius-outer`: `6px`
  - `radius-inner`: `4px`
  - `radius-badge`: `4px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 2px 4px 0 oklch(0.24 0.02 50 / 0.06), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 8px 20px -2px oklch(0.24 0.02 50 / 0.08), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `140ms`
  - `normal`: `240ms`
- **Signature Moment:** Gentle 240ms ceramic stamp settle upon order or action confirmation.

---

## Curated OKLCH Accent Palettes
1. **terracotta-clay (Default):**
   - `accent-primary`: `oklch(0.58 0.16 40)`
   - `accent-subtle`: `oklch(0.58 0.16 40 / 0.14)`
   - `accent-hover`: `oklch(0.52 0.18 40)`
2. **sage-olive:**
   - `accent-primary`: `oklch(0.55 0.10 135)`
   - `accent-subtle`: `oklch(0.55 0.10 135 / 0.14)`
   - `accent-hover`: `oklch(0.50 0.12 135)`
3. **sun-ochre:**
   - `accent-primary`: `oklch(0.72 0.15 75)`
   - `accent-subtle`: `oklch(0.72 0.15 75 / 0.14)`
   - `accent-hover`: `oklch(0.68 0.17 75)`
4. **deep-indigo-dye:**
   - `accent-primary`: `oklch(0.38 0.12 250)`
   - `accent-subtle`: `oklch(0.38 0.12 250 / 0.14)`
   - `accent-hover`: `oklch(0.32 0.14 250)`

