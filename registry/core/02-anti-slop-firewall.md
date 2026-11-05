# Core Module 02: Anti-Slop Firewall & Aesthetic Sanity

**Version:** 4.2  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

---

## 1. Visual Slop Quarantine

Generative models produce predictable UI clichés that compromise professional credibility. This firewall enforces an absolute ban on AI design slop.

### Banned Aesthetic Tropes

| Cliché Category | Prohibited Pattern | Required Alternative |
|---|---|---|
| **Mesh Gradients** | Purple/pink/cyan radial glows behind cards, headers, or buttons | Solid neutral surfaces (`var(--bg-canvas)`, `var(--bg-elevated)`) with 1px hairlines (`var(--border-hairline)`) |
| **Glowing Outlines** | Neon borders with `box-shadow: 0 0 15px rgba(120, 0, 255, 0.5)` | Crisp 1px borders (`var(--border-hairline)`) with specular top highlights (`var(--highlight-specular)`) |
| **Floating Badges** | Pill chips containing `"✨ AI-Powered"`, `"⚡ Supercharged"`, or `"Magic"` | Informative technical status pills referencing actual system state (e.g., `MERKLE LOG VERIFIED`) |
| **Fabricated Metrics** | Stat cards showing random `+24.8% from last month` with green arrows | Domain-grounded figures derived from Verified Facts in `{{DESIGN_DOC_PATH}}` |
| **3-Equal-Card Rows** | 3 identical-width stat/KPI cards placed in a row across a workspace | Compact inline horizontal metric strip with 1px vertical dividers (`var(--border-hairline)`) or asymmetric 2-pane split |
| **Marketing in App UI** | Static compliance badges (SOC2/ISO) or marketing throughput claims inside active console workspaces | Operational workspace data only (real batch volumes, pending counts, active deltas); reserve marketing claims for landing/onboarding |
| **Numbered & Decorative Eyebrows**| Numbered slash labels (`01 / ...`, `02 / ...`) or decorative pills placed above `<h1>` titles | Banned: never put numbered prefixes or category flair above headings; reserve badges strictly for record status in data views |
| **Fake Status Dots** | Green/amber/red static colored dots in headers or footers as decorative accents | Colored status dots (static or animated) are banned unless wired to a real, user-toggleable connection state |
| **Emoji Icons** | Using emojis (🚀, 💡, 🔥, ✨, 🧠, ⚡) inside buttons, cards, or titles | Crisp inline SVGs or clean monospaced characters from `var(--font-mono)` |
| **Floating Orbs** | Blurred colored circles floating in the background without layout purpose | Grounded, structured architectural grid surfaces aligned to `--container-max` |

---

## 2. Animation & Motion Sanity

- **Zero `animate-ping`:** Never use expanding pinging radar rings on avatars, indicators, or status badges.
- **Zero Infinite Loops:** Animations must terminate within the standard motion duration (`var(--duration-fast)` or `var(--duration-normal)`). Never introduce infinite breathing or spinning unless indicating an active, uncompleted background task (`aria-busy="true"`).
- **Zero Bouncy Overshoots:** For technical, fintech, and developer-tool archetypes, motion must use precise cubic-beziers (`var(--ease-primary)`) that snap cleanly into final coordinates without elastic bounce or playful spring oscillations.

---

## 3. Section 0 Anti-Drift Protection

A prompt requesting a "modern look" or "sleek aesthetic" is **never** a license to breach this firewall. All aesthetic adjustments must flow through:
1. Defined tokens in `{{TOKENS_PATH}}`
2. Strict architectural discipline recorded in `{{DESIGN_DOC_PATH}}`

If the user explicitly requests an aesthetic that conflicts with basic legibility or contrast, prompt them using the Divergence Protocol in `01-override-protocol.md`.

