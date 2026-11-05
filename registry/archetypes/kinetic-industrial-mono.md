# Archetype: kinetic-industrial-mono

**ID:** `kinetic-industrial-mono`  
**Name:** Kinetic Industrial Mono  
**Polarity:** `dark`  
**Description:** High-velocity industrial consoles, flight instrumentation, space exploration avionics. Full monospaced type discipline, amber/phosphor high-density telemetry, zero rounded softness.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1440px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2rem, 3.5vw, 3.5rem)`
  - `normal`: `clamp(3.5rem, 6vw, 5.5rem)`
  - `breathing`: `clamp(5.5rem, 9vw, 8rem)`
- **Grid Structure:** Dense multi-instrument data panels, split diagnostic readouts, real-time telemetry streaming blocks.

---

## 2. surface
- **Neutral Tint:** Carbon graphite pulled toward hue `240`
- **Surfaces:**
  - `bg-canvas`: `oklch(0.10 0.01 240)`
  - `bg-elevated`: `oklch(0.15 0.01 240)`
  - `bg-surface-active`: `oklch(0.20 0.015 240)`
  - `bg-glass`: `oklch(0.15 0.01 240 / 0.85)`
  - `bg-sunken`: `oklch(0.07 0.008 240)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.95 0.005 240)` (Contrast $\ge 14:1$, AAA)
  - `text-muted`: `oklch(0.68 0.015 240)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.48 0.015 240)`
  - `text-inverse`: `oklch(0.10 0.01 240)`

---

## 3. typography
- **Scale Ratio:** `1.200` (Minor Third)
- **Casing Rules:** Strict sentence case on descriptions. All operational flags and telemetry IDs in uppercase monospaced characters.
- **Numbers:** Tabular fixed-pitch figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Avionics Precision):**
  - `display`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
  - `sans`: `IBM Plex Sans`, provider: `google`, package: `@fontsource/ibm-plex-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing B (Code Terminal):**
  - `display`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
  - `sans`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing C (Industrial Telemetry):**
  - `display`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`
  - `sans`: `Chivo`, provider: `google`, package: `@fontsource/chivo`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.26 0.015 240)` (1px solid technical hairlines)
  - `border-subtle`: `oklch(0.20 0.010 240)`
  - `border-focus`: `oklch(0.76 0.18 70)`
  - `highlight-specular`: `oklch(1 0 0 / 0.12)`
- **Radius Scale (Sharp Technical):**
  - `radius-outer`: `2px`
  - `radius-inner`: `1px`
  - `radius-badge`: `1px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 1px 2px 0 oklch(0 0 0 / 0.5), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 4px 12px 0 oklch(0 0 0 / 0.6), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `100ms`
  - `normal`: `160ms`
- **Signature Moment:** Single-frame status flicker on streaming telemetry buffer commits.

---

## Curated OKLCH Accent Palettes
1. **amber-crt (Default):**
   - `accent-primary`: `oklch(0.76 0.18 70)`
   - `accent-subtle`: `oklch(0.76 0.18 70 / 0.15)`
   - `accent-hover`: `oklch(0.80 0.20 70)`
2. **cyan-telemetry:**
   - `accent-primary`: `oklch(0.74 0.17 210)`
   - `accent-subtle`: `oklch(0.74 0.17 210 / 0.15)`
   - `accent-hover`: `oklch(0.78 0.19 210)`
3. **phosphor-green:**
   - `accent-primary`: `oklch(0.75 0.20 145)`
   - `accent-subtle`: `oklch(0.75 0.20 145 / 0.15)`
   - `accent-hover`: `oklch(0.80 0.22 145)`
4. **hazard-orange:**
   - `accent-primary`: `oklch(0.68 0.24 45)`
   - `accent-subtle`: `oklch(0.68 0.24 45 / 0.15)`
   - `accent-hover`: `oklch(0.72 0.26 45)`

