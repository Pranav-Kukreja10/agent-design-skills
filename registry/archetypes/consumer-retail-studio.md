# Archetype: consumer-retail-studio

**ID:** `consumer-retail-studio`  
**Name:** Consumer Retail & E-Commerce Studio  
**Polarity:** `light`  
**Description:** High-end consumer retail, modern e-commerce, and product studio showcases (Nike / Apple Store / SSENSE mold). Pure white canvas, borderless `#f5f5f7` studio product tiles, stark `#111111` primary ink, crisp secondary text, slight 8px–12px rounded corners, pill primary CTAs, and zero visible grid lines or card borders.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1440px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 4vw, 3.5rem)`
  - `normal`: `clamp(4rem, 6vw, 6rem)`
  - `breathing`: `clamp(6rem, 10vw, 9rem)`
- **Grid Structure:** Borderless product studio grid, asymmetric editorial showcases, floating pill action bars, generous negative space.

---

## 2. surface
- **Neutral Tint:** Pure neutral canvas with subtle cool studio gray tile fills (`#f5f5f7`)
- **Surfaces:**
  - `bg-canvas`: `oklch(1 0 0)` (Pure #ffffff)
  - `bg-elevated`: `oklch(0.97 0.002 260)` (#f5f5f7 studio tile surface)
  - `bg-surface-active`: `oklch(0.93 0.004 260)`
  - `bg-glass`: `oklch(1 0 0 / 0.85)`
  - `bg-sunken`: `oklch(0.95 0.003 260)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.14 0.012 260)` (Stark black ink ~#111111, Contrast $\ge 14:1$, AAA)
  - `text-secondary`: `oklch(0.38 0.015 260)` (Crisp charcoal slate ~#52525b, Contrast $\ge 7:1$, AAA)
  - `text-muted`: `oklch(0.44 0.015 260)` (Crisp medium slate, Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.55 0.015 260)`
  - `text-inverse`: `oklch(1 0 0)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Expressive uppercase for display brand headers; clean sentence case for product metadata, descriptions, and action labels.
- **Numbers:** Open tabular numerals (`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;`).

### De-converged Font Pairings
- **Pairing A (Default - Modern Editorial Retail):**
  - `display`: `Oswald`, provider: `google`, package: `@fontsource/oswald`
  - `sans`: `Plus Jakarta Sans`, provider: `google`, package: `@fontsource/plus-jakarta-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing B (Clean Minimalist Contemporary):**
  - `display`: `Plus Jakarta Sans`, provider: `google`, package: `@fontsource/plus-jakarta-sans`
  - `sans`: `Inter`, provider: `google`, package: `@fontsource/inter`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing C (Expressive Avant-Garde):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `Plus Jakarta Sans`, provider: `google`, package: `@fontsource/plus-jakarta-sans`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `transparent` (Borderless product cards / zero grid lines)
  - `border-subtle`: `oklch(0.92 0.005 260)` (Subtle dividers where needed)
  - `border-focus`: `oklch(0.14 0.012 260)` (2px accessible focus ring)
  - `highlight-specular`: `transparent`
- **Radius Scale (Soft Consumer):**
  - `radius-outer`: `12px`
  - `radius-inner`: `8px`
  - `radius-badge`: `9999px` (Pill badges strictly for item metadata)
- **Depth & Blur:**
  - `surface-blur`: `0px`
  - `shadow-surface`: `none` (Borderless, flat studio tiles)
  - `shadow-elevated`: `0 12px 32px -8px oklch(0 0 0 / 0.08)` (Floating popover/cart shadow)

---

## 5. motion
- **Vector:** `deliberate-smooth`
- **Ease:** `cubic-bezier(0.2, 0.8, 0.2, 1)`
- **Durations:**
  - `fast`: `150ms`
  - `normal`: `240ms`
- **Signature Moment:** Silky image micro-scale and subtle soft elevation on product card focus (200ms ease).

---

## Curated OKLCH Accent Palettes
1. **stark-monochrome (Default):**
   - `accent-primary`: `oklch(0.14 0.012 260)` (Stark black ink)
   - `accent-subtle`: `oklch(0.14 0.012 260 / 0.08)`
   - `accent-hover`: `oklch(0.25 0.015 260)`
2. **electric-orange:**
   - `accent-primary`: `oklch(0.65 0.22 45)`
   - `accent-subtle`: `oklch(0.65 0.22 45 / 0.12)`
   - `accent-hover`: `oklch(0.60 0.24 45)`
3. **cobalt-pulse:**
   - `accent-primary`: `oklch(0.52 0.22 255)`
   - `accent-subtle`: `oklch(0.52 0.22 255 / 0.12)`
   - `accent-hover`: `oklch(0.48 0.24 255)`
4. **forest-luxe:**
   - `accent-primary`: `oklch(0.45 0.14 150)`
   - `accent-subtle`: `oklch(0.45 0.14 150 / 0.12)`
   - `accent-hover`: `oklch(0.40 0.15 150)`

