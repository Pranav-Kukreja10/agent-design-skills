import fs from 'fs-extra';
import path from 'pathe';
import { GeneratorOptions } from '../types.js';

export async function writeCursorAdapter(
  targetDir: string,
  options: GeneratorOptions,
  coreRuleContent: string
): Promise<string> {
  const rulesDir = path.resolve(targetDir, '.cursor/rules');
  await fs.ensureDir(rulesDir);

  const filePath = path.resolve(rulesDir, 'design-core.mdc');

  const content = `---
description: Always-On Core Design Governance Rule for Cursor (v4.2)
globs: **/*.{html,css,js,jsx,ts,tsx,vue,svelte}
alwaysApply: true
---

${coreRuleContent}
`;

  await fs.writeFile(filePath, content, 'utf-8');
  return filePath;
}

