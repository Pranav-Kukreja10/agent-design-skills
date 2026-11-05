export type AgentType = 'antigravity' | 'cursor' | 'claude-codex' | 'web-builders';

export type ArchetypeId =
  | 'dark-obsidian-technical'
  | 'editorial-serif-paper'
  | 'neo-brutalism'
  | 'swiss-typographic-grid'
  | 'kinetic-industrial-mono'
  | 'bento-modular-system'
  | 'spatial-glass-visionos'
  | 'quiet-luxury-atelier'
  | 'warm-artisan-craft'
  | 'japanese-minimal-zen'
  | 'scandinavian-warm-minimal'
  | 'retro-tactile-analog'
  | 'y2k-acid-cyber'
  | 'playful-clay-consumer'
  | 'vaporwave-crt-terminal'
  | 'high-trust-fintech-clarity'
  | 'clinical-biotech-precision'
  | 'civic-govtech-accessible';

export type FeelingVectorId = 'calm' | 'urgent-precise' | 'playful-tactile' | 'authoritative';

export type RadiusScaleId = 'sharp' | 'subtle' | 'medium' | 'high' | 'pill';

export type BlurScaleId = 'flat' | 'subtle-frost' | 'deep-glass';

export type StarterKitId = 'dashboard' | 'landing-waitlist' | 'mobile-app' | 'data-tool';

export type InstallMode = 'modular' | 'single';

export interface FontDefinition {
  name: string;
  provider: 'google' | 'fontshare';
  package: string;
}

export interface FontPairing {
  id: string;
  name: string;
  display: FontDefinition;
  sans: FontDefinition;
  mono: FontDefinition;
}

export interface AccentPalette {
  id: string;
  name: string;
  primary: string;
  subtle: string;
  hover: string;
}

export interface FeelingVectorConfig {
  id: FeelingVectorId;
  name: string;
  ease: string;
  easeSpring?: string;
  durationFast: string;
  durationNormal: string;
  description: string;
}

export interface RadiusScaleConfig {
  radiusOuter: string;
  radiusInner: string;
  radiusBadge: string;
}

export type FontSelectionMode = 'A' | 'B' | 'C' | 'keep' | 'custom';

export interface FontOverrideConfig {
  display?: string;
  sans?: string;
  mono?: string;
  importUrl?: string;
  source?: 'preserved' | 'user' | 'custom' | 'package.json';
}

export interface GeneratorOptions {
  projectName: string;
  targetDir: string;
  agents: AgentType[];
  archetype: ArchetypeId;
  feeling: FeelingVectorId;
  radius: RadiusScaleId;
  blur: BlurScaleId;
  fontPairingId?: string;
  fontMode?: FontSelectionMode;
  fontOverride?: FontOverrideConfig;
  accentPaletteId?: string;
  customDirection?: string;
  productBrief?: string;
  mode?: InstallMode;
  starterKit?: StarterKitId;
  fast?: boolean;
}

export interface TokenVariables {
  // Surfaces
  '--bg-canvas': string;
  '--bg-elevated': string;
  '--bg-surface-active': string;
  '--bg-glass': string;
  '--bg-sunken': string;
  // Foregrounds
  '--text-primary': string;
  '--text-muted': string;
  '--text-subtle': string;
  '--text-inverse': string;
  // Accents & Borders
  '--accent-primary': string;
  '--accent-subtle': string;
  '--accent-hover': string;
  '--border-hairline': string;
  '--border-subtle': string;
  '--border-focus': string;
  '--highlight-specular': string;
  // Status
  '--status-success': string;
  '--status-warning': string;
  '--status-danger': string;
  '--status-info': string;
  // Geometry & Depth
  '--radius-outer': string;
  '--radius-inner': string;
  '--radius-badge': string;
  '--surface-blur': string;
  '--shadow-surface': string;
  '--shadow-elevated': string;
  // Rhythm
  '--section-py-tight': string;
  '--section-py-normal': string;
  '--section-py-breathing': string;
  '--container-max': string;
  // Typography
  '--font-display': string;
  '--font-sans': string;
  '--font-mono': string;
  '--text-xs': string;
  '--text-sm': string;
  '--text-base': string;
  '--text-lg': string;
  '--text-xl': string;
  '--text-2xl': string;
  '--text-3xl': string;
  '--text-4xl': string;
  '--weight-heading': string;
  '--weight-body': string;
  '--weight-mono': string;
  // Motion
  '--ease-primary': string;
  '--ease-spring'?: string;
  '--duration-fast': string;
  '--duration-normal': string;
}

export interface LintViolation {
  file: string;
  rule: string;
  line: number;
  snippet: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface FreezeManifest {
  version: string;
  generatedAt: string;
  hashes: Record<string, string>;
}

