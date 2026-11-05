import fs from 'fs-extra';
import path from 'pathe';
import { fileURLToPath } from 'node:url';
import { GeneratorOptions } from './types.js';
import { generateTokens, detectProjectFonts } from './tokens-gen.js';
import { generateDesignMd } from './design-md-gen.js';
import { writeAntigravityAdapter } from './adapters/antigravity.js';
import { writeCursorAdapter } from './adapters/cursor.js';
import { writeClaudeCodexAdapter } from './adapters/claude-codex.js';
import { writeWebBuildersAdapter } from './adapters/web-builders.js';

async function findRegistryDir(): Promise<string> {
  const currentFile = fileURLToPath(import.meta.url);
  const dirname = path.dirname(currentFile);
  const candidates = [
    path.resolve(dirname, '../registry'),
    path.resolve(dirname, '../../registry'),
    path.resolve(dirname, '../../../registry'),
    path.resolve(process.cwd(), 'registry')
  ];

  for (const c of candidates) {
    if (await fs.pathExists(c)) return c;
  }
  return path.resolve(process.cwd(), 'registry');
}

/**
 * Builds the compressed (<1,500 tokens) Always-On Core Rule content
 * parameterized for the chosen archetype and settings.
 */
export function buildCoreRuleContent(options: GeneratorOptions): string {
  const { archetype } = options;

  return `# Always-On Design Governance Rule (v1.1)

You are the design governance engine for this codebase. Every UI decision must preserve geometric unity, copy honesty, and visual calm across every turn.

---

### 1. Foundational Philosophy: Subtraction Over Addition (Do Less, Better)
- **Cure Additive Over-Engineering:** AI models default to adding extra wrapper boxes, borders, micro-labels, status badges, metadata strips, and color splashes to make a UI look "complex." To the human eye, unnecessary complexity looks cheap and exhausting. **Basic and clean always beats complex and busy.**
- **The Subtraction Test (Mandatory Self-Check):** Before rendering any container box, border, label, subheading, icon, or secondary widget, ask: *"If I remove this element, does the screen still work and make sense?"* If the answer is YES, **do not render it.**

---

### 2. The 5 Universal Laws of Visual Calm (Applies to Every UI)
1. **Proximity Over Containers (Stop Boxing Everything):**
   - Do not wrap every section, focal element, or list item inside a bordered card. Let primary content sit directly on the open background canvas with generous whitespace around it.
   - Use spacing and alignment to group related elements naturally for the eye. Only introduce a visible card/surface container when necessary to group interactive lists or forms, and **never nest bordered boxes inside bordered boxes** (*Pattern A (Grouped Panel):* A single outer surface with borderless child rows separated ONLY by a quiet 1px line \`border-bottom: 1px solid var(--border-hairline)\`, or *Pattern B (Open Canvas Grid):* A borderless section sitting directly on \`--bg-canvas\` with individual cards below it).
   - **Unbox the Hero:** Primary focal elements (headlines, hero numbers, primary display meters) should sit directly on the open canvas without a heavy box trapping them.
2. **One Signal Per Hierarchy Step (No Visual Shouting):**
   - Never stack multiple visual treatments on the same element (e.g., do not combine colored text + colored background tint + border + badge all at once; never paint half of a heading or number in an accent color).
   - Establish hierarchy quietly using **scale (size) and weight first**, **neutral opacity (\`--text-muted\`) second**, and reserve \`--accent-primary\` strictly for the single primary interactive focal point on screen.
   - On large display text or numerals (\`>= 3rem\`), prefer clean, lighter weights (\`300\`–\`500\`) and open letterforms (\`font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1, "zero" 0;\`) rather than heavy, aggressive blocks or coding slashed zeros.
3. **Self-Evident UI Needs Zero Labels:**
   - If a piece of data, a control, or a view is already obvious from its format or context, render it directly without an \`UPPERCASE\` micro-label above it, a redundant explainer subheading below it, or a status pill beside it. Cap uppercase eyebrows at strictly **<= 1 per entire view**.
   - Never invent fake brand headers, fake version/tier tags (\`PRO\`, \`v2.0\`, \`BETA\`), fake hardware telemetry, or unrequested status chips just to fill space.
4. **Progressive Presence (Show Only What Matters Right Now):**
   - Do not crowd the initial viewport with empty secondary panels, permanent split-screen boxes, or auxiliary toolbars before the user needs them.
   - Keep the initial view focused on the primary task with abundant breathing room, and reveal secondary lists or details progressively as data is created.
   - **The "No Empty-Space Panic" Law:** Whitespace is an intentional, premium design feature. NEVER invent decorative filler widgets (e.g., fake progress bars, metadata footers, telemetry strips, unprompted mini-cards) just to fill container height or balance asymmetric columns.
5. **Whisper-Quiet Chrome & Borders:**
   - Application navigation and secondary controls should recede into the background so the user's content is the hero.
   - Rely on subtle surface luminance shifts (\`--bg-canvas\` vs \`--bg-elevated\` / \`--bg-surface\`) rather than drawing high-contrast wireframe borders around every element. Borders (\`var(--border-hairline)\`, \`var(--border-subtle)\`) are subtle hairlines (7% opacity), never thick wireframe frames.

---

### 3. Mandatory Pre-Flight & Token Contract
- **Read First:** Read \`./DESIGN.md\` and verify that \`./tokens.css\` is imported before generating or editing any UI markup or styling.
- **Adaptive Pre-Flight Gate:**
  - If \`BRIEF STATUS: DRAFT\` or the user prompt is structurally ambiguous: Stop immediately, ask 2–4 targeted design questions, and provide a 5–10 line text/ASCII wireframe layout plan before writing code.
  - If \`BRIEF STATUS: LOCKED\` and the prompt is clear: Skip questions and begin response directly with:  
    \`> **Assumptions:** [1-line summary of scope, tokens, and target view]\`

---

### 4. Section 0 Anti-Drift Mandate
- Honor the user's custom creative direction in \`DESIGN.md\` Section 0 exclusively through \`var(--*)\` tokens.
- Creative direction is never an excuse to inject AI tropes, decorative fluff, or sloppy ad-hoc styles.
- The specified aesthetic (\`${archetype}\`) is immutable and must persist uniformly across all views, drawers, modals, and states.

---

### 5. Strict Scope Lock
- Build **only** what was explicitly requested.
- **Prohibited unprompted additions:** Never add unrequested dark/light theme toggles, notification bells, search bars, account profile dropdowns, multi-step wizards, or decorative marketing footers. If a feature was not asked for, do not generate it.

---

### 6. Smart Override Protocol & User Style Supremacy
- **Singular Intent** (e.g., *"make this button pill"*, *"make that card border amber"*):
  - Treat as a **Scoped Local Exception**.
  - Mark inline in code: \`/* @design-exception: [reason] */\`.
  - Immediately log the entry into \`DESIGN.md\` under \`## 7. Intentional Local Exceptions\`.
- **Plural Intent** (e.g., *"make buttons pill"*, *"all cards need amber borders"*):
  - Treat as a **Global Token Update**.
  - Modify the canonical token value in \`./tokens.css\`. Do not add component-level overrides.
- **Ambiguous Phrasing or Unlogged Divergence:** Present the 3-choice prompt:
  1. Update global token in \`./tokens.css\`
  2. Document as scoped local exception in \`./DESIGN.md\`
  3. Revert change to match existing token contract
- **User Font & Style Supremacy:** Default bans on commodity fonts (\`Roboto\`, \`Inter\`, \`Plus Jakarta Sans\`) or styles apply ONLY to unprompted AI defaults. If the user explicitly requests \`Roboto\`, \`Inter\`, or any custom font/color in chat, obey immediately by updating \`tokens.css\` (if global) or tagging \`/* @design-exception */\` (if local) with zero pushback.

---

### 7. Scoped \`var()\` Mandate & Concentric Corner Math
- **Token Law:** All colors, border radii, backdrop blurs, box shadows, font families, font sizes, font weights, and section vertical paddings (\`--section-py-*\`) **must** consume \`var(--*)\` tokens from \`tokens.css\`.
- **Zero Raw Literals:** No hardcoded hex (\`#111\`), rgb, oklch, or arbitrary pixel radius values in component markup or styles.
- **Concentric Corner Math:** Whenever nesting a rounded element inside another:  
  \`--radius-inner = max(0px, var(--radius-outer) - padding)\`  
  Child radii must never clash with or protrude past parent boundaries.

---

### 8. Typography, Numeric Hygiene & Anti-Slop Firewall
- **Casing:** Headings, button labels, and navigation items must use **sentence case** ("Reconcile batch", not "Reconcile Batch").
- **Banned Numbered Eyebrows:** Never put numbered labels (\`01 / ...\`, \`02 / ...\`) or redundant category eyebrows above \`<h1>\` page titles. Eyebrows are prohibited if they merely paraphrase the heading or add decorative numbering.
- **Workspace vs. Marketing Font Routing:** Never override a user's existing project fonts in \`tokens.css\`. When \`--font-display\` is an editorial/high-contrast serif, reserve \`var(--font-display)\` strictly for marketing heroes and editorial reading views; inside functional application workspaces, data tables, and settings consoles, style \`h1–h4\` headings with \`var(--font-sans)\` so dense UI remains crisp.
- **Typesetting:**
  - \`text-wrap: balance\` on all headings (\`h1\`–\`h4\`).
  - \`text-wrap: pretty\` and \`max-width: 65ch\` on prose paragraphs.
  - **Never** center-align text blocks longer than 2 lines.
  - \`font-variant-numeric: tabular-nums\` on all numbers, monetary amounts, and timestamps.
- **Banned AI Clichés:**
  - Zero \`animate-ping\` or continuous attention-seeking animations.
  - Zero purple/pink/cyan AI mesh gradients or glowing border outlines.
  - Zero emojis used as icons (no 🚀, 💡, 🔥, ✨). Use SVGs or monospaced glyphs.
  - Zero decorative floating orbs or ungrounded card drop shadows.
  - **Zero 3-Equal-Card KPI Rows:** Never place 3 equal-width stat boxes in a row. Use an inline horizontal metric strip with 1px vertical dividers (\`var(--border-hairline)\`) or an asymmetric 2-pane split instead.
  - **Zero Marketing Claims in App Workspaces:** Never place static marketing, throughput capacity, or compliance claims (e.g., "SOC2 Type II", "250K TX/S") inside active operational workspace consoles. Reserve these exclusively for landing/onboarding pages. Workspaces must only display live operational batch totals.
  - **Zero Decorative Header Chips & Numbered Eyebrows:** Never place decorative pill tags/chips or numbered prefixes (\`01 / ...\`) next to or above section headers. Pill badges are strictly reserved for record status inside data views (e.g., \`Settled\`, \`Discrepancy\`).
  - **Zero Unrequested Badges Law:** NEVER place pill badges, status chips, or uppercase tag boxes inside app headers, navbars, hero sections, or card headers (e.g., ban \`PRO v2.4\`, \`STABLE\`, \`SUB-10MS\`, \`60 FPS\`). Cards must use plain text headings or no header at all. Tags/badges are ONLY permitted inside repeating data table cells or list rows to indicate item-level record status (e.g., \`Settled\`, \`Discrepancy\`, \`Active\`), strictly capped at max 1 badge per row.
  - **Numeric & Tabular Typography Law:** NEVER use coding monospace fonts (\`--font-mono\`) or \`slashed-zero\` on hero numbers, counters, or KPI figures. Always use \`var(--font-display)\` or \`var(--font-sans)\` with \`font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;\` so digits have clean, open-oval zeros (\`0\`) with zero horizontal jitter. Reserve \`var(--font-mono)\` strictly for code snippets, file paths, or git hashes.
  - **Zero Sci-Fi & Hardware Telemetry Cosplay:** Ban inventing fake brand names, fake tier badges (\`[PRO v2.4]\`, \`[BETA]\`), fake hardware telemetry (\`60 FPS\`, \`SUB-10MS\`), and unrequested Unix \`EPOCH\` readouts.
  - **Zero Fake Status Dots:** Colored status dots (static or animated) are banned in headers and footers unless wired to a real, user-toggleable live connection state.

---

### 9. Proportional Canvas Sizing, Seed Data & Component State Rigor
- **Proportional Canvas Sizing Architecture:**
  - *Focused Utilities & Compact Views:* Compact centered layout (\`max-w-3xl\` / \`768px–880px\` on desktop) with centered segmented control dock; never a 1440px corporate enterprise header with an invented brand logo.
  - *Data-Dense Workspaces (ledgers, financial consoles, multi-column tables):* Standard wide container (\`max-w-6xl\` / \`1152px–1280px\`) or fluid responsive workspace (\`w-full px-6\`).
- **Data Ban:** Never use \`"John Doe"\`, \`"Jane Doe"\`, \`"Lorem ipsum"\`, \`"foo"\`, or \`"$99.99"\`.
- **Realistic Diversity (\`// SAMPLE DATA\`):**
  - Use realistic domain entities with varying character lengths.
  - Include at least 1 long entity name that explicitly exercises truncation (\`text-overflow: ellipsis\`).
  - Include at least 1 null avatar / fallback monogram.
  - Include at least 1 zero / pending / unverified state.
- **The 5 Mandatory States:** Every interactive component must handle:
  1. Default
  2. Interactive (Hover / Active / Focus-visible)
  3. Loading (\`aria-busy="true"\` skeleton matching geometry)
  4. Empty (with contextual empty-state handoff for the primary CTA)
  5. Inline Error (clear, actionable, non-destructive feedback)
- **Mobile Bottom-Dock Safe Clearance & Thumb Zone:** On \`mobile-first\` or \`adaptive-hybrid\` layouts, mobile bottom navigation (\`< 768px\`) MUST use \`position: fixed; bottom: 0; left: 0; right: 0; z-index: 50\`, and the scroll container MUST reserve \`padding-bottom: calc(5rem + env(safe-area-inset-bottom))\` (or \`calc(dock-height + 2rem)\`) so scrollable content is never sliced or trapped behind floating controls. Primary action triggers must remain anchored in the lower thumb zone.
- **Smooth State Transitions:** Tab switches, view toggles, and progress indicators must animate smoothly using \`var(--ease-primary)\` and \`var(--duration-normal)\` (or \`.view-transition\`). Interactive triggers must include \`.spring-interactive\` tactile press states.

---

### 10. Brochure & Swap Tests (Copy Honesty)
- **Brochure Test:** Ban UI self-description (e.g., *"Hover to reveal details"*, *"One-click reconciliation"*, *"Smooth animations"*, *"Powered by modern React"*).
- **Swap Test:** If replacing the product name with a competitor makes the copy still make sense, rewrite it to be concrete, technical, and domain-grounded.
- **Redundant Subheadings:** Purge any subheading that merely paraphrases its parent heading.
- **Punctuation & Metrics:** Maximum 1 em-dash per page (zero in headings). Never fabricate metrics, performance benchmarks, or certifications outside \`DESIGN.md\` Section 2.

---

### 11. Fix-Forward & 2-Pass Revision Budget
- **Fix-Forward:** Resolve visual or ergonomic issues by updating \`./tokens.css\` or removing clutter—**never** by adding wrapper elements, extra containers, or ad-hoc overrides.
- **Revision Budget:** Maximum **2 iterative revision passes** per feature. Track each pass in \`DESIGN.md\` Section 6.
- Log non-blocking enhancements into \`DESIGN.md\` Section 8 (**Polish Backlog**) rather than burning turns on infinite micro-tweaks.`;
}

