import fs from 'fs-extra';
import path from 'pathe';
import { fileURLToPath } from 'node:url';
import { GeneratorOptions } from '../types.js';

async function findRegistryDir(): Promise<string> {
  const cwdRegistry = path.resolve(process.cwd(), 'registry');
  if (await fs.pathExists(cwdRegistry)) return cwdRegistry;

  const currentFile = fileURLToPath(import.meta.url);
  const dirname = path.dirname(currentFile);
  const candidates = [
    path.resolve(dirname, '../../../../registry'),
    path.resolve(dirname, '../../../registry'),
    path.resolve(dirname, '../../registry')
  ];

  for (const c of candidates) {
    if (await fs.pathExists(c)) return c;
  }
  return cwdRegistry;
}

function interpolateVariables(content: string, options: GeneratorOptions): string {
  return content
    .replace(/\{\{ARCHETYPE_NAME\}\}/g, options.archetype)
    .replace(/\{\{TOKENS_PATH\}\}/g, './tokens.css')
    .replace(/\{\{DESIGN_DOC_PATH\}\}/g, './DESIGN.md')
    .replace(/\{\{PRODUCT_NAME\}\}/g, options.projectName)
    .replace(/\{\{PRODUCT_BRIEF\}\}/g, options.productBrief || 'High-precision operational workspace and data reconciliation platform');
}

export async function writeAntigravityAdapter(
  targetDir: string,
  options: GeneratorOptions,
  coreRuleContent: string
): Promise<string[]> {
  const createdFiles: string[] = [];

  // 1. Auto-detect .agents/ vs .agent/
  const hasAgentsDir = await fs.pathExists(path.resolve(targetDir, '.agents'));
  const agentFolder = hasAgentsDir ? '.agents' : '.agent';

  // 2. Always write compressed Always-On Core Rule
  const rulesDir = path.resolve(targetDir, agentFolder, 'rules');
  await fs.ensureDir(rulesDir);

  const ruleFilePath = path.resolve(rulesDir, 'design-core.md');
  const ruleContent = `---
description: Always-On Core Design Governance Rule for Antigravity (v4.2)
globs: ["**/*.{html,css,js,jsx,ts,tsx,vue,svelte}"]
alwaysApply: true
---

${coreRuleContent}
`;

  await fs.writeFile(ruleFilePath, ruleContent, 'utf-8');
  createdFiles.push(ruleFilePath);

  // 3. Handle Tier-2 On-Demand Skills (modular vs. single)
  const skillsDir = path.resolve(targetDir, agentFolder, 'skills/design-system');
  await fs.ensureDir(skillsDir);
  const skillFilePath = path.resolve(skillsDir, 'SKILL.md');

  const registryDir = await findRegistryDir();
  const coreDir = path.resolve(registryDir, 'core');
  const archetypePath = path.resolve(registryDir, 'archetypes', `${options.archetype}.md`);

  const coreModuleFiles = [
    '00-workflow-and-scope.md',
    '01-override-protocol.md',
    '02-anti-slop-firewall.md',
    '03-cross-page-unity.md',
    '04-ux-and-ergonomics.md',
    '05-voice-and-copy.md',
    '06-iteration-discipline.md'
  ];

  if (options.mode === 'single') {
    // Single combined master skill file
    let combinedContent = `---
name: design-system
description: Master frontend design system, token contract, and aesthetic governance guidelines
---

# Master Design System (v4.2)

Target Archetype: \`${options.archetype}\`  
Token Contract: \`./tokens.css\`  
Design Specification: \`./DESIGN.md\`

${coreRuleContent}

---
`;

    for (const file of coreModuleFiles) {
      const p = path.resolve(coreDir, file);
      if (await fs.pathExists(p)) {
        const raw = await fs.readFile(p, 'utf-8');
        combinedContent += `\n---\n\n${interpolateVariables(raw, options)}\n`;
      }
    }

    if (await fs.pathExists(archetypePath)) {
      const rawArch = await fs.readFile(archetypePath, 'utf-8');
      combinedContent += `\n---\n\n${rawArch}\n`;
    }

    await fs.writeFile(skillFilePath, combinedContent, 'utf-8');
    createdFiles.push(skillFilePath);
  } else {
    // Default: Modular mode with SKILL.md + references/
    const referencesDir = path.resolve(skillsDir, 'references');
    await fs.ensureDir(referencesDir);

    for (const file of coreModuleFiles) {
      const srcFile = path.resolve(coreDir, file);
      const destFile = path.resolve(referencesDir, file);
      if (await fs.pathExists(srcFile)) {
        const raw = await fs.readFile(srcFile, 'utf-8');
        await fs.writeFile(destFile, interpolateVariables(raw, options), 'utf-8');
        createdFiles.push(destFile);
      }
    }

    if (await fs.pathExists(archetypePath)) {
      const destArch = path.resolve(referencesDir, 'archetype.md');
      const rawArch = await fs.readFile(archetypePath, 'utf-8');
      await fs.writeFile(destArch, rawArch, 'utf-8');
      createdFiles.push(destArch);
    }

    const skillContent = `---
name: design-system
description: Design system governance, token contracts, and aesthetic anti-slop rules for this project
---

# Design System Skill (v4.2)

Target Archetype: \`${options.archetype}\`  
Token Contract: \`./tokens.css\`  
Design Specification: \`./DESIGN.md\`

## Overview
This skill provides comprehensive, on-demand reference guidelines for maintaining frontend geometric unity, copy honesty, and token adherence across this codebase.

## Modular Reference Guides
Consult the following modular references in \`./references/\` during design tasks:
- **00 Workflow & Scope:** \`./references/00-workflow-and-scope.md\` — Pre-flight gate, brief status, and scope lock.
- **01 Override Protocol:** \`./references/01-override-protocol.md\` — Singular vs. plural intent and \`/* @design-exception */\`.
- **02 Anti-Slop Firewall:** \`./references/02-anti-slop-firewall.md\` — Banned AI clichés, 3 equal cards, marketing in app UI, and fake dots.
- **03 Cross-Page Unity:** \`./references/03-cross-page-unity.md\` — Scoped \`var()\` mandate, concentric corner math, and section rhythm.
- **04 UX & Ergonomics:** \`./references/04-ux-and-ergonomics.md\` — 5 mandatory UI states, realistic seed data, and tabular numbers.
- **05 Voice & Copy:** \`./references/05-voice-and-copy.md\` — Brochure test, swap test, sentence casing, and punctuation discipline.
- **06 Iteration Discipline:** \`./references/06-iteration-discipline.md\` — Fix-forward principle and 2-pass budget.
- **Archetype Guide:** \`./references/archetype.md\` — Archetype specifications, font pairings, and OKLCH palettes.
`;

    await fs.writeFile(skillFilePath, skillContent, 'utf-8');
    createdFiles.push(skillFilePath);
  }

  return createdFiles;
}
