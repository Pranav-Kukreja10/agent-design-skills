# Archetype: neo-brutalism

**ID:** `neo-brutalism`  
**Name:** Neo-Brutalist Studio  
**Polarity:** `light`  
**Description:** High-energy studio portfolios, experimental devtools, uninhibited creative platforms. 2px hard black borders, stark offset hard shadows, hyper-saturated tactile accents, zero rounded fuzziness.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1320px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 3.5vw, 3.5rem)`
  - `normal`: `clamp(4rem, 6vw, 6rem)`
  - `breathing`: `clamp(6rem, 10vw, 9rem)`
- **Grid Structure:** Modular asymmetrical grid blocks, solid geometric section separators, bold tactile press interactions.

---

## 2. surface
- **Neutral Tint:** Stark high-contrast canvas (`oklch(0.97 0.005 90)`) paired with solid black ink
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.005 90)`
  - `bg-elevated`: `oklch(1 0 0)`
  - `bg-surface-active`: `oklch(0.92 0.010 90)`
  - `bg-glass`: `oklch(1 0 0)` (Flat opacity, zero fake glass)
  - `bg-sunken`: `oklch(0.90 0.015 90)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.12 0.005 260)` (Pitch black ink, Contrast $\ge 15:1$, AAA)
  - `text-muted`: `oklch(0.38 0.015 260)` (Contrast $\ge 6:1$, AA)
  - `text-subtle`: `oklch(0.50 0.015 260)`
  - `text-inverse`: `oklch(1 0 0)`

---

## 3. typography
- **Scale Ratio:** `1.333` (Perfect Fourth)
- **Casing Rules:** Expressive sentence case or bold stark lowercase. Eyebrow tags in bold monospaced uppercase.
- **Numbers:** Bold monospaced counters (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Bold Grotesque):**
  - `display`: `Space Grotesk`, provider: `google`, package: `@fontsource/space-grotesk`
  - `sans`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (Stark Technical):**
  - `display`: `Archivo Black`, provider: `google`, package: `@fontsource/archivo-black`
  - `sans`: `Archivo`, provider: `google`, package: `@fontsource/archivo`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
- **Pairing C (Expressive Raw):**
  - `display`: `Clash Display`, provider: `fontshare`, package: `@fontsource/clash-display`
  - `sans`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`

---

## 4. border_shadow
- **Hairlines & Borders:**
  - `border-hairline`: `oklch(0.12 0.005 260)` (Hard 2px solid border)
  - `border-subtle`: `oklch(0.12 0.005 260)`
  - `border-focus`: `oklch(0.12 0.005 260)`
  - `highlight-specular`: `oklch(0 0 0 / 0)` (Zero specular gradient)
- **Radius Scale (Sharp / Square):**
  - `radius-outer`: `0px`
  - `radius-inner`: `0px`
  - `radius-badge`: `0px`
- **Depth & Blur:**
  - `surface-blur`: `0px` (Flat, zero blur)
  - `shadow-surface`: `3px 3px 0px 0px oklch(0.12 0.005 260)`
  - `shadow-elevated`: `6px 6px 0px 0px oklch(0.12 0.005 260)`

---

## 5. motion
- **Vector:** `playful-tactile`
- **Ease:** `cubic-bezier(0, 0, 0.2, 1)`
- **Durations:**
  - `fast`: `80ms`
  - `normal`: `150ms`
- **Signature Moment:** Hard tactile button depress: `translate(3px, 3px)` collapsing `shadow-surface` to `0px 0px 0px 0px`.

---

## Curated OKLCH Accent Palettes
1. **electric-acid-lime (Default):**
   - `accent-primary`: `oklch(0.85 0.28 130)`
   - `accent-subtle`: `oklch(0.85 0.28 130 / 0.25)`
   - `accent-hover`: `oklch(0.88 0.30 130)`
2. **hyper-chroma-violet:**
   - `accent-primary`: `oklch(0.58 0.28 290)`
   - `accent-subtle`: `oklch(0.58 0.28 290 / 0.25)`
   - `accent-hover`: `oklch(0.62 0.30 290)`
3. **blaze-orange:**
   - `accent-primary`: `oklch(0.70 0.24 45)`
   - `accent-subtle`: `oklch(0.70 0.24 45 / 0.25)`
   - `accent-hover`: `oklch(0.74 0.26 45)`
4. **stark-monochrome-yellow:**
   - `accent-primary`: `oklch(0.88 0.22 95)`
   - `accent-subtle`: `oklch(0.88 0.22 95 / 0.25)`
   - `accent-hover`: `oklch(0.91 0.24 95)`

