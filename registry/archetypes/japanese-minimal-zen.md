# Archetype: japanese-minimal-zen

**ID:** `japanese-minimal-zen`  
**Name:** Japanese Minimal Zen  
**Polarity:** `light`  
**Description:** Ma (negative space), shoji mist neutrals, tranquil asymmetric balance. Deep sumi ink contrasts, deliberate breathing space, serene stillness, zero visual friction.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1200px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3rem, 5vw, 4.5rem)`
  - `normal`: `clamp(5.5rem, 9vw, 8rem)`
  - `breathing`: `clamp(8.5rem, 14vw, 13rem)`
- **Grid Structure:** Asymmetric Ma balance, delicate vertical axis alignment, serene proportion ratios.

---

## 2. surface
- **Neutral Tint:** Mist paper neutrals pulled toward hue `90`
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.005 90)` (Washi mist paper)
  - `bg-elevated`: `oklch(0.99 0.003 90)`
  - `bg-surface-active`: `oklch(0.93 0.008 90)`
  - `bg-glass`: `oklch(0.98 0.004 90 / 0.85)`
  - `bg-sunken`: `oklch(0.91 0.010 90)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.20 0.008 260)` (Deep Sumi ink, Contrast $\ge 12:1$, AAA)
  - `text-muted`: `oklch(0.48 0.010 260)` (Contrast $\ge 4.8:1$, AA)
  - `text-subtle`: `oklch(0.62 0.010 260)`
  - `text-inverse`: `oklch(0.98 0.003 90)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Minimalist monospaced coordinates.
- **Numbers:** Tabular lining figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Zen Serif):**
  - `display`: `Noto Serif Display`, provider: `google`, package: `@fontsource/noto-serif-display`
  - `sans`: `Work Sans`, provider: `google`, package: `@fontsource/work-sans`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
- **Pairing B (Literary Washi):**
  - `display`: `Newsreader`, provider: `google`, package: `@fontsource/newsreader`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing C (Modern Tokyo):**
  - `display`: `Bespoke Serif`, provider: `fontshare`, package: `@fontsource/bespoke-serif`
  - `sans`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.88 0.006 90)` (Delicate shoji lattice 1px line)
  - `border-subtle`: `oklch(0.92 0.004 90)`
  - `border-focus`: `oklch(0.56 0.20 28 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.6)`
- **Radius Scale (Sharp Organic):**
  - `radius-outer`: `3px`
  - `radius-inner`: `2px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 1px 2px 0 oklch(0.20 0.008 260 / 0.04), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 6px 18px -2px oklch(0.20 0.008 260 / 0.06), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `150ms`
  - `normal`: `250ms`
- **Signature Moment:** Subtle 250ms sumi ink-bleed expansion on button click.

---

## Curated OKLCH Accent Palettes
1. **sumi-ink (Default):**
   - `accent-primary`: `oklch(0.22 0.01 250)`
   - `accent-subtle`: `oklch(0.22 0.01 250 / 0.10)`
   - `accent-hover`: `oklch(0.16 0.01 250)`
2. **matcha-green:**
   - `accent-primary`: `oklch(0.60 0.12 140)`
   - `accent-subtle`: `oklch(0.60 0.12 140 / 0.12)`
   - `accent-hover`: `oklch(0.55 0.14 140)`
3. **vermilion-hanko:**
   - `accent-primary`: `oklch(0.56 0.20 28)`
   - `accent-subtle`: `oklch(0.56 0.20 28 / 0.12)`
   - `accent-hover`: `oklch(0.50 0.22 28)`
4. **cedar-slate:**
   - `accent-primary`: `oklch(0.52 0.05 180)`
   - `accent-subtle`: `oklch(0.52 0.05 180 / 0.12)`
   - `accent-hover`: `oklch(0.48 0.06 180)`

