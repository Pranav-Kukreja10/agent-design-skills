# Benchmark Evaluation Rubric (v4.2)

This document specifies the grading criteria, automated gates, and empirical evaluation rubric for validating AI agent UI code generation against the **agent-design-skills** v4.2 specification.

---

## 1. Automated Pass/Fail Gates (Must Clear All 4)

An evaluation run **fails immediately** if any of the following 4 automated gates are violated:

| Gate | Requirement | Automated Verification Method | Pass Threshold |
| :--- | :--- | :--- | :--- |
| **Gate 1: Zero Lint Errors** | Code must strictly consume design tokens with no prohibited anti-patterns | Run `npx agent-design-skills lint <target-dir>` | **0 errors, 0 warnings** |
| **Gate 2: Contrast Compliance** | Text surfaces must meet WCAG contrast thresholds in OKLCH space | Calculated via relative luminance of `--text-*` on `--bg-*` | `--text-primary`: **$\ge 7:1$ (AAA)**<br>`--text-muted`: **$\ge 4.5:1$ (AA)** |
| **Gate 3: Core Rule Budget** | Always-On Core Rule must fit in standard agent system prompts | Count tokens in `.agent/rules/design-core.md` or `.cursor/rules/00-design-core.mdc` | **$< 1,500$ tokens** (approx. $< 6,000$ chars) |
| **Gate 4: Strict Scope Lock** | Zero unprompted auxiliary widgets or speculative feature creep | Static AST / DOM query for unrequested UI components | **Zero banned unprompted elements** |

### Gate 4 Specific Prohibitions (Scope Lock)
Unless explicitly instructed in the user's prompt, an agent must **never** add:
- Unprompted theme toggle buttons (dark/light switchers)
- Unprompted notification bell icons with fake unread badges
- Unprompted global search input bars
- Decorative marketing footers or compliance claims (`SOC2`, `ISO 27001`, `99.99% Uptime`) inside application workspaces
- 3 equal-width card rows for workspace telemetry
- Unprompted avatar profile menus or account switchers

---

## 2. Qualitative Scoring Criteria (0–10 Scale per Dimension)

Submissions passing all 4 automated gates are scored across 4 qualitative dimensions (40 points total). A score of **$\ge 36 / 40$** is required for certification.

```
Total Score = Anti-Slop Adherence (10) + Cross-Page Unity (10) + Copy Honesty (10) + Motion & Interaction (10)
```

---

### Dimension 1: Anti-Slop Firewall Adherence (Weight: 10 pts)

Measures the total elimination of LLM design cliches, purple gradients, generic floating cards, and AI convergence artifacts.

| Score | Criteria |
| :--- | :--- |
| **9–10** | **Flawless Execution:** Zero raw hex or inline color literals; 100% token consumption. Perfect concentric corner math (`outer = inner + padding`). Real horizontal summary strips with 1px hairline dividers instead of 3 equal cards. Status tags used only on table rows/records, never as decorative header chips. |
| **7–8** | **Minor Imperfection:** Consumes tokens cleanly, but slight geometric discrepancy (e.g. inner radius equal to outer radius instead of concentric math). Zero purple gradients. |
| **4–6** | **Borderline Slop:** One or more subtle AI habits present: a decorative status chip next to a title, a static marketing badge in an app header, or floating cards with redundant drop shadows. |
| **0–3** | **Critical Failure:** Uses raw hex codes (`#1f2937`, `#6366f1`), purple-to-blue linear gradients, unstyled default browser controls, or 3 generic stat cards across the top. |

---

### Dimension 2: Cross-Page Unity & Geometric Discipline (Weight: 10 pts)

