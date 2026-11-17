# agent-design-skills

> **Eliminate AI UI Slop.** A zero-LLM design system compiler, multi-agent governance generator, and static UI linter that enforces human-crafted frontend aesthetics across AI coding agents.

[![npm version](https://img.shields.io/npm/v/agent-design-skills.svg?color=indigo)](https://www.npmjs.com/package/agent-design-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-blue.svg)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Status-Production--Ready-blueviolet.svg)](#)

---

## What It Is

`agent-design-skills` is a developer tool and design governance compiler for modern frontend teams collaborating with AI coding agents (**Google Antigravity**, **Cursor**, **Claude Code**, **OpenAI Codex**, and **Web Builders** like Lovable, v0, Bolt, and Stitch).

With one terminal command, it compiles a complete design token contract (`tokens.css` and `tokens.json`), generates agent-specific rule and reference architectures, unpacks production starter blueprints (`starter-preview.html`), and enforces strict UI ergonomics through a zero-LLM static linter.

Visit us: https://agent-design-skills.vercel.app

---

## Why It Exists: The Problem It Solves

When developers prompt AI coding models (Gemini 2.5/3, Claude 3.5/3.7, GPT-4o, o3) to build frontends, the models commit predictable, pervasive aesthetic and ergonomic flaws:
- **Unreadable Micro-Text & Dim Gray Copy:** AI models default to `10px–11px` font sizes and low-contrast dim zinc (`text-zinc-500`, `opacity-40`, or washed-out muted grays) that fail WCAG readability on dark or light canvases.
- **Generic "Box-in-a-Box" Nesting:** Placing cards inside cards inside cards, trapping content in multiple visible border lines and suffocating whitespace.
- **Decorative Dot & Badge Slop:** Slapping small green/amber circle dots (`w-2 h-2 rounded-full`) next to every word, inventing fake version chips (`[PRO v2.4]`, `[BETA]`), and roleplaying hardware telemetry (`SUB-10MS`, `60 FPS`).
- **Corner Badges on Media & Art:** Sticking absolute-positioned floating stickers (`• PLAYING`, `NEW`, `HOT`, `BESTSELLER`, `HD 1080P`) onto the corners of album art, video thumbnails, and product photography.
- **Broken Mobile Navigation & Hover Traps:** Designing desktop hover-dependent drop-downs that vanish on touch screens, or floating bottom buttons that slice into mobile content without safe-area clearance.
- **Cross-Page Aesthetic Drift:** When asked to build a second page, the agent hallucinates new border radii, arbitrary hex colors, new font stacks, and conflicting layouts.

### Solved at Three Levels

Markdown prompt instructions alone fail because LLMs get lazy, suffer attention decay, or prioritize generic training priors. `agent-design-skills` solves this through a **3-tier defense-in-depth architecture**:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Browser-Level CSS Guardrails (tokens.css)                           │
│    13px font floors, automatic anti-dimming overrides, :focus-within  │
│    resets, open-oval tabular numerals, deterministic contrast flipping │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Two-Tier Agent Context Architecture                                  │
│    • Tier 1: Compressed Always-On Core Rule (<1,500 tokens)            │
│    • Tier 2: Deep On-Demand Skills & Living Starter Blueprint          │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Deterministic Static Linting (npx agent-design-skills lint)         │
│    Zero-LLM regex static analysis & SHA-256 hash freeze verification   │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Browser-Level CSS Enforcement (`tokens.css`):** Even if an agent writes `text-[10px]` or `text-zinc-500`, `tokens.css` deterministically clamps font sizes to a readable `13px` floor and boosts gray classes to high-contrast WCAG-compliant tokens directly in the DOM.
2. **Two-Tier Agent Context Architecture:** Agents receive a tight, compressed Tier 1 rule loaded on every inference pass, backed by deep on-demand reference skills and a living starter preview (`starter-preview.html`) that agents inspect for proven component markup before writing new views.
3. **Deterministic Static Linting (`npx agent-design-skills lint`):** Fast, zero-LLM static analysis that scans markup and styling for hardcoded colors, AI tropes, fake telemetry, unreadable micro-text, and broken token contracts before code reaches production.

---

## Core Features

### 1. Multi-Agent Governance in a Single Run
`agent-design-skills` inspects your workspace and generates native rule files for all active coding agents simultaneously:
- **Google Antigravity:** `.agent/rules/design-core.md` (Always-On Core Rule) + `.agent/skills/design-system/SKILL.md` with deep reference modules in `.agent/skills/design-system/references/`.
- **Cursor:** `.cursor/rules/00-design-core.mdc` (Always-On Rule) + `.cursor/rules/` topic rules.
- **Claude Code:** Project-level `CLAUDE.md` design governance instructions.
- **OpenAI Codex:** Clean workspace `AGENTS.md` instruction file.
- **Web Builders:** `WEB_BUILDER_PROMPT.md` designed for pasting into Lovable, v0, Bolt, and Stitch.

### 2. Deterministic OKLCH Token Compiler (`tokens.css` & `tokens.json`)
- **Automatic WCAG Contrast Floors:** Computes mathematically guaranteed contrast for `--text-primary`, `--text-secondary`, and `--text-muted` in both Dark and Light modes (never dimmer than `oklch(0.75)` in dark mode, never lighter than `oklch(0.40)` in light mode).
- **`shadcn/ui` & Tailwind Variable Compatibility:** Ships with built-in semantic aliases for standard UI component libraries (`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--primary`, `--muted`, `--border`, `--input`, `--ring`, `--radius`) mapped seamlessly across `:root`, `[data-theme="light"]`, and `[data-theme="dark"]`.
- **Dynamic `--accent-foreground` Calculation:** Evaluates accent lightness: if $L \ge 0.70$ (e.g., acid lime, electric chartreuse, light neutral), text flips to dark ink `oklch(0.12 0.01 H)`; otherwise, it uses crisp white `oklch(0.98 0.005 H)`.
- **Automated Webfont `@import` Generation:** Generates optimized font imports for **Google Fonts** and **Fontshare** (`Satoshi`, `Cabinet Grotesk`, `General Sans`, `Clash Display`, `Clash Grotesk`, `Switzer`, `Ranade`, `Zodiak`, `Sentient`, `Bespoke Serif`), or cleanly binds custom font overrides.
- **Anti-Dimming Overrides:** Emits CSS rules that remap low-contrast Tailwind classes (`text-zinc-500`, `text-slate-500`, `text-neutral-500`, `opacity-40`, `opacity-50`) to high-contrast semantic tokens (`var(--text-secondary)` / `var(--text-muted)`).
- **Composite `<input>` Focus Reset:** Inner `input`, `textarea`, and `select` elements use `outline: none` so composite fields delegate focus outlines and border highlights cleanly to their outer rounded container via `:focus-within`.
- **Open-Oval Tabular Numerals:** Configures `font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1, "zero" 0;` so numerical figures align with zero horizontal jitter and without unrequested slashed zeros (`0̸`).
- **Tactile Motion Physics:** Provides collision-free `.spring-interactive` and button active press states with zero unnatural bounce or lingering oscillations.

### 3. The 3-Tier Priority Hierarchy ("User Always in the Driver's Seat")
Every rule, dial, and blueprint strictly obeys a 3-tier hierarchy:
1. **Priority #1 (Highest) — User's Live Chat Prompt:** If you ask for a specific layout, color, badge, font, or component in chat, the agent executes it 100% faithfully with zero pushback.
2. **Priority #2 — User's Custom Creative Direction (Section 0 of `DESIGN.md`):** Custom project-level directives override default archetype aesthetics or tone.
3. **Priority #3 (Fallback Only) — Archetype Defaults & Domain Blueprints:** Governs **only where the user prompt is silent or vague** (e.g., "build an audio player"), providing high-craft structure without guessing arbitrary layouts.

### 4. Fallback Domain Blueprints & Calibration Dials
When a prompt is brief, agents rely on 4 domain fallback blueprints (with the mandatory rule: *if the user specifies custom sections, ALWAYS use the user's structure instead*):
- **E-Commerce & Retail Studio:** Asymmetric product hero with split gallery, sticky add-to-bag bar, curated single-row collection (<= 4 items), sticky mobile checkout dock.
- **Media & Music Player / Streaming:** Edge-to-edge canvas with artwork focal point, fixed bottom player dock with scrubber & centered play trigger, asymmetric playlist split pane, centered artwork overlay (no corner pills).
- **SaaS Workspace & Analytics Dashboard:** Clean command/filter bar, asymmetric 2-pane metric/activity split (never 3 equal cards), high-density data grid with right-aligned tabular numerals, empty state handoff.
- **Product Launch & Waitlist / Editorial:** Balanced display headline on open canvas, minimalist single-field waitlist dock, asymmetric feature reveal with breathing room, zero ungrounded marketing claims.
- **Calibration Dials (1–10 scale):** Generates `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY` to govern rhythm and density quantitatively.
- **Mobile `100dvh` Viewport Law:** Mandates `min-h-[100dvh]` / `100dvh` for heroes and app shells, eliminating the mobile URL bar jump caused by raw `100vh`.

### 5. Non-Destructive Redesign Law
When asked to redesign or modernize existing applications:
- **100% Business Logic Preservation:** All existing React/Vue/Svelte state hooks (`useState`, `useEffect`, `useQuery`), data fetching logic, API routes, event handlers, and form validation schemas remain 100% intact.
- **In-Place Reskinning:** Audits existing DOM elements, swapping hardcoded hex values, generic grays (`bg-gray-100`), and nested card boxes for semantic `tokens.css` variables without breaking component hierarchy.

### Anti-Drift: Tier 1 Invariants
Agents obey rules on turn 1, then forget them by turn 10. To fight attention decay, generated rules include a short **Tier 1** block (8 non-negotiable invariants: tokens only, one look site-wide, zero dots, zero unrequested badges, no box-in-box, no decorative color/backgrounds, no unrequested elements, readable text) that is:
- placed at the **top and bottom** of the always-on rule (primacy + recency),
- also written as its own tiny always-on file (`.agent/rules/design-tier1.md`, `.cursor/rules/00-design-tier1.mdc`),
- paired with a **Re-Anchor Protocol** (re-open `tokens.css` and a sibling page every UI turn so new pages copy the existing shell),
- and a **Pre-Send Self-Audit** that makes the agent scan its own diff and end UI replies with a `Tier-1 audit:` line.

The user's live prompt always outranks these defaults.

### 6. Visual Restraint & Anti-Slop Firewall
Enforces permanent engineering laws documented in `registry/core/02-anti-slop-firewall.md`:
- **Open-Canvas Layout Discipline:** Ban on "box-in-a-box" card nesting. Workspaces use borderless rows divided by subtle 1px hairlines (`var(--border-hairline)`) or open canvas structures.
- **Strict Dot & Bullet Discipline:** Banning decorative colored dot elements (`w-2 h-2 rounded-full`, static or animated) and prefix bullet characters (`•`, `●`, `▪`) on labels and status badges. Status is communicated through clean typography or text color alone.
- **Clean Media & Artwork Law:** Banning floating corner badges, tags, and promotional pills (`• PLAYING`, `NOW PLAYING`, `NEW`, `HOT`, `BESTSELLER`, `HD 1080P`) overlaid on album art, video thumbnails, and product photography.
- **Ban on Unrequested Keyboard Shortcuts (`⌘K`, `Ctrl+K`, `(⌘K)`):** Banning fake keyboard shortcut chips (`⌘K`, `Ctrl+K`, `(⌘K)`, `<kbd>` elements) inside search bars, inputs, headers, or navbars unless explicitly requested with functional keydown handlers.
- **Zero Fake Telemetry Cosplay:** Strict ban on invented version badges (`[PRO v2.4]`, `[BETA]`), fake hardware readouts (`SUB-10MS`, `60 FPS`), and Unix `EPOCH` stamps.
- **Sample Data Asset Uniqueness:** Flagging duplicated mock image URLs to ensure every sample record features a distinct visual asset.

### 7. Mobile-First & Adaptive-Hybrid Ergonomics
- **Fixed Bottom Dock Navigation:** On `<768px` viewports, navigation automatically collapses into a fixed bottom dock (`position: fixed; bottom: 0; left: 0; right: 0; z-index: 20`).
- **Safe Scroll Clearance:** Content containers reserve `padding-bottom: calc(5.5rem + env(safe-area-inset-bottom))` so lists and interactive rows are never clipped or trapped beneath floating bottom bars.
- **Touch-Friendly Targets:** All buttons, filter pills, and interactive list rows observe a `>=44px` minimum touch target.

### 8. Zero-LLM Static Linter (`lint`) & Hash Lock (`freeze` / `unfreeze`)
- **Fast Static Analysis:** Evaluates project code against token and anti-slop rules in milliseconds without calling LLM APIs.
- **SHA-256 Token Lock:** `npx agent-design-skills freeze` computes cryptographic checksums across design tokens and governance rules into `.design-skills.lock`. Any unauthorized tampering or agent hallucination causes `lint` to immediately fail until `unfreeze` is explicitly run.

---

## Quick Start & CLI Commands

### 1. Interactive Setup Wizard
Run in any project directory to launch the interactive prompt:
```bash
npx agent-design-skills@latest
```
*or explicitly:*
```bash
npx agent-design-skills init
```

The CLI will:
1. Detect active coding agents in your workspace.
2. Prompt for your preferred **Design Archetype** (with standardized 4-part visual hints).
3. Select a **Starter Kit** (`dashboard`, `landing-waitlist`, `mobile-app`, `data-tool`, or `none`).
4. Select a **Font Pairing** (Pairing A, B, C, keep existing, or custom font input).
5. Choose geometric corner radius scale (`sharp`, `subtle`, `medium`, `high`, `pill`) and surface blur.
6. Compile all tokens, preview blueprints, and agent rule files.

### 2. Express Mode (`--fast`)
Scaffold complete design governance with production defaults (`dark-obsidian-linear`, dashboard starter kit, Antigravity) in under 2 seconds:
```bash
npx agent-design-skills --fast
```

With specific starter kits:
```bash
npx agent-design-skills --fast -s mobile-app
npx agent-design-skills --fast -s landing-waitlist
npx agent-design-skills --fast -s data-tool
```

### 3. Static UI Linter (`lint`)
Scan your project files (`.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.css`) for token leaks, raw hex colors, AI tropes, and micro-text:
```bash
npx agent-design-skills lint
```
Scan a specific subdirectory:
```bash
npx agent-design-skills lint ./src
```

### 4. Lock & Unlock Design Tokens (`freeze` / `unfreeze`)
Protect your compiled tokens and agent rules against model drift during long coding sessions:
```bash
# Lock all tokens and rules with SHA-256 signatures (.design-skills.lock)
npx agent-design-skills freeze

# Unlock files for intentional design updates
npx agent-design-skills unfreeze
```

### CLI Options Table

| Flag | Description | Options / Example |
| :--- | :--- | :--- |
| `-a, --agents <agents>` | Target agent platforms (comma-separated or `all`) | `antigravity`, `cursor`, `claude-codex`, `web-builders`, `all` |
| `-f, --fast` | Fast express mode with sensible defaults | — |
| `-t, --archetype <id>` | Canonical archetype ID | `dark-obsidian-linear`, `consumer-retail-studio`, etc. |
| `-s, --starter-kit <kit>` | Pre-baked starter blueprint | `dashboard`, `landing-waitlist`, `mobile-app`, `data-tool`, `none` |
| `-m, --mode <mode>` | Context structure mode | `modular` (default) or `single` |
| `-F, --fonts <mode>` | Font selection mode or custom fonts | `A`, `B`, `C`, `keep`, or `"Display,Sans,Mono"` |
| `-d, --dir <dir>` | Target output directory (default: `.`) | `-d ./my-app` |
| `-y, --yes` | Accept defaults without interactive prompts | — |

---

## The 21 Canonical Archetypes

Every archetype is configured with de-converged font pairings, hand-tuned OKLCH surface neutral tints, WCAG contrast tiers, and distinct physical devices:

### Family A: Modern SaaS, Developer & Observability (Dark-Mode Precision)

| Archetype ID | Polarity | Key Fonts (Pairing A) | Default Accent | Signature Device |
| :--- | :--- | :--- | :--- | :--- |
| `dark-obsidian-linear` | Dark | Geist + Instrument Sans | Electric Indigo | Crisp 1px borders & subtle glass elevation |
| `data-dense-observability` | Dark | JetBrains Mono + IBM Plex Sans | Telemetry Cyan | High-density metrics & tabular grids |
| `atmospheric-aurora-launch` | Dark | Cabinet Grotesk + Satoshi | Luminous Aurora | Specular glass & spotlight meshes |
| `kinetic-industrial-mono` | Dark | JetBrains Mono + IBM Plex Sans | Amber Glow | High-velocity tabular monospace telemetry |
| `bento-modular-system` | Dark | Satoshi + General Sans | Cobalt Pulse | Structured asymmetric 12-col bento cells |
| `spatial-glass-visionos` | Dark | Outfit + DM Sans | Cyan Specular | Translucent optical blur & 1px rim highlights |

### Family B: Consumer, Retail & Expressive Studio

| Archetype ID | Polarity | Key Fonts (Pairing A) | Default Accent | Signature Device |
| :--- | :--- | :--- | :--- | :--- |
| `consumer-retail-studio` | Light | Oswald + Plus Jakarta Sans | Stark Monochrome | Borderless `#f5f5f7` studio product tiles |
| `neo-brutalist-studio` | Light | Space Grotesk + Syne | Acid Lime | Hard 2px black borders & offset drop shadows |
| `retro-tactile-analog` | Dark | Space Mono + Chivo | Matte Industrial | Keycap tactile bevels & mechanical clicky toggles |
| `y2k-acid-cyber` | Dark | Syne + Chakra Petch | Neon Chartreuse | Chrome wireframes & millennium cyber energy |
| `playful-clay-consumer` | Light | Bricolage Grotesque + Fredoka | Lavender Joy | Soft marshmallow surfaces & puffy clay pill corners |
| `vaporwave-crt-terminal` | Dark | VT323 + Fira Code | Phosphor Cyan | 1980s scanline overlays & terminal nostalgia |

### Family C: Editorial, Artisan & Minimalist (Light-Mode Craft & Luxury)

| Archetype ID | Polarity | Key Fonts (Pairing A) | Default Accent | Signature Device |
| :--- | :--- | :--- | :--- | :--- |
| `editorial-serif-paper` | Light | Newsreader + Work Sans | Warm Terracotta | High-contrast broadsheet editorial craft |
| `quiet-luxury-atelier` | Light | Cormorant Garamond + DM Sans | Champagne Gold | Whisper-quiet ivory paper & haute couture restraint |
| `warm-artisan-craft` | Light | Fraunces + Cabinet Grotesk | Terracotta Clay | Earthy raw linen canvas & tactile bevels |
| `japanese-minimal-zen` | Light | Noto Serif Display + Work Sans | Sumi Charcoal | Tranquil Ma negative space & washi mist paper |
| `scandinavian-warm-minimal`| Light | Familjen Grotesk + DM Sans | Nordic Spruce | Soft birch/oat canvas & functional humanism |
| `swiss-typographic-grid` | Light | Cabinet Grotesk + Space Grotesk | International Orange | Mathematical exposed 1px grid hairlines |

### Family D: Institutional, High-Trust & Accessible

| Archetype ID | Polarity | Key Fonts (Pairing A) | Default Accent | Signature Device |
| :--- | :--- | :--- | :--- | :--- |
| `high-trust-fintech-clarity`| Light | Sora + Public Sans | Institution Navy | Institutional clarity & calm financial certainty |
| `clinical-biotech-precision`| Light | Instrument Sans + Public Sans | Cold Clinical Cyan | Sterile lab-grade contrast & forensic data tables |
| `civic-govtech-accessible` | Light | Atkinson Hyperlegible + Public Sans | Sovereign Blue | WCAG AAA 10:1 ultra-accessible public clarity |

*(Note: Backwards-compatible aliases `dark-obsidian-technical` and `neo-brutalism` are automatically supported).*

---

## The 4 Starter Kits

When initializing, select a domain-neutral, token-bound starter kit to give your AI agent an exact architectural reference:

1. **`dashboard` (Workspace & Analytics Dashboard):** Desktop navigation rail switching to a fixed 4-tab mobile dock on `<768px`, top bar with composite search and primary action, asymmetric 2-column primary card + recent activity list (no 3-card KPI row slop), and a clean data table with row selection and slide-over inspector.
2. **`mobile-app` (Mobile-First Application):** Centered 430px frame on desktop with device border, top app bar with composite search, hero featured card with pill CTA, touch-scrolling filter track, 4 interactive list rows (`>=52px` touch targets), fixed bottom dock (`Home`, `Explore`, `Saved`, `Profile`), and bottom sheet modal.
3. **`landing-waitlist` (Product Launch & Waitlist):** Sticky single-row navbar, high-impact display headline, crisp `17px` secondary lead paragraph, composite email input + pill submit button (`:focus-within`), and an asymmetric 2-column product showcase below the fold.
4. **`data-tool` (Data Explorer & Workbench):** Top command toolbar, composite query input bar, status filter tabs, split-pane layout with a high-density tabular records table on the left and a live sticky JSON inspector workbench on the right.

---

## Generated File Tree & How It Works

Scaffolding with default settings produces the following clean directory structure:

```
my-project/
├── tokens.css                                 # Browser-level token contract & anti-slop CSS guardrails
├── tokens.json                                # Machine-readable tokens for build tools and style dictionaries
├── DESIGN.md                                  # Human-readable design specification & state budgets
├── starter-preview.html                       # Living architectural HTML blueprint (agent inspection reference)
├── .agent/                                    # Generated for Google Antigravity
│   ├── rules/
│   │   └── design-core.md                     # Always-On Core Rule (<1,500 tokens)
│   └── skills/
│       └── design-system/
│           ├── SKILL.md                       # Skill declaration & tool metadata
│           └── references/                    # Tier 2 on-demand deep architectural references
│               ├── 00-workflow-and-scope.md
│               ├── 01-override-protocol.md
│               ├── 02-anti-slop-firewall.md
│               ├── 03-cross-page-unity.md
│               ├── 04-ux-and-ergonomics.md
│               ├── 05-voice-and-copy.md
│               ├── 06-iteration-discipline.md
│               └── archetype.md               # Active archetype design DNA & palette
├── .cursor/                                   # Generated for Cursor (when selected)
│   └── rules/
│       └── 00-design-core.mdc
├── CLAUDE.md                                  # Generated for Claude Code (when selected)
└── AGENTS.md                                  # Generated for OpenAI Codex (when selected)
```

### Non-Destructive `DESIGN.md` Merge
Re-running `npx agent-design-skills` to change an archetype, tweak radius, or switch fonts **never wipes out your ongoing work**:
- **Sections 0 through 4** (Creative Direction, DNA, Voice, Token Contract, Viewport Budgets) are refreshed to reflect your new configuration.
- **Sections 5 through 8** (`Component Inventory`, `Active Revision Passes`, `Intentional Local Exceptions`, and `Polish Backlog`) are **cleanly preserved** from your existing `DESIGN.md`.

---

## Static Linter Rules Summary

`npx agent-design-skills lint` verifies code against the following rules:

| Rule Name | Severity | What It Checks |
| :--- | :--- | :--- |
| `freeze/hash-integrity` | `error` | Verifies files match SHA-256 signatures in `.design-skills.lock` |
| `tokens/no-hardcoded-color-radius` | `error` | Flags raw hex colors (`#111827`, `#6366f1`) or raw color functions (`rgb()`, `hsl()`, `oklch()`) outside `tokens.css` without `@design-exception` |
| `slop/no-animate-ping` | `error` | Flags attention-seeking `animate-ping` radar loops |
| `slop/no-ai-gradient` | `error` | Flags purple/pink/cyan AI mesh gradients |
| `copy/banned-phrases-and-leakage` | `error` | Flags cliché marketing copy (`ai-powered`, `supercharge`, `one-click`, `magical`, `say goodbye to`) and numbered slash eyebrows (`01 / ...`) |
| `slop/no-decorative-badges` | `error` | Flags decorative badge/pill/chip elements placed inside `<header>` or `<nav>` |
| `slop/no-fake-telemetry-cosplay` | `error` | Flags fake version badges (`[PRO v2.4]`, `[BETA]`) or hardware telemetry (`60 FPS`, `SUB-10MS`, `EPOCH`) |
| `slop/no-image-corner-badges` | `error` | Flags floating corner status pills overlaid on images/cards (`• PLAYING`, `NOW PLAYING`, `HD 1080P`, `BESTSELLER`, `HOT SALE`, etc.) |
| `slop/no-unprompted-cmd-k` | `error` | Flags unprompted keyboard shortcut badges (`⌘K`, `(⌘K)`, `Ctrl+K`, `<kbd>`) inside inputs or headers |
| `tokens/no-raw-palette-classes` | `error` | Flags ad-hoc Tailwind palette classes (`bg-blue-500`, `text-emerald-400`, `border-rose-200`) that bypass `tokens.css` and cause cross-page drift |
| `slop/no-decorative-dots` | `error` | Flags decorative small circle elements (`w-2 h-2 rounded-full`, inline `width: 6px/8px; height: 6px/8px; border-radius: 50%`) and prefix bullets (`•`, `●`, `▪`) on labels/badges |
| `data/no-duplicate-image-urls` | `warning` | Flags identical image asset URLs copy-pasted across multiple distinct sample records |
| `slop/no-slashed-zero` | `error` | Flags slashed-zero typography (`slashed-zero`, `"zero" 1`) instead of open-oval zeros (`"zero" 0`) |
| `a11y/no-micro-text` | `error` | Flags font sizes below `13px` (`text-[10px]`, `font-size: 11px`) or low-contrast dim text classes (`text-zinc-500`, `opacity-40`) |
| `slop/no-emoji-icons` | `error` | Flags emoji characters (🚀, 💡, 🔥, ✨) used as UI icons |
| `slop/excessive-uppercase-labels` | `warning` | Flags excessive uppercase tracking micro-labels (> 3 occurrences per file) |

*To intentionally bypass a rule for a verified brand signature or custom widget, annotate the line with `/* @design-exception: [reason] */`.*

---

## Author & License

- **Author:** Pranav Kukreja
- **License:** [MIT](LICENSE)
