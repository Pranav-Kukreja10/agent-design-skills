# Archetype: y2k-acid-cyber

**ID:** `y2k-acid-cyber`  
**Name:** Y2K Acid Cyber  
**Polarity:** `dark`  
**Description:** High-chroma millennium futurism, chrome wireframes, rave acid typography. Neon green vectors, high-velocity diagonal planes, uninhibited cyber energy.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1320px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 3.5vw, 3.5rem)`
  - `normal`: `clamp(4rem, 6vw, 6rem)`
  - `breathing`: `clamp(6rem, 10vw, 9rem)`
- **Grid Structure:** Dynamic modular grid with angled cutouts, status matrices, high-contrast visual framing.

---

## 2. surface
- **Neutral Tint:** Pure jet black paired with hyper-contrast neon accents
- **Surfaces:**
  - `bg-canvas`: `oklch(0.08 0.01 290)`
  - `bg-elevated`: `oklch(0.14 0.02 290)`
  - `bg-surface-active`: `oklch(0.20 0.03 290)`
  - `bg-glass`: `oklch(0.14 0.02 290 / 0.80)`
  - `bg-sunken`: `oklch(0.05 0.008 290)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.98 0.005 290)` (Contrast $\ge 16:1$, AAA)
  - `text-muted`: `oklch(0.74 0.02 290)` (Contrast $\ge 5.5:1$, AA)
  - `text-subtle`: `oklch(0.55 0.03 290)`
  - `text-inverse`: `oklch(0.08 0.01 290)`

---

## 3. typography
- **Scale Ratio:** `1.333` (Perfect Fourth)
- **Casing Rules:** Expressive sentence case or stark mechanical uppercase.
- **Numbers:** Bold monospaced digital readouts (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Cyber Millennium):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `Chakra Petch`, provider: `google`, package: `@fontsource/chakra-petch`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (High Chroma Acid):**
  - `display`: `Clash Display`, provider: `fontshare`, package: `@fontsource/clash-display`
  - `sans`: `Space Grotesk`, provider: `google`, package: `@fontsource/space-grotesk`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing C (Digital Grotesque):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.30 0.03 290)` (Crisp high-contrast chrome border)
  - `border-subtle`: `oklch(0.20 0.02 290)`
  - `border-focus`: `oklch(0.88 0.28 135)`
  - `highlight-specular`: `oklch(1 0 0 / 0.25)`
- **Radius Scale (Sharp Angle):**
  - `radius-outer`: `4px`
  - `radius-inner`: `2px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 2px 4px 0 oklch(0 0 0 / 0.6), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 6px 16px 0 oklch(0 0 0 / 0.8), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `90ms`
  - `normal`: `160ms`
- **Signature Moment:** Instantaneous high-voltage vector line trace upon query submission.

---

## Curated OKLCH Accent Palettes
1. **acid-neon-green (Default):**
   - `accent-primary`: `oklch(0.88 0.28 135)`
   - `accent-subtle`: `oklch(0.88 0.28 135 / 0.20)`
   - `accent-hover`: `oklch(0.92 0.30 135)`
2. **cyber-magenta:**
   - `accent-primary`: `oklch(0.65 0.30 320)`
   - `accent-subtle`: `oklch(0.65 0.30 320 / 0.20)`
   - `accent-hover`: `oklch(0.70 0.32 320)`
3. **hyper-cobalt:**
   - `accent-primary`: `oklch(0.58 0.26 260)`
   - `accent-subtle`: `oklch(0.58 0.26 260 / 0.20)`
   - `accent-hover`: `oklch(0.62 0.28 260)`
4. **solar-flare-yellow:**
   - `accent-primary`: `oklch(0.92 0.22 95)`
   - `accent-subtle`: `oklch(0.92 0.22 95 / 0.20)`
   - `accent-hover`: `oklch(0.95 0.24 95)`

