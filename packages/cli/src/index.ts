#!/usr/bin/env node
import { Command } from 'commander';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'pathe';
import {
  AgentType,
  ArchetypeId,
  FeelingVectorId,
  RadiusScaleId,
  BlurScaleId,
  InstallMode,
  StarterKitId,
  GeneratorOptions
} from './types.js';
import { compileDesignSystem } from './compiler.js';
import { lintDirectory } from './linter.js';
import { freezeProject, unfreezeProject } from './freeze.js';

const program = new Command();

program
  .name('agent-design-skills')
  .description('v4.2 CLI and design-governance registry eliminating AI UI slop and enforcing cross-page unity')
  .version('4.2.0');

// Default action: Interactive Scaffold or Fast Mode
program
  .command('init', { isDefault: true })
  .description('Scaffold a design token contract, starter kit, and agent governance rules')
  .option('-f, --fast', 'Fast mode with sensible defaults (dark-obsidian-technical, antigravity)')
  .option('-s, --starter-kit <kit>', 'Pre-baked starter kit: dashboard, landing-waitlist, mobile-app, data-tool')
  .option('-m, --mode <mode>', 'Installation mode: modular or single', 'modular')
  .option('-d, --dir <dir>', 'Target directory', '.')
  .action(async (opts) => {
    const targetDir = path.resolve(process.cwd(), opts.dir || '.');
    const projectName = path.basename(targetDir) || 'my-project';

    if (opts.fast) {
      p.intro(`${pc.bgWhite(pc.black(' ⚡ agent-design-skills '))} ${pc.dim('v4.2.0 [FAST MODE]')}`);
      const s = p.spinner();
      s.start(`Compiling default design system in ${targetDir}...`);

      const starterKit = (opts.starterKit as StarterKitId) || 'dashboard';

      const options: GeneratorOptions = {
        projectName,
        targetDir,
        agents: ['antigravity'],
        archetype: 'dark-obsidian-technical',
        feeling: 'urgent-precise',
        radius: 'subtle',
        blur: 'subtle-frost',
        mode: (opts.mode as InstallMode) || 'modular',
        starterKit,
        customDirection: 'Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff',
        productBrief: 'High-precision operational workspace and data reconciliation platform',
        fast: true
      };

      const result = await compileDesignSystem(options);
      s.stop(`Scaffolded ${result.createdFiles.length} files successfully.`);

      for (const file of result.createdFiles) {
        console.log(`  ${pc.green('✔')} ${pc.dim(path.relative(targetDir, file))}`);
      }

      p.outro(pc.green('✨ Fast initialization complete. Token contract & starter preview active.'));
      return;
    }

    console.clear();
    p.intro(`${pc.bgWhite(pc.black(' ⚡ agent-design-skills '))} ${pc.dim('v4.2.0')}`);

    const answers = await p.group(
      {
        agents: () =>
          p.multiselect({
            message: 'Which AI coding agent(s) are you using?',
            options: [
              { value: 'antigravity', label: 'Antigravity', hint: '.agent/rules/ & .agent/skills/' },
              { value: 'cursor', label: 'Cursor', hint: '.cursor/rules/' },
              { value: 'claude-codex', label: 'Codex / Claude Code', hint: 'CLAUDE.md / AGENTS.md' },
              { value: 'web-builders', label: 'Web Builders (v0 / Bolt / Lovable)', hint: 'DESIGN-PROMPT.md' }
            ],
            required: true,
          }),
        archetype: () =>
          p.select({
            message: 'Choose a human-crafted design archetype:',
            options: [
              {
                value: 'dark-obsidian-technical',
                label: 'Dark Obsidian Technical',
                hint: '1px hairlines, carbon hue 250, forensic developer/settlement console',
              },
              {
                value: 'editorial-serif-paper',
                label: 'Editorial Serif Paper',
                hint: 'Warm bone paper, broadsheet typography, high-craft publication',
              },
              {
                value: 'neo-brutalism',
                label: 'Neo-Brutalist Studio',
                hint: 'Hard 2px borders, stark offset shadows, raw tactile accents',
              },
            ],
          }),
        starterKit: () =>
          p.select({
            message: 'Choose a token-wired starter kit preview:',
            options: [
              { value: 'dashboard', label: 'High-Density Workspace Dashboard', hint: 'Workspace shell, summary strip, data table, drawer' },
              { value: 'landing-waitlist', label: 'Editorial Landing & Waitlist', hint: 'Narrative hero, live preview artifact, waitlist form' },
              { value: 'mobile-app', label: 'Mobile-First Application', hint: '375px–430px frame, thumb nav, bottom sheet' },
              { value: 'data-tool', label: 'Split-Pane Query Explorer & Tool', hint: 'Split query/inspector, ⌘K command bar, tabular nums' },
              { value: 'none', label: 'None (Blank Token Contract)', hint: 'Pure tokens and governance rules only' }
            ],
          }),
        mode: () =>
          p.select({
            message: 'Installation mode for skills & rules:',
            options: [
              { value: 'modular', label: 'Modular Skills (Recommended)', hint: 'Core rules + task-scoped reference guides' },
              { value: 'single', label: 'Single Master File', hint: 'Combined master reference file' }
            ],
          }),
        feeling: () =>
          p.select({
            message: 'Select sensory motion & timing vector:',
            options: [
              { value: 'urgent-precise', label: 'Urgent & Precise (110ms / 180ms)', hint: 'Forensic, snappy, zero bounce' },
              { value: 'calm', label: 'Calm & Measured (140ms / 240ms)', hint: 'Literary ease, smooth' },
              { value: 'playful-tactile', label: 'Playful & Tactile (80ms / 150ms)', hint: 'Punchy press states' },
              { value: 'authoritative', label: 'Authoritative (120ms / 200ms)', hint: 'Institutional stability' },
            ],
          }),
        radius: () =>
          p.select({
            message: 'Select geometric corner radius scale:',
            options: [
              { value: 'subtle', label: 'Subtle (6px outer / 4px inner)', hint: 'Standard technical scale' },
              { value: 'sharp', label: 'Sharp (0px outer / 0px inner)', hint: 'Zero radius / architectural' },
              { value: 'medium', label: 'Medium (10px outer / 6px inner)', hint: 'Soft modern SaaS' },
              { value: 'high', label: 'High (16px outer / 10px inner)', hint: 'Friendly consumer scale' },
              { value: 'pill', label: 'Pill (9999px)', hint: 'Capsule components' },
            ],
          }),
        blur: () =>
          p.select({
            message: 'Select surface blur depth:',
            options: [
              { value: 'subtle-frost', label: 'Subtle Frost (8px)', hint: 'Hairline glass backdrops' },
              { value: 'flat', label: 'Flat (0px)', hint: 'Zero blur, pure solid fills' },
              { value: 'deep-glass', label: 'Deep Glass (20px)', hint: 'Heavy frosted glass' },
            ],
          }),
        customDirection: () =>
          p.text({
            message: 'Custom Creative Direction & Anti-Drift Mandate (Section 0):',
            placeholder: 'Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff',
            initialValue: 'Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff',
          }),
      },
      {
        onCancel: () => {
          p.cancel('Setup cancelled.');
          process.exit(0);
        },
      }
    );

    const s = p.spinner();
    s.start(`Compiling tokens and governance contract...`);

    const options: GeneratorOptions = {
      projectName,
      targetDir,
      agents: answers.agents as AgentType[],
      archetype: answers.archetype as ArchetypeId,
      feeling: answers.feeling as FeelingVectorId,
      radius: answers.radius as RadiusScaleId,
      blur: answers.blur as BlurScaleId,
      mode: answers.mode as InstallMode,
      starterKit: answers.starterKit !== 'none' ? (answers.starterKit as StarterKitId) : undefined,
      customDirection: answers.customDirection as string,
    };

    const result = await compileDesignSystem(options);
    s.stop(`Compiled ${result.createdFiles.length} files successfully.`);

    for (const file of result.createdFiles) {
      console.log(`  ${pc.green('✔')} ${pc.dim(path.relative(targetDir, file))}`);
    }

    p.outro(
      `${pc.green('✔')} Initialized ${pc.bold(options.archetype)} for ${pc.cyan(options.agents.join(', '))}`
    );
  });

