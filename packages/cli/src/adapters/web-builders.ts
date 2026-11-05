import fs from 'fs-extra';
import path from 'pathe';
import { GeneratorOptions } from '../types.js';

export async function writeWebBuildersAdapter(
  targetDir: string,
  options: GeneratorOptions,
  coreRuleContent: string
): Promise<string> {
  const filePath = path.resolve(targetDir, 'DESIGN_RULES.md');

  const content = `# Frontend Design System Guidelines (v4.2)
Target Environments: v0, Lovable, Bolt, Replit

${coreRuleContent}
`;

  await fs.writeFile(filePath, content, 'utf-8');
  return filePath;
}

