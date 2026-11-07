# Archetype: atmospheric-aurora-launch

**ID:** `atmospheric-aurora-launch`  
**Name:** Atmospheric Aurora & Product Launch  
**Polarity:** `dark`  
**Description:** Next-generation AI product reveals, developer keynotes, and high-impact software experiences. Deep obsidian void, luminous multi-stop radial aurora mesh backdrops, subtle specular glass surfaces, and commanding display typography.

---

## 1. layout
- **Orientation:** Desktop-First
- **Container Max:** `1360px`
- **Section Vertical Rhythm:**
  - `tight`: `clamp(3rem, 5vw, 5rem)`
  - `normal`: `clamp(5rem, 8vw, 8rem)`
  - `breathing`: `clamp(8rem, 14vw, 13rem)`
- **Grid Structure:** Dynamic asymmetric hero staging, centered product stage, glass elevated card decks, ambient light bleeding.

---

## 2. surface
- **Neutral Tint:** Deep cosmic obsidian pulled toward deep midnight violet (hue `270`)
- **Surfaces:**
  - `bg-canvas`: `oklch(0.10 0.015 270)`
  - `bg-elevated`: `oklch(0.15 0.020 270)`
  - `bg-surface-active`: `oklch(0.20 0.025 270)`
  - `bg-glass`: `oklch(0.15 0.020 270 / 0.65)`
  - `bg-sunken`: `oklch(0.07 0.010 270)`
- **Text Foregrounds:**
  - `text-primary`: `oklch(0.98 0.004 270)` (Pure crisp white, Contrast $\ge 15:1$, AAA)
  - `text-secondary`: `oklch(0.84 0.008 270)` (High-visibility bright silver, Contrast $\ge 10:1$, AAA)
  - `text-muted`: `oklch(0.75 0.010 270)` (Crisp medium silver, Contrast $\ge 7.5:1$, AAA)
  - `text-subtle`: `oklch(0.55 0.018 270)`
  - `text-inverse`: `oklch(0.10 0.015 270)`

---

## 3. typography
- **Scale Ratio:** `1.333` (Perfect Fourth - dramatic cinematic hierarchy)
- **Casing Rules:** Expressive display titles in title case or sentence case; ultra-clean body copy.
- **Numbers:** Tabular numerals with open styling (`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;`).

### De-converged Font Pairings
- **Pairing A (Default - Visionary Product Launch):**
  - `display`: `Cabinet Grotesk`, provider: `fontshare`, package: `@fontsource/cabinet-grotesk`
  - `sans`: `Satoshi`, provider: `fontshare`, package: `@fontsource/satoshi`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing B (Commanding Display Impact):**
  - `display`: `Clash Display`, provider: `fontshare`, package: `@fontsource/clash-display`
  - `sans`: `Plus Jakarta Sans`, provider: `google`, package: `@fontsource/plus-jakarta-sans`
  - `mono`: `JetBrains Mono`, provider: `google`, package: `@fontsource/jetbrains-mono`
- **Pairing C (Avant-Garde Future):**
  - `display`: `Syne`, provider: `google`, package: `@fontsource/syne`
  - `sans`: `Inter`, provider: `google`, package: `@fontsource/inter`
  - `mono`: `Space Mono`, provider: `google`, package: `@fontsource/space-mono`

---

## 4. border_shadow
- **Hairlines:**
  - `border-hairline`: `oklch(0.30 0.025 270 / 0.50)` (Translucent specular glass borders)
  - `border-subtle`: `oklch(0.22 0.015 270 / 0.40)`
  - `border-focus`: `oklch(0.68 0.22 285)` (2px accessible focus ring)
  - `highlight-specular`: `oklch(1 0 0 / 0.22)` (Crisp 1px top edge glow)
- **Radius Scale (Modern Glass):**
  - `radius-outer`: `14px`
  - `radius-inner`: `10px`
  - `radius-badge`: `9999px`
- **Depth & Blur:**
  - `surface-blur`: `16px`
  - `shadow-surface`: `0 8px 32px 0 oklch(0 0 0 / 0.40), inset 0 1px 0 0 var(--highlight-specular)`
  - `shadow-elevated`: `0 24px 64px -12px oklch(0 0 0 / 0.60), 0 0 0 1px var(--border-hairline)`

---

## 5. motion
- **Vector:** `atmospheric-luminous`
- **Ease:** `cubic-bezier(0.22, 1, 0.36, 1)`
- **Durations:**
  - `fast`: `140ms`
  - `normal`: `260ms`
- **Signature Moment:** Subtle ambient radial aurora drift behind the primary hero card with specular sheen.

---

## Curated OKLCH Accent Palettes
1. **luminous-aurora (Default):**
   - `accent-primary`: `oklch(0.68 0.22 285)`
   - `accent-subtle`: `oklch(0.68 0.22 285 / 0.16)`
   - `accent-hover`: `oklch(0.73 0.24 285)`
2. **electric-cyan:**
   - `accent-primary`: `oklch(0.74 0.18 200)`
   - `accent-subtle`: `oklch(0.74 0.18 200 / 0.16)`
   - `accent-hover`: `oklch(0.78 0.20 200)`
3. **supernova-amber:**
   - `accent-primary`: `oklch(0.76 0.19 65)`
   - `accent-subtle`: `oklch(0.76 0.19 65 / 0.16)`
   - `accent-hover`: `oklch(0.80 0.21 65)`
4. **cosmic-emerald:**
   - `accent-primary`: `oklch(0.72 0.19 155)`
   - `accent-subtle`: `oklch(0.72 0.19 155 / 0.16)`
   - `accent-hover`: `oklch(0.76 0.21 155)`

