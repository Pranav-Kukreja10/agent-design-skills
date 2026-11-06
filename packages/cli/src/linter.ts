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

// Regex for fake tier/status/cosplay badges
const FAKE_TIER_REGEX = /\[(PRO|BETA|v\d+\.\d+)\]/i;
const FAKE_COSPLAY_REGEX = /\b(SUB-\d+MS|TEMPORAL ENGINE|MASTER CHRONOMETER|CHRONO SYNC|LOCAL REFERENCE|\d+\s*FPS|EPOCH)\b/i;

// Regex for hardcoded overlay badge text on images/media/products
const OVERLAY_BADGE_TEXT_REGEX = /\b(NOW PLAYING|•\s*PLAYING|HD\s*1080P|4K\s*HDR|120\s*FPS|HI-RES\s*AUDIO|LIVE\s*CINEMATIC|BESTSELLER|HOT\s*SALE|LIMITED\s*TIME)\b/i;

// Regex for small decorative status dot elements (Tailwind or inline styling)
const DECORATIVE_DOT_CLASS_REGEX = /\b(?:w-(?:1|1\.5|2|2\.5)\b[^"']*\bh-(?:1|1\.5|2|2\.5)\b|\bh-(?:1|1\.5|2|2\.5)\b[^"']*\bw-(?:1|1\.5|2|2\.5)\b)[^"']*\brounded-full\b|\brounded-full\b[^"']*(?:\bw-(?:1|1\.5|2|2\.5)\b[^"']*\bh-(?:1|1\.5|2|2\.5)\b|\bh-(?:1|1\.5|2|2\.5)\b[^"']*\bw-(?:1|1\.5|2|2\.5)\b)/i;
const DECORATIVE_DOT_INLINE_REGEX = /(?:width:\s*[5-8]px[^;]*;\s*height:\s*[5-8]px|height:\s*[5-8]px[^;]*;\s*width:\s*[5-8]px)[^"';}]*;\s*border-radius:\s*(?:50%|9999px)|border-radius:\s*(?:50%|9999px)[^"';}]*;\s*(?:width:\s*[5-8]px[^;]*;\s*height:\s*[5-8]px|height:\s*[5-8]px[^;]*;\s*width:\s*[5-8]px)/i;

// Regex for prefix bullet characters inside text/JSX
const PREFIX_BULLET_REGEX = /(?:^[>'"\s]*|[>'"\s])[●•▪]\s+[A-Za-z0-9]/;

// Regex for absolute-positioned corner badge/pill overlay classes
const CORNER_BADGE_CLASS_REGEX = /\babsolute\b[^"']*\b(?:top-(?:1|2|3|4|5|6|8)|top-\[[^\]]+\])\b[^"']*\b(?:left|right)-(?:1|2|3|4|5|6|8)\b|\babsolute\b[^"']*\b(?:left|right)-(?:1|2|3|4|5|6|8)\b[^"']*\b(?:top-(?:1|2|3|4|5|6|8)|top-\[[^\]]+\])\b/i;
const CORNER_PILL_TRAIT_REGEX = /\b(rounded-full|uppercase|tracking-[a-z0-9_-]+|text-xs|badge|pill|chip)\b/i;

// Regex for slashed-zero numeric styling
const SLASHED_ZERO_REGEX = /slashed-zero|font-feature-settings:[^;]*["']zero["']\s*1/i;

// Regex for decorative badge/pill classes in header/nav
const BADGE_PILL_CLASS_REGEX = /class(?:Name)?=["'][^"']*\b(badge|pill|chip|tag-chip|status-badge|header-badge)\b[^"']*["']/i;

// Regex for uppercase + tracking micro-labels
const UPPERCASE_TRACKING_REGEX = /(?:class(?:Name)?=["'][^"']*\buppercase\b[^"']*\btracking-[^"']*["']|class(?:Name)?=["'][^"']*\btracking-[^"']*\buppercase\b[^"']*["']|\btext-transform:\s*uppercase\b[^;]*letter-spacing)/i;

// Regex for unreadable micro-text (< 13px)
const MICRO_TEXT_REGEX = /(?:\btext-\[(?:8|9|10|11)px\]|\bfont-size:\s*(?:8|9|10|11)px\b)/i;

// Regex for low-contrast / dim opacity text classes
const LOW_OPACITY_TEXT_REGEX = /\b(text-zinc-500|text-slate-500|text-gray-500|opacity-30|opacity-40)\b/i;

// Regex for external image URLs (Unsplash or direct image extensions)
const EXTERNAL_IMAGE_URL_REGEX = /https?:\/\/[^\s"'`]+\.(?:png|jpe?g|webp|avif|svg)(?:\?[^\s"'`]*)?|https?:\/\/(?:images\.)?unsplash\.com\/[^\s"'`]+/gi;

function extractImageAssetKey(url: string): string {
  const unsplashMatch = url.match(/(?:premium_)?photo-[a-zA-Z0-9_-]+/i);
  if (unsplashMatch) {
    return unsplashMatch[0].toLowerCase();
  }
  return url.split('?')[0].split('#')[0].toLowerCase();
}

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
  const isRuleOrDoc = fullPath.includes('.agent') || fullPath.includes('.cursor') || fullPath.includes('DESIGN.md') || fullPath.includes('README.md') || fullPath.includes('core');
  const content = await fs.readFile(fullPath, 'utf-8');
  const lines = content.split('\n');
  let inHeaderOrNav = false;
  let uppercaseCount = 0;
  let firstUppercaseLine = 0;
  let firstUppercaseSnippet = '';
  const seenImageAssets = new Map<string, number>();

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const lineNumber = lineIndex + 1;
    const trimmed = line.trim();

    if (/<(?:header|nav)\b/i.test(line)) {
      inHeaderOrNav = true;
    }
    if (/<\/(?:header|nav)>/i.test(line)) {
      inHeaderOrNav = false;
    }

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
    if (!line.includes('regex') && !line.includes('banned') && !line.includes('Banned') && !line.includes('Rule') && (/^\s*0[1-9]\s*\/\s*[A-Z]/.test(trimmed) || />?\s*0[1-9]\s*\/\s*[A-Z]/.test(line))) {
      violations.push({
        file: relPath,
        rule: 'copy/banned-phrases-and-leakage',
        line: lineNumber,
        snippet: trimmed,
        message: 'Numbered slash eyebrow (e.g. "01 / ...") detected above headings or in UI markup',
        severity: 'error'
      });
    }

    // Rule: slop/no-decorative-badges (Bans badge/pill in <header> or <nav>)
    if (inHeaderOrNav && BADGE_PILL_CLASS_REGEX.test(line) && !hasException && !isRuleOrDoc) {
      violations.push({
        file: relPath,
        rule: 'slop/no-decorative-badges',
        line: lineNumber,
        snippet: trimmed,
        message: 'Banned decorative badge/pill/chip detected inside <header> or <nav>',
        severity: 'error'
      });
    }

    // Rule: slop/no-fake-telemetry-cosplay
    if (!hasException && !isRuleOrDoc && !line.includes('rule') && !line.includes('banned')) {
      if (FAKE_TIER_REGEX.test(line)) {
        violations.push({
          file: relPath,
          rule: 'slop/no-fake-telemetry-cosplay',
          line: lineNumber,
          snippet: trimmed,
          message: 'Fake product tier/version badge (e.g. [PRO v2.4], [BETA]) detected',
          severity: 'error'
        });
      } else if (FAKE_COSPLAY_REGEX.test(line)) {
        violations.push({
          file: relPath,
          rule: 'slop/no-fake-telemetry-cosplay',
          line: lineNumber,
          snippet: trimmed,
          message: 'Fake hardware telemetry or sci-fi cosplay copy detected',
          severity: 'error'
        });
      }
    }

    // Rule: slop/no-image-corner-badges (Flag floating corner badge slop on images/media/products)
    if (!hasException && !isRuleOrDoc && !line.includes('rule') && !line.includes('banned') && !line.includes('ban')) {
      const hasOverlayText = OVERLAY_BADGE_TEXT_REGEX.test(line);
      const hasCornerPillClass = CORNER_BADGE_CLASS_REGEX.test(line) && CORNER_PILL_TRAIT_REGEX.test(line);
      if (hasOverlayText || hasCornerPillClass) {
        violations.push({
          file: relPath,
          rule: 'slop/no-image-corner-badges',
          line: lineNumber,
          snippet: trimmed,
          message: hasOverlayText
            ? 'Banned media/product overlay badge text detected. Keep media uncluttered without floating corner status pills.'
            : 'Floating corner badge/pill overlay detected. Never place floating status pills on top of cards, media, or product images.',
          severity: 'error'
        });
      }
    }

    // Rule: slop/no-decorative-dots (Flag static/animated status dot elements & prefix bullets)
    if (!hasException && !isRuleOrDoc && !line.includes('rule') && !line.includes('banned') && !line.includes('ban')) {
      const hasDotClass = DECORATIVE_DOT_CLASS_REGEX.test(line);
      const hasDotInline = DECORATIVE_DOT_INLINE_REGEX.test(line);
      const hasPrefixBullet = PREFIX_BULLET_REGEX.test(line);

      if (hasDotClass || hasDotInline) {
        violations.push({
          file: relPath,
          rule: 'slop/no-decorative-dots',
          line: lineNumber,
          snippet: trimmed,
          message: 'Decorative colored circle dot element detected. Communicate status through clean typography or subtle text color alone without decorative dot elements.',
          severity: 'error'
        });
      } else if (hasPrefixBullet) {
        violations.push({
          file: relPath,
          rule: 'slop/no-decorative-dots',
          line: lineNumber,
          snippet: trimmed,
          message: 'Prefix bullet character (• / ● / ▪) detected on badge, pill, or label. Communicate status with clean text alone.',
          severity: 'error'
        });
      }
    }

    // Rule: data/no-duplicate-image-urls (scans for external image URLs duplicated across multiple records)
    if (!hasException && !isRuleOrDoc && !line.includes('rule') && !line.includes('banned')) {
      const imgMatches = line.match(EXTERNAL_IMAGE_URL_REGEX);
      if (imgMatches) {
        for (const url of imgMatches) {
          const assetKey = extractImageAssetKey(url);
          if (seenImageAssets.has(assetKey)) {
            const originalLine = seenImageAssets.get(assetKey);
            violations.push({
              file: relPath,
              rule: 'data/no-duplicate-image-urls',
              line: lineNumber,
              snippet: trimmed,
              message: `Duplicate image asset detected ("${assetKey}", originally defined on line ${originalLine}). Every distinct record in a UI dataset must have a unique visual asset/URL.`,
              severity: 'warning'
            });
          } else {
            seenImageAssets.set(assetKey, lineNumber);
          }
        }
      }
    }

    // Rule: slop/no-slashed-zero
    if (SLASHED_ZERO_REGEX.test(line) && !hasException && !line.includes('"zero" 0') && !isTokensCss && !isRuleOrDoc) {
      violations.push({
        file: relPath,
        rule: 'slop/no-slashed-zero',
        line: lineNumber,
        snippet: trimmed,
        message: 'Banned slashed-zero numeric styling detected. Use open-oval zeros with "zero" 0',
        severity: 'error'
      });
    }

    // Rule: a11y/no-micro-text
    if (!isTokensCss && !isRuleOrDoc && !hasException) {
      if (MICRO_TEXT_REGEX.test(line)) {
        violations.push({
          file: relPath,
          rule: 'a11y/no-micro-text',
          line: lineNumber,
          snippet: trimmed,
          message: 'Unreadable micro-text detected (< 13px). Maintain minimum 13px (0.8125rem) floor for human readability.',
          severity: 'error'
        });
      }
      if (LOW_OPACITY_TEXT_REGEX.test(line)) {
        violations.push({
          file: relPath,
          rule: 'a11y/no-micro-text',
          line: lineNumber,
          snippet: trimmed,
          message: 'Low-contrast dim text class detected. Use high-contrast var(--text-secondary) or var(--text-muted) instead of raw gray or low opacity.',
          severity: 'error'
        });
      }
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

    // Check uppercase micro-labels count
    if (UPPERCASE_TRACKING_REGEX.test(line) && !hasException && !isRuleOrDoc) {
      uppercaseCount++;
      if (!firstUppercaseLine) {
        firstUppercaseLine = lineNumber;
        firstUppercaseSnippet = trimmed;
      }
    }
  }

  // Rule: slop/excessive-uppercase-labels (Warns if > 3 uppercase tracking micro-labels)
  if (uppercaseCount > 3) {
    violations.push({
      file: relPath,
      rule: 'slop/excessive-uppercase-labels',
      line: firstUppercaseLine,
      snippet: firstUppercaseSnippet,
      message: `Excessive uppercase micro-labels detected (${uppercaseCount} occurrences, maximum allowed is 3). Cure UPPERCASE MICRO-LABEL disease by using normal sentence case.`,
      severity: 'warning'
    });
  }
}

