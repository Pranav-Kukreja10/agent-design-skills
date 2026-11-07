import fs from 'fs-extra';
import path from 'pathe';
import { fileURLToPath } from 'node:url';
import { GeneratorOptions } from './types.js';
import { generateTokens } from './tokens-gen.js';

/**
 * Tier 1 Invariants: a deliberately SHORT, high-priority block that is
 * (a) placed at the very top and very bottom of the always-on rule (primacy + recency),
 * (b) emitted as its own tiny always-on file so it survives long-context attention decay,
 * (c) enforced by a per-turn self-audit line the agent must print.
 *
 * Priority note: the user's live prompt (Priority #1) still overrides these
 * defaults. Tier 1 only governs what the agent adds ON ITS OWN.
 */
export const TIER1_AUDIT_LINE = 'Tier-1 audit: tokens ✓ · unified with existing pages ✓ · zero unrequested additions ✓';

export function buildTier1Content(options: GeneratorOptions): string {
  const { archetype } = options;

  return `## TIER 1: NON-NEGOTIABLE INVARIANTS (Re-read before EVERY UI turn, not just the first)

> These apply on turn 1 and on turn 50. Long conversations cause drift: the agent forgets these and reverts to generic AI habits. **If your last few outputs added anything below, you have drifted: stop and revert it.** An explicit instruction from the user in chat always overrides these defaults (they only govern what you add on your own).

**A. Re-Anchor Protocol (run at the START of every turn that touches UI)**
1. Re-open \`./tokens.css\` and \`./starter-preview.html\` (if present). Do not rely on memory of them.
2. **Find a sibling:** Open the closest existing page/component to the one you are building or editing. Copy its shell (header, nav, container width, spacing rhythm, card pattern, button styles) exactly. A new page is a *sibling*, never a fresh design.
3. Build only what the user asked for in this turn.

**B. The 8 Invariants (violating any one is a bug)**
1. **Tokens only:** every color, background, radius, shadow, font, and spacing value comes from \`var(--*)\` in \`tokens.css\`. No raw hex/rgb/oklch, no ad-hoc Tailwind palette colors (\`bg-blue-500\`, \`text-gray-400\`), no new gradients.
2. **One look across the site:** same fonts, radii, container width, header/nav, button, input, and card styling on every page. Never restyle a shared pattern for a single page; change the token instead.
3. **Zero dots:** no colored circle elements (\`rounded-full\` w/h 1–3), no prefix bullets (\`•\` \`●\` \`▪\`), static or animated, next to text, in badges, or in headings.
4. **Zero unrequested badges/pills/chips/tags:** no \`NEW\`, \`PRO\`, \`BETA\`, \`LIVE\`, \`FEATURED\`, version tags, or status pills outside repeating data rows; never on top of images/artwork/video; max 1 per row.
5. **No box-in-a-box:** never nest a bordered/filled container inside another bordered/filled container. One container level, or open canvas with hairline dividers.
6. **No decorative color or backgrounds:** accent color only on the single primary action. No tinted section backgrounds, colored icon tiles, glows, blobs, or gradients unless the user asked for them. Neutral surfaces by default.
7. **No unrequested elements:** no extra eyebrows/kickers, stat strips, metadata footers, helper captions, shortcut chips (\`⌘K\`), theme toggles, notification bells, or filler widgets. Whitespace is not a bug.
8. **Readable text:** minimum 13px, secondary text uses \`var(--text-secondary)\`, never dim gray or low opacity.

**C. Pre-Send Self-Audit (mandatory)**
Before sending any response that changed UI, scan your own diff for: raw colors, dots, badges/pills, nested containers, new backgrounds, new labels, and any style that differs from the sibling page. Fix them silently, then end your response with exactly this line:
\`${TIER1_AUDIT_LINE}\`
Do not print that line unless the scan is actually clean. Active archetype: \`${archetype}\`.`;
}

/**
 * Pulls the NON-token personality lines (description, grid, casing, numbers, signature moment)
 * out of the archetype markdown so agents that never open references/archetype.md
 * (Claude, Codex, web builders, or Antigravity without an on-demand skill load) still get them.
 */
