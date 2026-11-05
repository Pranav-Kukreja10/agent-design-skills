import fs from 'fs-extra';
import path from 'pathe';
import { GeneratorOptions } from '../types.js';

export async function writeCursorAdapter(
  targetDir: string,
  options: GeneratorOptions,
  coreRuleContent: string
): Promise<string[]> {
  const rulesDir = path.resolve(targetDir, '.cursor/rules');
  await fs.ensureDir(rulesDir);

  const createdFiles: string[] = [];

  // 1. Always write 00-design-core.mdc
  const coreFilePath = path.resolve(rulesDir, '00-design-core.mdc');
  const coreContent = `---
description: "Always-On Core Design Governance Rule for Cursor (v1.0)"
alwaysApply: true
---

${coreRuleContent}
`;

  await fs.writeFile(coreFilePath, coreContent, 'utf-8');
  createdFiles.push(coreFilePath);

  // 2. Task-scoped modular .mdc rules if mode === 'modular'
  if (options.mode !== 'single') {
    // 01: UX & Ergonomics
    const uxFilePath = path.resolve(rulesDir, '01-ux-ergonomics.mdc');
    const uxContent = `---
description: "UX Ergonomics, Component States & Realistic Seed Data (v1.0)"
globs: "**/*.jsx, **/*.tsx, **/*.vue, **/*.svelte, **/*.html"
alwaysApply: false
---

# UX Ergonomics, Seed Data & Component States

### The 5 Mandatory UI States
Every interactive component or data view must handle:
1. **Default:** Clean idle view.
2. **Interactive:** Tactile feedback on \`:hover\`, \`:active\`, and accessible \`:focus-visible\` with \`var(--border-focus)\`.
3. **Loading:** \`[aria-busy="true"]\` skeleton matching exact element geometry and dimensions.
4. **Empty:** Structured empty state that absorbs the view's primary CTA.
5. **Inline Error:** Localized, actionable, non-destructive feedback.

### Realistic Seed Data Mandate (\`// SAMPLE DATA\`)
- Ban "John Doe", "Jane Doe", "Lorem ipsum", "Acme", and "$99.99".
- Require varied string lengths, at least 1 long entity string testing truncation (\`text-overflow: ellipsis\`), 1 null avatar monogram fallback, and 1 zero/pending state.
- Tabular numbers: All metrics, counters, and currencies must enforce \`font-variant-numeric: tabular-nums\`.
`;
    await fs.writeFile(uxFilePath, uxContent, 'utf-8');
    createdFiles.push(uxFilePath);

    // 02: Voice & Copy
    const copyFilePath = path.resolve(rulesDir, '02-voice-copy.mdc');
    const copyContent = `---
description: "Voice, Copy Honesty, Sentence Casing & Typography Rules (v1.0)"
globs: "**/*.jsx, **/*.tsx, **/*.vue, **/*.svelte, **/*.html, **/*.md, **/*.mdx"
alwaysApply: false
---

# Voice, Copy Honesty & Typography Rules

### Copy Honesty Tests
- **Brochure Test:** Never allow the UI to describe itself (ban "Hover to reveal", "Click here", "Smooth animations", "Powered by React").
- **Swap Test:** If replacing the product name with a competitor makes the copy still make sense, rewrite it to be concrete and technical.
- **Redundant Subheadings:** Purge any subheading that merely paraphrases its parent heading.

### Typographic Rules
- **Sentence Case:** Strict sentence case on headings, table columns, tooltips, and buttons.
- **Cure "UPPERCASE MICRO-LABEL Disease":** Max 1 uppercase eyebrow per view. Ban self-evident labels (redundant status descriptions, section format labels, or narrating obvious controls). Uppercase permitted only on short functional technical tags (<= 3 words in \`var(--font-mono)\`, e.g., STATUS: ACTIVE, REF: 0x4B2).
- **Punctuation:** Zero em-dashes in headings; maximum 1 em-dash per page in body copy.
`;
    await fs.writeFile(copyFilePath, copyContent, 'utf-8');
    createdFiles.push(copyFilePath);

    // 03: Archetype Recipe
    const recipeFilePath = path.resolve(rulesDir, '03-archetype-recipe.mdc');
    const recipeContent = `---
description: "Archetype Recipe & Geometric Token Contract for ${options.archetype} (v1.0)"
globs: "**/*.css, **/*.scss, **/*.less, **/*.html, **/*.jsx, **/*.tsx"
alwaysApply: false
---

# Archetype Recipe & Geometric Token Contract

Target Archetype: \`${options.archetype}\`
Token Source: \`./tokens.css\`

### Concentric Corner Math
Whenever nesting a rounded element inside a padded container:
\`\`\`css
--radius-inner: max(0px, var(--radius-outer) - padding);
\`\`\`
Child radii must never protrude past or clash with parent borders.

### 3-Step Section Rhythm
- \`var(--section-py-tight)\`: Toolbars, dense filters, embedded drawers
- \`var(--section-py-normal)\`: Standard views and data tables
- \`var(--section-py-breathing)\`: Major milestone views and reports

### Hairlines & Depth
- 1px hairline borders: \`var(--border-hairline)\`
- Top specular highlight: \`var(--highlight-specular)\`
- Zero purple AI gradients or ungrounded card drop shadows.
`;
    await fs.writeFile(recipeFilePath, recipeContent, 'utf-8');
    createdFiles.push(recipeFilePath);
  }

  return createdFiles;
}
