# Core Module 03: Cross-Page Geometric Unity & Token Contract

**Version:** 4.2  
**Target Archetype:** `quiet-luxury-atelier`  
**Token Contract:** `./tokens.css`  
**Design Specification:** `./DESIGN.md`

---

## 1. Scoped `var()` Mandate

To guarantee cross-page consistency across multiple AI generations, raw CSS values are strictly banned from UI components:

- **Forbidden Literals:** Hardcoded hex values (`#0a0a0a`), arbitrary OKLCH strings, inline pixel radii (`border-radius: 9px`), ad-hoc box shadows, or standalone blur amounts.
- **Mandatory Token Usage:**
  - Backgrounds: `var(--bg-canvas)`, `var(--bg-elevated)`, `var(--bg-surface-active)`, `var(--bg-glass)`
  - Text & Labels: `var(--text-primary)`, `var(--text-muted)`, `var(--text-subtle)`, `var(--text-inverse)`
  - Borders & Lines: `var(--border-hairline)`, `var(--border-subtle)`, `var(--border-focus)`, `var(--highlight-specular)`
  - Radii: `var(--radius-outer)`, `var(--radius-inner)`, `var(--radius-badge)`
  - Shadows & Blur: `var(--shadow-surface)`, `var(--shadow-elevated)`, `var(--surface-blur)`
  - Rhythm & Bounds: `var(--section-py-tight)`, `var(--section-py-normal)`, `var(--section-py-breathing)`, `var(--container-max)`

---

## 2. Concentric Corner Geometry Math

A hallmark of amateur UI is mismatched nested corner curves (e.g., an 8px button inside an 8px padded container resulting in awkward corner crowding).

### The Concentric Formula
Whenever an element with a corner radius is nested inside a padded container with a corner radius, the child's radius must strictly follow:

$$\text{radius}_{\text{inner}} = \max\left(0\text{px}, \text{radius}_{\text{outer}} - \text{padding}\right)$$

In token-driven CSS:
```css
.parent-container {
  border-radius: var(--radius-outer);
  padding: 8px;
}

.child-element {
  /* inner = max(0, 6px - 8px) => 0px or strictly constrained to --radius-inner */
  border-radius: var(--radius-inner);
}
```
Child corners must never stick out, clip unnaturally, or look rounder than their parent container.

---

## 3. 3-Step Vertical Section Rhythm

Web applications feel disjointed when different views use random vertical paddings (e.g., 20px on one view, 96px on another). All layouts must consume the 3-step vertical rhythm scale:

1. **Tight Section (`var(--section-py-tight)`):**
   - Value: `clamp(2.5rem, 4vw, 4rem)`
   - Used for: Toolbars, compact data grids, dense administrative filters, embedded drawers.
2. **Normal Section (`var(--section-py-normal)`):**
   - Value: `clamp(4.5rem, 7vw, 6.5rem)`
   - Used for: Standard application dashboards, ledger tables, settings panels, workspace sections.
3. **Breathing Section (`var(--section-py-breathing)`):**
   - Value: `clamp(7rem, 12vw, 11rem)`
   - Used for: Landing views, major milestone reports, audit run completions, onboarding summaries.

All top-level content areas must be bounded by `max-width: var(--container-max)` with horizontal margins set to `auto`.

---

## 4. Viewport Budgets

Every generated screen must respect these strict viewport budgets:

- **Accent Budget ($\le 15\%$):** No more than 15% of the visible viewport area may be filled with `--accent-primary` or bright status colors. Dominant real estate belongs to neutral obsidian surfaces.
- **Primary CTA Budget ($\le 1$):** Exactly one primary CTA button is permitted per viewport. Secondary actions must be styled as subtle or outline buttons.
  - **Empty-State Handoff:** When a data view has zero records, the table controls hide and the empty-state container absorbs the single primary CTA.
- **Animation Budget ($\le 2$):** No more than 2 decorative animated elements may be active simultaneously in the viewport. `[aria-busy="true"]` loading skeletons are functional and exempt.
- **Metric Strip Architecture:** Strictly ban 3 equal-width stat boxes in a row. Workspaces must use an inline horizontal metric strip with 1px vertical hairlines (`var(--border-hairline)`) or an asymmetric 2-pane split.
- **Context Boundary (Operational vs. Marketing):** Active app consoles must render live operational data (batch volume, unreconciled variance, pending row count). Never embed static marketing or compliance statements (e.g. SOC2 certifications or throughput capacity claims) inside workspace views.
- **Badge & Indicator Discipline:** Eyebrows must stand alone as plain monospace text without adjacent decorative pill tags. Colored status dots (static or animated) are forbidden in headers and footers unless tied to a live, user-switchable connection status.
- **Banned Numbered Eyebrows:** Never put numbered labels (`01 / ...`, `02 / ...`) or redundant category eyebrows above `<h1>` page titles. Eyebrows are prohibited if they merely paraphrase the heading or add decorative numbering.
- **Typography Heading Law:** In functional application workspaces, tables, and settings consoles, use `--font-sans` for `<h1>`–`<h4>` headings when `--font-display` is a decorative/editorial serif; reserve serif `--font-display` for marketing heroes and editorial articles.