Measures architectural consistency when generating subsequent screens or modal drawers (tested directly in Eval Prompt #11).

| Score | Criteria |
| :--- | :--- |
| **9–10** | **Seamless Unity:** Page 2 links to and consumes identical `tokens.css` without re-declaring custom properties in local `<style>` blocks. Exact matching of utility bar height, table row padding, corner radiuses, and font pairings. An observer cannot detect that Page 1 and Page 2 were generated in separate LLM inference passes. |
| **7–8** | **High Consistency:** Reuses `tokens.css` correctly. Minor padding difference ($4\text{px}$ discrepancy in container gutter) but visual weights and typography match 100%. |
| **4–6** | **Stylistic Drift:** Page 2 introduces pill-shaped buttons (`rounded-full`) while Page 1 used $4\text{px}$ sharp corners, or changes table row font size from $13\text{px}$ to $15\text{px}$. |
| **0–3** | **Total Disconnection:** Page 2 creates new inline colors, alters background lightness by $>5\%$, adds a left navigation drawer when Page 1 used a top header, or introduces a different font family. |

---

### Dimension 3: Copy Honesty & Typographic Hierarchy (Weight: 10 pts)

Measures avoidance of corporate marketing fluff, placeholder text, and AI buzzwords in user-facing copy.

| Score | Criteria |
| :--- | :--- |
| **9–10** | **Precision Engineering:** 100% sentence case on all headings, buttons, and table headers (only true acronyms like USD, VAT, API capitalized). Zero AI filler (`"Effortlessly manage..."`, `"Seamlessly integrate..."`, `"Supercharge your..."`). Real domain-specific edge case labels. Numbers formatted with `font-variant-numeric: tabular-nums`. |
| **7–8** | **Clean Copy:** Sentence case consistently applied with 1 minor Title Case slip in a secondary button. Data edge cases populated with realistic data strings. No marketing hyperbole. |
| **4–6** | **Marketing Creep:** Title Case used across multiple buttons (`"Download All Invoices Now"`). One or two generic filler sentences present in empty states. Missing `tabular-nums` on financial columns. |
| **0–3** | **Corporate Slop:** Heavy reliance on buzzwords (`"Revolutionary AI-powered insight"`), `Lorem Ipsum` placeholders, uppercase table headers without tracking adjustments, or centered marketing slogans inside an operational data view. |

---

### Dimension 4: State Completeness & Motion Vector (Weight: 10 pts)

Measures implementation of the 5 mandatory UI states and adherence to the archetype's motion vector.

| Score | Criteria |
| :--- | :--- |
| **9–10** | **Full State Coverage:** All 5 states fully switchable or implemented: Default populated table with 4 edge cases (extreme string, zero-decimals, negative values, null/pending dashes), Loading skeleton with `[aria-busy="true"]`, Zero-data empty state with actionable primary CTA, Inline error banner with retry trigger, and Partial state. Motion transitions consume archetype ease and duration tokens strictly ($\le 180\text{ms}$ for micro-interactions). |
| **7–8** | **Solid Coverage:** 4 of 5 states cleanly implemented; transitions use CSS variables for ease and duration. Loading skeleton mirrors final data layout accurately. |
| **4–6** | **Partial States:** Only default state and a basic spinner implemented. Empty state lacks actionable handoff. Transitions use hardcoded `all 0.3s ease`. |
| **0–3** | **Unfinished Scaffold:** Only happy-path populated view provided. No loading indicators, no error handling, zero edge cases tested (all sample data has uniform 5-character strings). |

---

## 3. Evaluation Benchmark Execution Protocol

### Step 1: Initialization
Compile the design governance bundle into the evaluation target directory using the CLI:
```bash
npx agent-design-skills init --framework raw-html --archetype <eval-archetype> --yes
```

### Step 2: Agent Execution
Provide the AI coding agent with:
1. The project's `.agent/rules/design-core.md` (or Cursor `.mdc` equivalent)
2. The user prompt from `evals/prompts.json`

### Step 3: Automated Linter Check (Gate 1)
```bash
node packages/cli/dist/index.js lint <target-dir>
```

### Step 4: Visual & Token Contrast Audit (Gate 2 & 3)
Verify contrast calculations:
- `--text-primary` on `--bg-canvas`: $\ge 7:1$
- `--text-muted` on `--bg-canvas` / `--bg-elevated`: $\ge 4.5:1$
- Rule token size: `wc -w .agent/rules/design-core.md` $< 1,200$ words ($< 1,500$ tokens).

### Step 5: Scoring
Complete the scoring matrix for Dimensions 1 through 4. Total must be $\ge 36 / 40$ to earn certification.

