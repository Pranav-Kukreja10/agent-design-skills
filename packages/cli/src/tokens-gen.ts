import fs from 'fs-extra';
import path from 'pathe';
import {
  GeneratorOptions,
  TokenVariables,
  ArchetypeId,
  RadiusScaleId,
  BlurScaleId,
  FeelingVectorId,
  FontOverrideConfig
} from './types.js';

/**
 * Calculates a deterministic hue jitter (-3 to +3 degrees) from a folder/project name.
 */
export function calculateFolderHueJitter(folderName: string): number {
  let hash = 0;
  for (let i = 0; i < folderName.length; i++) {
    hash = (hash << 5) - hash + folderName.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 7) - 3;
}

/**
 * Ensures WCAG 2.1 AAA (>= 7:1) and AA (>= 4.5:1) compliance via lightness clamping.
 */
function clampLightnessForContrast(
  lightness: number,
  polarity: 'dark' | 'light',
  target: 'primary' | 'secondary' | 'muted'
): number {
  if (polarity === 'dark') {
    if (target === 'primary') {
      // Must maintain >= 7:1 against dark canvas (L ~ 0.12)
      return Math.max(0.97, lightness);
    } else if (target === 'secondary') {
      // Effortless bright silver for secondary labels and metadata
      return Math.max(0.80, lightness);
    } else {
      // Must maintain >= 5.5:1 against dark elevated (never below 0.68)
      return Math.max(0.68, lightness);
    }
  } else {
    if (target === 'primary') {
      // Must maintain >= 7:1 against light canvas (L ~ 0.97)
      return Math.min(0.15, lightness);
    } else if (target === 'secondary') {
      // Deep, crisp slate readability for sub-labels (>= 6:1)
      return Math.min(0.34, lightness);
    } else {
      // Must maintain >= 4.5:1 against light elevated (never lighter than 0.44)
      return Math.min(0.44, lightness);
    }
  }
}

export interface FontTriple {
  display: string;
  sans: string;
  mono: string;
}

export const ARCHETYPE_FONT_PAIRINGS: Record<ArchetypeId, { A: FontTriple; B: FontTriple; C: FontTriple }> = {
  'dark-obsidian-technical': {
    A: { display: 'Geist', sans: 'Instrument Sans', mono: 'Geist Mono' },
    B: { display: 'Sora', sans: 'Public Sans', mono: 'Fira Code' },
    C: { display: 'Satoshi', sans: 'General Sans', mono: 'Space Mono' }
  },
  'swiss-typographic-grid': {
    A: { display: 'Cabinet Grotesk', sans: 'Space Grotesk', mono: 'Space Mono' },
    B: { display: 'Syne', sans: 'Public Sans', mono: 'Fragment Mono' },
    C: { display: 'Sora', sans: 'General Sans', mono: 'DM Mono' }
  },
  'kinetic-industrial-mono': {
    A: { display: 'JetBrains Mono', sans: 'IBM Plex Sans', mono: 'JetBrains Mono' },
    B: { display: 'Fira Code', sans: 'Fragment Mono', mono: 'Fira Code' },
    C: { display: 'Space Mono', sans: 'Chivo', mono: 'Space Mono' }
  },
  'bento-modular-system': {
    A: { display: 'Satoshi', sans: 'General Sans', mono: 'Geist Mono' },
    B: { display: 'Sora', sans: 'Public Sans', mono: 'Fira Code' },
    C: { display: 'Outfit', sans: 'DM Sans', mono: 'JetBrains Mono' }
  },
  'spatial-glass-visionos': {
    A: { display: 'Outfit', sans: 'DM Sans', mono: 'Fragment Mono' },
    B: { display: 'Sora', sans: 'Public Sans', mono: 'Geist Mono' },
    C: { display: 'Cabinet Grotesk', sans: 'Switzer', mono: 'Inconsolata' }
  },
  'editorial-serif-paper': {
    A: { display: 'Newsreader', sans: 'Work Sans', mono: 'Fragment Mono' },
    B: { display: 'Fraunces', sans: 'Merriweather Sans', mono: 'IBM Plex Mono' },
    C: { display: 'Bespoke Serif', sans: 'Switzer', mono: 'Inconsolata' }
  },
  'quiet-luxury-atelier': {
    A: { display: 'Cormorant Garamond', sans: 'DM Sans', mono: 'Fragment Mono' },
    B: { display: 'Fraunces', sans: 'Work Sans', mono: 'IBM Plex Mono' },
    C: { display: 'Bespoke Serif', sans: 'Switzer', mono: 'Space Mono' }
  },
  'warm-artisan-craft': {
    A: { display: 'Fraunces', sans: 'Cabinet Grotesk', mono: 'DM Mono' },
    B: { display: 'Source Serif 4', sans: 'Public Sans', mono: 'Fragment Mono' },
    C: { display: 'Newsreader', sans: 'General Sans', mono: 'Space Mono' }
  },
  'japanese-minimal-zen': {
    A: { display: 'Noto Serif Display', sans: 'Work Sans', mono: 'DM Mono' },
    B: { display: 'Newsreader', sans: 'Public Sans', mono: 'Fragment Mono' },
    C: { display: 'Bespoke Serif', sans: 'Sora', mono: 'JetBrains Mono' }
  },
  'scandinavian-warm-minimal': {
    A: { display: 'Familjen Grotesk', sans: 'DM Sans', mono: 'Fragment Mono' },
    B: { display: 'Sora', sans: 'Public Sans', mono: 'IBM Plex Mono' },
    C: { display: 'Switzer', sans: 'Work Sans', mono: 'Space Mono' }
  },
  'neo-brutalism': {
    A: { display: 'Space Grotesk', sans: 'Syne', mono: 'Space Mono' },
    B: { display: 'Archivo Black', sans: 'Archivo', mono: 'DM Mono' },
    C: { display: 'Clash Display', sans: 'Cabinet Grotesk', mono: 'Fragment Mono' }
  },
  'retro-tactile-analog': {
    A: { display: 'Space Mono', sans: 'Chivo', mono: 'Space Mono' },
    B: { display: 'Syne', sans: 'Public Sans', mono: 'Fira Code' },
    C: { display: 'Archivo', sans: 'DM Mono', mono: 'DM Mono' }
  },
  'y2k-acid-cyber': {
    A: { display: 'Syne', sans: 'Chakra Petch', mono: 'Space Mono' },
    B: { display: 'Clash Display', sans: 'Space Grotesk', mono: 'Fira Code' },
    C: { display: 'Cabinet Grotesk', sans: 'Public Sans', mono: 'JetBrains Mono' }
  },
  'playful-clay-consumer': {
    A: { display: 'Bricolage Grotesque', sans: 'Fredoka', mono: 'Space Mono' },
    B: { display: 'Outfit', sans: 'DM Sans', mono: 'Fragment Mono' },
    C: { display: 'Cabinet Grotesk', sans: 'Switzer', mono: 'DM Mono' }
  },
  'vaporwave-crt-terminal': {
    A: { display: 'VT323', sans: 'Fira Code', mono: 'Fira Code' },
    B: { display: 'Chakra Petch', sans: 'Space Mono', mono: 'Space Mono' },
    C: { display: 'Syne', sans: 'DM Mono', mono: 'DM Mono' }
  },
  'high-trust-fintech-clarity': {
    A: { display: 'Sora', sans: 'Public Sans', mono: 'Fira Code' },
    B: { display: 'General Sans', sans: 'Instrument Sans', mono: 'JetBrains Mono' },
    C: { display: 'Cabinet Grotesk', sans: 'Switzer', mono: 'Space Mono' }
  },
  'clinical-biotech-precision': {
    A: { display: 'Instrument Sans', sans: 'Public Sans', mono: 'IBM Plex Mono' },
    B: { display: 'Sora', sans: 'General Sans', mono: 'Fragment Mono' },
    C: { display: 'Cabinet Grotesk', sans: 'Work Sans', mono: 'Fira Code' }
  },
  'civic-govtech-accessible': {
    A: { display: 'Atkinson Hyperlegible', sans: 'Public Sans', mono: 'Fragment Mono' },
    B: { display: 'Sora', sans: 'DM Sans', mono: 'IBM Plex Mono' },
    C: { display: 'Work Sans', sans: 'General Sans', mono: 'Fira Code' }
  }
};