/**
 * Compiles and writes the complete design system foundation to disk.
 */
export async function compileDesignSystem(options: GeneratorOptions): Promise<{
  createdFiles: string[];
}> {
  const { targetDir, agents } = options;
  await fs.ensureDir(targetDir);

  // 3-Tier Font Preservation: Check for existing project fonts if not already overridden
  if (!options.fontOverride) {
    const detected = await detectProjectFonts(targetDir);
    if (detected) {
      if (!options.fontMode || options.fontMode === 'keep') {
        options = {
          ...options,
          fontMode: 'keep',
          fontOverride: detected
        };
      }
    }
  }

  const createdFiles: string[] = [];

  // 1. Generate tokens.css and tokens.json
  const { css, json } = generateTokens(options);
  const cssPath = path.resolve(targetDir, 'tokens.css');
  const jsonPath = path.resolve(targetDir, 'tokens.json');

  await fs.writeFile(cssPath, css, 'utf-8');
  createdFiles.push(cssPath);

  await fs.writeJSON(jsonPath, json, { spaces: 2 });
  createdFiles.push(jsonPath);

  // 2. Generate DESIGN.md (Smart Non-Destructive Preservation of Sections 5-8)
  const designMdPath = path.resolve(targetDir, 'DESIGN.md');
  let existingContent: string | undefined;
  if (await fs.pathExists(designMdPath)) {
    existingContent = await fs.readFile(designMdPath, 'utf-8');
  }
  const designMd = generateDesignMd(options, existingContent);
  await fs.writeFile(designMdPath, designMd, 'utf-8');
  createdFiles.push(designMdPath);

  // 3. Optional Starter Kit Copy (template.html -> starter-preview.html)
  if (options.starterKit) {
    const registryDir = await findRegistryDir();
    const starterTemplate = path.resolve(registryDir, 'starter-kits', options.starterKit, 'template.html');
    if (await fs.pathExists(starterTemplate)) {
      const previewPath = path.resolve(targetDir, 'starter-preview.html');
      await fs.copy(starterTemplate, previewPath);
      createdFiles.push(previewPath);
    }
  }

  // 4. Generate Agent Rules via Adapters
  const coreRuleContent = buildCoreRuleContent(options);

  for (const agent of agents) {
    if (agent === 'antigravity') {
      const ps = await writeAntigravityAdapter(targetDir, options, coreRuleContent);
      createdFiles.push(...ps);
    } else if (agent === 'cursor') {
      const ps = await writeCursorAdapter(targetDir, options, coreRuleContent);
      createdFiles.push(...ps);
    } else if (agent === 'claude-codex') {
      const ps = await writeClaudeCodexAdapter(targetDir, options, coreRuleContent);
      createdFiles.push(...ps);
    } else if (agent === 'web-builders') {
      const p = await writeWebBuildersAdapter(targetDir, options, coreRuleContent);
      createdFiles.push(p);
    }
  }

  return { createdFiles };
}
