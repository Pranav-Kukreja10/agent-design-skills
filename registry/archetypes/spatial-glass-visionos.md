# Archetype: spatial-glass-visionos

**ID:** `spatial-glass-visionos`  
**Name:** Spatial Glass VisionOS  
**Polarity:** `dark`  
**Description:** Optical depth, translucent glassmorphism, visionOS-inspired depth planes. Rich backdrop blur, delicate 1px specular specular rim highlights, ambient atmospheric reflections.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Floating depth cards layered over deep atmospheric canvas, generous optical padding.

---

## 2. surface
- **Neutral Tint:** Deep space glass with cool dark undertone (hue `260`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.10 0.012 260)`
  - `bg-elevated`: `oklch(0.18 0.015 260 / 0.65)`
  - `bg-surface-active`: `oklch(0.24 0.020 260 / 0.75)`
  - `bg-glass`: `oklch(0.16 0.015 260 / 0.50)`
  - `bg-sunken`: `oklch(0.08 0.010 260 / 0.80)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.98 0.005 260)` (Contrast $\ge 15:1$, AAA)
  - `text-muted`: `oklch(0.72 0.015 260)` (Contrast $\ge 5.2:1$, AA)
  - `text-subtle`: `oklch(0.54 0.018 260)`
  - `text-inverse`: `oklch(0.10 0.012 260)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Subtle uppercase on glass badge tags.
- **Numbers:** Tabular lining figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Spatial Precision):**
  - `display`: `Outfit`, provider: `google`, package: `@fontsource/outfit`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing B (Clean Modern):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Geist Mono`, provider: `google`, package: `@fontsource/geist-mono`
- **Pairing C (Editorial Translucent):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `mono`: `Inconsolata`, provider: `google`, package: `@fontsource/inconsolata`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(1 0 0 / 0.14)` (Delicate translucent rim border)
  - `border-subtle`: `oklch(1 0 0 / 0.08)`
  - `border-focus`: `oklch(0.72 0.18 200 / 0.85)`
  - `highlight-specular`: `oklch(1 0 0 / 0.28)` (Top 1px specular rim reflection)
- **Radius Scale (Soft Spatial Curve):**
  - `radius-outer`: `14px`
  - `radius-inner`: `8px`
  - `radius-badge`: `6px`
- **Depth & Blur:**
  - `surface-blur`: `20px` (Heavy frosted optical blur)
  - `shadow-surface`: `0 4px 20px 0 oklch(0 0 0 / 0.35), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 12px 36px 0 oklch(0 0 0 / 0.50), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `130ms`
  - `normal`: `220ms`
- **Signature Moment:** Smooth 220ms depth refraction bloom on hover and modal reveal.

---

## Curated OKLCH Accent Palettes
1. **ambient-aurora (Default):**
   - `accent-primary`: `oklch(0.72 0.18 200)`
   - `accent-subtle`: `oklch(0.72 0.18 200 / 0.18)`
   - `accent-hover`: `oklch(0.76 0.20 200)`
2. **luminescent-violet:**
   - `accent-primary`: `oklch(0.65 0.22 280)`
   - `accent-subtle`: `oklch(0.65 0.22 280 / 0.18)`
   - `accent-hover`: `oklch(0.70 0.24 280)`
3. **frost-pearl:**
   - `accent-primary`: `oklch(0.92 0.05 240)`
   - `accent-subtle`: `oklch(0.92 0.05 240 / 0.18)`
   - `accent-hover`: `oklch(0.96 0.05 240)`
4. **solar-glow:**
   - `accent-primary`: `oklch(0.78 0.18 60)`
   - `accent-subtle`: `oklch(0.78 0.18 60 / 0.18)`
   - `accent-hover`: `oklch(0.82 0.20 60)`

