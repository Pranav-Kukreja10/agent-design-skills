# Archetype: bento-modular-system

**ID:** `bento-modular-system`  
**Name:** Bento Modular System  
**Polarity:** `dark`  
**Description:** Modular asymmetric grid architecture inspired by modern hardware presentations and high-craft product showcases. Variable-span bento cells, distinct card visual weight, structured density.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Asymmetric 12-column bento grid with spanning cards (4-col, 6-col, 8-col).

---

## 2. surface
- **Neutral Tint:** Obsidian slate with subtle cool tint (hue `255`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.12 0.015 255)`
  - `bg-elevated`: `oklch(0.17 0.015 255)`
  - `bg-surface-active`: `oklch(0.22 0.018 255)`
  - `bg-glass`: `oklch(0.17 0.015 255 / 0.70)`
  - `bg-sunken`: `oklch(0.09 0.012 255)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.96 0.005 255)` (Contrast $\ge 14:1$, AAA)
  - `text-muted`: `oklch(0.68 0.015 255)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.50 0.018 255)`
  - `text-inverse`: `oklch(0.12 0.015 255)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Bento card subheads in balanced sentence case.
- **Numbers:** Tabular figures on all counters and metrics (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Modern Product):**
  - `display`: `Satoshi`, provider: `fontshare`, package: `@fontsource/satoshi`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `Geist Mono`, provider: `google`, package: `@fontsource/geist-mono`
- **Pairing B (High Density):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing C (Clean Geometric):**
  - `display`: `Outfit`, provider: `google`, package: `@fontsource/outfit`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.28 0.015 255)`
  - `border-subtle`: `oklch(0.22 0.012 255)`
  - `border-focus`: `oklch(0.64 0.22 255 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.16)`
- **Radius Scale (Subtle Concentric Bento):**
  - `radius-outer`: `10px`
  - `radius-inner`: `6px`
  - `radius-badge`: `6px`
- **Depth & Blur:**
  - `surface-blur`: `8px`
  - `shadow-surface`: `0 2px 4px 0 oklch(0 0 0 / 0.4), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 8px 24px -4px oklch(0 0 0 / 0.5), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `110ms`
  - `normal`: `180ms`
- **Signature Moment:** Subtle 1px elevation lift on card focus with specular highlight illumination.

---

## Curated OKLCH Accent Palettes
1. **electric-indigo (Default):**
   - `accent-primary`: `oklch(0.64 0.22 255)`
   - `accent-subtle`: `oklch(0.64 0.22 255 / 0.15)`
   - `accent-hover`: `oklch(0.68 0.24 255)`
2. **emerald-matrix:**
   - `accent-primary`: `oklch(0.70 0.18 150)`
   - `accent-subtle`: `oklch(0.70 0.18 150 / 0.15)`
   - `accent-hover`: `oklch(0.74 0.20 150)`
3. **sunset-coral:**
   - `accent-primary`: `oklch(0.68 0.20 28)`
   - `accent-subtle`: `oklch(0.68 0.20 28 / 0.15)`
   - `accent-hover`: `oklch(0.72 0.22 28)`
4. **spectral-cyan:**
   - `accent-primary`: `oklch(0.72 0.16 220)`
   - `accent-subtle`: `oklch(0.72 0.16 220 / 0.15)`
   - `accent-hover`: `oklch(0.76 0.18 220)`