export const FEELING_VECTORS_MAP: Record<FeelingVectorId, { ease: string; easeSpring: string; durationFast: string; durationNormal: string }> = {
  'calm': {
    ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    easeSpring: 'cubic-bezier(0.25, 1, 0.5, 1)',
    durationFast: '140ms',
    durationNormal: '240ms'
  },
  'urgent-precise': {
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeSpring: 'cubic-bezier(0.16, 1, 0.3, 1)',
    durationFast: '110ms',
    durationNormal: '180ms'
  },
  'playful-tactile': {
    ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    easeSpring: 'cubic-bezier(0.22, 1.35, 0.36, 1)',
    durationFast: '120ms',
    durationNormal: '240ms'
  },
  'authoritative': {
    ease: 'cubic-bezier(0.2, 0, 0, 1)',
    easeSpring: 'cubic-bezier(0.2, 0, 0, 1)',
    durationFast: '120ms',
    durationNormal: '200ms'
  }
};

const GOOGLE_WEIGHTS_MAP: Record<string, string> = {
  'instrument sans': 'wght@400;500;600;700',
  'space grotesk': 'wght@400;500;600;700',
  'sora': 'wght@400;600',
  'fraunces': 'opsz,wght@9..144,400..700',
  'cormorant garamond': 'wght@500;600;700',
  'jetbrains mono': 'wght@400;500',
  'fira code': 'wght@400;500',
  'ibm plex mono': 'wght@400;500',
  'ibm plex sans': 'wght@400;500;600',
  'space mono': 'wght@400;700',
  'public sans': 'wght@400;500;600',
  'dm sans': 'wght@400;500;600',
  'dm mono': 'wght@400;500',
  'work sans': 'wght@400;500;600',
  'atkinson hyperlegible': 'wght@400;700',
  'bricolage grotesque': 'wght@400;600;700',
  'syne': 'wght@600;700',
  'syne mono': 'wght@400',
  'vt323': 'wght@400',
  'newsreader': 'ital,opsz,wght@0,6..72,400..700;1,6..72,400',
  'noto serif display': 'wght@400;600',
  'familjen grotesk': 'wght@400;600',
  'geist': 'wght@400;500;600;700',
  'geist mono': 'wght@400;500',
  'chakra petch': 'wght@400;600',
  'fredoka': 'wght@400;600',
  'archivo black': 'wght@400',
  'archivo': 'wght@400;600',
  'chivo': 'wght@400;600',
  'inconsolata': 'wght@400;600',
  'merriweather sans': 'wght@400;600',
  'source serif 4': 'opsz,wght@8..60,400..700'
};

const FONTSHARE_SLUGS_MAP: Record<string, string> = {
  'cabinet grotesk': 'cabinet-grotesk@500,700,800',
  'general sans': 'general-sans@400,500,600',
  'satoshi': 'satoshi@400,500,700',
  'switzer': 'switzer@400,500,600',
  'bespoke serif': 'bespoke-serif@400,600',
  'clash display': 'clash-display@500,600,700'
};

export function extractFontFamily(fontValue: string): string {
  if (!fontValue) return '';
  const match = fontValue.match(/["']([^"']+)["']/);
  return match ? match[1] : fontValue.split(',')[0].trim();
}

/**
 * Priority 1: Scans existing project files (tokens.css, tokens.json, package.json)
 * to detect and preserve already-configured fonts.
 */
