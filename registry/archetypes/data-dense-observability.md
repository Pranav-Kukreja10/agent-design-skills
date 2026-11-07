# Archetype: data-dense-observability

**ID:** `data-dense-observability`  
**Name:** Data-Dense Analytics & Observability  
**Polarity:** `dark`  
**Description:** High-frequency telemetry, cloud infrastructure consoles, real-time analytics platforms, and trading terminals. Dense tabular alignment, compact UI scale, 4px tight corner radius, deep obsidian surfaces, and high-contrast status indicators.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1600px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(1.5rem, 2.5vw, 2.5rem)`
  - `normal`: `clamp(3rem, 4.5vw, 4.5rem)`
  - `breathing`: `clamp(4.5rem, 7vw, 6.5rem)`
- **Grid Structure:** Multi-pane observability dashboard, collapsible telemetry rail, dense tabular telemetry grids, 1px perimeter dividers.

---

## 2. surface
- **Neutral Tint:** Obsidian slate neutrals pulled toward hue `240`
- **Surfaces:**
  - `bg-canvas`: `oklch(0.11 0.012 240)`
  - `bg-elevated`: `oklch(0.16 0.015 240)`
  - `bg-surface-active`: `oklch(0.20 0.018 240)`
  - `bg-glass`: `oklch(0.16 0.015 240 / 0.80)`
  - `bg-sunken`: `oklch(0.08 0.010 240)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.98 0.004 240)` (Crisp white, Contrast $\ge 14:1$, AAA)
  - `text-secondary`: `oklch(0.84 0.008 240)` (High-visibility bright silver, Contrast $\ge 10:1$, AAA)
  - `text-muted`: `oklch(0.75 0.010 240)` (Crisp medium silver, Contrast $\ge 7.5:1$, AAA)
  - `text-subtle`: `oklch(0.50 0.015 240)`
  - `text-inverse`: `oklch(0.11 0.012 240)`

---

## 3. typography
- **Scale Ratio:** `1.200` (Minor Third - compact dense information scale)
- **Casing Rules:** Strict sentence case; code labels and machine IDs in raw monospaced formatting.
- **Numbers:** Strict tabular numerals (`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;`).

### De-converged Font Pairings
- **Pairing A (Default - Telemetry Precision):**
  - `display`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
  - `sans`: `IBM Plex Sans`, provider: `google`, package: `@fontsource/ibm-plex-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing B (Modern Monospace Density):**
  - `display`: `Geist Mono`, provider: `google`, package: `@fontsource/geist-mono`
  - `sans`: `Geist`, provider: `google`, package: `@fontsource/geist-sans`
  - `mono`: `Geist Mono`, provider: `google`, package: `@fontsource/geist-mono`
- **Pairing C (Developer Console):**
  - `display`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
  - `sans`: `Inter`, provider: `google`, package: `@fontsource/inter`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.24 0.015 240)` (1px solid tabular boundaries)
  - `border-subtle`: `oklch(0.19 0.012 240)` (row separators)
  - `border-focus`: `oklch(0.72 0.16 215)` (2px accessible focus ring)
  - `highlight-specular`: `oklch(1 0 0 / 0.12)`
- **Radius Scale (Compact Precision):**
  - `radius-outer`: `4px`
  - `radius-inner`: `2px`
  - `radius-badge`: `3px`
- **Depth & Blur:**
  - `surface-blur`: `6px`
  - `shadow-surface`: `0 1px 2px 0 oklch(0 0 0 / 0.50)`
  - `shadow-elevated`: `0 4px 16px 0 oklch(0 0 0 / 0.60)`

---

## 5. motion
- **Vector:** `urgent-precise`
- **Ease:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durations:**
  - `fast`: `90ms`
  - `normal`: `150ms`
- **Signature Moment:** Instant zero-latency tabular filter slice with 100ms row pulse.

---

## Curated OKLCH Accent Palettes
1. **telemetry-cyan (Default):**
   - `accent-primary`: `oklch(0.72 0.16 215)`
   - `accent-subtle`: `oklch(0.72 0.16 215 / 0.15)`
   - `accent-hover`: `oklch(0.76 0.18 215)`
2. **emerald-healthy:**
   - `accent-primary`: `oklch(0.70 0.18 145)`
   - `accent-subtle`: `oklch(0.70 0.18 145 / 0.15)`
   - `accent-hover`: `oklch(0.74 0.20 145)`
3. **amber-warning:**
   - `accent-primary`: `oklch(0.75 0.18 75)`
   - `accent-subtle`: `oklch(0.75 0.18 75 / 0.15)`
   - `accent-hover`: `oklch(0.79 0.20 75)`
4. **violet-spectrum:**
   - `accent-primary`: `oklch(0.66 0.20 280)`
   - `accent-subtle`: `oklch(0.66 0.20 280 / 0.15)`
   - `accent-hover`: `oklch(0.71 0.22 280)`

