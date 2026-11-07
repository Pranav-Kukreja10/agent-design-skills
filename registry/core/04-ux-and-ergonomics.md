# Core Module 04: UX Ergonomics, Realistic Seed Data & Component States

**Version:** 1.0  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

---

## 1. The 5 Mandatory UI States

Half-baked AI components only implement the "happy path" default state. Every interactive component, list, table, or form must explicitly implement all 5 states:

```
[ 1. Default ] ──> [ 2. Interactive ] ──> [ 3. Loading ] ──> [ 4. Empty ] / [ 5. Inline Error ]
```

1. **Default State:** Clean, idle representation consuming base surface and text tokens.
2. **Interactive State:** Immediate, tactile feedback on `:hover`, `:active`, and `:focus-visible` (utilizing `var(--ease-primary)` and `var(--duration-fast)`). Focus states must render crisp, high-contrast outlines using `var(--border-focus)`.
3. **Loading State:** Must use `[aria-busy="true"]` skeleton placeholders that match the exact geometry (`var(--radius-inner)`), height, and layout of the real content to eliminate layout shift (CLS).
4. **Empty State:** Structured container explaining why data is absent, paired with an action button that inherits the view's primary CTA.
5. **Inline Error State:** Clear, localized message indicating what failed and how to recover, without destroying user input or hiding the form.

---

## 2. Realistic Seed Data Mandate (`// SAMPLE DATA`)

Mock data must reflect real-world messiness rather than sterile textbook strings.

### Banned Seed Tropes
- Never use `"John Doe"`, `"Jane Doe"`, `"Test User"`, or `"Acme Corporation"`.
- Never use `"Lorem ipsum dolor sit amet"`.
- Never use generic placeholder prices like `"$99.00"` or `"$99.99"`.
- Never use repetitive fixed-length strings that conceal layout breakage.

### Mandatory Seed Diversity Requirements
When authoring seed data fixtures (annotated with `// SAMPLE DATA`):
1. **Asymmetric Text Lengths:** Some entity names must be short (`"Paytm"`), others moderately long (`"HDFC Bank Settlement"`), and at least one must be deliberately extended (`"State Bank of India — Commercial Branch Mumbai Nariman Point"`) to explicitly test and prove text truncation (`text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`).
2. **Null State / Fallback Handling:** At least one record must have a missing avatar or logo, exercising the two-letter uppercase monogram fallback on `var(--bg-sunken)`.
3. **Zero / Edge Values:** Include records with zero balances (`$0.00`), negative deltas, or unverified statuses (`"Pending Sync"`).
4. **Realistic Formats:** Use authentic financial identifiers (e.g., GSTINs, IBANs, UUIDs, TxHashes like `0x8F2D...c41a`).

---

## 3. Numeric & Tabular Typography Law

All numbers, financial quantities, telemetry counters, metrics, and timestamps must consume lining tabular figures with open zeros:
```css
.tabular-nums, time, [data-numeric="true"], table, [data-tabular="true"] {
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;
}
```
- NEVER use coding monospace fonts (`--font-mono`) or `slashed-zero` on hero numbers, counters, or KPI figures. Always use `var(--font-display)` or `var(--font-sans)` with `font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;` so digits have clean, open-oval zeros (`0`) with zero horizontal jitter.
- Reserve `var(--font-mono)` strictly for code snippets, file paths, or git hashes.

### Human Eyesight & Readability Floor (No Micro-Print)
1. **Never use font sizes below `13px` (`0.8125rem`).** Ban Tailwind micro-classes (`text-[9px]`, `text-[10px]`, `text-[11px]`).
2. **Comfortable Secondary Text (`14px–15px`):** Sub-labels (metadata beneath headings, secondary descriptions beneath primary titles), navigation tabs, and buttons MUST be `0.875rem–0.9375rem` (`14px–15px`) in high-contrast `var(--text-secondary)`—never `11px` dim gray.
3. **Prominent Card Titles (`18px–20px`):** Primary item titles inside rows or cards (e.g., entity names, item titles) must be `1.125rem–1.25rem` (`18px–20px`, `font-weight: 600`) so they anchor the row clearly.
4. **Never Combine Small Size + Low Opacity:** If text is `13px–14px`, it MUST use `var(--text-secondary)` (high contrast) and `font-weight: 500`, never low-opacity `opacity-40` / `opacity-50` or `text-zinc-500`.

---

## 4. Keyboard Navigation, Accessibility & Composite Input Focus

- **Universal Input Reset & Focus Visibility:** Never suppress focus outlines on interactive controls without providing a token-bound replacement, and delegate composite input focus to the outer container:
  ```css
  /* Universal Input Reset: Prevent inner rectangular outlines inside composite input wrappers */
  input, textarea, select {
    outline: none;
  }

  button:focus-visible, a:focus-visible, [role="button"]:focus-visible, [role="tab"]:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
  }
  ```
- **Universal Composite Input Focus Law:** For form fields and composite inputs (inputs with icons, prefixes, search bars, or action buttons), never allow a raw inner `<input>` focus box to clip inside a rounded wrapper; use `outline: none` on the inner input and apply focus feedback (`border-color` or ring) to the outer field container via `:focus-within`.
- Table headers must include `scope="col"`.
- Sorting headers must declare `aria-sort="ascending" | "descending" | "none"`.
- Interactive action triggers must use `<button>` elements, never clickable `<div>` or `<span>` elements without full keyboard event handlers and ARIA semantics.

---

## 5. Mobile Bottom-Dock Safe Clearance & Thumb Zone Ergonomics

On `mobile-first` or `adaptive-hybrid` layouts:
- Mobile bottom navigation (`< 768px`) MUST use `position: fixed; bottom: 0; left: 0; right: 0; z-index: 50`.
- The scroll container MUST reserve `padding-bottom: calc(5rem + env(safe-area-inset-bottom))` (or `calc(dock-height + 2rem)`) so scrollable content is never sliced or trapped behind floating controls.
- Primary action triggers (e.g., primary transaction CTAs, submission buttons) must remain anchored in the lower thumb zone (bottom 35% of the mobile viewport) for ergonomic one-handed operation.

---

## 6. Proportional Canvas Sizing Architecture

A primary giveaway of AI-generated frontends is stretching single-purpose tools into 1440px corporate enterprise SaaS layouts with invented brand logos and edge-to-edge container boxes. Layout width must strictly reflect application intent:

### 1. Focused Utilities & Compact Views
- **Applicable Domains:** Single-purpose utilities, compact calculators, modal inspectors, conversion tools, or dedicated single-task panels.
- **Desktop Sizing:** Compact, centered layout capped at `max-w-3xl` (`768px`–`880px`) on desktop with ample canvas breathing room.
- **Header & Navigation:** Centered segmented control dock or quiet tab pills directly integrated with the view; never invent a 1440px corporate enterprise header, unprompted brand logos, or multi-tier navigation bars for a focused utility.

### 2. Data-Dense Operational Workspaces
- **Applicable Domains:** Financial ledgers, multi-column reconciliation tables, IDEs, pipeline monitors, or complex accounting settings consoles.
- **Desktop Sizing:** Wide structured container (`max-w-6xl` / `1152px`–`1280px`) or fluid responsive workspace (`w-full px-6`) to comfortably accommodate dense columns without awkward horizontal scrolling.



