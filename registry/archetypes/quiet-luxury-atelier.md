# Archetype: quiet-luxury-atelier

**ID:** `quiet-luxury-atelier`  
**Name:** Quiet Luxury Atelier  
**Polarity:** `light`  
**Description:** Extreme restraint, whisper-quiet prestige, haute couture gallery minimalism. Generous breathing space, warm cashmere alabaster surfaces, refined high-contrast serif typography.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1180px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3.5rem, 6vw, 5rem)`
  - `normal`: `clamp(6rem, 10vw, 8.5rem)`
  - `breathing`: `clamp(9rem, 15vw, 13rem)`
- **Grid Structure:** Asymmetric editorial columns, extensive margin whitespace, delicate hairline rule separators.

---

## 2. surface
- **Neutral Tint:** Warm cashmere bone with subtle golden undertone (hue `70`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.006 70)`
  - `bg-elevated`: `oklch(0.99 0.003 70)`
  - `bg-surface-active`: `oklch(0.94 0.008 70)`
  - `bg-glass`: `oklch(0.98 0.004 70 / 0.85)`
  - `bg-sunken`: `oklch(0.92 0.010 70)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.18 0.010 60)` (Contrast $\ge 13:1$, AAA)
  - `text-muted`: `oklch(0.46 0.012 65)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.60 0.012 70)`
  - `text-inverse`: `oklch(0.98 0.003 70)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Italicized quotes and catalog dates.
- **Numbers:** Proportional oldstyle numbers and tabular data figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Haute Couture):**
  - `display`: `Cormorant Garamond`, provider: `google`, package: `@fontsource/cormorant-garamond`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing B (Bespoke Editorial):**
  - `display`: `Fraunces`, provider: `google`, package: `@fontsource/fraunces`
  - `sans`: `Work Sans`, provider: `google`, package: `@fontsource/work-sans`
  - `mono`: `IBM Plex Mono`, provider: `google`, package: `@fontsource/ibm-plex-mono`
- **Pairing C (Atelier Modern):**
  - `display`: `Bespoke Serif`, provider: `fontshare`, package: `@fontsource/bespoke-serif`
  - `sans`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.86 0.008 70)` (Refined letterpress rule)
  - `border-subtle`: `oklch(0.91 0.006 70)`
  - `border-focus`: `oklch(0.48 0.10 45 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.7)`
- **Radius Scale (Sharp Refined):**
  - `radius-outer`: `2px`
  - `radius-inner`: `1px`
  - `radius-badge`: `1px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 1px 3px 0 oklch(0.18 0.01 60 / 0.04), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 8px 24px -4px oklch(0.18 0.01 60 / 0.06), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `150ms`
  - `normal`: `260ms`
- **Signature Moment:** Whisper-quiet 260ms opacity fade and 2px micro-drift on view transitions.

---

## Curated OKLCH Accent Palettes
1. **warm-taupe (Default):**
   - `accent-primary`: `oklch(0.50 0.04 60)`
   - `accent-subtle`: `oklch(0.50 0.04 60 / 0.12)`
   - `accent-hover`: `oklch(0.45 0.05 60)`
2. **aged-cognac:**
   - `accent-primary`: `oklch(0.48 0.10 45)`
   - `accent-subtle`: `oklch(0.48 0.10 45 / 0.12)`
   - `accent-hover`: `oklch(0.42 0.12 45)`
3. **noir-velvet:**
   - `accent-primary`: `oklch(0.18 0.01 250)`
   - `accent-subtle`: `oklch(0.18 0.01 250 / 0.10)`
   - `accent-hover`: `oklch(0.12 0.01 250)`
4. **antique-gold:**
   - `accent-primary`: `oklch(0.70 0.12 85)`
   - `accent-subtle`: `oklch(0.70 0.12 85 / 0.14)`
   - `accent-hover`: `oklch(0.65 0.14 85)`

