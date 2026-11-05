# Core Module 06: Iteration Discipline, Revision Budget & Polish Backlog

**Version:** 4.2  
**Target Archetype:** `quiet-luxury-atelier`  
**Token Contract:** `./tokens.css`  
**Design Specification:** `./DESIGN.md`

---

## 1. The Fix-Forward Principle

When an element looks visually awkward, unbalanced, or misaligned, novice agents attempt to fix it by adding complexity: nesting extra wrapper `<div>`s, inlining one-off margins, or adding drop shadows to hide poor boundaries.

### The Fix-Forward Rules
1. **Subtract Before Adding:** Before creating new CSS rules or wrapping elements in additional containers, delete visual clutter (unnecessary borders, excessive margins, redundant labels).
2. **Fix at the Source:** If a button looks too dim or cramped, adjust the global token in `./tokens.css` (`--radius-inner`, `--accent-primary`, or `--weight-heading`).
3. **No Patch Layers:** Never add a second border or an offset box shadow to compensate for an uncalibrated hairline. Keep the DOM hierarchy flat and clean.

---

## 2. 2-Pass Revision Budget

Iterative refinement must not devolve into endless, unproductive turns of subjective micro-tweaking.

- **Budget Limit:** Every component or feature build is allocated a maximum of **2 revision passes**.
- **Pass Accounting:**
  - **Pass 0:** Initial generation adhering to the token contract.
  - **Pass 1:** Feedback pass addressing functional, layout, or accessibility deficiencies.
  - **Pass 2:** Final calibration of polish, typography, and contrast.
- **Mandatory Log:** Each pass must be logged in `./DESIGN.md` under `## 6. Active Revision Passes`:
  ```markdown
  | Pass # | Target Component | Modification | Tokens Touched | Verification |
  | Pass 1 | SettlementTable.tsx | Adjusted cell padding and right-aligned currency | `--text-sm`, `--border-subtle` | Verified tabular alignment |
  ```
- **Post-Budget Gate:** Once 2 passes are exhausted, any further cosmetic tweaks must be deferred to the **Polish Backlog**.

---

## 3. Polish Backlog Management

Non-critical enhancements, edge-case interactions, and secondary polish items should not derail the primary delivery turn.

- **Capture Protocol:** When identifying a non-blocking refinement (e.g., subtle keyboard shortcut indicators, optional column reordering, print stylesheet enhancements), record it in `./DESIGN.md` under `## 8. Polish Backlog`:
  ```markdown
  - [ ] **[Component / Area]:** [Specific, actionable refinement description]
  ```
- Maintain discipline by completing current scope before addressing backlog entries.

---

## 4. Rollback & Coherence Protocol

If a revision compromises cross-page unity, introduces design drift, or conflicts with `## 0. User's Custom Creative Direction & Anti-Drift Mandate`:

1. Do not apply patches on top of broken changes.
2. Execute a clean revert back to the last known compliant commit or token baseline.
3. Re-evaluate the requirement using the Divergence Protocol in `01-override-protocol.md`.

