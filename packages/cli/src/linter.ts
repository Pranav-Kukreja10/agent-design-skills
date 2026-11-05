import fs from 'fs-extra';
import path from 'pathe';
import { LintViolation } from './types.js';
import { verifyFreezeIntegrity } from './freeze.js';

export interface LintReport {
  targetDir: string;
  violations: LintViolation[];
  filesScanned: number;
  passed: boolean;
}

// Banned copy phrases
const BANNED_COPY_PHRASES = [
  'hover to reveal',
  'click here',
  'smooth animations',
  'built with react',
  'powered by react',
  'ai-powered',
  'supercharge',
  'one-click',
  'magical',
  'say goodbye to'
];

// Regex to detect emoji characters used as icons
const EMOJI_REGEX = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}]/u;

// Regex for raw hex color literals: 3, 4, 6, 8 hex digits preceded by #, delimited
const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?=[;,\s)'"`}\]]|$)/g;

// Regex for raw color function calls
const RAW_COLOR_FN_REGEX = /\b(?:rgba?|hsla?|oklch)\s*\(/i;

// Regex for AI gradient patterns
const AI_GRADIENT_REGEX = /(?:from-purple|to-pink|from-indigo.*to-purple|from-cyan.*to-purple|radial-gradient\([^)]*(?:purple|#7[0-9a-f]{5}|oklch\([^)]*290\)))/i;

export async function lintDirectory(targetDir: string): Promise<LintReport> {
  const violations: LintViolation[] = [];
  let filesScanned = 0;

  // 1. Verify Hash Freeze Integrity
  const freezeCheck = await verifyFreezeIntegrity(targetDir);
  if (freezeCheck.locked && !freezeCheck.valid) {
    for (const modified of freezeCheck.modifiedFiles) {
      violations.push({
        file: modified,
        rule: 'freeze/hash-integrity',
        line: 1,
        snippet: modified,
        message: `File was modified without running unfreeze: ${modified}`,
        severity: 'error'
      });
    }
  }

  // 2. Scan files in target directory
  const scanExtensions = ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.vue', '.svelte'];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.git', 'dist', '.gemini', '.turbo'].includes(entry.name)) {
          continue;
        }
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (scanExtensions.includes(ext)) {
          await lintFile(fullPath, targetDir, violations);
          filesScanned++;
        }
      }
    }
  }

  await walk(targetDir);

  return {
    targetDir,
    violations,
    filesScanned,
    passed: violations.filter(v => v.severity === 'error').length === 0
  };
}

async function lintFile(
  fullPath: string,
  targetDir: string,
  violations: LintViolation[]
): Promise<void> {
  const relPath = path.relative(targetDir, fullPath);
  const isTokensCss = path.basename(fullPath) === 'tokens.css';
  const content = await fs.readFile(fullPath, 'utf-8');
  const lines = content.split('\n');

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const lineNumber = lineIndex + 1;
    const trimmed = line.trim();

    // Check for explicit design exceptions or signatures
    const hasException =
      line.includes('/* @design-exception') ||
      line.includes('/* @design-signature') ||
      line.includes('// @design-exception') ||
      line.includes('// @design-signature');

    // Rule: tokens/no-hardcoded-color-radius (exempt inside tokens.css or if annotated)
    if (!isTokensCss && !hasException) {
      // Raw color function check: rgb(), hsl(), inline oklch()
      if (RAW_COLOR_FN_REGEX.test(line)) {
        violations.push({
          file: relPath,
          rule: 'tokens/no-hardcoded-color-radius',
          line: lineNumber,
          snippet: trimmed,
          message: 'Hardcoded color function (rgb, hsl, oklch) found outside tokens.css without @design-exception',
          severity: 'error'
        });
      }

      // Raw hex color check
      // Exclude HTML entity escapes, IDs starting with letters, comments
      const hexMatches = line.match(HEX_COLOR_REGEX);
      if (hexMatches) {
        for (const match of hexMatches) {
          // Verify it's not preceded by a word character (like an ID #header-primary-cta)
          const idx = line.indexOf(match);
          if (idx > 0 && /[a-zA-Z0-9_-]/.test(line[idx - 1])) {
            continue;
          }
          // Verify it's not inside a block partition text like #10842 (already filtered by hex length 3,4,6,8)
          violations.push({
            file: relPath,
            rule: 'tokens/no-hardcoded-color-radius',
            line: lineNumber,
            snippet: trimmed,
            message: `Hardcoded hex color '${match}' found outside tokens.css without @design-exception`,
            severity: 'error'
          });
        }
      }
    }

    // Rule: slop/no-animate-ping
    if (line.includes('animate-ping')) {
      violations.push({
        file: relPath,
        rule: 'slop/no-animate-ping',
        line: lineNumber,
        snippet: trimmed,
        message: 'Banned attention-seeking animation "animate-ping" detected',
        severity: 'error'
      });
    }

    // Rule: slop/no-ai-gradient
    if (AI_GRADIENT_REGEX.test(line) && !hasException) {
      violations.push({
        file: relPath,
        rule: 'slop/no-ai-gradient',
        line: lineNumber,
        snippet: trimmed,
        message: 'Banned AI cliché gradient (purple/pink mesh) detected',
        severity: 'error'
      });
    }

    // Rule: copy/banned-phrases-and-leakage
    const lowerLine = line.toLowerCase();
    for (const phrase of BANNED_COPY_PHRASES) {
      if (lowerLine.includes(phrase) && !line.includes('rule') && !line.includes('banned')) {
        violations.push({
          file: relPath,
          rule: 'copy/banned-phrases-and-leakage',
          line: lineNumber,
          snippet: trimmed,
          message: `Self-referential or marketing copy cliché detected: "${phrase}"`,
          severity: 'error'
        });
        break;
      }
    }

    // Check for banned numbered slash eyebrows (e.g., 01 / LEDGER)
    if (!line.includes('regex') && !line.includes('banned') && !line.includes('Banned') && !line.includes('Rule') && />?\s*0[1-9]\s*\/\s*[A-Z]/.test(line)) {
      violations.push({
        file: relPath,
        rule: 'copy/banned-phrases-and-leakage',
        line: lineNumber,
        snippet: trimmed,
        message: 'Numbered slash eyebrow (e.g. "01 / ...") detected above headings or in UI markup',
        severity: 'error'
      });
    }

    // Rule: slop/no-emoji-icons
    if (EMOJI_REGEX.test(line) && !hasException) {
      // Ignore in markdown block quotes or rule descriptions if comments
      if (!line.includes('no 🚀') && !line.includes('Banned')) {
        violations.push({
          file: relPath,
          rule: 'slop/no-emoji-icons',
          line: lineNumber,
          snippet: trimmed,
          message: 'Emoji character used as UI icon detected',
          severity: 'error'
        });
      }
    }
  }
}

