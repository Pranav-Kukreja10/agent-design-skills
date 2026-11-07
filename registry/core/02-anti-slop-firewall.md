# Core Module 02: Anti-Slop Firewall & Aesthetic Sanity

**Version:** 1.0  
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
| **Card & Header Badges** | Pill badges, status chips, or uppercase tag boxes inside app headers, navbars, hero sections, or card headers (e.g., `PRO v2.4`, `STABLE`, `SUB-10MS`, `60 FPS`) | Cards must use plain text headings or no header at all. Tags/badges are ONLY permitted inside repeating data table cells or list rows to indicate item-level record status (strictly max 1 badge per row) |
| **Media & Image Corner Badges** | Floating `position: absolute` top-left or top-right status pills, tier tags, or promo badges on images/videos/art/products (e.g., `• PLAYING`, `NOW PLAYING`, `HD 1080P`, `4K HDR`, `LIVE`, `NEW`, `BESTSELLER`, `FEATURED`, `HOT`, `IN STOCK`) | Keep media completely uncluttered. For active playback, use a single centered play/pause icon overlay or a quiet row indicator—never a corner text pill. For product/content metadata, render clean plain text (`var(--text-secondary)`) below the image alongside title/price. Only permitted overlay: quiet bottom-right duration timestamp (`3:51`) or single subtle top-right hover icon |
| **Nested Bordered Cards (Box-in-a-Box)** | Nesting smaller bordered cards inside a bordered card container (e.g., sub-cards trapped inside a parent card) | Choose ONE container level: Grouped panel with borderless rows divided ONLY by a quiet 1px line (`border-bottom: 1px solid var(--border-hairline)`), or open canvas grid. Unbox hero elements directly onto canvas |
| **Empty-Space Panic Widgets** | Inventing fake progress bars, format tags, or telemetry to fill empty vertical space | Allow asymmetrical columns and breathing whitespace (`align-items: start`). Whitespace is a luxury feature, never a bug to fill with widgets |
| **Fake Brand & Telemetry Cosplay** | Inventing fake brand names, fake tier badges (`[PRO v2.4]`, `[BETA]`), fake hardware telemetry (`60 FPS`, `SUB-10MS`), and unrequested Unix `EPOCH` readouts | Focused, professional software copy designed by domain experts without sci-fi roleplay or hardware cosplay |
| **Slashed-Zero Numbers** | Monospace coding fonts with slashed zeros (`0̸`) on hero numbers, counters, or KPI figures | `var(--font-display)` or `var(--font-sans)` with `font-variant-numeric: tabular-nums lining-nums; font-feature-settings: 'tnum' 1, 'lnum' 1, 'zero' 0;` for clean open-oval zeros (`0`) |
| **Fabricated Metrics** | Stat cards showing random `+24.8% from last month` with green arrows | Domain-grounded figures derived from Verified Facts in `{{DESIGN_DOC_PATH}}` |
| **3-Equal-Card Rows** | 3 identical-width stat/KPI cards placed in a row across a workspace | Compact inline horizontal metric strip with 1px vertical dividers (`var(--border-hairline)`) or asymmetric 2-pane split |
| **Marketing in App UI** | Static compliance badges (SOC2/ISO) or marketing throughput claims inside active console workspaces | Operational workspace data only (real batch volumes, pending counts, active deltas); reserve marketing claims for landing/onboarding |
| **Numbered & Decorative Eyebrows**| Numbered slash labels (`01 / ...`, `02 / ...`) or decorative pills placed above `<h1>` titles | Banned: never put numbered prefixes or category flair above headings; reserve badges strictly for record status in data views |
| **Unrequested Kickers & Eyebrows** | Small uppercase tracking labels (e.g., `SYSTEM 01`, `CORE FOUNDATION`, `FEATURED MODULE`, `OVERVIEW`, `STEP 01`) above headings/cards | Banned: never place small uppercase tracking labels above section headings, hero headlines, or card titles unless explicitly provided in user copy |
| **Unrequested Keyboard Shortcut Badges (`⌘K`, `Ctrl+K`, `(⌘K)`)** | Inlining fake shortcut badges (`⌘K`, `Ctrl+K`, `(⌘K)`, `<kbd>⌘K</kbd>`) into search bars, inputs, headers, or navbars on your own | Banned: Never invent or assume keyboard shortcut chips. Inputs must be clean inputs with placeholders alone, unless the user explicitly requested a keyboard shortcut command palette with functioning keydown handlers |
| **Decorative Status Dots & Bullets** | Small colored circle elements (`w-2 h-2 rounded-full`) next to status text, or prefix bullets (`•`, `●`, `▪`) on badges and labels | Banned: Communicate status through clean typography or subtle text color alone. Never place colored dots next to words or start labels with bullets |
| **Emoji Icons** | Using emojis (🚀, 💡, 🔥, ✨, 🧠, ⚡) inside buttons, cards, or titles | Crisp inline SVGs or clean monospaced characters from `var(--font-mono)` |
| **Floating Orbs** | Blurred colored circles floating in the background without layout purpose | Grounded, structured architectural grid surfaces aligned to `--container-max` |
| **Duplicate Sample Asset URLs** | Copy-pasting the exact same image/avatar URL across multiple mock records | Every distinct record in a UI dataset must have a unique visual asset/URL — never reuse the exact same image URL across two different records |

