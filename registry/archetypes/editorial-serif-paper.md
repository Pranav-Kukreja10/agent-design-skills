# Archetype: editorial-serif-paper

**ID:** `editorial-serif-paper`  
**Name:** Editorial Serif Paper  
**Polarity:** `light`  
**Description:** High-craft publications, long-form journals, investigative reporting, cultural institutions. Warm tactile alabaster surfaces, bookish contrast, disciplined broadsheet typography.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1200px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3rem, 5vw, 4.5rem)`
  - `normal`: `clamp(5rem, 8vw, 7.5rem)`
  - `breathing`: `clamp(8rem, 14vw, 12rem)`
- **Grid Structure:** Broad reading margins, asymmetrical column hierarchy, hairline horizontal rules, generous whitespace.

---

## 2. surface
- **Neutral Tint:** Warm paper neutrals pulled toward hue `75`
- **Surfaces:**
  - `bg-canvas`: `oklch(0.97 0.008 75)` (Warm bone/alabaster paper)
  - `bg-elevated`: `oklch(0.99 0.005 75)` (Crisp bright vellum surface)
  - `bg-surface-active`: `oklch(0.94 0.010 75)`
  - `bg-glass`: `oklch(0.97 0.008 75 / 0.85)`
  - `bg-sunken`: `oklch(0.92 0.012 75)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.20 0.012 50)` (Deep printer's ink, Contrast $\ge 12:1$, AAA)
  - `text-muted`: `oklch(0.48 0.015 65)` (Contrast $\ge 4.8:1$, AA)
  - `text-subtle`: `oklch(0.62 0.015 70)`
  - `text-inverse`: `oklch(0.98 0.005 75)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Italicized emphasis on literary quotes.
- **Numbers:** Tabular figures on bibliographic citations and tables (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Literary Classic):**
  - `display`: `Newsreader`, provider: `google`, package: `@fontsource/newsreader`
  - `sans`: `Source Serif 4`, provider: `google`, package: `@fontsource/source-serif-4`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing B (Modern Broadsheet):**
  - `display`: `Fraunces`, provider: `google`, package: `@fontsource/fraunces`
  - `sans`: `Merriweather Sans`, provider: `google`, package: `@fontsource/merriweather-sans`
  - `mono`: `IBM Plex Mono`, provider: `google`, package: `@fontsource/ibm-plex-mono`
- **Pairing C (European Editorial):**
  - `display`: `Bespoke Serif`, provider: `fontshare`, package: `@fontsource/bespoke-serif`
  - `sans`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `mono`: `Inconsolata`, provider: `google`, package: `@fontsource/inconsolata`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.85 0.010 75)` (Refined 1px letterpress rule)
  - `border-subtle`: `oklch(0.90 0.008 75)`
  - `border-focus`: `oklch(0.48 0.18 25 / 0.80)`
  - `highlight-specular`: `oklch(1 0 0 / 0.60)`
- **Radius Scale (Sharp Architectural):**
  - `radius-outer`: `3px`
  - `radius-inner`: `2px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `4px`
  - `shadow-surface`: `0 1px 3px 0 oklch(0.20 0.012 50 / 0.06), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 6px 16px -2px oklch(0.20 0.012 50 / 0.08), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `calm`
- **Ease:** `cubic-bezier(0.25, 1, 0.5, 1)`
- **Durations:**
  - `fast`: `140ms`
  - `normal`: `240ms`
- **Signature Moment:** Gentle 240ms ink-soak underline expansion upon section entry.

---

## Curated OKLCH Accent Palettes
1. **oxblood-vermillion (Default):**
   - `accent-primary`: `oklch(0.48 0.18 25)`
   - `accent-subtle`: `oklch(0.48 0.18 25 / 0.12)`
   - `accent-hover`: `oklch(0.42 0.20 25)`
2. **deep-forest:**
   - `accent-primary`: `oklch(0.42 0.12 150)`
   - `accent-subtle`: `oklch(0.42 0.12 150 / 0.12)`
   - `accent-hover`: `oklch(0.38 0.14 150)`
3. **scholarly-navy:**
   - `accent-primary`: `oklch(0.40 0.14 245)`
   - `accent-subtle`: `oklch(0.40 0.14 245 / 0.12)`
   - `accent-hover`: `oklch(0.35 0.16 245)`
4. **terracotta-raw:**
   - `accent-primary`: `oklch(0.55 0.15 45)`
   - `accent-subtle`: `oklch(0.55 0.15 45 / 0.12)`
   - `accent-hover`: `oklch(0.50 0.17 45)`

