import fs from 'fs-extra';
import path from 'pathe';
import { GeneratorOptions } from '../types.js';

export async function writeClaudeCodexAdapter(
  targetDir: string,
  options: GeneratorOptions,
  coreRuleContent: string
): Promise<string[]> {
  const claudePath = path.resolve(targetDir, 'CLAUDE.md');
  const agentsPath = path.resolve(targetDir, 'AGENTS.md');

  const content = `# Design Governance & Token Contract (v4.2)

${coreRuleContent}
`;

  await fs.writeFile(claudePath, content, 'utf-8');
  await fs.writeFile(agentsPath, content, 'utf-8');

  return [claudePath, agentsPath];
}

