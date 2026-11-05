# Archetype: civic-govtech-accessible

**ID:** `civic-govtech-accessible`  
**Name:** Civic Govtech Accessible  
**Polarity:** `light`  
**Description:** High-trust public sector portals, sovereign digital identity systems, civic institutions. Ultra-high WCAG AAA 10:1 contrast, maximum legibility, zero ambiguity, completely accessible form ergonomics.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1200px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Clear single-column and two-column reading layouts, high-contrast step indicators, large readable field groups.

---

## 2. surface
- **Neutral Tint:** High-contrast pure white and neutral charcoal
- **Surfaces:**
  - `bg-canvas`: `oklch(0.99 0.002 90)`
  - `bg-elevated`: `oklch(1 0 0)`
  - `bg-surface-active`: `oklch(0.94 0.005 90)`
  - `bg-glass`: `oklch(1 0 0)`
  - `bg-sunken`: `oklch(0.92 0.005 90)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.12 0.005 260)` (Contrast $\ge 15:1$, AAA)
  - `text-muted`: `oklch(0.38 0.010 260)` (Contrast $\ge 6.5:1$, AAA)
  - `text-subtle`: `oklch(0.50 0.012 260)`
  - `text-inverse`: `oklch(1 0 0)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on all headings, field labels, error messages, and buttons.
- **Numbers:** Highly distinct tabular lining figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Hyperlegible Civic):**
  - `display`: `Atkinson Hyperlegible`, provider: `google`, package: `@fontsource/atkinson-hyperlegible`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fragment Mono`, provider: `google`, package: `@fontsource/fragment-mono`
- **Pairing B (Institutional Formal):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `DM Sans`, provider: `google`, package: `@fontsource/dm-sans`
  - `mono`: `IBM Plex Mono`, provider: `google`, package: `@fontsource/ibm-plex-mono`
- **Pairing C (Clean Public Service):**
  - `display`: `Work Sans`, provider: `google`, package: `@fontsource/work-sans`
  - `sans`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.30 0.01 260)` (Stark accessible 1.5px/1px border)
  - `border-subtle`: `oklch(0.75 0.005 90)`
  - `border-focus`: `oklch(0.42 0.16 245)` (High-visibility 3px focus ring)
  - `highlight-specular`: `oklch(0 0 0 / 0)`
- **Radius Scale (Clear Accessible):**
  - `radius-outer`: `4px`
  - `radius-inner`: `3px`
  - `radius-badge`: `2px`
- **Depth & Blur:**
  - `surface-blur`: `0px`
  - `shadow-surface`: `none`
  - `shadow-elevated`: `0 4px 12px 0 oklch(0 0 0 / 0.1), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `authoritative`
- **Ease:** `cubic-bezier(0.2, 0, 0, 1)`
- **Durations:**
  - `fast`: `100ms`
  - `normal`: `180ms`
- **Signature Moment:** Clear high-contrast focus check indicator confirmation on form submission.

---

## Curated OKLCH Accent Palettes
1. **civic-flag-blue (Default):**
   - `accent-primary`: `oklch(0.42 0.16 245)`
   - `accent-subtle`: `oklch(0.42 0.16 245 / 0.12)`
   - `accent-hover`: `oklch(0.36 0.18 245)`
2. **public-emerald:**
   - `accent-primary`: `oklch(0.55 0.15 150)`
   - `accent-subtle`: `oklch(0.55 0.15 150 / 0.12)`
   - `accent-hover`: `oklch(0.48 0.17 150)`
3. **accessible-gold:**
   - `accent-primary`: `oklch(0.68 0.18 75)`
   - `accent-subtle`: `oklch(0.68 0.18 75 / 0.14)`
   - `accent-hover`: `oklch(0.62 0.20 75)`
4. **sovereign-brick:**
   - `accent-primary`: `oklch(0.46 0.18 30)`
   - `accent-subtle`: `oklch(0.46 0.18 30 / 0.12)`
   - `accent-hover`: `oklch(0.40 0.20 30)`

