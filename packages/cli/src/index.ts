#!/usr/bin/env node
import { Command } from 'commander';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import path from 'pathe';
import fs from 'fs-extra';
import {
  AgentType,
  ArchetypeId,
  FeelingVectorId,
  RadiusScaleId,
  BlurScaleId,
  InstallMode,
  StarterKitId,
  GeneratorOptions,
  FontSelectionMode,
  FontOverrideConfig
} from './types.js';
import { compileDesignSystem } from './compiler.js';
import { lintDirectory } from './linter.js';
import { freezeProject, unfreezeProject } from './freeze.js';
import {
  detectProjectFonts,
  ARCHETYPE_FONT_PAIRINGS,
  extractFontFamily
} from './tokens-gen.js';

const program = new Command();

program
  .name('agent-design-skills')
  .description('v1.1 CLI and design-governance registry eliminating AI UI slop and enforcing cross-page unity')
  .version('1.1.0');

async function detectWorkspaceAgents(targetDir: string): Promise<AgentType[]> {
  const detected: AgentType[] = [];
  if (await fs.pathExists(path.resolve(targetDir, '.agent')) || await fs.pathExists(path.resolve(targetDir, '.agents'))) {
    detected.push('antigravity');
  }
  if (await fs.pathExists(path.resolve(targetDir, '.cursor'))) {
    detected.push('cursor');
  }
  if (await fs.pathExists(path.resolve(targetDir, 'CLAUDE.md')) || await fs.pathExists(path.resolve(targetDir, 'AGENTS.md'))) {
    detected.push('claude-codex');
  }
  return detected.length > 0 ? detected : ['antigravity'];
}

const ARCHETYPE_OPTIONS = [
  { value: 'dark-obsidian-technical', label: 'Dark Obsidian Technical', hint: '1px hairlines, carbon hue 250, forensic developer/settlement console' },
  { value: 'swiss-typographic-grid', label: 'Swiss Typographic Grid', hint: 'Light, exposed 1px grid lines, Cabinet Grotesk / Space Grotesk' },
  { value: 'kinetic-industrial-mono', label: 'Kinetic Industrial Mono', hint: 'Dark, tabular telemetry, JetBrains Mono, amber accents' },
  { value: 'bento-modular-system', label: 'Bento Modular System', hint: 'Adaptive 12-col bento cells, Satoshi / General Sans' },
  { value: 'spatial-glass-visionos', label: 'Spatial Glass VisionOS', hint: 'Translucent optical blur, Outfit / DM Sans, specular highlights' },
  { value: 'editorial-serif-paper', label: 'Editorial Serif Paper', hint: 'Warm bone paper, broadsheet typography, high-craft publication' },
  { value: 'quiet-luxury-atelier', label: 'Quiet Luxury Atelier', hint: 'Whisper-quiet prestige, Cormorant Garamond / DM Sans, warm ivory' },
  { value: 'warm-artisan-craft', label: 'Warm Artisan Craft', hint: 'Earthy linen, Fraunces / Cabinet Grotesk, terracotta accents' },
  { value: 'japanese-minimal-zen', label: 'Japanese Minimal Zen', hint: 'Ma negative space, Noto Serif Display / Work Sans, washi mist' },
  { value: 'scandinavian-warm-minimal', label: 'Scandinavian Warm Minimal', hint: 'Oat/birch canvas, Familjen Grotesk / DM Sans, spruce accents' },
  { value: 'neo-brutalism', label: 'Neo-Brutalist Studio', hint: 'Hard 2px borders, stark offset shadows, raw tactile accents' },
  { value: 'retro-tactile-analog', label: 'Retro Tactile Analog', hint: 'Physical bevels, Space Mono / DM Sans, Teenage Engineering vibe' },
  { value: 'y2k-acid-cyber', label: 'Y2K Acid Cyber', hint: 'Electric chartreuse on pitch black, VT323 / Syne Mono' },
  { value: 'playful-clay-consumer', label: 'Playful Clay Consumer', hint: 'Tactile dual-layer shadows, Bricolage Grotesque / Plus Sans' },
  { value: 'vaporwave-crt-terminal', label: 'Vaporwave CRT Terminal', hint: 'Phosphorescent cyan & magenta on indigo void, scanlines' },
  { value: 'high-trust-fintech-clarity', label: 'High-Trust Fintech Clarity', hint: 'Enterprise navy, Sora / Public Sans, tabular numbers' },
  { value: 'clinical-biotech-precision', label: 'Clinical Biotech Precision', hint: 'Sterile lab white, Geist / Space Mono, cold cyan' },
  { value: 'civic-govtech-accessible', label: 'Civic Govtech Accessible', hint: 'WCAG AAA contrast, Atkinson Hyperlegible / DM Sans' }
];

