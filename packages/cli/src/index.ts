#!/usr/bin/env node
import * as p from '@clack/prompts';
import pc from 'picocolors';

async function main() {
  console.clear();

  p.intro(`${pc.bgWhite(pc.black(' ⚡ agent-design-skills '))} ${pc.dim('v0.1.0')}`);

  const answers = await p.group(
    {
      agents: () =>
        p.multiselect({
          message: 'Which AI coding agent(s) are you using in this project?',
          options: [
            { value: 'antigravity', label: 'Antigravity', hint: '.agents/skills/' },
            { value: 'cursor', label: 'Cursor', hint: '.cursor/rules/' },
            { value: 'codex', label: 'Codex / Claude Code', hint: 'AGENTS.md / CLAUDE.md' },
          ],
          required: true,
        }),
      theme: () =>
        p.select({
          message: 'Choose a human-crafted design aesthetic:',
          options: [
            {
              value: 'minimal-saas',
              label: 'Minimal SaaS (Linear / Vercel Obsidian)',
              hint: '1px hairline borders, Zinc-950 depth, Geist/Inter',
            },
            {
              value: 'high-contrast-monochrome',
              label: 'High-Contrast Monochrome',
              hint: 'Stark B&W contrast, architectural grids, editorial feel',
            },
            {
              value: 'neo-brutalist',
              label: 'Neo-Brutalist Studio',
              hint: 'Hard offset shadows, 2px borders, tactile press states',
            },
          ],
        }),
      mode: () =>
        p.select({
          message: 'How should the design skills be installed?',
          options: [
            {
              value: 'modular',
              label: 'Modular Skills (Option A)',
              hint: 'Separate files for Palette, Typography, Layout & Motion (saves context)',
            },
            {
              value: 'single',
              label: 'Single Master File (Option B)',
              hint: 'One combined design-system skill file',
            },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel('Installation cancelled.');
        process.exit(0);
      },
    }
  );

  p.outro(
    `${pc.green('✔')} Selected ${pc.bold(answers.theme)} for ${pc.cyan(answers.agents.join(', '))} [${answers.mode} mode]`
  );
}

main().catch(console.error);