function readArchetypeCharacter(archetype: string): string[] {
  const candidates = [
    path.resolve(dirnameOfThisFile(), '../registry/archetypes', `${archetype}.md`),
    path.resolve(dirnameOfThisFile(), '../../registry/archetypes', `${archetype}.md`),
    path.resolve(dirnameOfThisFile(), '../../../registry/archetypes', `${archetype}.md`),
    path.resolve(process.cwd(), 'registry/archetypes', `${archetype}.md`)
  ];
  const file = candidates.find((c) => fs.pathExistsSync(c));
  if (!file) return [];

  const text = fs.readFileSync(file, 'utf-8');
  const labels = ['Name', 'Description', 'Orientation', 'Grid Structure', 'Neutral Tint', 'Casing Rules', 'Numbers', 'Signature Moment'];
  const out: string[] = [];
  for (const label of labels) {
    const m = text.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`));
    if (m) out.push(`  - **${label}:** ${m[1].trim()}`);
  }
  return out;
}

function dirnameOfThisFile(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}

function extractCustomTokens(targetDir?: string): Record<string, string> {
  if (!targetDir) return {};
  const cssPath = path.resolve(targetDir, 'tokens.css');
  const jsonPath = path.resolve(targetDir, 'tokens.json');
  const vars: Record<string, string> = {};

  if (fs.pathExistsSync(jsonPath)) {
    try {
      const data = fs.readJSONSync(jsonPath);
      if (data.variables && typeof data.variables === 'object') {
        Object.assign(vars, data.variables);
      }
    } catch {}
  }

  if (fs.pathExistsSync(cssPath)) {
    try {
      const css = fs.readFileSync(cssPath, 'utf-8');
      const matches = css.matchAll(/(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g);
      for (const m of matches) {
        vars[m[1]] = m[2].trim();
      }
    } catch {}
  }

  return vars;
}

/**
 * Project Configuration Snapshot: inlines every wizard answer that previously lived ONLY in
 * DESIGN.md / tokens.css (custom direction, brief, fonts, radius, blur, motion, starter kit)
 * plus the archetype's personality. Agents that cannot or will not open those files
 * (Claude/Codex, web builders, long chats) still receive the user's choices verbatim.
 */
export function buildProjectSnapshot(options: GeneratorOptions): string {
  const { archetype, feeling, radius, blur, starterKit, customDirection, productBrief, projectName, targetDir } = options;
  const { variables: defaultVars, json } = generateTokens(options);
  const diskVars = extractCustomTokens(targetDir);
  const variables = { ...defaultVars, ...diskVars };
  const v = (k: string) => (variables as Record<string, string>)[k] ?? 'n/a';

  const direction = customDirection?.trim() || 'None provided (use archetype defaults)';
  const brief = productBrief?.trim() || 'None provided';
  const character = readArchetypeCharacter(archetype);
  const characterBlock = character.length > 0
    ? `\n- **Archetype character (design DNA; apply with the tokens below):**\n${character.join('\n')}`
    : '';

  return `## PROJECT CONFIGURATION SNAPSHOT (the choices made in the setup wizard; treat as locked)

- **Project:** ${projectName}
- **Priority #2: User's Custom Creative Direction (verbatim):** "${direction}"
- **Product brief:** ${brief}
- **Archetype:** \`${archetype}\` (${json.polarity ?? 'n/a'} polarity)${characterBlock}
- **Motion vector:** \`${feeling}\` (\`--duration-fast: ${v('--duration-fast')}\`, \`--duration-normal: ${v('--duration-normal')}\`)
- **Geometry:** radius scale \`${radius}\` (\`--radius-outer: ${v('--radius-outer')}\`, \`--radius-inner: ${v('--radius-inner')}\`), surface blur \`${blur}\` (\`--surface-blur: ${v('--surface-blur')}\`)
- **Fonts:** display \`${v('--font-display')}\` · sans \`${v('--font-sans')}\` · mono \`${v('--font-mono')}\`
- **Colors:** canvas \`${v('--bg-canvas')}\` · surface \`${v('--bg-elevated')}\` · text \`${v('--text-primary')}\` · accent \`${v('--accent-primary')}\` (accent text \`${v('--accent-foreground')}\`)
- **Starter blueprint:** ${starterKit ? `\`./starter-preview.html\` (${starterKit})` : 'none selected'}
- **Source of truth:** \`./tokens.css\` (values above are a convenience copy; if they ever differ, tokens.css wins). If you cannot read files (web builders), define these exact values as CSS custom properties yourself and use only them.`;
}

/** Compact version for the standalone always-on file and the end-of-rule echo. */
export function buildTier1Echo(): string {
  return `### TIER 1 ECHO (recency reminder; full text at the top of this document)
Tokens only · same look as sibling pages · no dots · no unrequested badges/pills · no box-in-box · no decorative color/backgrounds · no unrequested elements · text >= 13px. Re-open \`tokens.css\` and a sibling page every UI turn. End UI responses with: \`${TIER1_AUDIT_LINE}\``;
}

