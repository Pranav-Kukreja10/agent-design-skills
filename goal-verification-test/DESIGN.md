# Design Specification & Token Contract

**STATUS:** ACTIVE  
**BRIEF STATUS:** LOCKED  
**ARCHETYPE:** quiet-luxury-atelier  
**POLARITY:** Light  
**LAYOUT:** Desktop-First  
**TOKENS SOURCE:** `./tokens.css`

---

## 0. User's Custom Creative Direction & Anti-Drift Mandate

> *"Warm editorial precision like a physical Swiss bank ledger printed on heavy cotton paper—strictly zero SaaS clichés, zero glowing badges, tactile 1px rules"*

### The 3-Point Anti-Drift Mandate
1. **Express via Tokens Only:** Every stylistic choice, density shift, or visual cue must be expressed through CSS Custom Properties declared in `./tokens.css`. Inlining raw hex/rgb values, arbitrary border-radii, or ad-hoc margins is strictly forbidden.
2. **Zero Slop Excuse:** Creative direction is never an excuse to inject AI tropes. No floating badge chips, glowing purple gradients, springy overshoots, unprompted notification bells, 3 equal-card marketing rows, or emoji decorators.
3. **Cross-Page Persistence:** This aesthetic is invariant across all subviews, data tables, sliding drawers, filter dialogs, and modal confirmations. No view may deviate into casual or generic SaaS patterns.

---

## 1. Project Design DNA

- **Archetype:** `quiet-luxury-atelier`
- **Primary Layout Vector:** Desktop-First
- **Polarity:** Light Polarity
- **Geometric Rigor:** Concentric corner radius hierarchy (`radius-inner = max(0, radius-outer - padding)`).

---

## 2. Voice & Content Brief

**Product Definition:**  
Automated tax withholding and treasury yield sweep platform for independent studios for Aethelgard Treasury.

### Verified Facts (Immutable Ground Truth)
1. Operational integrity validated against immutable append-only logs.
2. Sub-50ms audit verification with zero third-party telemetry exposure.
3. Full regulatory and security compliance certified under standard industry frameworks.

### Voice Adjectives
- **Literary**
- **Dispassionate**
- **Deeply-Researched**

### Voice Contrast

| Sounds Like | Never Sounds Like |
|---|---|
| "Vault allocation audited against physical treasury bills with verified CUSIP numbers." | "Supercharge your treasury with our smart AI dashboard! 🚀" |
| "12 batches pending verification. Run reconciliation sequence." | "Say goodbye to financial headaches with our smart AI dashboard!" |
| "Batch `0x8F2D`: Merkle root verified against append-only log." | "One-click simplicity for all your enterprise needs." |

---

## 3. Token Contract (Values Locked in `./tokens.css`)

All components MUST consume these semantic tokens directly. Never duplicate raw hex or OKLCH values in markup or component CSS.

- **Surfaces & Layout:** `var(--bg-canvas)`, `var(--bg-elevated)`, `var(--bg-surface-active)`, `var(--bg-glass)`, `var(--bg-sunken)`
- **Typography & Foreground:** `var(--text-primary)`, `var(--text-muted)`, `var(--text-subtle)`, `var(--text-inverse)`
- **Accents & Hairlines:** `var(--accent-primary)`, `var(--accent-subtle)`, `var(--accent-hover)`, `var(--border-hairline)`, `var(--border-subtle)`, `var(--border-focus)`, `var(--highlight-specular)`
- **Geometry & Elevation:** `var(--radius-outer)`, `var(--radius-inner)`, `var(--radius-badge)`, `var(--surface-blur)`, `var(--shadow-surface)`, `var(--shadow-elevated)`
- **Section Rhythm & Container:** `var(--section-py-tight)`, `var(--section-py-normal)`, `var(--section-py-breathing)`, `var(--container-max)`
- **Typography Scale:** `var(--font-display)`, `var(--font-sans)`, `var(--font-mono)`, `var(--text-xs)` through `var(--text-4xl)`, `var(--weight-heading)`, `var(--weight-body)`, `var(--weight-mono)`
- **Motion:** `var(--ease-primary)`, `var(--duration-fast)`, `var(--duration-normal)`

---

## 4. Viewport Budgets & Signature Moment

