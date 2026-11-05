import { GeneratorOptions } from './types.js';

/**
 * Extracts sections 5 through 8 from an existing DESIGN.md document.
 */
export function extractPreservedSections(existingContent: string): string | null {
  const marker = '## 5. Component Inventory';
  const index = existingContent.indexOf(marker);
  if (index !== -1) {
    return existingContent.slice(index).trim();
  }
  return null;
}

export function generateDesignMd(options: GeneratorOptions, existingContent?: string): string {
  const {
    projectName,
    archetype,
    customDirection = 'Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff',
    productBrief = 'High-precision operational workspace and data reconciliation platform'
  } = options;

  let polarity = 'Dark';
  let layout = 'Desktop-First';
  let voiceAdjectives = 'Direct, Forensic, Unhurried';
  let soundsLikeA = 'Row 4,812: $412.50 FX discrepancy between Stripe payout and nodal settlement.';
  let neverSoundsLikeA = 'Oops! Something went wrong with your reconciliation. Try again!';
  let signatureMoment = 'Precision single-sweep scanline pulse over the batch header upon reconciliation commitment (180ms ease, zero overshoot).';

  if (archetype === 'editorial-serif-paper') {
    polarity = 'Light';
    voiceAdjectives = 'Literary, Dispassionate, Deeply-Researched';
    soundsLikeA = 'Citations cross-referenced across 14 archival editions with verified bibliographic provenance.';
    neverSoundsLikeA = 'Supercharge your reading with our AI-powered journal platform! 🚀';
    signatureMoment = 'Gentle 240ms ink-soak underline expansion upon section entry.';
  } else if (archetype === 'neo-brutalism') {
    polarity = 'Light';
    voiceAdjectives = 'Stark, Punchy, Tactile';
    soundsLikeA = 'Pipeline output committed. Hash: 0x8F2D. 0 warnings.';
    neverSoundsLikeA = 'Enjoy our smooth and seamless creative workflow experience.';
    signatureMoment = 'Hard tactile button depress translating 3px and collapsing shadow.';
  }

  // Base Sections 0 through 4
  const baseSections = `# Design Specification & Token Contract

**STATUS:** ACTIVE  
**BRIEF STATUS:** LOCKED  
**ARCHETYPE:** ${archetype}  
**POLARITY:** ${polarity}  
**LAYOUT:** ${layout}  
**TOKENS SOURCE:** \`./tokens.css\`

---

## 0. User's Custom Creative Direction & Anti-Drift Mandate

> *"${customDirection}"*

### The 3-Point Anti-Drift Mandate
1. **Express via Tokens Only:** Every stylistic choice, density shift, or visual cue must be expressed through CSS Custom Properties declared in \`./tokens.css\`. Inlining raw hex/rgb values, arbitrary border-radii, or ad-hoc margins is strictly forbidden.
2. **Zero Slop Excuse:** Creative direction is never an excuse to inject AI tropes. No floating badge chips, glowing purple gradients, springy overshoots, unprompted notification bells, 3 equal-card marketing rows, or emoji decorators.
3. **Cross-Page Persistence:** This aesthetic is invariant across all subviews, data tables, sliding drawers, filter dialogs, and modal confirmations. No view may deviate into casual or generic SaaS patterns.

---

## 1. Project Design DNA

- **Archetype:** \`${archetype}\`
- **Primary Layout Vector:** ${layout}
- **Polarity:** ${polarity} Polarity
- **Geometric Rigor:** Concentric corner radius hierarchy (\`radius-inner = max(0, radius-outer - padding)\`).

---

## 2. Voice & Content Brief

**Product Definition:**  
${productBrief} for ${projectName}.

### Verified Facts (Immutable Ground Truth)
1. Operational integrity validated against immutable append-only logs.
2. Sub-50ms audit verification with zero third-party telemetry exposure.
3. Full regulatory and security compliance certified under standard industry frameworks.

### Voice Adjectives
- **${voiceAdjectives.split(',')[0]?.trim()}**
- **${voiceAdjectives.split(',')[1]?.trim()}**
- **${voiceAdjectives.split(',')[2]?.trim()}**

### Voice Contrast

| Sounds Like | Never Sounds Like |
|---|---|
| "${soundsLikeA}" | "${neverSoundsLikeA}" |
| "12 batches pending verification. Run reconciliation sequence." | "Say goodbye to financial headaches with our smart AI dashboard!" |
| "Batch \`0x8F2D\`: Merkle root verified against append-only log." | "One-click simplicity for all your enterprise needs." |

---

## 3. Token Contract (Values Locked in \`./tokens.css\`)

All components MUST consume these semantic tokens directly. Never duplicate raw hex or OKLCH values in markup or component CSS.

- **Surfaces & Layout:** \`var(--bg-canvas)\`, \`var(--bg-elevated)\`, \`var(--bg-surface-active)\`, \`var(--bg-glass)\`, \`var(--bg-sunken)\`
- **Typography & Foreground:** \`var(--text-primary)\`, \`var(--text-muted)\`, \`var(--text-subtle)\`, \`var(--text-inverse)\`
- **Accents & Hairlines:** \`var(--accent-primary)\`, \`var(--accent-subtle)\`, \`var(--accent-hover)\`, \`var(--border-hairline)\`, \`var(--border-subtle)\`, \`var(--border-focus)\`, \`var(--highlight-specular)\`
- **Geometry & Elevation:** \`var(--radius-outer)\`, \`var(--radius-inner)\`, \`var(--radius-badge)\`, \`var(--surface-blur)\`, \`var(--shadow-surface)\`, \`var(--shadow-elevated)\`
- **Section Rhythm & Container:** \`var(--section-py-tight)\`, \`var(--section-py-normal)\`, \`var(--section-py-breathing)\`, \`var(--container-max)\`
- **Typography Scale:** \`var(--font-display)\`, \`var(--font-sans)\`, \`var(--font-mono)\`, \`var(--text-xs)\` through \`var(--text-4xl)\`, \`var(--weight-heading)\`, \`var(--weight-body)\`, \`var(--weight-mono)\`
- **Motion:** \`var(--ease-primary)\`, \`var(--duration-fast)\`, \`var(--duration-normal)\`

---

## 4. Viewport Budgets & Signature Moment

- **Accent Surface Area Budget:** Maximum **15%** of viewport pixels may contain \`--accent-primary\` or bright status fills.
- **Primary CTA Budget:** Strictly **1 Primary Action** visible per viewport. When a table or view is empty, the empty-state action absorbs this CTA via an explicit Empty-State handoff.
- **Motion Budget:** Maximum **2 decorative animated elements** running simultaneously per viewport. \`[aria-busy="true"]\` loading skeletons are exempt.
- **Metric Strip Architecture:** Strictly ban 3 equal-width stat boxes in a row. Workspaces must use an inline horizontal metric strip with 1px vertical hairlines (\`var(--border-hairline)\`) or an asymmetric 2-pane split.
- **Context Boundary:** Workspaces must display live operational data. Never place static marketing or compliance statements in active console views.
- **Badge & Indicator Discipline:** Eyebrows must stand alone as plain monospace text. Colored status dots are forbidden unless tied to a live connection status.
- **Signature Moment:** ${signatureMoment}
`;

  // Check if existing Sections 5 through 8 can be preserved
  if (existingContent) {
    const preserved = extractPreservedSections(existingContent);
    if (preserved) {
      return `${baseSections}\n---\n\n${preserved}\n`;
    }
  }

  // Default Sections 5 through 8 for fresh initialization
  const defaultSections = `---

## 5. Component Inventory

| Component | Selector / Element | Role | Default Token Binding |
|---|---|---|---|
| **Top Utility Bar & State Controller** | \`header.top-utility-bar\`, \`nav.state-switcher\` | View metadata & state controller | \`var(--bg-sunken)\`, \`var(--border-hairline)\`, \`var(--radius-outer)\` |
| **Workspace Summary Bar** | \`div.workspace-summary-bar\`, \`.summary-segment\` | Operational batch totals & variance strip | \`var(--bg-elevated)\`, \`var(--border-hairline)\`, \`var(--highlight-specular)\` |
| **Inline Error Banner** | \`aside.inline-error-banner\` | Discrepancy alert banner | \`var(--bg-sunken)\`, \`var(--status-danger)\`, \`var(--radius-outer)\` |
| **Action Bar & Primary CTA** | \`section.action-bar\`, \`button.btn-primary\` | Controls & single primary CTA | \`var(--accent-primary)\`, \`var(--text-inverse)\`, \`var(--radius-inner)\` |
| **Primary Card Container** | \`article.settlement-card\` | Concentric bounded workspace card | \`var(--bg-elevated)\`, \`var(--border-hairline)\`, \`var(--radius-outer)\` |
| **Data Table Grid** | \`table.settlement-grid\` | Forensic record display & truncation | \`var(--bg-elevated)\`, \`var(--border-subtle)\`, \`var(--font-mono)\` |
| **Monogram Avatar Fallback** | \`span.monogram-avatar\` | Null avatar fallback box | \`var(--bg-sunken)\`, \`var(--border-subtle)\`, \`var(--radius-inner)\` |
| **Loading Skeleton View** | \`div.skeleton-view[aria-busy="true"]\` | Zero-CLS layout-matching skeleton | \`var(--bg-sunken)\`, \`var(--radius-inner)\` |
| **Zero-Data Empty State** | \`div.empty-view\`, \`button.empty-cta-handoff\` | Hand-off target absorbing Primary CTA | \`var(--text-muted)\`, \`var(--accent-primary)\`, \`var(--radius-inner)\` |

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

*To add an exception, use \`/* @design-exception: [reason] */\` in code and document above.*

---

## 8. Polish Backlog

- [ ] **Tabular Alignment Check:** Ensure all numeric columns right-align with zero jitter.
- [ ] **Keyboard Navigation:** Bind keyboard shortcut navigation for data grid rows.
`;

  return `${baseSections}\n${defaultSections}`;
}