export async function detectProjectFonts(targetDir: string): Promise<FontOverrideConfig | null> {
  const cssPath = path.resolve(targetDir, 'tokens.css');
  const jsonPath = path.resolve(targetDir, 'tokens.json');
  const pkgPath = path.resolve(targetDir, 'package.json');

  let display: string | undefined;
  let sans: string | undefined;
  let mono: string | undefined;
  let importUrl: string | undefined;

  // 1. Check tokens.css
  if (await fs.pathExists(cssPath)) {
    const content = await fs.readFile(cssPath, 'utf-8');
    const displayMatch = content.match(/--font-display:\s*([^;]+);/);
    const sansMatch = content.match(/--font-sans:\s*([^;]+);/);
    const monoMatch = content.match(/--font-mono:\s*([^;]+);/);
    const importMatch = content.match(/@import\s+url\(['"]?([^'")]+)['"]?\);/);

    if (displayMatch) display = displayMatch[1].trim();
    if (sansMatch) sans = sansMatch[1].trim();
    if (monoMatch) mono = monoMatch[1].trim();
    if (importMatch) importUrl = importMatch[1].trim();

    if (display || sans || mono) {
      return { display, sans, mono, importUrl, source: 'preserved' };
    }
  }

  // 2. Check tokens.json
  if (await fs.pathExists(jsonPath)) {
    try {
      const json = await fs.readJSON(jsonPath);
      const vars = json.variables || {};
      if (vars['--font-display'] || vars['--font-sans'] || vars['--font-mono']) {
        return {
          display: vars['--font-display'],
          sans: vars['--font-sans'],
          mono: vars['--font-mono'],
          source: 'preserved'
        };
      }
    } catch {}
  }

  // 3. Scan package.json for @fontsource/* packages or next/font
  if (await fs.pathExists(pkgPath)) {
    try {
      const pkg = await fs.readJSON(pkgPath);
      const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
      const fontsourcePkgs = Object.keys(allDeps).filter(dep => dep.startsWith('@fontsource/'));
      if (fontsourcePkgs.length > 0) {
        const fonts = fontsourcePkgs.map(p => {
          const raw = p.replace('@fontsource/', '');
          return raw.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        });
        return {
          display: fonts[0],
          sans: fonts[1] || fonts[0],
          mono: fonts.find(f => f.toLowerCase().includes('mono') || f.toLowerCase().includes('code')) || 'monospace',
          source: 'package.json'
        };
      }
    } catch {}
  }

  return null;
}

/**
 * Priority 2: Parses user's Section 0 Custom Creative Direction string for font mentions.
 */
export function parseCustomDirectionFonts(customDirection?: string): Partial<FontOverrideConfig> | null {
  if (!customDirection) return null;

  const fontCandidates = [
    'Geist Mono', 'Geist', 'Instrument Sans', 'Space Grotesk', 'Space Mono',
    'Cabinet Grotesk', 'General Sans', 'Satoshi', 'Switzer', 'Bespoke Serif',
    'Fraunces', 'Cormorant Garamond', 'Newsreader', 'Noto Serif Display',
    'Source Serif 4', 'Familjen Grotesk', 'Sora', 'Public Sans', 'Work Sans',
    'Atkinson Hyperlegible', 'Bricolage Grotesque', 'Syne Mono', 'Syne',
    'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'IBM Plex Sans',
    'DM Sans', 'DM Mono', 'Outfit', 'VT323', 'Archivo'
  ];

  const lower = customDirection.toLowerCase();
  for (const candidate of fontCandidates) {
    const pattern = new RegExp(`\\b(?:use|with|in|font:?)\\s+${candidate.toLowerCase()}\\b|\\b${candidate.toLowerCase()}\\s+(?:font|typography)\\b`, 'i');
    if (pattern.test(customDirection) || lower.includes(`use ${candidate.toLowerCase()}`)) {
      const isMono = /mono|code|vt323/i.test(candidate);
      const isSerif = /serif|garamond|fraunces|newsreader|cinzel/i.test(candidate);
      if (isMono) {
        return { mono: candidate, source: 'custom' };
      } else if (isSerif) {
        return { display: candidate, source: 'custom' };
      } else {
        return { sans: candidate, display: candidate, source: 'custom' };
      }
    }
  }

  return null;
}

/**
 * Appends clean, production-grade fallback stacks for Display, Sans, and Mono.
 */
