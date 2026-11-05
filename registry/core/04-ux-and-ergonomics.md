# Core Module 04: UX Ergonomics, Realistic Seed Data & Component States

**Version:** 4.2  
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

## 3. Tabular Numeric Figures

In data tables, accounting views, ledger sheets, and KPI counters:
- All numeric displays, balances, percentages, and timestamps **must** enforce:
  ```css
  font-variant-numeric: tabular-nums;
  ```
- This ensures fixed-width character alignment across rows, preventing visual jitter and column drift as numbers change or sort.

---

## 4. Keyboard Navigation & Accessibility

- Never suppress focus outlines without providing a token-bound replacement:
  ```css
  :focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 1px;
  }
  ```
- Table headers must include `scope="col"`.
- Sorting headers must declare `aria-sort="ascending" | "descending" | "none"`.
- Interactive action triggers must use `<button>` elements, never clickable `<div>` or `<span>` elements without full keyboard event handlers and ARIA semantics.