// Lint command
program
  .command('lint [dir]')
  .description('Lint directory for hardcoded colors, AI slop, banned copy, and hash freeze integrity')
  .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    console.log(`${pc.bgBlue(pc.black(' LINT '))} Scanning ${pc.bold(targetDir)}...\n`);

    const report = await lintDirectory(targetDir);

    if (report.violations.length === 0) {
      console.log(`${pc.green('✔ Pass:')} Scanned ${report.filesScanned} files. Zero design slop or token contract violations found!\n`);
      process.exit(0);
    } else {
      console.log(`${pc.red('✖ Violations detected:')} (${report.violations.length} total)\n`);

      for (const v of report.violations) {
        const badge = v.severity === 'error' ? pc.bgRed(pc.black(' ERR ')) : pc.bgYellow(pc.black(' WARN '));
        console.log(`${badge} ${pc.bold(v.file)}:${v.line} [${pc.cyan(v.rule)}]`);
        console.log(`     ${pc.dim(v.message)}`);
        if (v.snippet) {
          console.log(`     ${pc.dim('>')} ${v.snippet.slice(0, 80)}`);
        }
        console.log('');
      }

      console.log(`${pc.red('Lint failed.')} Please resolve all errors or annotate with /* @design-exception: [reason] */.\n`);
      process.exit(1);
    }
  });

// Freeze command
program
  .command('freeze [dir]')
  .description('Calculate SHA-256 hashes of design tokens and rules, creating .design-skills.lock')
  .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    const s = p.spinner();
    s.start(`Freezing design contract in ${targetDir}...`);

    const manifest = await freezeProject(targetDir);
    s.stop(`Freeze complete. Locked ${Object.keys(manifest.hashes).length} files.`);

    for (const [file, hash] of Object.entries(manifest.hashes)) {
      console.log(`  ${pc.green('🔒')} ${file} ${pc.dim(`(${hash.slice(0, 12)}...)`)}`);
    }

    console.log(`\nCreated ${pc.bold('.design-skills.lock')}. Modifications will fail lint until unfreeze is run.`);
  });

// Unfreeze command
program
  .command('unfreeze [dir]')
  .description('Remove .design-skills.lock to allow modifying design tokens and rules')
  .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    const removed = await unfreezeProject(targetDir);

    if (removed) {
      console.log(`${pc.green('✔')} Removed ${pc.bold('.design-skills.lock')}. Design files are now unlocked for editing.`);
    } else {
      console.log(`${pc.yellow('ℹ')} No active .design-skills.lock found in ${targetDir}.`);
    }
  });

import { fileURLToPath } from 'node:url';

const isDirectRun = Boolean(
  process.argv[1] &&
  process.argv[1] !== '[eval]' &&
  (
    path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url)) ||
    process.argv[1].endsWith('index.js') ||
    process.argv[1].endsWith('agent-design-skills') ||
    process.argv[1].endsWith('design-skills')
  )
);

if (isDirectRun) {
  program.parse();
}

export {
  compileDesignSystem,
  lintDirectory,
  freezeProject,
  unfreezeProject
};
export * from './types.js';
