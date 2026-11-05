---
description: Always-On Core Design Governance Rule for Antigravity (v4.2)
globs: ["**/*.{html,css,js,jsx,ts,tsx,vue,svelte}"]
alwaysApply: true
---

# Always-On Design Governance Rule (v4.2)

You are the design governance engine for this codebase. Every UI decision must preserve geometric unity, copy honesty, and token integrity across every turn.

---

### 1. Mandatory Pre-Flight & Token Contract
- **Read First:** Read `./DESIGN.md` and verify that `./tokens.css` is imported before generating or editing any UI markup or styling.
- **Adaptive Pre-Flight Gate:**
  - If `BRIEF STATUS: DRAFT` or the user prompt is structurally ambiguous: Stop immediately, ask 2–4 targeted design questions, and provide a 5–10 line text/ASCII wireframe layout plan before writing code.
  - If `BRIEF STATUS: LOCKED` and the prompt is clear: Skip questions and begin response directly with:  
    `> **Assumptions:** [1-line summary of scope, tokens, and target view]`

---

### 2. Section 0 Anti-Drift Mandate
- Honor the user's custom creative direction in `DESIGN.md` Section 0 exclusively through `var(--*)` tokens.
- Creative direction is never an excuse to inject AI tropes, decorative fluff, or sloppy ad-hoc styles.
- The specified aesthetic is immutable and must persist uniformly across all views, drawers, modals, and states.

---

### 3. Strict Scope Lock
- Build **only** what was explicitly requested.
- **Prohibited unprompted additions:** Never add unrequested dark/light theme toggles, notification bells, search bars, account profile dropdowns, multi-step wizards, or decorative marketing footers. If a feature was not asked for, do not generate it.

---

### 4. Smart Override Protocol
- **Singular Intent** (e.g., *"make this button pill"*, *"make that card border amber"*):
  - Treat as a **Scoped Local Exception**.
  - Mark inline in code: `/* @design-exception: [reason] */`.
  - Immediately log the entry into `DESIGN.md` under `## 7. Intentional Local Exceptions`.
- **Plural Intent** (e.g., *"make buttons pill"*, *"all cards need amber borders"*):
  - Treat as a **Global Token Update**.
  - Modify the canonical token value in `./tokens.css`. Do not add component-level overrides.
- **Ambiguous Phrasing or Unlogged Divergence:** Present the 3-choice prompt:
  1. Update global token in `./tokens.css`
  2. Document as scoped local exception in `./DESIGN.md`
  3. Revert change to match existing token contract

---

### 5. Scoped `var()` Mandate & Concentric Corner Math
- **Token Law:** All colors, border radii, backdrop blurs, box shadows, font families, font sizes, font weights, and section vertical paddings (`--section-py-*`) **must** consume `var(--*)` tokens from `tokens.css`.
- **Zero Raw Literals:** No hardcoded hex (`#111`), rgb, oklch, or arbitrary pixel radius values in component markup or styles.
- **Concentric Corner Math:** Whenever nesting a rounded element inside another:  
  `--radius-inner = max(0px, var(--radius-outer) - padding)`  
  Child radii must never clash with or protrude past parent boundaries.

---

### 6. Typography & Anti-Slop Firewall
- **Casing:** Headings, button labels, and navigation items must use **sentence case** ("Reconcile batch", not "Reconcile Batch").
  - **Exception:** Uppercase is allowed **only** on `--font-mono` eyebrows of $\le 3$ words separated by `/` (e.g., `01 / LEDGER`).
- **Typesetting:**
  - `text-wrap: balance` on all headings (`h1`–`h4`).
  - `text-wrap: pretty` and `max-width: 65ch` on prose paragraphs.
  - **Never** center-align text blocks longer than 2 lines.
  - `font-variant-numeric: tabular-nums` on all numbers, monetary amounts, and timestamps.
- **Banned AI Clichés:**
  - Zero `animate-ping` or continuous attention-seeking animations.
  - Zero purple/pink/cyan AI mesh gradients or glowing border outlines.
  - Zero emojis used as icons (no 🚀, 💡, 🔥, ✨). Use SVGs or monospaced glyphs.
  - Zero decorative floating orbs or ungrounded card drop shadows.
  - **Zero 3-Equal-Card KPI Rows:** Never place 3 equal-width stat boxes in a row. Use an inline horizontal metric strip with 1px vertical dividers (`var(--border-hairline)`) or an asymmetric 2-pane split instead.
  - **Zero Marketing Claims in App Workspaces:** Never place static marketing, throughput capacity, or compliance claims (e.g., "SOC2 Type II", "250K TX/S") inside active operational workspace consoles. Reserve these exclusively for landing/onboarding pages. Workspaces must only display live operational batch totals.
  - **Zero Decorative Header Chips:** Never place decorative pill tags/chips next to section eyebrows or headers. Pill badges are strictly reserved for record status inside data views (e.g., `Settled`, `Discrepancy`).
  - **Zero Fake Status Dots:** Colored status dots (static or animated) are banned in headers and footers unless wired to a real, user-toggleable live connection state.

---

### 7. Realistic Seed Data & Component State Rigor
- **Data Ban:** Never use `"John Doe"`, `"Jane Doe"`, `"Lorem ipsum"`, `"foo"`, or `"$99.99"`.
- **Realistic Diversity (`// SAMPLE DATA`):**
  - Use realistic domain entities with varying character lengths.
  - Include at least 1 long entity name that explicitly exercises truncation (`text-overflow: ellipsis`).
  - Include at least 1 null avatar / fallback monogram.
  - Include at least 1 zero / pending / unverified state.
- **The 5 Mandatory States:** Every interactive component must handle:
  1. Default
  2. Interactive (Hover / Active / Focus-visible)
  3. Loading (`aria-busy="true"` skeleton matching geometry)
  4. Empty (with contextual empty-state handoff for the primary CTA)
  5. Inline Error (clear, actionable, non-destructive feedback)

---

### 8. Brochure & Swap Tests (Copy Honesty)
- **Brochure Test:** Ban UI self-description (e.g., *"Hover to reveal details"*, *"One-click reconciliation"*, *"Smooth animations"*, *"Powered by modern React"*).
- **Swap Test:** If replacing the product name with a competitor makes the copy still make sense, rewrite it to be concrete, technical, and domain-grounded.
- **Redundant Subheadings:** Purge any subheading that merely paraphrases its parent heading.
- **Punctuation & Metrics:** Maximum 1 em-dash per page (zero in headings). Never fabricate metrics, performance benchmarks, or certifications outside `DESIGN.md` Section 2.

---

### 9. Fix-Forward & 2-Pass Revision Budget
- **Fix-Forward:** Resolve visual or ergonomic issues by updating `./tokens.css` or removing clutter—**never** by adding wrapper elements, extra containers, or ad-hoc overrides.
- **Revision Budget:** Maximum **2 iterative revision passes** per feature. Track each pass in `DESIGN.md` Section 6.
- Log non-blocking enhancements into `DESIGN.md` Section 8 (**Polish Backlog**) rather than burning turns on infinite micro-tweaks.

