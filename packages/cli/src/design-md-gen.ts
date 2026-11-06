import { GeneratorOptions, computeCalibrationDials } from './types.js';

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
    customDirection = 'Clean modern SaaS product interface, crisp 1px hairlines, subtle glass elevation, and high-contrast typography',
    productBrief = 'Clean, high-precision modern SaaS and digital product workspace'
  } = options;

  const dials = computeCalibrationDials(archetype, options.feeling);

  let polarity = 'Dark';
  const lightArchetypes = new Set([
    'consumer-retail-studio',
    'editorial-serif-paper',
    'neo-brutalist-studio',
    'neo-brutalism',
    'swiss-typographic-grid',
    'quiet-luxury-atelier',
    'warm-artisan-craft',
    'japanese-minimal-zen',
    'scandinavian-warm-minimal',
    'playful-clay-consumer',
    'high-trust-fintech-clarity',
    'clinical-biotech-precision',
    'civic-govtech-accessible'
  ]);
  if (lightArchetypes.has(archetype)) {
    polarity = 'Light';
  }

  let layout = 'Desktop-First';
  let voiceAdjectives = 'Direct, High-Precision, Unhurried';
  let soundsLikeA = 'Deployment pipeline committed: 84 tests passing, zero warnings.';
  let neverSoundsLikeA = 'Oops! Something went wrong with your app. Try again! 🚀';
  let signatureMoment = 'Subtle 150ms border-glow transition on active workspace panels (zero spring overshoot).';

  if (archetype === 'consumer-retail-studio') {
    polarity = 'Light';
    voiceAdjectives = 'Refined, Confident, Understated';
    soundsLikeA = 'Crafted in 100% organic cotton. Designed for lasting comfort.';
    neverSoundsLikeA = 'HURRY! BUY NOW! 🔥 LIMITED STOCK DEALS!';
    signatureMoment = 'Silky-smooth image scale and elevation on product card focus (200ms ease).';
  } else if (archetype === 'data-dense-observability') {
    voiceAdjectives = 'Forensic, Dense, Uncompromising';
    soundsLikeA = 'Cluster ap-south-1b latency p99 at 14.2ms. Ingress throughput 4.2 GB/s.';
    neverSoundsLikeA = 'Check out your super-fast cloud stats today!';
    signatureMoment = 'Instant zero-latency tabular filter slice with 100ms row pulse.';
  } else if (archetype === 'atmospheric-aurora-launch') {
    voiceAdjectives = 'Visionary, Cinematic, Precise';
    soundsLikeA = 'Next-generation intelligent computing. Available today.';
    neverSoundsLikeA = 'The ultimate AI tool that changes everything!';
    signatureMoment = 'Subtle ambient radial aurora drift behind the primary hero card.';
  } else if (archetype === 'editorial-serif-paper' || archetype === 'quiet-luxury-atelier') {
    voiceAdjectives = 'Literary, Dispassionate, Deeply-Researched';
    soundsLikeA = 'Vault allocation audited against physical treasury bills with verified CUSIP numbers.';
    neverSoundsLikeA = 'Supercharge your treasury with our smart AI dashboard! 🚀';
    signatureMoment = 'Gentle 240ms ink-soak underline expansion upon section entry.';
  } else if (archetype === 'neo-brutalist-studio' || archetype === 'neo-brutalism') {
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
**STARTER BLUEPRINT:** \`./starter-preview.html\` (Living architectural reference — MUST inspect before authoring views)

---

## 0. User's Custom Creative Direction & Anti-Drift Mandate

> *"${customDirection}"*

### The 3-Tier Priority Hierarchy ("The User Is Always in the Driver's Seat")
1. **Priority #1 (Highest) — User's Live Chat Prompt & Explicit Instructions:** If the user asks for a specific layout, section, animation, color, font, badge, or component in chat, execute it 100% faithfully with zero pushback. Explicit user intent always overrides default rules.
2. **Priority #2 — User's Custom Creative Direction (This Section 0):** Overrides default archetype aesthetics or tone.
3. **Priority #3 (Fallback Only) — Archetype Rules, Domain Blueprints & Anti-Slop Defaults:** Governs ONLY when the user's prompt is silent or vague, filling in missing decisions so the agent never falls back to generic AI slop.

### The 3-Point Anti-Drift Mandate
1. **Express via Tokens Only:** Every stylistic choice, density shift, or visual cue must be expressed through CSS Custom Properties declared in \`./tokens.css\`. Inlining raw hex/rgb values, arbitrary border-radii, or ad-hoc margins is strictly forbidden.
2. **Zero Slop Excuse:** Creative direction is never an excuse to inject AI tropes. No floating badge chips, glowing purple gradients, springy overshoots, unprompted notification bells, 3 equal-card marketing rows, or emoji decorators.
3. **Cross-Page Persistence:** This aesthetic is invariant across all subviews, data tables, sliding drawers, filter dialogs, and modal confirmations. No view may deviate into casual or generic SaaS patterns.

---

## 1. Project Design DNA & Starter Blueprint

- **Archetype:** \`${archetype}\`
- **Primary Layout Vector:** ${layout}
- **Polarity:** ${polarity} Polarity
- **Starter Blueprint:** \`./starter-preview.html\`
- **Architectural Parity Mandate:** Always inspect \`./starter-preview.html\` before creating new views. It demonstrates production-ready markup, container sizing, split-pane structures, table styling, and verified token bindings. Port its proven patterns directly into your framework rather than designing from scratch.
- **Geometric Rigor:** Concentric corner radius hierarchy (\`radius-inner = max(0, radius-outer - padding)\`).
- **Calibration Dials:**
  - \`DESIGN_VARIANCE: ${dials.designVariance}/10\`
  - \`MOTION_INTENSITY: ${dials.motionIntensity}/10\`
  - \`VISUAL_DENSITY: ${dials.visualDensity}/10\`
- **Viewport Height Law:** Full-height containers & mobile shells must use \`min-h-[100dvh]\` / \`100dvh\` (never \`100vh\`).

### Fallback Domain Blueprints (When Prompt Is Brief)
> **FALLBACK BLUEPRINT RULE:** Use these domain architectures ONLY to fill in the blanks when the user's prompt is brief or unstructured (e.g., "build a sneaker shop", "make a music player", "make a crypto dashboard"). If the user specifies their own sections, pages, or layout structure, **ALWAYS follow the user's exact structure instead.**

- **E-Commerce & Retail Studio:** Asymmetric product hero with split gallery, sticky add-to-bag bar, curated single-row collection (<= 4 items), sticky mobile checkout dock with safe-area clearance.
- **Media & Music Player / Streaming:** Edge-to-edge canvas with artwork focal point, fixed bottom player dock with scrubber & centered play trigger, asymmetric playlist split pane, centered artwork overlay (no corner pills).
- **SaaS Workspace & Analytics Dashboard:** Clean command/filter bar, asymmetric 2-pane metric/activity split (never 3 equal cards), high-density data grid with right-aligned tabular numerals, empty state handoff.
- **Product Launch & Waitlist / Editorial:** Balanced display headline on open canvas, minimalist single-field waitlist dock, asymmetric feature reveal with breathing room, zero ungrounded marketing claims.

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
- **Geometry & Elevation:** \`var(--radius-outer)\`, \`var(--radius-inner)\`, \`var(--radius-badge)\` (Strictly for data-row status cells — NEVER create decorative header or card badges), \`var(--surface-blur)\`, \`var(--shadow-surface)\`, \`var(--shadow-elevated)\`
- **Section Rhythm & Container:** \`var(--section-py-tight)\`, \`var(--section-py-normal)\`, \`var(--section-py-breathing)\`, \`var(--container-max)\`
- **Typography Scale:** \`var(--font-display)\`, \`var(--font-sans)\`, \`var(--font-mono)\`, \`var(--text-xs)\` through \`var(--text-4xl)\`, \`var(--weight-heading)\`, \`var(--weight-body)\`, \`var(--weight-mono)\`
- **Motion:** \`var(--ease-primary)\`, \`var(--ease-spring)\`, \`var(--duration-fast)\`, \`var(--duration-normal)\`

---

## 4. Viewport Budgets & Signature Moment

- **Accent Surface Area Budget:** Maximum **15%** of viewport pixels may contain \`--accent-primary\` or bright status fills.
- **Primary CTA Budget:** Strictly **1 Primary Action** visible per viewport. When a table or view is empty, the empty-state action absorbs this CTA via an explicit Empty-State handoff.
- **Motion Budget:** Maximum **2 decorative animated elements** running simultaneously per viewport. \`[aria-busy="true"]\` loading skeletons are exempt.
- **Metric Strip Architecture:** Strictly ban 3 equal-width stat boxes in a row. Workspaces must use an inline horizontal metric strip with 1px vertical hairlines (\`var(--border-hairline)\`) or an asymmetric 2-pane split.
- **Context Boundary:** Workspaces must display live operational data. Never place static marketing or compliance statements in active console views.
- **Zero Unrequested Badges Law:** NEVER place pill badges, status chips, or uppercase tag boxes inside app headers, navbars, hero sections, or card headers (e.g., ban \`PRO v2.4\`, \`STABLE\`, \`SUB-10MS\`, \`60 FPS\`). Cards must use plain text headings or no header at all. Tags/badges are ONLY permitted inside repeating data table cells or list rows to indicate item-level record status (e.g., \`Settled\`, \`Discrepancy\`, \`Active\`), strictly capped at max 1 badge per row.
- **Numeric & Tabular Typography Law:** NEVER use coding monospace fonts (\`--font-mono\`) or \`slashed-zero\` on hero numbers, counters, or KPI figures. Always use \`var(--font-display)\` or \`var(--font-sans)\` with \`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;\` so digits have clean, open-oval zeros (\`0\`) with zero horizontal jitter. Reserve \`var(--font-mono)\` strictly for code snippets, file paths, or git hashes.
- **Strict Dot & Bullet Discipline:** Eyebrows must stand alone as plain monospace text. NEVER render small colored circle elements (whether static or animated) next to status text or beside headings; communicate status through clean typography or subtle text color alone. NEVER start badges, pills, eyebrows, or labels with bullet characters (\`•\`, \`●\`, \`▪\`). Dots are strictly restricted to true vertical lists (\`<ul><li>\`), inline mid-dot separators (\`·\`) between two strings, or carousel pagination.
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
| **Inline Error Banner** | \`aside.inline-error-banner\` | Validation / state alert banner | \`var(--bg-sunken)\`, \`var(--status-danger)\`, \`var(--radius-outer)\` |
| **Action Bar & Primary CTA** | \`section.action-bar\`, \`button.btn-primary\` | Controls & single primary CTA | \`var(--accent-primary)\`, \`var(--text-inverse)\`, \`var(--radius-inner)\` |
| **Primary Card Container** | \`article.workspace-card\` | Concentric bounded workspace card | \`var(--bg-elevated)\`, \`var(--border-hairline)\`, \`var(--radius-outer)\` |
| **Data Table Grid** | \`table.data-grid\` | Forensic record display & truncation | \`var(--bg-elevated)\`, \`var(--border-subtle)\`, \`var(--font-mono)\` |
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
