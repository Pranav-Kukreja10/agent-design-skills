# Core Module 05: Voice, Copy Honesty & Typographic Discipline

**Version:** 4.2  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

---

## 1. Copy Honesty & Anti-Marketing Tests

UI copy is part of the interface ergonomics, not a marketing brochure. All generated text must pass two mandatory tests:

### The Brochure Test (Ban Self-Referential UI)
Never allow the interface to describe its own mechanics or technical stack.
- **Banned:** *"Hover over rows to reveal audit actions."* $\rightarrow$ **Fix:** Simply reveal the actions on hover/focus cleanly.
- **Banned:** *"Click here to submit your batch."* $\rightarrow$ **Fix:** Label the button `"Submit batch"`.
- **Banned:** *"Enjoy seamless, smooth animations powered by React."* $\rightarrow$ **Fix:** Remove entirely.

### The Swap Test (Purge Generic Marketing Slop)
Read the headline and descriptive text. If you can swap out the product name (`{{PRODUCT_NAME}}`) for any generic SaaS competitor (Stripe, Linear, QuickBooks) and the copy still works, **the copy has failed the Swap Test**.
- **Generic:** *"Manage your finances faster with our modern automated platform."*
- **Forensic & Domain-Grounded:** *"Automated GST reconciliation with real-time multi-currency ledger verification."*

### Redundant Subheadings Purge
Never place a subheading immediately beneath a heading if it simply restates the heading in more words.
- **Bad:**  
  `### Reconciliation Batches`  
  *View and manage your recent reconciliation batches here.*
- **Clean:** Delete the subheading entirely, or provide specific, non-redundant contextual status:  
  `### Reconciliation Batches`  
  `12 batches awaiting settlement verification across 3 nodal accounts.`

---

## 2. Typographic Rules & Casing Architecture

- **Strict Sentence Case:**
  - All headings (`h1`–`h6`), table headers, input labels, tooltips, and button labels must use **sentence case**:
    - Correct: *"Reconcile batch entries"*, *"Download audit report"*
    - Incorrect: *"Reconcile Batch Entries"*, *"DOWNLOAD AUDIT REPORT"*
- **The Eyebrow Exception:**
  - Uppercase is permitted **only** on short category eyebrow tags that meet both criteria:
    1. Maximum of 3 words.
    2. Rendered in monospaced font (`var(--font-mono)`) with a numerical or slash prefix (e.g., `01 / LEDGER`, `STATUS / ACTIVE`, `TX / 0x4B2`).
- **Typesetting Hygiene:**
  - `text-wrap: balance` on all headings to eliminate orphan words.
  - `text-wrap: pretty` on all body paragraphs.
  - Set `max-width: 65ch` on prose and descriptive text to preserve optimal reading line length.
  - **Never center-align** any paragraph or text block exceeding 2 lines.

---

## 3. Punctuation & Fact Verification

- **Em-Dash Hygiene:**
  - Zero em-dashes (`—`) in headings or button labels.
  - Maximum of **1 em-dash per page** in descriptive body copy. Do not use em-dashes as crutches for choppy prose.
- **Verified Facts Mandate:**
  - Never fabricate metrics, uptime guarantees, compliance certifications, or throughput stats.
  - All quantitative assertions must be cited directly from `{{DESIGN_DOC_PATH}}` under `## 2. Voice & Content Brief` (Verified Facts).

