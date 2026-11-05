# Design Specification & Token Contract

**STATUS:** ACTIVE  
**BRIEF STATUS:** LOCKED  
**ARCHETYPE:** dark-obsidian-technical  
**POLARITY:** Dark  
**LAYOUT:** Desktop-First  
**TOKENS SOURCE:** [`./tokens.css`](file:///D:/agent-design-skills/sandbox-test/tokens.css)

---

## 0. User's Custom Creative Direction & Anti-Drift Mandate

> *"Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff"*

### The 3-Point Anti-Drift Mandate
1. **Express via Tokens Only:** Every stylistic choice, density shift, or visual cue must be expressed through CSS Custom Properties declared in [`./tokens.css`](file:///D:/agent-design-skills/sandbox-test/tokens.css). Inlining raw hex/rgb values, arbitrary border-radii, or ad-hoc margins is strictly forbidden.
2. **Zero Slop Excuse:** Creative direction is never an excuse to inject AI tropes. "Settlement console" implies forensic rigor—not floating badge chips, glowing purple gradients, springy overshoots, unprompted notification bells, or emoji decorators.
3. **Cross-Page Persistence:** This aesthetic is invariant across all subviews, ledger tables, sliding audit drawers, filter dialogs, and modal confirmations. No view may deviate into casual or generic SaaS patterns.

---

## 1. Project Design DNA

- **Archetype:** `dark-obsidian-technical`
- **Primary Layout Vector:** Desktop-First (dense settlement tables, collapsible telemetry sidebar, keyboard-navigable split audit feed).
- **Polarity:** Dark (carbon neutrals pulled toward hue `250`).
- **Geometric Rigor:** Razor-sharp 1px hairlines (`--border-hairline`), tight 4px–6px corner radii (`--radius-inner` / `--radius-outer`), and specular edge reflection (`--highlight-specular`).
- **Density:** High information density; tabular figures for all numeric, monetary, and hash displays.

---

## 2. Voice & Content Brief

**Product Definition:**  
Automated GST and multi-currency ledger reconciliation workspace for finance engineering teams.

### Verified Facts (Immutable Ground Truth)
1. Reconciles up to 250,000 multi-currency ledger entries per second with sub-50ms audit verification.
2. Native multi-jurisdiction GST/VAT settlement engines with zero third-party telemetry exposure.
3. Immutable double-entry append-only cryptographic audit logs compliant with SOC2 Type II and ISO 27001.

### Voice Adjectives
- **Direct:** Communicates status and discrepancies without throat-clearing.
- **Forensic:** Cites exact line numbers, currency codes, batch hashes, and timestamp deltas.
- **Unhurried:** Calm, clinical precision; zero artificial urgency or marketing hyperbole.

### Voice Contrast

| Sounds Like | Never Sounds Like |
|---|---|
| "Row 4,812: \$412.50 FX discrepancy between Stripe payout and ICICI nodal settlement." | "Oops! Something went wrong with your reconciliation. Try again!" |
| "12 batches pending verification. Run reconciliation sequence." | "Supercharge your financial workflows with our magical AI ledger platform! 🚀" |
| "Batch `0x8F2D`: Merkle root verified against append-only log." | "One-click simplicity for all your accounting needs." |
| "GSTIN 27AAAPL1234C1ZV tax invoice delta: ₹14,280.00." | "Say goodbye to tax headaches forever with our smart dashboard." |

---

## 3. Token Contract (Values Locked in `./tokens.css`)

All components MUST consume these semantic tokens directly. Never duplicate raw hex or OKLCH values in markup or component CSS.

- **Surfaces & Layout:**
  - `var(--bg-canvas)` — Deepest carbon backdrop
  - `var(--bg-elevated)` — Card, table, and panel surface
  - `var(--bg-surface-active)` — Row selection, active tab
  - `var(--bg-glass)` — Semi-transparent modal and drawer backdrop
  - `var(--bg-sunken)` — Terminal output, payload inspector
- **Typography & Foreground:**
  - `var(--text-primary)` — High-contrast data values, headers (AAA >= 7:1)
  - `var(--text-muted)` — Secondary metadata, column labels (AA >= 4.5:1)
  - `var(--text-subtle)` — Timestamps, partition keys, borders
  - `var(--text-inverse)` — Foreground on filled primary elements
- **Accents & Hairlines:**
  - `var(--accent-primary)` — Primary forensic action, active indicators
  - `var(--accent-subtle)` — Subtle active pill fills, selection bounds
  - `var(--border-hairline)` — 1px container boundary
  - `var(--border-subtle)` — Internal table cell dividers
  - `var(--highlight-specular)` — 1px top highlight for depth
- **Geometry & Elevation:**
  - `var(--radius-outer)` (6px) — Outer card and modal boundary
  - `var(--radius-inner)` (4px) — Nested inputs, buttons, child rows
  - `var(--radius-badge)` (4px) — Status indicators and hash tags
  - `var(--surface-blur)` (8px) — Backdrop filter blur
  - `var(--shadow-surface)` — Hairline border + subtle ambient shadow
- **Section Rhythm & Container:**
  - `var(--section-py-tight)` — Compact table toolbars, filters
  - `var(--section-py-normal)` — Standard settlement views
  - `var(--section-py-breathing)` — Major audit run summaries
  - `var(--container-max)` (1280px) — Viewport layout bounds
- **Typography Scale:**
  - `var(--font-display)`, `var(--font-sans)`, `var(--font-mono)`
  - `var(--text-xs)` through `var(--text-4xl)` (1.250 modular scale)
  - `var(--weight-heading)` (600), `var(--weight-body)` (400), `var(--weight-mono)` (500)
- **Motion:**
  - `var(--ease-primary)` (`cubic-bezier(0.16, 1, 0.3, 1)`)
  - `var(--duration-fast)` (110ms), `var(--duration-normal)` (180ms)

---

## 4. Viewport Budgets & Signature Moment

- **Accent Surface Area Budget:** Maximum **15%** of viewport pixels may contain `--accent-primary` or bright status fills. Data surfaces remain neutral obsidian.
- **Primary CTA Budget:** Strictly **1 Primary Action** visible per viewport. When a table or view is empty, the empty-state action absorbs this CTA via an explicit Empty-State handoff.
- **Motion Budget:** Maximum **2 decorative animated elements** running simultaneously per viewport. Loading skeletons with `[aria-busy="true"]` are functional and exempt.
- **Signature Moment:** Precision single-sweep scanline pulse over the settlement batch header upon reconciliation commitment (180ms ease, zero overshoot).

---

## 5. Component Inventory

| Component | Selector / Element | Role | Default Token Binding |
|---|---|---|---|
| **Top Utility Bar & State Controller** | `header.top-utility-bar`, `nav.state-switcher` | View metadata & 5-state test controller | `var(--bg-sunken)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Workspace Summary Bar** | `div.workspace-summary-bar`, `.summary-segment` | Operational batch totals & variance strip | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--highlight-specular)` |
| **Inline Error Banner** | `aside.inline-error-banner` | Forensic discrepancy alert banner | `var(--bg-sunken)`, `var(--status-danger)`, `var(--radius-outer)` |
| **Action Bar & Primary CTA** | `section.action-bar`, `button.btn-primary` | Batch controls & single primary CTA | `var(--accent-primary)`, `var(--text-inverse)`, `var(--radius-inner)` |
| **Settlement Card Container** | `article.settlement-card` | Concentric bounded workspace card | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Scanline Pulse Signature Moment** | `div.scanline-pulse` | 180ms commitment confirmation effect | `var(--accent-primary)`, `var(--ease-primary)`, `var(--duration-normal)` |
| **Settlement Table Grid** | `table.settlement-grid` | Forensic record display & truncation | `var(--bg-elevated)`, `var(--border-subtle)`, `var(--font-mono)` |
| **Monogram Avatar Fallback** | `span.monogram-avatar` | Null avatar 2-letter fallback box | `var(--bg-sunken)`, `var(--border-subtle)`, `var(--radius-inner)` |
| **Loading Skeleton View** | `div.skeleton-view[aria-busy="true"]` | Zero-CLS layout-matching skeleton | `var(--bg-sunken)`, `var(--radius-inner)` |
| **Zero-Data Empty State** | `div.empty-view`, `button.empty-cta-handoff` | Hand-off target absorbing Primary CTA | `var(--text-muted)`, `var(--accent-primary)`, `var(--radius-inner)` |
| **Cryptographic Audit Footer** | `footer.audit-footer-strip` | Merkle append-only consensus status | `var(--border-hairline)`, `var(--font-mono)` |

---

## 6. Active Revision Passes

**Budget:** 2 of 2 passes used.

| Pass # | Target Component | Modification | Tokens Touched | Verification |
|---|---|---|---|---|
| **Pass 1** | `sandbox-test/index.html` | Implemented single-file forensic settlement workspace verifying all 5 UI states (Default, Interactive, Loading Skeleton `[aria-busy="true"]`, Zero-Data Empty State with CTA handoff, and Inline Error Banner). Incorporated realistic seed data with 4 edge cases (SBI long-string truncation, Paytm null monogram fallback, zero/pending state, and ICICI FX discrepancy). Applied concentric corner math and 180ms scanline signature moment. | `--bg-canvas`, `--bg-elevated`, `--bg-surface-active`, `--bg-sunken`, `--text-primary`, `--text-muted`, `--text-subtle`, `--text-inverse`, `--accent-primary`, `--accent-hover`, `--border-hairline`, `--border-subtle`, `--highlight-specular`, `--status-success`, `--status-warning`, `--status-danger`, `--radius-outer`, `--radius-inner`, `--radius-badge`, `--section-py-tight`, `--section-py-normal`, `--container-max`, `--duration-fast`, `--duration-normal`, `--ease-primary`, modular typography scale | Zero raw hex/oklch/rgb literals; strictly 1 Primary CTA visible per viewport; concentric corner math verified; all 5 states switchable via utility controller. |
| **Pass 2** | `sandbox-test/index.html` | Closed 3 subtle AI slop loopholes: purged 2 decorative header pill chips next to eyebrow; removed decorative green footer dot; replaced 3 equal-width marketing KPI boxes with an operational, compact workspace summary bar showing real batch totals ($233K & ₹13.2M), variance (+$412.50), and pending status (1 of 5) separated by 1px hairlines. | `--bg-elevated`, `--border-hairline`, `--highlight-specular`, `--shadow-surface`, `--font-mono`, `--text-xs`, `--text-lg`, `--status-danger`, `--text-subtle`, `--text-primary`, `--text-muted` | Verified clean elimination of static marketing in app UI; eyebrow stands alone; zero fake status dots; metric strip follows 1px divider rule. |

---

## 7. Intentional Local Exceptions

| Component | Selector | Rule Diverged From | Business Justification | Source Marker |
|---|---|---|---|---|
| *None* | — | — | — | — |

*To add an exception, use `/* @design-exception: [reason] */` in code and document above.*

---

## 8. Polish Backlog

- [ ] **Tabular Alignment Check:** Ensure all monetary columns right-align with zero jitter during live stream updates.
- [ ] **Keyboard Navigation:** Bind `j`/`k` row focus and `Enter` expansion inside `table.settlement-grid`.
- [ ] **High-Contrast Print Styles:** Forensic PDF export stylesheet matching immutable ledger audit requirements.