// Default action: Interactive Scaffold or Fast Mode
program
  .command('init', { isDefault: true })
  .description('Scaffold a design token contract, starter kit, and agent governance rules')
  .option('-a, --agents <agents>', 'Target agents (comma-separated or "all": antigravity, cursor, claude-codex, web-builders)')
  .option('-f, --fast', 'Fast mode with sensible defaults (dark-obsidian-technical, antigravity)')
  .option('-t, --archetype <archetype>', 'Canonical archetype ID')
  .option('-s, --starter-kit <kit>', 'Pre-baked starter kit: dashboard, landing-waitlist, mobile-app, data-tool')
  .option('-m, --mode <mode>', 'Installation mode: modular or single', 'modular')
  .option('-F, --fonts <mode>', 'Font selection mode: A, B, C, keep, or comma-separated "Display,Sans,Mono"')
  .option('-d, --dir <dir>', 'Target directory', '.')
  .option('-y, --yes', 'Accept defaults without interactive prompts')
  .action(async (opts) => {
    const targetDir = path.resolve(process.cwd(), opts.dir || '.');
    const projectName = path.basename(targetDir) || 'my-project';

    let parsedFontMode: FontSelectionMode | undefined;
    let parsedFontOverride: FontOverrideConfig | undefined;

    if (opts.fonts) {
      const f = opts.fonts.trim();
      const fUpper = f.toUpperCase();
      if (fUpper === 'A' || fUpper === 'B' || fUpper === 'C') {
        parsedFontMode = fUpper as FontSelectionMode;
      } else if (f.toLowerCase() === 'keep') {
        parsedFontMode = 'keep';
      } else if (f.includes(',')) {
        const parts = f.split(',').map((s: string) => s.trim());
        parsedFontMode = 'custom';
        parsedFontOverride = {
          display: parts[0] || undefined,
          sans: parts[1] || undefined,
          mono: parts[2] || undefined,
          source: 'user'
        };
      } else {
        parsedFontMode = 'custom';
        parsedFontOverride = {
          display: f,
          sans: f,
          source: 'user'
        };
      }
    }

    let parsedAgents: AgentType[] | null = null;
    if (opts.agents) {
      if (opts.agents.toLowerCase() === 'all') {
        parsedAgents = ['antigravity', 'cursor', 'claude-codex', 'web-builders'];
      } else {
        parsedAgents = opts.agents.split(',').map((s: string) => s.trim()) as AgentType[];
      }
    }

    if (opts.fast || opts.yes) {
      p.intro(`${pc.bgWhite(pc.black(' ⚡ agent-design-skills '))} ${pc.dim('v1.1.0 [EXPRESS MODE]')}`);
      const s = p.spinner();
      s.start(`Compiling design system in ${targetDir}...`);

      const starterKit = (opts.starterKit as StarterKitId) || 'dashboard';
      const agents = parsedAgents || await detectWorkspaceAgents(targetDir);

      const options: GeneratorOptions = {
        projectName,
        targetDir,
        agents,
        archetype: (opts.archetype as ArchetypeId) || 'dark-obsidian-technical',
        feeling: 'urgent-precise',
        radius: 'subtle',
        blur: 'subtle-frost',
        mode: (opts.mode as InstallMode) || 'modular',
        starterKit,
        fontMode: parsedFontMode,
        fontOverride: parsedFontOverride,
        customDirection: 'Needs to feel like a high-precision developer settlement console, crisp 1px hairlines, zero marketing fluff',
        productBrief: 'High-precision operational workspace and data reconciliation platform',
        fast: true
      };

      const result = await compileDesignSystem(options);
      s.stop(`Scaffolded ${result.createdFiles.length} files successfully.`);

      for (const file of result.createdFiles) {
        console.log(`  ${pc.green('✔')} ${pc.dim(path.relative(targetDir, file))}`);
      }

      p.outro(pc.green(`✨ Initialization complete for ${options.agents.join(', ')}. Token contract & starter preview active.`));
      return;
    }

    console.clear();
    p.intro(`${pc.bgWhite(pc.black(' ⚡ agent-design-skills '))} ${pc.dim('v1.1.0')}`);

    const defaultAgents = await detectWorkspaceAgents(targetDir);
    const detectedFonts = await detectProjectFonts(targetDir);

    const answers = await p.group(
      {
        agents: () =>
          parsedAgents
            ? Promise.resolve(parsedAgents)
            : p.multiselect({
                message: 'Which AI coding agent(s) are you using?',
                options: [
                  { value: 'antigravity', label: 'Antigravity', hint: '.agent/rules/ & .agent/skills/' },
                  { value: 'cursor', label: 'Cursor', hint: '.cursor/rules/' },
                  { value: 'claude-codex', label: 'Codex / Claude Code', hint: 'CLAUDE.md / AGENTS.md' },
                  { value: 'web-builders', label: 'Web Builders (v0 / Bolt / Lovable)', hint: 'DESIGN-PROMPT.md' }
                ],
                initialValues: defaultAgents,
                required: true,
              }),
        archetype: () =>
          opts.archetype
            ? Promise.resolve(opts.archetype)
            : p.select({
                message: 'Choose a human-crafted design archetype:',
                options: ARCHETYPE_OPTIONS,
              }),
        typography: async ({ results }) => {
          if (parsedFontMode || parsedFontOverride) {
            return parsedFontMode || 'custom';
          }
          const archId = (results.archetype as ArchetypeId) || (opts.archetype as ArchetypeId) || 'dark-obsidian-technical';
          const pairings = ARCHETYPE_FONT_PAIRINGS[archId] || ARCHETYPE_FONT_PAIRINGS['dark-obsidian-technical'];

          const fontOptions: Array<{ value: string; label: string; hint?: string }> = [];

          if (detectedFonts && (detectedFonts.display || detectedFonts.sans || detectedFonts.mono)) {
            const preview = [detectedFonts.display, detectedFonts.sans, detectedFonts.mono].filter(Boolean).map(extractFontFamily).join(' / ');
            fontOptions.push({
              value: 'keep',
              label: `Keep existing project fonts`,
              hint: preview
            });
          }

          fontOptions.push(
            {
              value: 'A',
              label: `Pairing A (Default): ${pairings.A.display} + ${pairings.A.sans} + ${pairings.A.mono}`,
              hint: 'Archetype primary pairing'
            },
            {
              value: 'B',
              label: `Pairing B: ${pairings.B.display} + ${pairings.B.sans} + ${pairings.B.mono}`,
              hint: 'Alternative character'
            },
            {
              value: 'C',
              label: `Pairing C: ${pairings.C.display} + ${pairings.C.sans} + ${pairings.C.mono}`,
              hint: 'Alternative character'
            },
            {
              value: 'custom',
              label: 'Custom font families (specify Display, Sans, Mono)',
              hint: 'Type custom Google Fonts or Fontshare families'
            }
          );

          return p.select({
            message: 'Select typography & font pairing:',
            options: fontOptions,
            initialValue: (detectedFonts && (detectedFonts.display || detectedFonts.sans || detectedFonts.mono)) ? 'keep' : 'A'
          });
        },
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

    let finalFontMode: FontSelectionMode = (parsedFontMode || (answers.typography as FontSelectionMode)) || 'A';
    let finalFontOverride: FontOverrideConfig | undefined = parsedFontOverride;

    if (answers.typography === 'keep' && !finalFontOverride && detectedFonts) {
      finalFontOverride = detectedFonts;
    } else if (answers.typography === 'custom' && !finalFontOverride) {
      const customDisplay = await p.text({
        message: 'Enter --font-display family (e.g. "Cabinet Grotesk" or "Cormorant Garamond"):',
        placeholder: 'Sora',
        validate: (val) => (!val?.trim() ? 'Display font family is required' : undefined)
      });
      if (p.isCancel(customDisplay)) {
        p.cancel('Setup cancelled.');
        process.exit(0);
      }
      const customSans = await p.text({
        message: 'Enter --font-sans family (e.g. "Instrument Sans" or "Public Sans"):',
        placeholder: 'Instrument Sans',
        validate: (val) => (!val?.trim() ? 'Sans font family is required' : undefined)
      });
      if (p.isCancel(customSans)) {
        p.cancel('Setup cancelled.');
        process.exit(0);
      }
      const customMono = await p.text({
        message: 'Enter --font-mono family (e.g. "Geist Mono" or "JetBrains Mono"):',
        placeholder: 'JetBrains Mono',
        validate: (val) => (!val?.trim() ? 'Mono font family is required' : undefined)
      });
      if (p.isCancel(customMono)) {
        p.cancel('Setup cancelled.');
        process.exit(0);
      }

      finalFontOverride = {
        display: (customDisplay as string).trim(),
        sans: (customSans as string).trim(),
        mono: (customMono as string).trim(),
        source: 'user'
      };
    }

    const s = p.spinner();
    s.start(`Compiling tokens and governance contract...`);

    const options: GeneratorOptions = {
      projectName,
      targetDir,
      agents: (answers.agents as AgentType[]) || (parsedAgents || defaultAgents),
      archetype: answers.archetype as ArchetypeId,
      feeling: answers.feeling as FeelingVectorId,
      radius: answers.radius as RadiusScaleId,
      blur: answers.blur as BlurScaleId,
      fontMode: finalFontMode,
      fontOverride: finalFontOverride,
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