export function formatFontStack(fontName: string, role: 'display' | 'sans' | 'mono'): string {
  if (!fontName) return '';
  if (fontName.includes(',') && (fontName.includes('serif') || fontName.includes('sans-serif') || fontName.includes('monospace'))) {
    return fontName;
  }

  const cleanName = fontName.replace(/['"]/g, '').trim();
  const lower = cleanName.toLowerCase();

  const isMono = role === 'mono' || /mono|code|vt323|inconsolata/i.test(lower);
  const isSerif = role === 'display' && (/serif|garamond|fraunces|newsreader|cinzel/i.test(lower));

  if (isMono) {
    return `'${cleanName}', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  }
  if (isSerif) {
    return `'${cleanName}', Georgia, "Times New Roman", serif`;
  }
  return `'${cleanName}', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
}

/**
 * Builds @import CSS statements for Google Fonts and Fontshare CDNs with explicit weights.
 */
export function buildFontImports(
  displayFont: string,
  sansFont: string,
  monoFont: string,
  preservedImportUrl?: string
): string {
  const rawFamilies = [
    extractFontFamily(displayFont),
    extractFontFamily(sansFont),
    extractFontFamily(monoFont)
  ].filter(Boolean);

  const uniqueFamilies = Array.from(new Set(rawFamilies));

  const fontshareImports: string[] = [];
  const googleFamilies: string[] = [];

  for (const fam of uniqueFamilies) {
    const lower = fam.toLowerCase();
    if (FONTSHARE_SLUGS_MAP[lower]) {
      fontshareImports.push(
        `@import url('https://api.fontshare.com/v2/css?f[]=${FONTSHARE_SLUGS_MAP[lower]}&display=swap');`
      );
    } else if (lower === 'monospace' || lower === 'serif' || lower === 'sans-serif' || lower === 'customuserfont') {
      continue;
    } else {
      const encoded = fam.replace(/\s+/g, '+');
      const weights = GOOGLE_WEIGHTS_MAP[lower] || 'wght@400;500;600;700';
      googleFamilies.push(`family=${encoded}:${weights}`);
    }
  }

  const lines: string[] = [];
  if (preservedImportUrl && !lines.includes(`@import url('${preservedImportUrl}');`)) {
    lines.push(`@import url('${preservedImportUrl}');`);
  }
  lines.push(...fontshareImports);
  if (googleFamilies.length > 0) {
    lines.push(`@import url('https://fonts.googleapis.com/css2?${googleFamilies.join('&')}&display=swap');`);
  }

  return lines.length > 0 ? lines.join('\n') + '\n\n' : '';
}

export interface GeneratedTokensResult {
  css: string;
  json: Record<string, any>;
  variables: TokenVariables;
}

export function generateTokens(options: GeneratorOptions): GeneratedTokensResult {
  const { archetype, feeling, radius, blur, projectName } = options;
  const jitter = calculateFolderHueJitter(projectName);

  let polarity: 'dark' | 'light' = 'dark';
  let baseHue = 250;
  let bgCanvasL = 0.12;
  let bgElevatedL = 0.18;
  let bgSunkenL = 0.09;
  let borderHairlineL = 0.28;
  let accentOklch = 'oklch(0.65 0.20 250)';
  let accentSubtle = 'oklch(0.65 0.20 250 / 0.15)';
  let accentHover = 'oklch(0.70 0.22 250)';
  let textPrimaryL = 0.96;
  let textMutedL = 0.68;
  let textSubtleL = 0.52;
  let fontDisplay = '"Geist", "Instrument Sans", sans-serif';
  let fontSans = '"Geist", "Instrument Sans", sans-serif';
  let fontMono = '"Geist Mono", "SF Mono", monospace';
  let modularRatio = 1.250;

  if (archetype === 'editorial-serif-paper') {
    polarity = 'light';
    baseHue = 75;
    bgCanvasL = 0.97;
    bgElevatedL = 0.99;
    bgSunkenL = 0.92;
    borderHairlineL = 0.85;
    accentOklch = 'oklch(0.48 0.18 25)';
    accentSubtle = 'oklch(0.48 0.18 25 / 0.12)';
    accentHover = 'oklch(0.42 0.20 25)';
    textPrimaryL = 0.20;
    textMutedL = 0.48;
    textSubtleL = 0.62;
    fontDisplay = '"Newsreader", Georgia, serif';
    fontSans = '"Work Sans", sans-serif';
    fontMono = '"Fragment Mono", monospace';
  } else if (archetype === 'neo-brutalism') {
    polarity = 'light';
    baseHue = 90;
    bgCanvasL = 0.97;
    bgElevatedL = 1.0;
    bgSunkenL = 0.90;
    borderHairlineL = 0.12;
    accentOklch = 'oklch(0.85 0.28 130)';
    accentSubtle = 'oklch(0.85 0.28 130 / 0.25)';
    accentHover = 'oklch(0.88 0.30 130)';
    textPrimaryL = 0.12;
    textMutedL = 0.38;
    textSubtleL = 0.50;
    fontDisplay = '"Space Grotesk", sans-serif';
    fontSans = '"Syne", sans-serif';
    fontMono = '"Space Mono", monospace';
    modularRatio = 1.333;
  } else if (archetype === 'swiss-typographic-grid') {
    polarity = 'light';
    baseHue = 260;
    bgCanvasL = 0.98;
    bgElevatedL = 1.0;
    bgSunkenL = 0.92;
    borderHairlineL = 0.12;
    accentOklch = 'oklch(0.55 0.22 25)';
    accentSubtle = 'oklch(0.55 0.22 25 / 0.12)';
    accentHover = 'oklch(0.50 0.24 25)';
    textPrimaryL = 0.12;
    textMutedL = 0.42;
    textSubtleL = 0.55;
    fontDisplay = '"Cabinet Grotesk", sans-serif';
    fontSans = '"Space Grotesk", sans-serif';
    fontMono = '"Space Mono", monospace';
  } else if (archetype === 'kinetic-industrial-mono') {
    polarity = 'dark';
    baseHue = 240;
    bgCanvasL = 0.10;
    bgElevatedL = 0.15;
    bgSunkenL = 0.07;
    borderHairlineL = 0.26;
    accentOklch = 'oklch(0.76 0.18 70)';
    accentSubtle = 'oklch(0.76 0.18 70 / 0.15)';
    accentHover = 'oklch(0.80 0.20 70)';
    textPrimaryL = 0.95;
    textMutedL = 0.68;
    textSubtleL = 0.48;
    fontDisplay = '"JetBrains Mono", monospace';
    fontSans = '"IBM Plex Sans", sans-serif';
    fontMono = '"JetBrains Mono", monospace';
    modularRatio = 1.200;
  } else if (archetype === 'bento-modular-system') {
    polarity = 'dark';
    baseHue = 255;
    bgCanvasL = 0.12;
    bgElevatedL = 0.17;
    bgSunkenL = 0.09;
    borderHairlineL = 0.28;
    accentOklch = 'oklch(0.64 0.22 255)';
    accentSubtle = 'oklch(0.64 0.22 255 / 0.15)';
    accentHover = 'oklch(0.68 0.24 255)';
    textPrimaryL = 0.96;
    textMutedL = 0.68;
    textSubtleL = 0.50;
    fontDisplay = '"Satoshi", sans-serif';
    fontSans = '"General Sans", sans-serif';
    fontMono = '"Geist Mono", monospace';
  } else if (archetype === 'spatial-glass-visionos') {
    polarity = 'dark';
    baseHue = 260;
    bgCanvasL = 0.10;
    bgElevatedL = 0.18;
    bgSunkenL = 0.08;
    borderHairlineL = 0.35;
    accentOklch = 'oklch(0.72 0.18 200)';
    accentSubtle = 'oklch(0.72 0.18 200 / 0.18)';
    accentHover = 'oklch(0.76 0.20 200)';
    textPrimaryL = 0.98;
    textMutedL = 0.72;
    textSubtleL = 0.54;
    fontDisplay = '"Outfit", sans-serif';
    fontSans = '"DM Sans", sans-serif';
    fontMono = '"Fragment Mono", monospace';
  } else if (archetype === 'quiet-luxury-atelier') {
    polarity = 'light';
    baseHue = 70;
    bgCanvasL = 0.97;
    bgElevatedL = 0.99;
    bgSunkenL = 0.92;
    borderHairlineL = 0.86;
    accentOklch = 'oklch(0.50 0.04 60)';
    accentSubtle = 'oklch(0.50 0.04 60 / 0.12)';
    accentHover = 'oklch(0.45 0.05 60)';
    textPrimaryL = 0.18;
    textMutedL = 0.46;
    textSubtleL = 0.60;
    fontDisplay = '"Cormorant Garamond", serif';
    fontSans = '"DM Sans", sans-serif';
    fontMono = '"Fragment Mono", monospace';
  } else if (archetype === 'warm-artisan-craft') {
    polarity = 'light';
    baseHue = 80;
    bgCanvasL = 0.96;
    bgElevatedL = 0.98;
    bgSunkenL = 0.90;
    borderHairlineL = 0.85;
    accentOklch = 'oklch(0.58 0.16 40)';
    accentSubtle = 'oklch(0.58 0.16 40 / 0.14)';
    accentHover = 'oklch(0.52 0.18 40)';
    textPrimaryL = 0.24;
    textMutedL = 0.50;
    textSubtleL = 0.62;
    fontDisplay = '"Fraunces", serif';
    fontSans = '"Cabinet Grotesk", sans-serif';
    fontMono = '"DM Mono", monospace';
  } else if (archetype === 'japanese-minimal-zen') {
    polarity = 'light';
    baseHue = 90;
    bgCanvasL = 0.97;
    bgElevatedL = 0.99;
    bgSunkenL = 0.91;
    borderHairlineL = 0.88;
    accentOklch = 'oklch(0.22 0.01 250)';
    accentSubtle = 'oklch(0.22 0.01 250 / 0.10)';
    accentHover = 'oklch(0.16 0.01 250)';
    textPrimaryL = 0.20;
    textMutedL = 0.48;
    textSubtleL = 0.62;
    fontDisplay = '"Noto Serif Display", serif';
    fontSans = '"Work Sans", sans-serif';
    fontMono = '"DM Mono", monospace';
  } else if (archetype === 'scandinavian-warm-minimal') {
    polarity = 'light';
    baseHue = 85;
    bgCanvasL = 0.97;
    bgElevatedL = 0.99;
    bgSunkenL = 0.91;
    borderHairlineL = 0.86;
    accentOklch = 'oklch(0.54 0.14 235)';
    accentSubtle = 'oklch(0.54 0.14 235 / 0.14)';
    accentHover = 'oklch(0.48 0.16 235)';
    textPrimaryL = 0.20;
    textMutedL = 0.48;
    textSubtleL = 0.60;
    fontDisplay = '"Familjen Grotesk", sans-serif';
    fontSans = '"DM Sans", sans-serif';
    fontMono = '"Fragment Mono", monospace';
  } else if (archetype === 'retro-tactile-analog') {
    polarity = 'dark';
    baseHue = 240;
    bgCanvasL = 0.20;
    bgElevatedL = 0.27;
    bgSunkenL = 0.14;
    borderHairlineL = 0.36;
    accentOklch = 'oklch(0.68 0.24 45)';
    accentSubtle = 'oklch(0.68 0.24 45 / 0.18)';
    accentHover = 'oklch(0.72 0.26 45)';
    textPrimaryL = 0.96;
    textMutedL = 0.72;
    textSubtleL = 0.55;
    fontDisplay = '"Space Mono", monospace';
    fontSans = '"Chivo", sans-serif';
    fontMono = '"Space Mono", monospace';
    modularRatio = 1.200;
  } else if (archetype === 'y2k-acid-cyber') {
    polarity = 'dark';
    baseHue = 290;
    bgCanvasL = 0.08;
    bgElevatedL = 0.14;
    bgSunkenL = 0.05;
    borderHairlineL = 0.30;
    accentOklch = 'oklch(0.88 0.28 135)';
    accentSubtle = 'oklch(0.88 0.28 135 / 0.20)';
    accentHover = 'oklch(0.92 0.30 135)';
    textPrimaryL = 0.98;
    textMutedL = 0.74;
    textSubtleL = 0.55;
    fontDisplay = '"Syne", sans-serif';
    fontSans = '"Chakra Petch", sans-serif';
    fontMono = '"Space Mono", monospace';
    modularRatio = 1.333;
  } else if (archetype === 'playful-clay-consumer') {
    polarity = 'light';
    baseHue = 280;
    bgCanvasL = 0.97;
    bgElevatedL = 0.99;
    bgSunkenL = 0.92;
    borderHairlineL = 0.88;
    accentOklch = 'oklch(0.66 0.22 295)';
    accentSubtle = 'oklch(0.66 0.22 295 / 0.15)';
    accentHover = 'oklch(0.70 0.24 295)';
    textPrimaryL = 0.20;
    textMutedL = 0.48;
    textSubtleL = 0.60;
    fontDisplay = '"Bricolage Grotesque", sans-serif';
    fontSans = '"Fredoka", sans-serif';
    fontMono = '"Space Mono", monospace';
  } else if (archetype === 'vaporwave-crt-terminal') {
    polarity = 'dark';
    baseHue = 290;
    bgCanvasL = 0.09;
    bgElevatedL = 0.14;
    bgSunkenL = 0.06;
    borderHairlineL = 0.28;
    accentOklch = 'oklch(0.78 0.18 200)';
    accentSubtle = 'oklch(0.78 0.18 200 / 0.15)';
    accentHover = 'oklch(0.82 0.20 200)';
    textPrimaryL = 0.96;
    textMutedL = 0.70;
    textSubtleL = 0.50;
    fontDisplay = '"VT323", monospace';
    fontSans = '"Fira Code", monospace';
    fontMono = '"Fira Code", monospace';
    modularRatio = 1.200;
  } else if (archetype === 'high-trust-fintech-clarity') {
    polarity = 'light';
    baseHue = 245;
    bgCanvasL = 0.98;
    bgElevatedL = 1.0;
    bgSunkenL = 0.93;
    borderHairlineL = 0.86;
    accentOklch = 'oklch(0.56 0.18 245)';
    accentSubtle = 'oklch(0.56 0.18 245 / 0.12)';
    accentHover = 'oklch(0.50 0.20 245)';
    textPrimaryL = 0.14;
    textMutedL = 0.44;
    textSubtleL = 0.58;
    fontDisplay = '"Sora", sans-serif';
    fontSans = '"Public Sans", sans-serif';
    fontMono = '"Fira Code", monospace';
  } else if (archetype === 'clinical-biotech-precision') {
    polarity = 'light';
    baseHue = 220;
    bgCanvasL = 0.98;
    bgElevatedL = 1.0;
    bgSunkenL = 0.92;
    borderHairlineL = 0.85;
    accentOklch = 'oklch(0.68 0.16 215)';
    accentSubtle = 'oklch(0.68 0.16 215 / 0.12)';
    accentHover = 'oklch(0.62 0.18 215)';
    textPrimaryL = 0.14;
    textMutedL = 0.42;
    textSubtleL = 0.56;
    fontDisplay = '"Instrument Sans", sans-serif';
    fontSans = '"Public Sans", sans-serif';
    fontMono = '"IBM Plex Mono", monospace';
  } else if (archetype === 'civic-govtech-accessible') {
    polarity = 'light';
    baseHue = 260;
    bgCanvasL = 0.99;
    bgElevatedL = 1.0;
    bgSunkenL = 0.92;
    borderHairlineL = 0.30;
    accentOklch = 'oklch(0.42 0.16 245)';
    accentSubtle = 'oklch(0.42 0.16 245 / 0.12)';
    accentHover = 'oklch(0.36 0.18 245)';
    textPrimaryL = 0.12;
    textMutedL = 0.38;
    textSubtleL = 0.50;
    fontDisplay = '"Atkinson Hyperlegible", sans-serif';
    fontSans = '"Public Sans", sans-serif';
    fontMono = '"Fragment Mono", monospace';
  }

  const effectiveHue = ((baseHue + jitter) % 360 + 360) % 360;

  // Apply WCAG contrast clamping
  const finalPrimaryL = clampLightnessForContrast(textPrimaryL, polarity, 'primary');
  const defaultSecondaryL = polarity === 'dark' ? 0.80 : 0.34;
  const finalSecondaryL = clampLightnessForContrast(defaultSecondaryL, polarity, 'secondary');
  const finalMutedL = clampLightnessForContrast(textMutedL, polarity, 'muted');

  // Radii mapping
  let rOuter = '6px';
  let rInner = '4px';
  let rBadge = '4px';
  if (radius === 'sharp') {
    rOuter = '0px'; rInner = '0px'; rBadge = '0px';
  } else if (radius === 'medium') {
    rOuter = '10px'; rInner = '6px'; rBadge = '6px';
  } else if (radius === 'high') {
    rOuter = '16px'; rInner = '10px'; rBadge = '8px';
  } else if (radius === 'pill') {
    rOuter = '9999px'; rInner = '9999px'; rBadge = '9999px';
  }

  // Blur mapping
  let surfaceBlur = '8px';
  if (blur === 'flat') surfaceBlur = '0px';
  else if (blur === 'deep-glass') surfaceBlur = '20px';

  // Motion mapping
  const feelingConfig = FEELING_VECTORS_MAP[feeling] || FEELING_VECTORS_MAP['urgent-precise'];
  const easePrimary = feelingConfig.ease;
  const easeSpring = feelingConfig.easeSpring;
  const durationFast = feelingConfig.durationFast;
  const durationNormal = feelingConfig.durationNormal;

  // Shadow surface calculation
  let shadowSurface = `0 1px 2px 0 oklch(0 0 0 / 0.45), 0 0 0 1px var(--border-hairline)`;
  let shadowElevated = `0 4px 12px 0 oklch(0 0 0 / 0.50), 0 0 0 1px var(--border-hairline)`;
  if (polarity === 'light' && archetype !== 'neo-brutalism') {
    shadowSurface = `0 1px 3px 0 oklch(0.20 0.012 50 / 0.06), 0 0 0 1px var(--border-hairline)`;
    shadowElevated = `0 6px 16px -2px oklch(0.20 0.012 50 / 0.08), 0 0 0 1px var(--border-hairline)`;
  } else if (archetype === 'neo-brutalism') {
    shadowSurface = `3px 3px 0px 0px oklch(0.12 0.005 260)`;
    shadowElevated = `6px 6px 0px 0px oklch(0.12 0.005 260)`;
  }

  // 3-Tier Font Hierarchy Resolution
  const pairings = ARCHETYPE_FONT_PAIRINGS[archetype] || ARCHETYPE_FONT_PAIRINGS['dark-obsidian-technical'];

  let chosenDisplay = pairings.A.display;
  let chosenSans = pairings.A.sans;
  let chosenMono = pairings.A.mono;

  // Priority 1: Preserved project fonts
  if (options.fontOverride?.source === 'preserved' && (options.fontMode === 'keep' || !options.fontMode)) {
    if (options.fontOverride.display) chosenDisplay = extractFontFamily(options.fontOverride.display);
    if (options.fontOverride.sans) chosenSans = extractFontFamily(options.fontOverride.sans);
    if (options.fontOverride.mono) chosenMono = extractFontFamily(options.fontOverride.mono);
  }
  // Priority 2: User custom selection / CLI flag
  else if (options.fontMode === 'B') {
    chosenDisplay = pairings.B.display;
    chosenSans = pairings.B.sans;
    chosenMono = pairings.B.mono;
  } else if (options.fontMode === 'C') {
    chosenDisplay = pairings.C.display;
    chosenSans = pairings.C.sans;
    chosenMono = pairings.C.mono;
  } else if (options.fontOverride) {
    if (options.fontOverride.display) chosenDisplay = extractFontFamily(options.fontOverride.display);
    if (options.fontOverride.sans) chosenSans = extractFontFamily(options.fontOverride.sans);
    if (options.fontOverride.mono) chosenMono = extractFontFamily(options.fontOverride.mono);
  }

  // Priority 2b: Custom direction prompt override (e.g. "use Fraunces")
  const directionFont = parseCustomDirectionFonts(options.customDirection);
  if (directionFont && options.fontMode !== 'keep') {
    if (directionFont.display) chosenDisplay = directionFont.display;
    if (directionFont.sans) chosenSans = directionFont.sans;
    if (directionFont.mono) chosenMono = directionFont.mono;
  }

  // Format with fallback stacks
  fontDisplay = formatFontStack(chosenDisplay, 'display');
  fontSans = formatFontStack(chosenSans, 'sans');
  fontMono = formatFontStack(chosenMono, 'mono');

  const variables: TokenVariables = {
    '--bg-canvas': `oklch(${bgCanvasL} 0.015 ${effectiveHue})`,
    '--bg-elevated': `oklch(${bgElevatedL} 0.015 ${effectiveHue})`,
    '--bg-surface-active': `oklch(${bgElevatedL + (polarity === 'dark' ? 0.04 : -0.04)} 0.018 ${effectiveHue})`,
    '--bg-glass': `oklch(${bgElevatedL} 0.015 ${effectiveHue} / 0.72)`,
    '--bg-sunken': `oklch(${bgSunkenL} 0.012 ${effectiveHue})`,
    '--text-primary': `oklch(${finalPrimaryL} 0.005 ${effectiveHue})`,
    '--text-secondary': `oklch(${finalSecondaryL} 0.010 ${effectiveHue})`,
    '--text-muted': `oklch(${finalMutedL} 0.015 ${effectiveHue})`,
    '--text-subtle': `oklch(${textSubtleL} 0.018 ${effectiveHue})`,
    '--text-inverse': polarity === 'dark' ? `oklch(0.12 0.015 ${effectiveHue})` : `oklch(0.98 0.005 ${effectiveHue})`,
    '--accent-primary': accentOklch,
    '--accent-subtle': accentSubtle,
    '--accent-hover': accentHover,
    '--border-hairline': polarity === 'dark' ? `oklch(1 0 0 / 0.07)` : `oklch(0 0 0 / 0.07)`,
    '--border-subtle': polarity === 'dark' ? `oklch(1 0 0 / 0.04)` : `oklch(0 0 0 / 0.04)`,
    '--border-focus': `oklch(0.65 0.20 ${effectiveHue} / 0.75)`,
    '--highlight-specular': polarity === 'dark' ? `oklch(1 0 0 / 0.18)` : `oklch(1 0 0 / 0.60)`,
    '--status-success': `oklch(0.72 0.16 145)`,
    '--status-warning': `oklch(0.78 0.14 75)`,
    '--status-danger': `oklch(0.65 0.22 25)`,
    '--status-info': `oklch(0.70 0.15 230)`,
    '--radius-outer': rOuter,
    '--radius-inner': rInner,
    '--radius-badge': rBadge,
    '--surface-blur': surfaceBlur,
    '--shadow-surface': shadowSurface,
    '--shadow-elevated': shadowElevated,
    '--section-py-tight': `clamp(2.5rem, 4vw, 4rem)`,
    '--section-py-normal': `clamp(4.5rem, 7vw, 6.5rem)`,
    '--section-py-breathing': `clamp(7rem, 12vw, 11rem)`,
    '--container-max': `1280px`,
    '--font-display': fontDisplay,
    '--font-sans': fontSans,
    '--font-mono': fontMono,
    '--text-xs': '0.8125rem',
    '--text-sm': '0.9375rem',
    '--text-base': '1.0625rem',
    '--text-lg': '1.25rem',
    '--text-xl': `${(1.25 * modularRatio).toFixed(3)}rem`,
    '--text-2xl': `${(1.25 * Math.pow(modularRatio, 2)).toFixed(3)}rem`,
    '--text-3xl': `${(1.25 * Math.pow(modularRatio, 3)).toFixed(3)}rem`,
    '--text-4xl': `${(1.25 * Math.pow(modularRatio, 4)).toFixed(3)}rem`,
    '--weight-heading': `600`,
    '--weight-body': `400`,
    '--weight-mono': `500`,
    '--ease-primary': easePrimary,
    '--ease-spring': easeSpring,
    '--duration-fast': durationFast,
    '--duration-normal': durationNormal,
  };

  const fontImports = buildFontImports(chosenDisplay, chosenSans, chosenMono, options.fontOverride?.importUrl);

  const css = `${fontImports}/* =============================================================================
   AGENT DESIGN SKILLS — TOKEN CONTRACT (v1.1)
   Archetype: ${archetype}
   Polarity: ${polarity}
   Feeling Vector: ${feeling}
   Jitter: ${jitter > 0 ? `+${jitter}` : jitter}° (Base Hue: ${baseHue})
   ============================================================================= */

:root {
  /* Surfaces & Backgrounds */
  --bg-canvas: ${variables['--bg-canvas']};
  --bg-elevated: ${variables['--bg-elevated']};
  --bg-surface-active: ${variables['--bg-surface-active']};
  --bg-glass: ${variables['--bg-glass']};
  --bg-sunken: ${variables['--bg-sunken']};

  /* Text & Foregrounds */
  --text-primary: ${variables['--text-primary']};
  --text-secondary: ${variables['--text-secondary']};
  --text-muted: ${variables['--text-muted']};
  --text-subtle: ${variables['--text-subtle']};
  --text-inverse: ${variables['--text-inverse']};

  /* Accents, Borders & Highlights */
  --accent-primary: ${variables['--accent-primary']};
  --accent-subtle: ${variables['--accent-subtle']};
  --accent-hover: ${variables['--accent-hover']};
  --border-hairline: ${variables['--border-hairline']};
  --border-subtle: ${variables['--border-subtle']};
  --border-focus: ${variables['--border-focus']};
  --highlight-specular: ${variables['--highlight-specular']};

  /* Status Tokens */
  --status-success: ${variables['--status-success']};
  --status-warning: ${variables['--status-warning']};
  --status-danger: ${variables['--status-danger']};
  --status-info: ${variables['--status-info']};

  /* Geometry & Depth (Concentric Scale) */
  --radius-outer: ${variables['--radius-outer']};
  --radius-inner: ${variables['--radius-inner']};
  --radius-badge: ${variables['--radius-badge']};
  --surface-blur: ${variables['--surface-blur']};
  --shadow-surface: ${variables['--shadow-surface']};
  --shadow-elevated: ${variables['--shadow-elevated']};

  /* 3-Step Vertical Section Rhythm & Container */
  --section-py-tight: ${variables['--section-py-tight']};
  --section-py-normal: ${variables['--section-py-normal']};
  --section-py-breathing: ${variables['--section-py-breathing']};
  --container-max: ${variables['--container-max']};

  /* Typography Scale */
  --font-display: ${variables['--font-display']};
  --font-sans: ${variables['--font-sans']};
  --font-mono: ${variables['--font-mono']};
  --text-xs: ${variables['--text-xs']};
  --text-sm: ${variables['--text-sm']};
  --text-base: ${variables['--text-base']};
  --text-lg: ${variables['--text-lg']};
  --text-xl: ${variables['--text-xl']};
  --text-2xl: ${variables['--text-2xl']};
  --text-3xl: ${variables['--text-3xl']};
  --text-4xl: ${variables['--text-4xl']};
  --weight-heading: ${variables['--weight-heading']};
  --weight-body: ${variables['--weight-body']};
  --weight-mono: ${variables['--weight-mono']};

  /* Motion Vector */
  --ease-primary: ${variables['--ease-primary']};
  --ease-spring: ${variables['--ease-spring']};
  --duration-fast: ${variables['--duration-fast']};
  --duration-normal: ${variables['--duration-normal']};
}

/* =============================================================================
   DUAL-POLARITY THEME OVERRIDES (Calibrated Light & Dark)
   ============================================================================= */

[data-theme="light"], .light {
  --bg-canvas: oklch(0.97 0.015 ${effectiveHue});
  --bg-elevated: oklch(0.99 0.015 ${effectiveHue});
  --bg-surface-active: oklch(0.95 0.018 ${effectiveHue});
  --bg-glass: oklch(0.99 0.015 ${effectiveHue} / 0.72);
  --bg-sunken: oklch(0.92 0.012 ${effectiveHue});
  --text-primary: oklch(0.15 0.015 ${effectiveHue});
  --text-secondary: oklch(0.34 0.015 ${effectiveHue});
  --text-muted: oklch(0.44 0.015 ${effectiveHue});
  --text-subtle: oklch(0.55 0.018 ${effectiveHue});
  --text-inverse: oklch(0.98 0.005 ${effectiveHue});
  --border-hairline: oklch(0 0 0 / 0.07);
  --border-subtle: oklch(0 0 0 / 0.04);
  --highlight-specular: oklch(1 0 0 / 0.60);
  --shadow-surface: 0 1px 3px 0 oklch(0.20 0.012 50 / 0.06), 0 0 0 1px var(--border-hairline);
  --shadow-elevated: 0 6px 16px -2px oklch(0.20 0.012 50 / 0.08), 0 0 0 1px var(--border-hairline);
}

[data-theme="dark"], .dark {
  --bg-canvas: oklch(0.12 0.015 ${effectiveHue});
  --bg-elevated: oklch(0.18 0.015 ${effectiveHue});
  --bg-surface-active: oklch(0.22 0.018 ${effectiveHue});
  --bg-glass: oklch(0.18 0.015 ${effectiveHue} / 0.72);
  --bg-sunken: oklch(0.09 0.012 ${effectiveHue});
  --text-primary: oklch(0.97 0.005 ${effectiveHue});
  --text-secondary: oklch(0.80 0.010 ${effectiveHue});
  --text-muted: oklch(0.68 0.015 ${effectiveHue});
  --text-subtle: oklch(0.52 0.018 ${effectiveHue});
  --text-inverse: oklch(0.12 0.015 ${effectiveHue});
  --border-hairline: oklch(1 0 0 / 0.07);
  --border-subtle: oklch(1 0 0 / 0.04);
  --highlight-specular: oklch(1 0 0 / 0.18);
  --shadow-surface: 0 1px 2px 0 oklch(0 0 0 / 0.45), 0 0 0 1px var(--border-hairline);
  --shadow-elevated: 0 4px 12px 0 oklch(0 0 0 / 0.50), 0 0 0 1px var(--border-hairline);
}

/* =============================================================================
   BASE CANONICAL STYLES & ERGONOMIC LAWS
   ============================================================================= */

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  background-color: var(--bg-canvas);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--weight-body);
  line-height: 1.5;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Functional application workspaces: headings use --font-sans for dense clarity */
h1, h2, h3, h4 {
  font-family: var(--font-sans);
  font-weight: var(--weight-heading);
}

/* Numeric & Tabular Typography Law (Clean open-oval zeros, zero horizontal jitter) */
.tabular-nums, time, [data-numeric="true"], table, [data-tabular="true"] {
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;
}

/* Prevent Tailwind text-xs/text-sm from shrinking text into unreadable micro-print */
.text-xs {
  font-size: 0.8125rem !important; /* 13px absolute minimum floor */
  line-height: 1.35 !important;
}

.text-sm {
  font-size: 0.9375rem !important; /* 15px comfortable sub-label */
  line-height: 1.45 !important;
}

/* Motion & Physics Classes */
.view-transition {
  animation: ads-view-enter var(--duration-normal) var(--ease-primary) both;
}

@keyframes ads-view-enter {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spring-interactive {
  transition: transform var(--duration-fast) var(--ease-spring, var(--ease-primary));
}

.spring-interactive:active {
  transform: scale(0.96);
}

/* Tactile Card Hover & Tap Physics */
.glass-panel, .surface-card, [data-interactive-card="true"] {
  transition: transform var(--duration-fast) var(--ease-spring, var(--ease-primary)), border-color var(--duration-fast) var(--ease-primary), box-shadow var(--duration-fast) var(--ease-primary);
}

.glass-panel:hover, .surface-card:hover, [data-interactive-card="true"]:hover {
  transform: translateY(-2px) scale(1.008);
  border-color: var(--highlight-specular);
}

.glass-panel:active, .surface-card:active, [data-interactive-card="true"]:active {
  transform: scale(0.99);
}

/* Focus visibility reset adhering to technical hairline styling */
:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 1px;
}
`;

  const json = {
    version: '1.1.0',
    archetype,
    polarity,
    feeling,
    folderJitter: jitter,
    variables
  };

  return { css, json, variables };
}

