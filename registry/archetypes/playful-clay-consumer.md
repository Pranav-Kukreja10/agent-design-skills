# Archetype: playful-clay-consumer

**ID:** `playful-clay-consumer`  
**Name:** Playful Clay Consumer  
**Polarity:** `light`  
**Description:** Soft-inflated 3D tactile surfaces, claymorphism, friendly consumer joy. Puffy pill corners, gentle directional shadows, warm marshmallow tactile feedback.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1200px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 11vw, 10rem)`
- **Grid Structure:** Chunky friendly cards, generous rounded containers, approachable visual grouping.

---

## 2. surface
- **Neutral Tint:** Soft cream and light marshmallow tints (hue `280`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.008 280)`
  - `bg-elevated`: `oklch(0.99 0.004 280)`
  - `bg-surface-active`: `oklch(0.93 0.012 280)`
  - `bg-glass`: `oklch(0.99 0.004 280 / 0.85)`
  - `bg-sunken`: `oklch(0.92 0.010 280)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.20 0.015 280)` (Contrast $\ge 12:1$, AAA)
  - `text-muted`: `oklch(0.48 0.018 280)` (Contrast $\ge 4.8:1$, AA)
  - `text-subtle`: `oklch(0.60 0.018 280)`
  - `text-inverse`: `oklch(0.99 0.004 280)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Friendly sentence case on headings and buttons. Soft rounded typographic curves.
- **Numbers:** Friendly tabular figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Chunky Friendly):**
  - `display`: `Bricolage Grotesque`, provider: `google`, package: `@fontsource/bricolage-grotesque`
  - `sans`: `Fredoka`, provider: `google`, package: `@fontsource/fredoka`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (Soft Modern):**
  - `display`: `Outfit`, provider: `google`, package: `@fontsource/outfit`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing C (Tactile Studio):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.88 0.010 280)`
  - `border-subtle`: `oklch(0.92 0.008 280)`
  - `border-focus`: `oklch(0.66 0.22 295)`
  - `highlight-specular`: `oklch(1 0 0 / 0.8)`
- **Radius Scale (Puffy Clay Curve):**
  - `radius-outer`: `18px`
  - `radius-inner`: `12px`
  - `radius-badge`: `9999px`
- **Depth & Blur:**
  - `surface-blur`: `8px`
  - `shadow-surface`: `0 4px 12px 0 oklch(0.20 0.015 280 / 0.06), inset 0 2px 4px 0 oklch(1 0 0 / 0.8)`
  - `shadow-elevated`: `0 12px 28px -4px oklch(0.20 0.015 280 / 0.10), inset 0 2px 6px 0 oklch(1 0 0 / 0.9)`

---

## 5. motion
- **Vector:** `playful-tactile`
- **Ease:** `cubic-bezier(0, 0, 0.2, 1)`
- **Durations:**
  - `fast`: `90ms`
  - `normal`: `170ms`
- **Signature Moment:** Tactile clay compress: `scale(0.98)` with springy instant rebound.

---

## Curated OKLCH Accent Palettes
1. **candy-violet (Default):**
   - `accent-primary`: `oklch(0.66 0.22 295)`
   - `accent-subtle`: `oklch(0.66 0.22 295 / 0.15)`
   - `accent-hover`: `oklch(0.70 0.24 295)`
2. **bubble-mint:**
   - `accent-primary`: `oklch(0.82 0.16 160)`
   - `accent-subtle`: `oklch(0.82 0.16 160 / 0.15)`
   - `accent-hover`: `oklch(0.85 0.18 160)`
3. **tangerine-pop:**
   - `accent-primary`: `oklch(0.72 0.22 45)`
   - `accent-subtle`: `oklch(0.72 0.22 45 / 0.15)`
   - `accent-hover`: `oklch(0.76 0.24 45)`
4. **sky-marshmallow:**
   - `accent-primary`: `oklch(0.76 0.15 220)`
   - `accent-subtle`: `oklch(0.76 0.15 220 / 0.15)`
   - `accent-hover`: `oklch(0.80 0.17 220)`

