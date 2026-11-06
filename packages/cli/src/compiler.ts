import fs from 'fs-extra';
import path from 'pathe';
import { fileURLToPath } from 'node:url';
import { GeneratorOptions, computeCalibrationDials } from './types.js';
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
  const { archetype, feeling } = options;
  const dials = computeCalibrationDials(archetype, feeling);

  return `# Always-On Design Governance Rule (v1.1)

You are the design governance engine for this codebase. Every UI decision must preserve geometric unity, copy honesty, and visual calm across every turn.

---

### 0. The 3-Tier Priority Hierarchy ("The User Is Always in the Driver's Seat")
Every blueprint, archetype rule, dial, and anti-slop constraint follows a strict 3-tier hierarchy:
1. **Priority #1 (Highest) — User's Live Chat Prompt & Explicit Instructions:** If the user asks for a specific layout, section, animation, color, font, badge, or component in their prompt, execute it 100% faithfully with zero pushback. Explicit user intent always overrides default rules.
2. **Priority #2 — User's Custom Creative Direction (Section 0 of \`DESIGN.md\`):** Project-wide creative guidance overrides default archetype aesthetics or tone.
3. **Priority #3 (Fallback Only) — Archetype Rules, Domain Blueprints & Anti-Slop Defaults:** These govern the UI **ONLY where the user's prompt is silent or vague** (e.g., on a short 1-sentence prompt), filling in missing architectural decisions so the agent never falls back to generic AI slop.

---

### 0B. Calibration Dials & Viewport Standards
- **Calibration Dials for \`${archetype}\`:**
  - \`DESIGN_VARIANCE: ${dials.designVariance}/10\` (${dials.designVariance <= 3 ? 'Strict adherence to mathematical rhythm & restrained grids' : dials.designVariance <= 6 ? 'Balanced layout with purposeful focal variations' : 'High expressive freedom and dynamic structural rhythm'})
  - \`MOTION_INTENSITY: ${dials.motionIntensity}/10\` (${dials.motionIntensity <= 2 ? 'Minimal micro-transitions (100–150ms), zero spring overshoot' : dials.motionIntensity <= 5 ? 'Smooth standard state transitions (150–250ms ease)' : 'Rich choreography, expressive springs, fluid page dynamics'})
  - \`VISUAL_DENSITY: ${dials.visualDensity}/10\` (${dials.visualDensity <= 4 ? 'Generous whitespace, airy breathing room, uncrowded canvases' : dials.visualDensity <= 7 ? 'Balanced enterprise ergonomics and comfortable scans' : 'Information-dense, high-throughput tabular precision'})
- **Mobile & Full-Screen Viewport Height Law:**
  - Full-screen heroes, mobile app shells, and full-height views MUST use \`100dvh\` (e.g. \`min-h-[100dvh]\` or \`height: 100dvh\`), **NEVER raw \`100vh\`**. Raw \`100vh\` is broken on mobile Safari and Chrome because browser address bars and bottom navigation docks clip bottom-anchored content.

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

### 3. Mandatory Pre-Flight, Token Contract & Starter Blueprint
- **Read First Before Writing ANY UI:**
  1. Inspect \`./tokens.css\` to confirm available semantic tokens.
  2. Inspect \`./DESIGN.md\` for project DNA and brief status.
  3. **CRITICAL — Inspect \`./starter-preview.html\` First:** Check if \`./starter-preview.html\` exists in the project root. If it exists, **YOU MUST READ AND INSPECT IT FIRST.** It is your living architectural ground truth.
- **Extract & Adapt, Never Reinvent from Scratch:**
  - \`./starter-preview.html\` contains the verified layout architecture, navigation chrome, command headers, split panes, table structures, and card hierarchies designed specifically for this project archetype.
  - **Do NOT invent arbitrary new card containers, table formats, or header layouts from scratch.** Extract and adapt the battle-tested HTML/CSS patterns directly from \`./starter-preview.html\` into your framework (React/JSX, Vue, Svelte, or HTML).
  - Mirror its exact structural conventions: container max-widths, split panes, metric strips, table layouts, header structures, and interactive button patterns.
- **Adaptive Pre-Flight Gate & Output Anchor:**
  - If \`BRIEF STATUS: DRAFT\` or the user prompt is structurally ambiguous: Stop immediately, ask 2–4 targeted design questions, and provide a 5–10 line text/ASCII wireframe layout plan before writing code.
  - If \`BRIEF STATUS: LOCKED\` and the prompt is clear: Skip questions and begin response directly with:  
    \`> **Blueprint Anchor:** Extracted from ./starter-preview.html using tokens from ./tokens.css.\`

---

### 3B. Fallback Domain Blueprints (When Prompt Is Brief)
> **FALLBACK BLUEPRINT RULE:** Use these domain architectures ONLY to fill in the blanks when the user's prompt is brief or unstructured (e.g., "build a sneaker shop", "make a music player", "make a crypto dashboard"). If the user specifies their own sections, pages, or layout structure, **ALWAYS follow the user's exact structure instead.**

1. **E-Commerce & Retail Studio:**
   - Asymmetric product hero with split thumbnail gallery or single-row carousel.
   - Clean editorial product spec with sticky add-to-bag bar.
   - Curated single-row editorial collection grid (max 4 items per row, single row for overview).
   - Sticky mobile bottom drawer / checkout dock with safe-area clearance.
2. **Media & Music Player / Streaming:**
   - Full-bleed or edge-to-edge canvas with high-contrast album/video focal point.
   - Fixed bottom player bar with scrubber, time duration, volume dock, and centered play trigger.
   - Asymmetric queue / playlist split pane or single-row carousel.
   - Centered play/pause overlay on artwork, zero corner pills (\`• PLAYING\`).
3. **SaaS Workspace & Analytics Dashboard:**
   - Clean command/filter bar with inline state tabs.
   - Asymmetric 2-pane metric or activity split (never 3 equal KPI cards).
   - High-density data grid/table with tabular numbers, right-aligned numeric data, and single-status pills.
   - Contextual bottom action dock or empty state handoff.
4. **Product Launch & Waitlist / Editorial:**
   - High-impact display headline (\`text-wrap: balance\`, \`300–500\` weight) on open background canvas.
   - Minimalist single-field interactive waitlist/invite dock or segmented switcher.
   - Asymmetric product feature reveal with generous spacing (\`var(--section-py-breathing)\`).
   - Zero marketing fluff or ungrounded claims.

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
- **Human Eyesight & Readability Floor (No Micro-Print):**
  - **Never use font sizes below \`13px\` (\`0.8125rem\`).** Ban Tailwind micro-classes (\`text-[9px]\`, \`text-[10px]\`, \`text-[11px]\`).
  - **Comfortable Secondary Text (\`14px–15px\`):** Sub-labels (metadata beneath headings, secondary descriptions beneath primary titles), navigation tabs, and buttons MUST be \`0.875rem–0.9375rem\` (\`14px–15px\`) in high-contrast \`var(--text-secondary)\`—never \`11px\` dim gray.
  - **Prominent Card Titles (\`18px–20px\`):** Primary item titles inside rows or cards (e.g., entity names, item titles) must be \`1.125rem–1.25rem\` (\`18px–20px\`, \`font-weight: 600\`) so they anchor the row clearly.
  - **Never Combine Small Size + Low Opacity:** If text is \`13px–14px\`, it MUST use \`var(--text-secondary)\` (high contrast) and \`font-weight: 500\`, never low-opacity \`opacity-40\` / \`opacity-50\` or \`text-zinc-500\`.
- **Universal Ban on Unrequested Kicker / Eyebrow Micro-Labels:** Never place small uppercase tracking labels (e.g., \`SYSTEM 01\`, \`CORE FOUNDATION\`, \`FEATURED MODULE\`, \`OVERVIEW\`, \`STEP 01\`) above section headings, hero headlines, or card titles unless explicitly provided in the user's copy. A heading or card title must stand on its own without a decorative uppercase prefix above it.
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
  - **Strict Dot & Bullet Discipline (No Static or Animated Status Dots):**
    - **Ban Decorative Colored Dot Elements:** NEVER render small colored circle elements (\`<span class="w-1.5 h-1.5 rounded-full">\`, \`w-2 h-2 rounded-full\`, whether static or animated) next to status text (\`In Stock\`, \`Fulfilled\`, \`Active\`), inside badges/pills, or beside headings. Communicate status through clean typography or subtle text color alone—never with a colored dot next to the word.
    - **Ban Prefix Bullet Characters (\`•\` / \`●\` / \`▪\`):** NEVER start a badge, pill, eyebrow, or standalone label with a bullet character (e.g., ban \`• PLAYING\`, \`● LIVE\`, \`● DROP 04\`, \`• IN STOCK\`).
    - **Where Dots/Bullets Are Permitted (3 Scenarios Only):**
      1. Standard bulleted vertical lists (\`<ul><li>\`) for multi-line body copy.
      2. Inline mid-dot separator (\`·\`) between two metadata strings on the same line (e.g., \`Artist · Album\`), NEVER at the beginning of a line.
      3. Explicit user request or interactive slide pagination on a multi-slide carousel.
  - **Clean Media & Artwork Law (Never Overlay Corner Status Pills on Images, Artwork, or Video Thumbnails):**
    - **Keep Media Uncluttered:** NEVER place floating \`position: absolute\` top-left or top-right status pills, tier tags, or promotional badges on top of album art, video thumbnails, avatars, or e-commerce product photography (e.g., ban \`• PLAYING\`, \`NOW PLAYING\`, \`HD 1080P\`, \`4K HDR\`, \`LIVE\`, \`NEW\`, \`BESTSELLER\`, \`FEATURED\`, \`HOT\`, \`IN STOCK\`).
    - **How to Show Active or Metadata States Instead:**
      - For active media/playback: Use a single centered icon overlay (Play/Pause/Equalizer) on the thumbnail or a quiet indicator inside the text row—never a corner text pill (\`• PLAYING\`).
      - For product/content metadata (like \`"New Arrival"\`, \`"Limited Edition"\`, or discounts): Render it as clean, quiet plain text (\`var(--text-secondary)\`) below the image alongside the title/price—never as a colored sticker slapped onto the corner of the photograph.
      - **Only Permitted Media Overlay:** A plain bottom-right numeric video duration timestamp (\`3:51\`) or a single subtle top-right icon action (like a quiet heart/bookmark icon on hover).

---

### 8B. Non-Destructive Redesign Law (Upgrading Existing Projects)
When called to redesign, reskin, or modernize an existing project or component:
1. **Preserve Business Logic 100%:** NEVER destroy or rewrite existing React/Vue/Svelte state hooks (\`useState\`, \`useEffect\`, \`useQuery\`), data fetching logic, API routes, event handlers, form validation schemas, or routing structures. The redesign is visual and architectural—not functional destruction.
2. **Reskin In Place:** Audit the existing DOM structure. Replace hardcoded hex colors, generic gray Tailwind classes (\`bg-gray-100\`, \`text-gray-900\`), and arbitrary margins with \`tokens.css\` semantic variables. Unbox nested container \`<div>\`s while keeping child interactive logic intact.

---

### 9. Proportional Canvas Sizing, Seed Data & Component State Rigor
- **Proportional Canvas Sizing Architecture:**
  - *Focused Utilities & Compact Views:* Compact centered layout (\`max-w-3xl\` / \`768px–880px\` on desktop) with centered segmented control dock; never a 1440px corporate enterprise header with an invented brand logo.
  - *Data-Dense Workspaces (ledgers, financial consoles, multi-column tables):* Standard wide container (\`max-w-6xl\` / \`1152px–1280px\`) or fluid responsive workspace (\`w-full px-6\`).
  - *Universal Container Cardinality & Overview Row Discipline (Match Data Slice to Container Intent):* In overview screens, summary sections, or any section with directional navigation (\`< >\` / \`View all\`), constrain the rendered items to a **single row** that matches the grid column count (e.g., \`.slice(0, columns)\` or a single-row \`flex overflow-x-auto\` track). Reserve multi-row wrapping strictly for dedicated full-index or catalog views.
- **Data Ban:** Never use \`"John Doe"\`, \`"Jane Doe"\`, \`"Lorem ipsum"\`, \`"foo"\`, or \`"$99.99"\`.
- **Realistic Diversity (\`// SAMPLE DATA\`):**
  - Use realistic domain entities with varying character lengths.
  - Include at least 1 long entity name that explicitly exercises truncation (\`text-overflow: ellipsis\`).
  - Include at least 1 null avatar / fallback monogram.
  - Include at least 1 zero / pending / unverified state.
  - **Universal Asset Uniqueness:** Every distinct record in a UI dataset must have a unique visual asset/URL — never reuse the exact same image URL across two different records in sample data fixtures.
- **The 5 Mandatory States:** Every interactive component must handle:
  1. Default
  2. Interactive (Hover / Active / Focus-visible)
  3. Loading (\`aria-busy="true"\` skeleton matching geometry)
  4. Empty (with contextual empty-state handoff for the primary CTA)
  5. Inline Error (clear, actionable, non-destructive feedback)
- **Universal Composite Input Focus Law:** For form fields and composite inputs (inputs with icons, prefixes, or action buttons), never allow a raw inner \`<input>\` focus box to clip inside a rounded wrapper; use \`outline: none\` on the inner input and apply focus feedback (\`border-color\` or ring) to the outer field container via \`:focus-within\`.
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
