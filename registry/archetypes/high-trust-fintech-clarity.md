# Archetype: high-trust-fintech-clarity

**ID:** `high-trust-fintech-clarity`  
**Name:** High-Trust Fintech Clarity  
**Polarity:** `light`  
**Description:** Institutional financial clarity inspired by Stripe and Mercury. Immaculate white surfaces, calm navy/cobalt accents, razor-thin hairlines, tabular figures, sober corporate authority.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1280px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(2.5rem, 4vw, 4rem)`
  - `normal`: `clamp(4.5rem, 7vw, 6.5rem)`
  - `breathing`: `clamp(7rem, 12vw, 11rem)`
- **Grid Structure:** Structured administrative tables, high-density split transaction view, compact summary metrics.

---

## 2. surface
- **Neutral Tint:** Pure crisp cool light neutral (hue `245`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.98 0.003 245)`
  - `bg-elevated`: `oklch(1 0 0)`
  - `bg-surface-active`: `oklch(0.95 0.008 245)`
  - `bg-glass`: `oklch(1 0 0 / 0.85)`
  - `bg-sunken`: `oklch(0.93 0.008 245)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.14 0.015 250)` (Contrast $\ge 14:1$, AAA)
  - `text-muted`: `oklch(0.44 0.015 250)` (Contrast $\ge 5:1$, AA)
  - `text-subtle`: `oklch(0.58 0.018 250)`
  - `text-inverse`: `oklch(0.98 0.003 245)`

---

## 3. typography
- **Scale Ratio:** `1.250` (Major Third)
- **Casing Rules:** Strict sentence case on headings and buttons. Uppercase allowed only on monospaced transaction hashes and currency codes.
- **Numbers:** Tabular lining figures (`font-variant-numeric: tabular-nums`).

### De-converged Font Pairings
- **Pairing A (Default - Institutional Clarity):**
  - `display`: `Sora`, provider: `google`, package: `@fontsource/sora`
  - `sans`: `Public Sans`, provider: `google`, package: `@fontsource/public-sans`
  - `mono`: `Fira Code`, provider: `google`, package: `@fontsource/fira-code`
- **Pairing B (Modern Corporate):**
  - `display`: `General Sans`, provider: `fontshare`, package: `@fontsource/general-sans`
  - `sans`: `Instrument Sans`, provider: `google`, package: `@fontsource/instrument-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing C (Sovereign Banking):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Switzer`, provider: `fontshare`, package: `@fontsource/switzer`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.86 0.008 245)` (Crisp 1px institutional hairline)
  - `border-subtle`: `oklch(0.91 0.006 245)`
  - `border-focus`: `oklch(0.56 0.18 245 / 0.8)`
  - `highlight-specular`: `oklch(1 0 0 / 0.6)`
- **Radius Scale (Subtle Corporate):**
  - `radius-outer`: `6px`
  - `radius-inner`: `4px`
  - `radius-badge`: `4px`
- **Depth & Blur:**
  - `surface-blur`: `8px`
  - `shadow-surface`: `0 1px 3px 0 oklch(0.14 0.01 250 / 0.05), 0 0 0 1px var(--border-hairline)`
  - `shadow-elevated`: `0 6px 18px -2px oklch(0.14 0.01 250 / 0.08), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `authoritative`
- **Ease:** `cubic-bezier(0.2, 0, 0, 1)`
- **Durations:**
  - `fast`: `110ms`
  - `normal`: `180ms`
- **Signature Moment:** Precise 180ms financial transaction commit bar pulse upon successful ledger settlement.

---

## Curated OKLCH Accent Palettes
1. **mercury-blue (Default):**
   - `accent-primary`: `oklch(0.56 0.18 245)`
   - `accent-subtle`: `oklch(0.56 0.18 245 / 0.12)`
   - `accent-hover`: `oklch(0.50 0.20 245)`
2. **verified-teal:**
   - `accent-primary`: `oklch(0.64 0.16 185)`
   - `accent-subtle`: `oklch(0.64 0.16 185 / 0.12)`
   - `accent-hover`: `oklch(0.58 0.18 185)`
3. **sovereign-navy:**
   - `accent-primary`: `oklch(0.38 0.14 250)`
   - `accent-subtle`: `oklch(0.38 0.14 250 / 0.12)`
   - `accent-hover`: `oklch(0.32 0.16 250)`
4. **settlement-emerald:**
   - `accent-primary`: `oklch(0.68 0.16 150)`
   - `accent-subtle`: `oklch(0.68 0.16 150 / 0.12)`
   - `accent-hover`: `oklch(0.62 0.18 150)`

