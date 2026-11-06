import { ArchetypeId } from './types.js';

export interface ArchetypePromptOption {
  value: ArchetypeId;
  label: string;
  hint: string;
}

/**
 * Standardized 4-part hint pattern:
 * [Light/Dark] · [Primary Font Pair] · [Default Accent] · [Signature Visual Device]
 */
export const ARCHETYPE_OPTIONS: ArchetypePromptOption[] = [
  {
    value: 'dark-obsidian-linear',
    label: 'Dark Obsidian Linear (Modern SaaS Studio)',
    hint: 'Dark · Geist + Instrument Sans · Electric Indigo · Crisp 1px borders & subtle glass'
  },
  {
    value: 'consumer-retail-studio',
    label: 'Consumer Retail & E-Commerce Studio',
    hint: 'Light · Oswald + Plus Jakarta Sans · Stark Monochrome · Borderless #F5F5F7 studio tiles'
  },
  {
    value: 'data-dense-observability',
    label: 'Data-Dense Analytics & Observability',
    hint: 'Dark · JetBrains Mono + IBM Plex Sans · Telemetry Cyan · High-density metrics & tabular grids'
  },
  {
    value: 'atmospheric-aurora-launch',
    label: 'Atmospheric Aurora & Product Launch',
    hint: 'Dark · Cabinet Grotesk + Satoshi · Luminous Aurora · Specular glass & spotlight meshes'
  },
  {
    value: 'editorial-serif-paper',
    label: 'Editorial Serif Paper',
    hint: 'Light · Newsreader + Work Sans · Warm Terracotta · High-contrast broadsheet editorial craft'
  },
  {
    value: 'neo-brutalist-studio',
    label: 'Neo-Brutalist Studio',
    hint: 'Light · Space Grotesk + Syne · Acid Lime · Hard 2px black borders & offset drop shadows'
  },
  {
    value: 'swiss-typographic-grid',
    label: 'Swiss Typographic Grid',
    hint: 'Light · Cabinet Grotesk + Space Grotesk · International Orange · Mathematical exposed 1px grid hairlines'
  },
  {
    value: 'kinetic-industrial-mono',
    label: 'Kinetic Industrial Mono',
    hint: 'Dark · JetBrains Mono + IBM Plex Sans · Amber Glow · High-velocity tabular monospace telemetry'
  },
  {
    value: 'bento-modular-system',
    label: 'Bento Modular System',
    hint: 'Dark · Satoshi + General Sans · Cobalt Pulse · Structured asymmetric 12-col bento cells'
  },
  {
    value: 'spatial-glass-visionos',
    label: 'Spatial Glass VisionOS',
    hint: 'Dark · Outfit + DM Sans · Cyan Specular · Translucent optical blur & 1px rim highlights'
  },
  {
    value: 'quiet-luxury-atelier',
    label: 'Quiet Luxury Atelier',
    hint: 'Light · Cormorant Garamond + DM Sans · Champagne Gold · Whisper-quiet ivory paper & haute couture restraint'
  },
  {
    value: 'warm-artisan-craft',
    label: 'Warm Artisan Craft',
    hint: 'Light · Fraunces + Cabinet Grotesk · Terracotta Clay · Earthy raw linen canvas & tactile bevels'
  },
  {
    value: 'japanese-minimal-zen',
    label: 'Japanese Minimal Zen',
    hint: 'Light · Noto Serif Display + Work Sans · Sumi Charcoal · Tranquil Ma negative space & washi mist paper'
  },
  {
    value: 'scandinavian-warm-minimal',
    label: 'Scandinavian Warm Minimal',
    hint: 'Light · Familjen Grotesk + DM Sans · Nordic Spruce · Soft birch/oat canvas & functional humanism'
  },
  {
    value: 'retro-tactile-analog',
    label: 'Retro Tactile Analog',
    hint: 'Dark · Space Mono + Chivo · Matte Industrial · Keycap tactile bevels & mechanical clicky toggles'
  },
  {
    value: 'y2k-acid-cyber',
    label: 'Y2K Acid Cyber',
    hint: 'Dark · Syne + Chakra Petch · Neon Chartreuse · Chrome wireframes & millennium cyber energy'
  },
  {
    value: 'playful-clay-consumer',
    label: 'Playful Clay Consumer',
    hint: 'Light · Bricolage Grotesque + Fredoka · Lavender Joy · Soft marshmallow surfaces & puffy clay pill corners'
  },
  {
    value: 'vaporwave-crt-terminal',
    label: 'Vaporwave CRT Terminal',
    hint: 'Dark · VT323 + Fira Code · Phosphor Cyan · 1980s scanline overlays & terminal nostalgia'
  },
  {
    value: 'high-trust-fintech-clarity',
    label: 'High-Trust Fintech Clarity',
    hint: 'Light · Sora + Public Sans · Institution Navy · Institutional clarity & calm financial certainty'
  },
  {
    value: 'clinical-biotech-precision',
    label: 'Clinical Biotech Precision',
    hint: 'Light · Instrument Sans + Public Sans · Cold Clinical Cyan · Sterile lab-grade contrast & forensic data tables'
  },
  {
    value: 'civic-govtech-accessible',
    label: 'Civic Govtech Accessible',
    hint: 'Light · Atkinson Hyperlegible + Public Sans · Sovereign Blue · WCAG AAA 10:1 ultra-accessible public clarity'
  }
];