### Strict Dot & Bullet Discipline Law (No Static or Animated Status Dots)
1. **Ban Decorative Colored Dot Elements:** NEVER render small colored circle elements (`<span class="w-1.5 h-1.5 rounded-full">`, `w-2 h-2 rounded-full`, whether static or animated) next to status text (`In Stock`, `Fulfilled`, `Active`), inside badges/pills, or beside headings. Communicate status through clean typography or subtle text color alone—never with a colored dot next to the word.
2. **Ban Prefix Bullet Characters (`•` / `●` / `▪`):** NEVER start a badge, pill, eyebrow, or standalone label with a bullet character (e.g., ban `• PLAYING`, `● LIVE`, `● DROP 04`, `• IN STOCK`).
3. **Where Dots/Bullets Are Permitted (3 Scenarios Only):**
   - **True Vertical Lists (`<ul><li>`):** Standard bulleted lists for multi-line body copy (e.g., product specifications, feature lists, or care instructions).
   - **Inline Mid-Dot Separator (`·`) Between Two Strings:** A single quiet middle dot separating two metadata strings on the same line (e.g., `Artist · Album` or `Oct 24 · 3 items`), NEVER at the beginning of a line.
   - **Explicit User Request / Carousel Pagination:** Only when the user explicitly requests a dot indicator or for interactive slide pagination on a multi-slide carousel.

### Clean Media & Artwork Law (Never Overlay Corner Status Pills on Images, Artwork, or Video Thumbnails)
1. **Keep Media Uncluttered:** NEVER place floating `position: absolute` top-left or top-right status pills, tier tags, or promotional badges on top of album art, video thumbnails, avatars, or e-commerce product photography (e.g., ban `• PLAYING`, `NOW PLAYING`, `HD 1080P`, `4K HDR`, `LIVE`, `NEW`, `BESTSELLER`, `FEATURED`, `HOT`, `IN STOCK`).
2. **How to Show Active or Metadata States Instead:**
   - **Active Media / Playback:** Use a single centered icon overlay (Play/Pause/Equalizer) on the thumbnail or a quiet indicator inside the text row—never a corner text pill (`• PLAYING`).
   - **Product / Content Metadata:** For tags like `"New Arrival"`, `"Limited Edition"`, or discounts, render them as clean, quiet plain text (`var(--text-secondary)`) below the image alongside the title/price—never as a colored sticker slapped onto the corner of the photograph.
   - **Only Permitted Media Overlay:** A plain bottom-right numeric video duration timestamp (`3:51`) or a single subtle top-right icon action (like a quiet heart/bookmark icon on hover).

### Universal Asset Uniqueness in Sample Data
- **Unique Assets Per Record:** Every distinct record in a UI dataset must have a unique visual asset/URL (e.g., distinct Unsplash photo IDs for different avatars, albums, products, or articles) — never lazily duplicate or copy-paste the exact same image URL across multiple records in sample data fixtures.

### Universal Ban on Unrequested Kicker / Eyebrow Micro-Labels
- **Universal Ban on Unrequested Kicker / Eyebrow Micro-Labels:** Never place small uppercase tracking labels (e.g., `SYSTEM 01`, `CORE FOUNDATION`, `FEATURED MODULE`, `OVERVIEW`, `STEP 01`) above section headings, hero headlines, or card titles unless explicitly provided in the user's copy. A heading or card title must stand on its own without a decorative uppercase prefix above it.

### Ban on Unrequested Keyboard Shortcut Badges (`⌘K`, `Ctrl+K`, `(⌘K)`)
- **Never Add `(⌘K)` or `Ctrl+K` on Your Own:** AI agents frequently slap decorative `<kbd>⌘K</kbd>`, `⌘K`, or `(⌘K)` chips into search bars, filter inputs, headers, and toolbars as cosmetic decoration without any keyboard event listener behind them.
- **Rule:** NEVER render `⌘K`, `Ctrl+K`, `(⌘K)`, or `<kbd>` elements in search bars, inputs, headers, or navbars unless the user's prompt explicitly requested a global command palette or keyboard shortcut system with functioning keydown handlers. An input must remain a clean input with a placeholder alone.

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

