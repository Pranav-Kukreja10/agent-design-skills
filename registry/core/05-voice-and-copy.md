# Core Module 05: Voice, Copy Honesty & Typographic Discipline

**Version:** 1.0  
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
- **Cure "UPPERCASE MICRO-LABEL Disease":**
  - **Maximum 1 Uppercase Eyebrow Per View:** AI models compulsively label every card and metric with an all-caps, tracked micro-label (`text-[10px] uppercase tracking-widest`). This creates visual noise. Cap uppercase eyebrows at strictly **$\le 1$ per entire view**.
  - **Ban Self-Evident & Narrating Labels:** Never put uppercase labels above self-evident elements (e.g., redundant status descriptions, obvious format tags, or narrating what an adjacent button/control does). Obvious controls, metrics, and displays speak for themselves.
  - **Numbered Eyebrow Ban:** Never put numbered labels (`01 / ...`, `02 / ...`) or redundant category eyebrows above `<h1>` page titles.
  - Uppercase is permitted **only** on short functional technical tags of $\le 3$ words rendered in `var(--font-mono)` (e.g., `STATUS: ACTIVE`, `REF: 0x4B2`), never as decorative card-header or section filler.
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
- **Zero Sci-Fi & Hardware Telemetry Cosplay:**
  - Ban inventing fake brand names, fake tier badges (`[PRO v2.4]`, `[BETA]`), fake hardware telemetry (`60 FPS`, `SUB-10MS`), and unrequested Unix `EPOCH` readouts.
  - Interfaces must sound like focused, professional software designed by domain experts, not a science-fiction movie prop.

