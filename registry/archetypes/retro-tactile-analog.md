# Archetype: retro-tactile-analog

**ID:** `retro-tactile-analog`  
**Name:** Retro Tactile Analog  
**Polarity:** `dark`  
**Description:** Teenage Engineering inspired synthesizer interfaces, industrial control panels, physical clicky toggles. Physical mechanical bevels, tactile rotary keycaps, monospaced LCD telemetry.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 3.5vw, 3.5rem)`
  - `normal`: `clamp(4rem, 6vw, 6rem)`
  - `breathing`: `clamp(6.5rem, 10vw, 9rem)`
- **Grid Structure:** Hardware module layout with mechanical knob racks, stepped key matrices, tactile physical dividers.

---

## 2. surface
- **Neutral Tint:** Industrial matte grey chassis (hue `240`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.20 0.015 240)`
  - `bg-elevated`: `oklch(0.27 0.020 240)`
  - `bg-surface-active`: `oklch(0.33 0.025 240)`
  - `bg-glass`: `oklch(0.25 0.020 240 / 0.85)`
  - `bg-sunken`: `oklch(0.14 0.012 240)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.96 0.005 240)` (Contrast $\ge 12:1$, AAA)
  - `text-muted`: `oklch(0.72 0.015 240)` (Contrast $\ge 4.8:1$, AA)
  - `text-subtle`: `oklch(0.55 0.020 240)`
  - `text-inverse`: `oklch(0.12 0.015 240)`

---

## 3. typography
- **Scale Ratio:** `1.200` (Minor Third)
- **Casing Rules:** Strict sentence case on descriptions. Monospaced uppercase parameter tags (e.g. `OSC-1`, `CUTOFF`).
- **Numbers:** Tabular fixed-pitch figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Mechanical Control):**
  - `display`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
  - `sans`: `Chivo`, provider: `google`, package: `@fontsource/chivo`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
- **Pairing B (Synthesizer Display):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing C (Analog Instrument):**
  - `display`: `Archivo`, provider: `google`, package: `@fontsource/archivo`
  - `sans`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`
  - `mono`: `DM Mono`, provider: `google`, package: `@fontsource/dm-mono`

---

## 4. border_shadow
- **Hairlines & Physical Bevels:**
  - `border-hairline`: `oklch(0.36 0.020 240)` (Physical 1px chassis seam)
  - `border-subtle`: `oklch(0.16 0.015 240)` (Sunken well seam)
  - `border-focus`: `oklch(0.68 0.24 45)`
  - `highlight-specular`: `oklch(1 0 0 / 0.22)` (Top mechanical beveled highlight)
- **Radius Scale (Keycap Corner):**
  - `radius-outer`: `6px`
  - `radius-inner`: `3px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `0px`
  - `shadow-surface`: `0 2px 0 0 oklch(0.12 0.015 240), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 4px 0 0 oklch(0.10 0.015 240), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `playful-tactile`
- **Ease:** `cubic-bezier(0, 0, 0.2, 1)`
- **Durations:**
  - `fast`: `80ms`
  - `normal`: `150ms`
- **Signature Moment:** Mechanical keycap depress: `translate(0, 2px)` collapsing bottom bevel shadow.

---

## Curated OKLCH Accent Palettes
1. **signal-orange (Default):**
   - `accent-primary`: `oklch(0.68 0.24 45)`
   - `accent-subtle`: `oklch(0.68 0.24 45 / 0.18)`
   - `accent-hover`: `oklch(0.72 0.26 45)`
2. **rotary-yellow:**
   - `accent-primary`: `oklch(0.85 0.20 95)`
   - `accent-subtle`: `oklch(0.85 0.20 95 / 0.18)`
   - `accent-hover`: `oklch(0.88 0.22 95)`
3. **slate-matte-grey:**
   - `accent-primary`: `oklch(0.48 0.02 240)`
   - `accent-subtle`: `oklch(0.48 0.02 240 / 0.18)`
   - `accent-hover`: `oklch(0.54 0.02 240)`
4. **console-blue:**
   - `accent-primary`: `oklch(0.52 0.18 245)`
   - `accent-subtle`: `oklch(0.52 0.18 245 / 0.18)`
   - `accent-hover`: `oklch(0.56 0.20 245)`

