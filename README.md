# agent-design-skills (v4.2)

> **Eliminate AI UI Slop.** Enforce cross-page geometric unity, copy honesty, and iteration discipline across AI coding agents.

[![Version](https://img.shields.io/badge/version-4.2.0-blue.svg)](https://github.com/agent-design-skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Zero-Slop Certified](https://img.shields.io/badge/Anti--Slop-Enforced-indigo.svg)](evals/rubric.md)

---

## The AI UI Convergence Crisis

Left to their own devices, LLMs generate virtually indistinguishable user interfaces:
- **The Same Purple-to-Blue Gradients:** `linear-gradient(135deg, #6366f1, #a855f7)` plastered onto every call-to-action.
- **The Same 3 Equal-Width KPI Cards:** Three identical boxes across the top (`250K / sec`, `< 48 ms`, `SOC2 Compliant`), confusing landing-page marketing claims with functional workspace consoles.
- **The Same Font Monoculture:** Every AI defaults to `Inter`, `Roboto`, or `Plus Jakarta Sans`, erasing brand personality.
- **Low-Contrast Grey Text:** `oklch(0.5 0 0)` or `#6b7280` that fails WCAG accessibility on dark canvas backgrounds.
- **Cross-Page Styling Drift:** Generating Page 2 after Page 1 causes the agent to hallucinate new corner radiuses, new button paddings, and new colors, destroying UI coherence.
- **Speculative Feature Creep:** Agents routinely inject unprompted dark mode toggles, notification bells with fake unread badges, and search bars when not requested.

`agent-design-skills` solves this by injecting an **enforceable design governance layer** directly into your AI agent's prompt pipeline, pairing a **compressed (<1,500 token) Always-On Core Rule** with **deep on-demand architectural references**, token-wired starter kits, and a static analysis linter.

---

## Architectural Highlights (v4.2)

### 1. Two-Tier Context Routing
- **Tier 1 (Always-On Core Rule):** Under 1,500 tokens. Loaded on every single inference pass. Enforces the Anti-Slop Firewall, 5 mandatory UI states, sentence case casing, concentric corner math, and the active design token contract.
- **Tier 2 (On-Demand Deep Skills):** In modular mode, deep architectural modules (`00-contract-governance.md` through `06-component-recipes.md`) and the selected archetype specification are placed in `.agent/skills/design-system/references/` (or Cursor `.mdc` topic rules) and dynamically invoked only when needed.

### 2. Smart Non-Destructive `DESIGN.md` Merge
Re-running the CLI compiler never wipes out your ongoing work:
- **Sections 0–4** (Creative Direction, Token Manifest, Archetype DNA, Voice, State Budgets) are refreshed to reflect newly compiled configurations.
- **Sections 5–8** (`Component Inventory`, `Active Revision Passes`, `Intentional Local Exceptions`, and `Polish Backlog`) are **cleanly preserved** from your existing `DESIGN.md`.

### 3. Strict Scope Lock
The Always-On Core Rule forbids agents from adding unrequested UI clutter. No speculative notification bells, no decorative status dots, no fake compliance claims, and no unprompted dark mode toggles.

### 4. Mathematical Geometric Unity
- **Concentric Corner Math:** Outer and inner borders strictly observe:
  $$\text{Radius}_{\text{inner}} = \max(0\text{px}, \text{Radius}_{\text{outer}} - \text{Padding})$$
- **3-Step Vertical Section Rhythm:** Standardized clamp values (`--section-py-tight`, `--section-py-normal`, `--section-py-breathing`) eliminate arbitrary margin guessing.
- **True OKLCH Color Space:** Fully accessible surfaces with verified contrast ($\ge 7:1$ AAA for primary text, $\ge 4.5:1$ AA for muted text).

---

## Quickstart

### Interactive Setup Wizard
Run in any project root:
```bash
npx agent-design-skills
```
The interactive wizard guides you through selecting:
1. Target AI Agent platform (Antigravity, Cursor, Claude Code, Windsurf, Generic Web)
2. Frontend Framework (Tailwind CSS v4, Plain CSS / HTML, CSS Modules)
3. Archetype feeling or family (18 canonical archetypes)
4. Primary font pairing (curated with zero `Inter`/`Roboto` defaults)
5. Context mode (`modular` multi-file skill or `single` compiled rule)

### Express `--fast` Mode
Scaffold a complete, production-ready workspace in seconds with pre-baked starter kits:
```bash
# Dashboard / Data Console
npx agent-design-skills --fast --starter dashboard

# High-Conversion Landing Page
npx agent-design-skills --fast --starter landing-waitlist

# Mobile App Interface
npx agent-design-skills --fast --starter mobile-app

# Complex Data & Analytics Tool
npx agent-design-skills --fast --starter data-tool
```

---

## CLI Command Reference

### `init`
Compile and scaffold the design governance layer.
```bash
npx agent-design-skills init [options]
```
| Flag | Description | Options |
| :--- | :--- | :--- |
| `-a, --agent <type>` | Target AI agent platform | `antigravity`, `cursor`, `claude`, `windsurf`, `generic` |
| `-f, --framework <type>` | CSS/styling framework | `tailwind-v4`, `plain-css`, `raw-html` |
| `-t, --archetype <id>` | Canonical archetype ID | Any of the 18 archetype IDs |
| `-s, --starter <id>` | Pre-baked starter kit | `dashboard`, `landing-waitlist`, `mobile-app`, `data-tool` |
| `--fast` | Express mode using starter defaults | — |
| `--mode <type>` | Architecture context mode | `modular` (Tier 1 + Tier 2), `single` (combined) |
| `-y, --yes` | Skip prompts and accept defaults | — |

### `lint`
Run static analysis on your project templates and HTML/CSS to catch AI slop and token violations before committing or merging.
```bash
npx agent-design-skills lint [path]
```
Checks performed:
- [x] Zero raw hex codes (`#111827`, `#6366f1`) or inline `oklch(...)` literals in templates
- [x] Zero prohibited purple-to-blue linear gradients
- [x] Zero 3-equal-card KPI rows in workspace views
- [x] Zero static marketing/compliance claims in application consoles
- [x] Zero decorative pill chips on section headers
- [x] Zero fake colored status dots in footers
- [x] Enforcement of sentence case casing on buttons and headings
- [x] Concentric corner radius mathematical alignment

### `freeze` & `unfreeze`
Lock your design contract to protect against model hallucinations during long coding sessions:
```bash
# Lock the brief against unsolicited modifications
npx agent-design-skills freeze

# Unlock the brief for active redesign passes
npx agent-design-skills unfreeze
```

---

## The 18 Canonical Archetypes

All archetypes feature de-converged font pairings (zero `Inter`, `Roboto`, or `Plus Jakarta Sans`) and hand-tuned OKLCH palettes:

### Family A: Technical & Precision
| Archetype ID | Theme | Key Fonts | Aesthetic Profile |
| :--- | :--- | :--- | :--- |
| `dark-obsidian-technical` | Dark | Geist / Geist Mono | Sub-hairline borders, specular highlights, dense data tables |
| `swiss-typographic-grid` | Light | Cabinet Grotesk / Space Grotesk | Pure 12-col mathematical grid, exposed 1px borders, zero radius |
| `kinetic-industrial-mono` | Dark | JetBrains Mono / IBM Plex Sans | High-density telemetry, amber accents, tabular data readouts |
| `bento-modular-system` | Adaptive | Satoshi / General Sans | Asymmetric 12-col bento cells, subtle inner borders, clean cards |
| `spatial-glass-visionos` | Dark | Outfit / DM Sans | Translucent optical blur, specular rim lighting, floating layers |

### Family B: Editorial, Luxury & Organic
| Archetype ID | Theme | Key Fonts | Aesthetic Profile |
| :--- | :--- | :--- | :--- |
| `editorial-warm-serif` | Light/Warm | Fraunces / Newsreader / Plus Sans | Rich literary rhythm, warm alabaster canvas, refined serif titles |
| `quiet-luxury-atelier` | Light/Warm | Cormorant Garamond / Instrument Serif | Extreme whitespace, champagne neutral surfaces, ultra-minimal |
| `warm-artisan-craft` | Light/Earthy | Fraunces / Cabinet Grotesk | Terracotta & sage accents, linen texture, warm organic clay tones |
| `japanese-minimal-zen` | Light/Mist | Noto Serif / Work Sans | Ma negative space, quiet asymmetric balance, washi mist surfaces |
| `scandinavian-warm-minimal`| Light | Familjen Grotesk / Source Serif 4 | Oat/birch canvas, soft rounded edges, understated spruce accents |

### Family C: Expressive, Tactile & Neo-Retro
| Archetype ID | Theme | Key Fonts | Aesthetic Profile |
| :--- | :--- | :--- | :--- |
| `neo-brutalist-clean` | Light/Punchy | Syne / Space Grotesk | High-contrast 2px ink borders, unblurred offset drop shadows |
| `retro-tactile-analog` | Adaptive | Space Mono / DM Sans | Physical bevels, recessed display slots, Teenage Engineering vibe |
| `y2k-acid-cyber` | Dark | VT323 / Syne Mono | Pitch black canvas, electric chartreuse accents, raw 1px neon borders |
| `playful-clay-consumer` | Light | Bricolage Grotesque / Plus Sans | Tactile dual-layer shadows, friendly rounded pills, warm microcopy |
| `vaporwave-crt-terminal` | Dark | VT323 / Fira Code | Deep indigo void, phosphorescent cyan & magenta, scanline overlay |

### Family D: Domain-Specialized
| Archetype ID | Theme | Key Fonts | Aesthetic Profile |
| :--- | :--- | :--- | :--- |
| `high-trust-fintech-clarity`| Light | Sora / Public Sans | High-contrast enterprise navy canvas, tabular numbers, clear variance |
| `clinical-biotech-precision`| Light | Geist / Space Mono | Sterile lab white, cold cyan indicators, dense multi-well telemetry |
| `civic-govtech-accessible` | Light | Atkinson Hyperlegible / DM Sans | Ultra-accessible AAA contrast, 3px visible focus rings, clear forms |

---

## The 4 Pre-Baked Starter Kits

Each starter kit provides a self-contained, token-wired HTML/CSS template implementing all 5 mandatory UI states, realistic edge case data, and 100% linter compliance:

1. **Dashboard (`registry/starter-kits/dashboard/`):** High-density workspace shell with asymmetric summary strip, real batch variance calculations, and edge-case table data.
2. **Landing Waitlist (`registry/starter-kits/landing-waitlist/`):** Conversion-focused page with hero value proposition, honest copy, and social validation with zero marketing slop.
3. **Mobile App (`registry/starter-kits/mobile-app/`):** Mobile-first responsive container, bottom navigation bar, tactile card interactions, and instant empty/skeleton states.
4. **Data Tool (`registry/starter-kits/data-tool/`):** Analytical workbench featuring multi-facet filter bars, dense telemetry readouts, inspect drawers, and inline error banners.

---

## Anti-Slop Firewall: Core Rules Summary

| Banned AI Pattern | Permitted Solution |
| :--- | :--- |
| **3 Equal-Width KPI Cards** | Inline horizontal summary strip with `1px` vertical dividers or asymmetric 2-pane split. |
| **Static Marketing Badges in Apps** | Move compliance claims (`SOC2`, `ISO 27001`) to landing pages. Only show real live operational status. |
| **Decorative Header Pill Tags** | Tag badges are reserved for record states in data tables (`Settled`, `Pending`), never header flair. |
| **Decorative Status Dots** | Green/amber dots are banned in footers unless wired to a real, user-toggleable connection state. |
| **Purple/Blue Linear Gradients** | Solid semantic accent tokens (`var(--accent-primary)`) with specular hairline borders. |
| **Arbitrary Nested Radiuses** | Strict concentric radius formula: `inner = max(0px, outer - padding)`. |
| **Capitalized Title Case UI** | Strict sentence case on all headings, buttons, and badges (`Create new invoice`, not `Create New Invoice`). |
| **Low-Contrast Grey Text** | `--text-primary` must exceed $\ge 7:1$ (AAA); `--text-muted` must exceed $\ge 4.5:1$ (AA). |

---

## Cross-Agent Compatibility

`agent-design-skills` generates native configuration structures for all leading AI development tools:

- **Google Antigravity:** `.agent/rules/design-core.md` + `.agent/skills/design-system/SKILL.md` (and references).
- **Cursor:** `.cursor/rules/00-design-core.mdc` (`alwaysApply: true`) + task-scoped `.mdc` topic rules.
- **Claude Code:** Project-level instructions generated into `CLAUDE.md`.
- **Windsurf:** Rules emitted directly into `.windsurfrules`.
- **Web Builders (Bolt, v0, Lovable):** Unified `DESIGN-PROMPT.md` for copy-paste injection.

---

## Empirical Benchmark Evaluation (`evals/`)

The repository includes a rigorous 11-prompt evaluation suite and automated grading rubric:
- **`evals/prompts.json`:** 11 empirical benchmark prompts covering complex multi-currency ledgers, genomic PCR assays, Swiss architectural studio monographs, XR spatial viewers, and a dedicated **"Page 2 after Page 1"** cross-page continuity test.
- **`evals/rubric.md`:** 4 automated pass/fail gates and 40-point qualitative scoring matrix for Anti-Slop, Cross-Page Unity, Copy Honesty, and State Completeness.

---

## License

MIT © Google Antigravity & the `agent-design-skills` contributors.

