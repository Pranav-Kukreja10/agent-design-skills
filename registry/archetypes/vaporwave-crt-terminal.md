# Archetype: vaporwave-crt-terminal

**ID:** `vaporwave-crt-terminal`  
**Name:** Vaporwave CRT Terminal  
**Polarity:** `dark`  
**Description:** 1980s phosphor monitor aesthetic, scanline overlays, neon sunset nostalgia. Vintage terminal command lines, monospaced ASCII geometry, retro-futuristic synthwave depth.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 3.5vw, 3.5rem)`
  - `normal`: `clamp(3.5rem, 6vw, 5.5rem)`
  - `breathing`: `clamp(5.5rem, 9vw, 8rem)`
- **Grid Structure:** Terminal command shell with split prompt windows, phosphor status lines, retro diagnostic matrices.

---

## 2. surface
- **Neutral Tint:** Deep CRT screen phosphor obsidian (hue `290`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.09 0.012 290)`
  - `bg-elevated`: `oklch(0.14 0.018 290)`
  - `bg-surface-active`: `oklch(0.20 0.025 290)`
  - `bg-glass`: `oklch(0.14 0.018 290 / 0.80)`
  - `bg-sunken`: `oklch(0.06 0.008 290)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.96 0.005 290)` (Contrast $\ge 15:1$, AAA)
  - `text-muted`: `oklch(0.70 0.018 290)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.50 0.020 290)`
  - `text-inverse`: `oklch(0.09 0.012 290)`

---

## 3. typography
- **Scale Ratio:** `1.200` (Minor Third)
- **Casing Rules:** Strict sentence case on headings. Command prompts and telemetry tags in monospaced uppercase.
- **Numbers:** Tabular monospaced figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Phosphor CRT):**
  - `display`: `VT323`, provider: `google`, package: `@fontsource/vt323`
  - `sans`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing B (Cyber Terminal):**
  - `display`: `Chakra Petch`, provider: `google`, package: `@fontsource/chakra-petch`
  - `sans`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing C (Retro Grotesque):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.28 0.02 290)`
  - `border-subtle`: `oklch(0.18 0.015 290)`
  - `border-focus`: `oklch(0.78 0.18 200)`
  - `highlight-specular`: `oklch(1 0 0 / 0.15)`
- **Radius Scale (Curved CRT Bezel):**
  - `radius-outer`: `8px`
  - `radius-inner`: `4px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 2px 4px 0 oklch(0 0 0 / 0.5), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 8px 24px 0 oklch(0 0 0 / 0.7), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `100ms`
  - `normal`: `180ms`
- **Signature Moment:** Phosphor scanline sweep across the active CRT terminal block on command execution.

---

## Curated OKLCH Accent Palettes
1. **phosphor-cyan (Default):**
   - `accent-primary`: `oklch(0.78 0.18 200)`
   - `accent-subtle`: `oklch(0.78 0.18 200 / 0.15)`
   - `accent-hover`: `oklch(0.82 0.20 200)`
2. **neon-flamingo-pink:**
   - `accent-primary`: `oklch(0.70 0.26 340)`
   - `accent-subtle`: `oklch(0.70 0.26 340 / 0.15)`
   - `accent-hover`: `oklch(0.74 0.28 340)`
3. **sunset-purple:**
   - `accent-primary`: `oklch(0.58 0.24 290)`
   - `accent-subtle`: `oklch(0.58 0.24 290 / 0.15)`
   - `accent-hover`: `oklch(0.62 0.26 290)`
4. **amber-matrix:**
   - `accent-primary`: `oklch(0.82 0.18 80)`
   - `accent-subtle`: `oklch(0.82 0.18 80 / 0.15)`
   - `accent-hover`: `oklch(0.86 0.20 80)`

