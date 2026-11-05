import { GeneratorOptions, TokenVariables, ArchetypeId, RadiusScaleId, BlurScaleId, FeelingVectorId } from './types.js';

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
  target: 'primary' | 'muted'
): number {
  if (polarity === 'dark') {
    if (target === 'primary') {
      // Must maintain >= 7:1 against dark canvas (L ~ 0.12)
      return Math.max(0.95, lightness);
    } else {
      // Must maintain >= 4.5:1 against dark elevated (L ~ 0.18)
      return Math.max(0.66, lightness);
    }
  } else {
    if (target === 'primary') {
      // Must maintain >= 7:1 against light canvas (L ~ 0.97)
      return Math.min(0.20, lightness);
    } else {
      // Must maintain >= 4.5:1 against light elevated (L ~ 0.99)
      return Math.min(0.48, lightness);
    }
  }
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
    fontSans = '"Source Serif 4", Georgia, serif';
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
    fontSans = '"Instrument Serif", serif';
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
    fontSans = '"Source Serif 4", serif';
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
  let easePrimary = 'cubic-bezier(0.16, 1, 0.3, 1)';
  let durationFast = '110ms';
  let durationNormal = '180ms';
  if (feeling === 'calm') {
    easePrimary = 'cubic-bezier(0.25, 1, 0.5, 1)';
    durationFast = '140ms';
    durationNormal = '240ms';
  } else if (feeling === 'playful-tactile') {
    easePrimary = 'cubic-bezier(0, 0, 0.2, 1)';
    durationFast = '80ms';
    durationNormal = '150ms';
  } else if (feeling === 'authoritative') {
    easePrimary = 'cubic-bezier(0.2, 0, 0, 1)';
    durationFast = '120ms';
    durationNormal = '200ms';
  }

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

  const variables: TokenVariables = {
    '--bg-canvas': `oklch(${bgCanvasL} 0.015 ${effectiveHue})`,
    '--bg-elevated': `oklch(${bgElevatedL} 0.015 ${effectiveHue})`,
    '--bg-surface-active': `oklch(${bgElevatedL + (polarity === 'dark' ? 0.04 : -0.04)} 0.018 ${effectiveHue})`,
    '--bg-glass': `oklch(${bgElevatedL} 0.015 ${effectiveHue} / 0.72)`,
    '--bg-sunken': `oklch(${bgSunkenL} 0.012 ${effectiveHue})`,
    '--text-primary': `oklch(${finalPrimaryL} 0.005 ${effectiveHue})`,
    '--text-muted': `oklch(${finalMutedL} 0.015 ${effectiveHue})`,
    '--text-subtle': `oklch(${textSubtleL} 0.018 ${effectiveHue})`,
    '--text-inverse': polarity === 'dark' ? `oklch(0.12 0.015 ${effectiveHue})` : `oklch(0.98 0.005 ${effectiveHue})`,
    '--accent-primary': accentOklch,
    '--accent-subtle': accentSubtle,
    '--accent-hover': accentHover,
    '--border-hairline': `oklch(${borderHairlineL} 0.015 ${effectiveHue})`,
    '--border-subtle': `oklch(${borderHairlineL - (polarity === 'dark' ? 0.06 : -0.05)} 0.012 ${effectiveHue})`,
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
    '--text-xs': `${(0.64).toFixed(3)}rem`,
    '--text-sm': `${(0.80).toFixed(3)}rem`,
    '--text-base': `1.000rem`,
    '--text-lg': `${(modularRatio).toFixed(3)}rem`,
    '--text-xl': `${(Math.pow(modularRatio, 2)).toFixed(3)}rem`,
    '--text-2xl': `${(Math.pow(modularRatio, 3)).toFixed(3)}rem`,
    '--text-3xl': `${(Math.pow(modularRatio, 4)).toFixed(3)}rem`,
    '--text-4xl': `${(Math.pow(modularRatio, 5)).toFixed(3)}rem`,
    '--weight-heading': `600`,
    '--weight-body': `400`,
    '--weight-mono': `500`,
    '--ease-primary': easePrimary,
    '--duration-fast': durationFast,
    '--duration-normal': durationNormal,
  };

  const css = `/* =============================================================================
   AGENT DESIGN SKILLS — TOKEN CONTRACT (v4.2)
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
  --duration-fast: ${variables['--duration-fast']};
  --duration-normal: ${variables['--duration-normal']};
}

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

.font-tabular,
table,
[data-tabular="true"] {
  font-variant-numeric: tabular-nums;
}

:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 1px;
}
`;

  const json = {
    version: '4.2.0',
    archetype,
    polarity,
    feeling,
    folderJitter: jitter,
    variables
  };

  return { css, json, variables };
}

