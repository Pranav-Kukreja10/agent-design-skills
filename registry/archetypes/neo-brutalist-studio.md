# Archetype: neo-brutalist-studio

**ID:** `neo-brutalist-studio`  
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
  - `text-secondary`: `oklch(0.30 0.015 260)` (Contrast $\ge 10:1$, AAA)
  - `text-muted`: `oklch(0.38 0.015 260)` (Contrast $\ge 6:1$, AA)
  - `text-subtle`: `oklch(0.50 0.015 260)`
  - `text-inverse`: `oklch(1 0 0)`

---

## 3. typography
- **Scale Ratio:** `1.333` (Perfect Fourth)
- **Casing Rules:** Expressive sentence case or bold stark lowercase. Eyebrow tags in bold monospaced uppercase.
- **Numbers:** Bold tabular numerals (`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;`).

### De-converged Font Pairings
- **Pairing A (Default - Bold Grotesque):**
  - `display`: `Space Grotesk`, provider: `google`, package: `@fontsource/space-grotesk`
  - `sans`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (Stark Technical):**
  - `display`: `Archivo Black`, provider: `google`, package: `@fontsource/archivo-black`
  - `sans`: `Archivo`, provider: `google`, package: `@fontsource/archivo`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
- **Pairing C (Tactile Expressive):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.12 0.005 260)` (2px hard solid black)
  - `border-subtle`: `oklch(0.12 0.005 260)` (2px solid black)
  - `border-focus`: `oklch(0.12 0.005 260)` (3px hard black focus)
  - `highlight-specular`: `transparent`
- **Radius Scale (Zero Radius):**
  - `radius-outer`: `0px`
  - `radius-inner`: `0px`
  - `radius-badge`: `0px`
- **Depth & Blur:**
  - `surface-blur`: `0px`
  - `shadow-surface`: `4px 4px 0px 0px oklch(0.12 0.005 260)`
  - `shadow-elevated`: `8px 8px 0px 0px oklch(0.12 0.005 260)`

---

## 5. motion
- **Vector:** `playful-tactile`
- **Ease:** `cubic-bezier(0, 0, 0.2, 1)`
- **Durations:**
  - `fast`: `90ms`
  - `normal`: `140ms`
- **Signature Moment:** Hard tactile button depress translating 3px and collapsing shadow.

---

## Curated OKLCH Accent Palettes
1. **acid-lime (Default):**
   - `accent-primary`: `oklch(0.85 0.25 130)`
   - `accent-subtle`: `oklch(0.85 0.25 130 / 0.25)`
   - `accent-hover`: `oklch(0.88 0.28 130)`
2. **electric-cyan:**
   - `accent-primary`: `oklch(0.80 0.18 215)`
   - `accent-subtle`: `oklch(0.80 0.18 215 / 0.25)`
   - `accent-hover`: `oklch(0.84 0.20 215)`
3. **hot-coral:**
   - `accent-primary`: `oklch(0.65 0.25 25)`
   - `accent-subtle`: `oklch(0.65 0.25 25 / 0.25)`
   - `accent-hover`: `oklch(0.70 0.27 25)`
4. **hyper-yellow:**
   - `accent-primary`: `oklch(0.92 0.22 100)`
   - `accent-subtle`: `oklch(0.92 0.22 100 / 0.25)`
   - `accent-hover`: `oklch(0.95 0.24 100)`

