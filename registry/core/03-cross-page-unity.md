# Core Module 03: Cross-Page Geometric Unity & Token Contract

**Version:** 1.0  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

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

## 3. The 5 Universal Laws of Visual Calm

### 1. Proximity Over Containers (Stop Boxing Everything)
- **Do not wrap every section, focal element, or list item inside a bordered card.** Let primary content sit directly on the open background canvas with generous whitespace around it.
- Use spacing and alignment to group related elements naturally for the eye. Only introduce a visible card/surface container when necessary to group interactive lists or forms, and **never nest bordered boxes inside bordered boxes**:
  - **Pattern A (Grouped Panel):** A single outer surface card where child items (list rows, option items, metric rows, settings controls) are **borderless horizontal rows separated ONLY by a quiet 1px horizontal divider (`border-bottom: 1px solid var(--border-hairline)`)** with zero margin/border around individual rows.
  - **Pattern B (Open Canvas Grid):** An invisible/borderless outer section header sitting directly on `--bg-canvas`, with individual cards below it.
- **Unbox the Hero:** Primary focal elements (headlines, hero metrics, primary display counters, key status overviews) should sit **directly on the canvas without a heavy card box trapping them**, OR inside a single clean surface with zero nested sub-boxes.

### 2. One Signal Per Hierarchy Step (No Visual Shouting)
- Never stack multiple visual treatments on the same element (e.g., do not combine colored text + colored background tint + border + badge all at once, and do not paint half of a heading or number in an accent color).
- Establish hierarchy quietly using **scale (size) and weight first**, **neutral opacity (`--text-muted`) second**, and reserve `--accent-primary` strictly for the single primary interactive focal point on screen.
- On large display text or numerals (`>= 3rem`), prefer clean, lighter weights (`300`–`500`) and open letterforms (`font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "zero" 0;`) rather than heavy, aggressive blocks or coding slashed zeros.

### 3. Self-Evident UI Needs Zero Labels
- If a piece of data, a control, or a view is already obvious from its format or context, render it directly without an `UPPERCASE` micro-label above it, a redundant explainer subheading below it, or a status pill beside it. Cap uppercase eyebrows at strictly **$\le 1$ per entire view**.
- Never invent fake brand headers, fake version/tier tags (`PRO`, `v2.0`, `BETA`), or fake technical telemetry just to fill space.

### 4. Progressive Presence (Show Only What Matters Right Now)
- Do not crowd the initial viewport with empty secondary panels, permanent split-screen boxes, or auxiliary toolbars before the user needs them.
- Keep the initial view focused on the primary task with abundant breathing room, and reveal secondary lists or details progressively as data is created.
- **The "No Empty-Space Panic" Law:** Whitespace is an intentional, premium design feature. NEVER invent decorative filler widgets (e.g., fake progress bars, metadata footers, telemetry strips, unprompted mini-cards) just to fill container height or balance asymmetric columns.

### 5. Whisper-Quiet Chrome & Borders
- Application navigation and secondary controls should recede into the background so the user's content is the hero.
- Rely on subtle surface luminance shifts (`--bg-canvas` vs `--bg-elevated` / `--bg-surface`) rather than drawing high-contrast wireframe borders around every element. Borders (`var(--border-hairline)`, `var(--border-subtle)`) are subtle hairlines (7% opacity), never heavy frames.

---

## 4. 3-Step Vertical Section Rhythm

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

## 5. Viewport Budgets

Every generated screen must respect these strict viewport budgets:

- **Accent Budget ($\le 15\%$):** No more than 15% of the visible viewport area may be filled with `--accent-primary` or bright status colors. Dominant real estate belongs to neutral obsidian surfaces.
- **Primary CTA Budget ($\le 1$):** Exactly one primary CTA button is permitted per viewport. Secondary actions must be styled as subtle or outline buttons.
  - **Empty-State Handoff:** When a data view has zero records, the table controls hide and the empty-state container absorbs the single primary CTA.
- **Animation Budget ($\le 2$):** No more than 2 decorative animated elements may be active simultaneously in the viewport. `[aria-busy="true"]` loading skeletons are functional and exempt.
- **Metric Strip Architecture:** Strictly ban 3 equal-width stat boxes in a row. Workspaces must use an inline horizontal metric strip with 1px vertical hairlines (`var(--border-hairline)`) or an asymmetric 2-pane split.
- **Context Boundary (Operational vs. Marketing):** Active app consoles must render live operational data (batch volume, unreconciled variance, pending row count). Never embed static marketing or compliance statements (e.g. SOC2 certifications or throughput capacity claims) inside workspace views.
- **Badge & Indicator Discipline (Zero Unrequested Badges Law):** NEVER place pill badges, status chips, or uppercase tag boxes inside app headers, navbars, hero sections, or card headers (e.g., ban `PRO v2.4`, `STABLE`, `SUB-10MS`, `60 FPS`). Cards must use plain text headings or no header at all. Tags/badges are ONLY permitted inside repeating data table cells or list rows to indicate item-level record status (e.g., `Settled`, `Discrepancy`, `Active`), strictly capped at max 1 badge per row.
- **Numeric & Tabular Typography Law:** NEVER use coding monospace fonts (`--font-mono`) or `slashed-zero` on hero numbers, counters, or KPI figures. Always use `var(--font-display)` or `var(--font-sans)` with `font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;` so digits have clean, open-oval zeros (`0`) with zero horizontal jitter. Reserve `var(--font-mono)` strictly for code snippets, file paths, or git hashes.
- **Banned Numbered Eyebrows:** Never put numbered labels (`01 / ...`, `02 / ...`) or redundant category eyebrows above `<h1>` page titles. Eyebrows are prohibited if they merely paraphrase the heading or add decorative numbering.
- **Typography Heading Law:** In functional application workspaces, tables, and settings consoles, use `--font-sans` for `<h1>–<h4>` headings when `--font-display` is a decorative/editorial serif; reserve serif `--font-display` for marketing heroes and editorial articles.

