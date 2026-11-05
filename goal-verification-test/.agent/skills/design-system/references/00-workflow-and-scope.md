# Core Module 00: Workflow Lifecycle & Strict Scope Lock

**Version:** 4.2  
**Target Archetype:** `quiet-luxury-atelier`  
**Token Contract:** `./tokens.css`  
**Design Specification:** `./DESIGN.md`

---

## 1. Mandatory Pre-Flight Gate

Before generating, updating, or refactoring any frontend component or view:

1. **Verify Token Import:** Ensure `./tokens.css` is imported into the root layout or application entry point.
2. **Read Design Specification:** Inspect `./DESIGN.md` to determine the current `BRIEF STATUS` and project constraints.
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
       > **Assumptions:** [1-line summary specifying scope, target viewport, and active tokens from ./tokens.css]
       ```
     - Proceed directly to code generation.

---

## 2. Strict Scope Lock

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

---

## 3. Section 0 Anti-Drift Mandate Integration

When reading `./DESIGN.md`, locate `## 0. User's Custom Creative Direction & Anti-Drift Mandate`.

- All custom creative directives must be executed exclusively using `var(--*)` custom properties from `./tokens.css`.
- The user's creative direction is never a justification to bypass this rule or introduce AI tropes.
- The aesthetic specified in Section 0 is immutable and must persist uniformly across all screens.