- **Accent Surface Area Budget:** Maximum **15%** of viewport pixels may contain `--accent-primary` or bright status fills.
- **Primary CTA Budget:** Strictly **1 Primary Action** visible per viewport. When a table or view is empty, the empty-state action absorbs this CTA via an explicit Empty-State handoff.
- **Motion Budget:** Maximum **2 decorative animated elements** running simultaneously per viewport. `[aria-busy="true"]` loading skeletons are exempt.
- **Metric Strip Architecture:** Strictly ban 3 equal-width stat boxes in a row. Workspaces must use an inline horizontal metric strip with 1px vertical hairlines (`var(--border-hairline)`) or an asymmetric 2-pane split.
- **Context Boundary:** Workspaces must display live operational data. Never place static marketing or compliance statements in active console views.
- **Badge & Indicator Discipline:** Eyebrows must stand alone as plain monospace text. Colored status dots are forbidden unless tied to a live connection status.
- **Signature Moment:** Gentle 240ms ink-soak underline expansion upon section entry.

---

## 5. Component Inventory

| Component | Selector / Element | Role | Default Token Binding |
|---|---|---|---|
| **Top Navigation Utility Bar** | `header.top-bar`, `.brand-title`, `.nav-links` | Shared application navigation across Page 1 & 2 | `var(--bg-canvas)`, `var(--border-hairline)`, `var(--font-display)` |
| **State Switcher Controller** | `div.state-switcher`, `select.state-select` | 5-state preview controller (Default, Skeleton, Empty, Error, Partial) | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Workspace Summary Strip** | `section.summary-strip`, `.summary-item` | 4-segment operational batch totals with 1px hairlines | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Action & Filter Toolbar** | `div.toolbar`, `button.btn`, `a.btn` | Section header actions & primary CTA handoff | `var(--text-primary)`, `var(--text-inverse)`, `var(--radius-inner)` |
| **Sweep Allocation Ledger (Page 1)** | `div#tableContainer`, `table.data-table` | Live studio sweep allocation table with 4 edge cases | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Studio Monogram Fallback Badge** | `span.monogram-badge` | Studio identifier / unassigned wire monogram | `var(--bg-sunken)`, `var(--border-hairline)`, `var(--radius-inner)` |
| **Record Status Indicators** | `span.status-badge`, `.status-swept`, `.status-discrepancy` | Non-decorative record state indicators in tables | `var(--bg-sunken)`, `var(--status-danger)`, `var(--radius-badge)` |
| **Withholding Rule List (Page 2)** | `div#rulesContainer`, `.rule-item`, `.rule-rate` | Automated tax rate rule builder & priority list | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--radius-outer)` |
| **Append-Only Audit Ledger (Page 2)** | `div#auditContainer`, `table.data-table` | Immutable audit log trail with operator signatures | `var(--bg-elevated)`, `var(--border-hairline)`, `var(--font-mono)` |
| **Inline Error Banner** | `div#errorBanner.error-banner` | Non-destructive clearinghouse exception banner | `var(--bg-elevated)`, `var(--status-danger)`, `var(--radius-outer)` |
| **Loading Skeleton View** | `div#loadingSkeleton[aria-busy="true"]`, `.skeleton-box` | Zero-CLS geometry-matched loading state | `var(--bg-sunken)`, `var(--radius-inner)` |
| **Zero-Data Empty State** | `div#emptyState`, `h3.empty-title`, `a.btn-primary` | Empty state handoff directing to rule configuration | `var(--text-muted)`, `var(--text-primary)`, `var(--radius-outer)` |
| **Concentric Application Footer** | `footer.footer-bar` | Protocol metadata & settlement notice | `var(--border-hairline)`, `var(--text-muted)`, `var(--font-mono)` |

---

## 6. Active Revision Passes

**Budget:** 2 of 2 passes used.

| Pass # | Target Component | Modification | Tokens Touched | Verification |
|---|---|---|---|---|
| **Pass 1** | `page-1-overview.html` | Build Treasury Yield & Sweep Allocation overview console with live summary strip, 4 edge cases, and 5 UI states | `var(--bg-canvas)`, `var(--bg-elevated)`, `var(--text-primary)`, `var(--border-hairline)` | Verified via CLI linter (0 errors) & UI state switcher |
| **Pass 2** | `page-2-rules.html` | Build Withholding Rule Builder & Append-Only Audit Trail maintaining 100% geometric unity with Page 1 | Identical `tokens.css` bindings, `--radius-outer: 6px`, `--radius-inner: 4px` | Verified via CLI linter (0 errors) & cross-link audit |

---

## 7. Intentional Local Exceptions

| Component | Selector | Rule Diverged From | Business Justification | Source Marker |
|---|---|---|---|---|
| *None* | — | — | — | — |

*To add an exception, use `/* @design-exception: [reason] */` in code and document above.*

---

## 8. Polish Backlog

- [ ] **Tabular Alignment Check:** Ensure all numeric columns right-align with zero jitter.
- [ ] **Keyboard Navigation:** Bind keyboard shortcut navigation for data grid rows.
