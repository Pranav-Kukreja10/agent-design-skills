# Core Module 00: Workflow Lifecycle, Visual Restraint & Strict Scope Lock

**Version:** 1.0  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

---

## 1. Foundational Philosophy: Subtraction Over Addition (Do Less, Better)

AI models have an innate "Additive Over-Engineering Bias" — defaulting to adding extra wrapper boxes, borders, micro-labels, status badges, metadata footers, and color splashes to make a UI look "complex" or "feature-complete." To the human eye, unnecessary visual complexity looks cheap, amateur, and exhausting. **Basic, effortless, and visually calm always beats complex and busy.**

### The Subtraction Test (Mandatory Self-Check)
Before rendering any container box, border, micro-label, subheading, icon, or secondary widget, ask yourself:
> *"If I remove this element, does the screen still work and make sense?"*

If the answer is **YES**, **do not render it.**

### Progressive Presence (Show Only What Matters Right Now)
- Do not crowd the initial viewport with empty secondary panels, permanent split-screen boxes, or auxiliary toolbars before the user needs them.
- Keep the initial view focused on the primary task with abundant breathing room, and reveal secondary lists or details progressively as data is created.
- **The "No Empty-Space Panic" Law:** Whitespace is an intentional, premium design feature. NEVER invent decorative filler widgets (e.g., fake progress bars, metadata footers, telemetry strips, unprompted mini-cards) just to fill container height or balance asymmetric columns. If one section has less content, let it breathe.

---

## 2. Mandatory Pre-Flight Gate

Before generating, updating, or refactoring any frontend component or view:

1. **Verify Token Import:** Ensure `{{TOKENS_PATH}}` is imported into the root layout or application entry point.
2. **Read Design Specification:** Inspect `{{DESIGN_DOC_PATH}}` to determine the current `BRIEF STATUS` and project constraints.
3. **Branch by Brief Status:**
   - **Case A: `BRIEF STATUS: DRAFT` (or ambiguous user prompt)**
     - Do **not** write production UI code yet.
     - Prompt the user with 2–4 concise, architectural clarifying questions.
     - Provide a 5–10 line text or ASCII wireframe layout plan outlining container hierarchy, primary actions, and token mappings.
     - Await confirmation or adjustments before proceeding.
   - **Case B: `BRIEF STATUS: LOCKED` (and unambiguous prompt)**
     - Skip preliminary interrogation questions.
     - Begin your response immediately with the standard assumptions confirmation:
       ```markdown
       > **Assumptions:** [1-line summary specifying scope, target viewport, and active tokens from {{TOKENS_PATH}}]
       ```
     - Proceed directly to code generation.

---

## 3. Strict Scope Lock

AI agents frequently hallucinate peripheral features to make prototypes look "complete." This practice introduces architectural drift and visual slop.

### Strict Scope Rules:
- **Build only what was requested:** If the prompt asks for a data table, build only the data table.
- **Prohibited Additions (Unless Explicitly Prompted):**
  - Dark / Light mode toggles or theme dropdowns.
  - Notification bells or unrequested badge counters.
  - Search inputs or filter toolbars not part of the core view specification.
  - Mock user profile dropdowns or avatar switchers.
  - Generic marketing footers, cookie consent banners, or celebratory modals.
  - Extraneous tabs or navigation items.
  - **Fake Brand & Telemetry Cosplay:** Ban inventing fake brand names, fake tier badges (`[PRO v2.4]`, `[BETA]`), fake hardware telemetry (`60 FPS`, `SUB-10MS`), and unrequested Unix `EPOCH` readouts.

---

## 4. Section 0 Anti-Drift Mandate Integration

When reading `{{DESIGN_DOC_PATH}}`, locate `## 0. User's Custom Creative Direction & Anti-Drift Mandate`.

- All custom creative directives must be executed exclusively using `var(--*)` custom properties from `{{TOKENS_PATH}}`.
- The user's creative direction is never a justification to bypass this rule or introduce AI tropes.
- The aesthetic specified in Section 0 is immutable and must persist uniformly across all screens.

