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
| **Settlement Table** | `table.settlement-grid` | Forensic record display | `var(--bg-elevated)`, `var(--border-hairline)` |
| **Audit Drawer** | `aside.audit-feed-drawer` | Event telemetry & logs | `var(--bg-glass)`, `backdrop-filter: blur(var(--surface-blur))` |
| **Filter Toolbar** | `header.filter-bar` | Batch query controls | `var(--bg-canvas)`, `var(--border-subtle)` |
| **Action CTA** | `button.action-primary` | Execute reconciliation | `var(--accent-primary)`, `var(--radius-inner)` |
| **Status Tag** | `span.status-pill` | Mismatch / Reconciled | `var(--radius-badge)`, `var(--font-mono)` |
| **Payload Inspector** | `pre.payload-block` | JSON diff & Merkle hash | `var(--bg-sunken)`, `var(--font-mono)` |

---

## 6. Active Revision Passes

**Budget:** 0 of 2 passes used.

| Pass # | Target Component | Modification | Tokens Touched | Verification |
|---|---|---|---|---|
| *None* | — | Initial baseline lock | Baseline | Verified against spec |

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

