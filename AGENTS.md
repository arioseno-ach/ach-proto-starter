# ACH Design System — Agent Instructions

> Applies to AI coding agents and engineers working in this repository. Keep UI implementation consistent with the project structure and the design-system source of truth.

## Project structure

- This project uses Vue 3, TypeScript, Vite, and Tailwind CSS v4.
- Put reusable UI primitives in `src/components/ui` and composed application components in `src/components`. Keep layout components in `src/components/layout`.
- Keep component playground pages in `src/playground` (one page per component, registered in `src/playground/registry.ts`), screens and prototypes in `src/pages`, and design-system documentation in `docs/design-system`.
- Define shared visual tokens in `src/styles/tokens/` by layer: `primitives.css` → `semantic.css` → `components.css`. Load them through `src/styles/tokens.css` and document them in `docs/design-system/tokens.md`.
- Use the `@/` alias for imports from `src` and `cn()` from `src/lib/utils.ts` to merge conditional Tailwind classes.
- Use `docs/design-system/components.md` as the single component overview and implementation map. Vue source under `src/components/` defines the actual props and behavior; follow implementation notes linked there when present.

## Design-system rules

### Component reuse ladder

Every new or changed UI piece starts on the lowest rung that fits. Name the rung in the handoff.

1. **Existing component** (listed in `docs/design-system/components.md`): use or extend it with props and `cva` variants, keeping its API.
2. **shadcn-vue has it**: run `pnpm ui:add <name>`, then restyle the pulled file with ACH utilities (fork pattern).
3. **reka-ui has the primitive**: build on it for focus, keyboard, overlay and positioning behavior.
4. **Static markup only**: write a small Vue component with the same conventions.

Rungs 2–4 live in `src/components/ui/<name>/` and follow the conventions below. Product-specific composition goes in `src/components/` or `src/components/patterns/`.

### Color and tokens: primitives → semantic → component

- Every visual value resolves through the existing chain:
  - **Primitive** (`tokens/primitives.css`): the only place literal values live.
  - **Semantic** (`tokens/semantic.css`): a role referencing a primitive, exposed as a Tailwind utility in `src/styles/theme.css`, e.g. `bg-surface`, `text-secondary`, `border-subtle`, `bg-brand`.
  - **Component** (`tokens/components.css`): a per-component or per-state alias referencing a semantic token, used as `bg-(--component-x)`.
- Components style with semantic utilities first and component tokens for per-state values. Reuse an existing role whenever the meaning matches; the Figma variable name tells you the role.
- A Figma variable with no code token gets added in its matching Figma layer, referencing the layer below. A new semantic token also gets a utility in `theme.css`. A new scale key gets added to `extendTailwindMerge` in `src/lib/utils.ts`. Record shared additions in `docs/design-system/tokens.md`.
- Sizes use the Tailwind spacing scale (4px unit) or a token. A repeated one-off value becomes a token.
- `src/styles/tokens.css` is the import entry point; token files hold design values only.

### Component code conventions

- Match the neighbouring `ui/` components:
  - a folder with an `index.ts` exporting the parts and `cva` variants;
  - typed `defineProps`;
  - `cn()` for class merging;
  - upstream shadcn prop names, with Figma-required props added alongside.
- Styling lives in class strings and `cva`. Reserve `<style scoped>` for Teleport/fragment parts or mask effects.
- Keep code clean and tidy: one responsibility per component, small named computeds over inline logic, and only the props, code and comments that are used. Delete what you replace.
- Each component gets a playground page in `src/playground/pages/`, registered in `registry.ts`, and a row in `components.md`.

### Use the component guide and source

- `docs/design-system/components.md` is the only component guide in the repository. It lists implemented Vue components and links to their source or implementation notes; it is not a substitute for reading the source.
- Do not expect per-component Figma Markdown specs in this repository. For Figma-specific work, use the Figma node/context supplied for the task and verify the implementation against existing Vue components, tokens, and project assets.
- Treat the Vue source as the source of truth for component props and behavior. Do not infer a Vue API from React examples or generated design references supplied externally.
- Inspect the relevant runtime token layer only when styling or tokens are involved. Verify every CSS variable used in code exists under `src/styles/tokens/`; Figma names such as `--ach-*` are not runtime variables by assumption.

### Reuse and composition

- Consult `docs/design-system/usage-rules.md` for cross-component constraints and `patterns.md` only when composing a documented page or interaction pattern.
- Keep primitives reusable and independent of full business flows. Compose them into application components and page patterns.
- Keep shared variants and behavior consistent with the documented component guidance. Update the design-system docs when implementation changes affect shared behavior or appearance.

### Icons and logos

- Always use icon and logo files that already exist in this project's `public/` assets. Inspect the available files and use their exact paths; never guess an asset path.
- Do not add icons or logos from external libraries, packages, URLs, CDNs, or newly drawn inline SVGs.
- If no suitable project asset exists, leave the icon or logo out and report the gap rather than substituting an external or invented asset.

### Interaction and accessibility

- For interactive controls, account for the states that apply: default, hover, pressed, visible keyboard focus, disabled, and loading when an operation is asynchronous.
- Use semantic HTML and native Vue patterns. Provide accessible names and keyboard behavior; explain disabled states when their reason is not clear from context.
- Make errors actionable: explain what happened and how the user can recover. Give a screen one visually primary action when it has a clear next step.
- Follow the documented accessibility guidance when available. Until a dedicated accessibility page exists, preserve visible focus and avoid removing native interaction semantics.
- Use motion only when it communicates a state change. Respect reduced-motion preferences for nonessential animation.

### Visual taste and copy

- For UI design, implementation, or review, read `.codex/skills/ach-design-taste/SKILL.md` and use the relevant product or unit context.
- Before creating or changing a product-specific screen, flow, or prototype (including vibe-coding experiments), read `docs/design-system/context/product-overview.md` and the applicable unit context: `units/onlinepajak.md`, `units/credor.md`, and/or `units/covia.md`. For cross-product or platform work, read every relevant unit context as well.
- Treat those context files as required product guidance for personas, core flows, approved and prohibited terminology, and legal/compliance guardrails. Exploratory or prototype work is not an exception.
- Prefer clarity over decoration. Avoid wrapping every field or metric in a card; use spacing, dividers, and surface contrast to establish hierarchy.
- Use tabular numerals for financial values and aligned metric columns where appropriate.
- Do not add decorative glows or motion without a product reason.
- Keep visible copy calm, direct, and consistent. Avoid informal filler and do not use em dashes in UI copy.
- For substantial screen or flow work, include a concise `ACH Design Read` in the handoff: surface, target user, and the intended density, friction, and motion.

## Task routing

| Task | Read first |
| --- | --- |
| Build or change a screen, flow, or prototype | `product-overview.md` and applicable unit context(s) first (mandatory for product and vibe-coding work) → relevant pattern only when composing an existing workflow → `components.md` and Vue files for components used on the screen → tokens/assets that affect the change |
| Build or change a component | For product-specific components, read `product-overview.md` and applicable unit context(s) first → `components.md` → existing Vue component if present → `usage-rules.md` when shared behavior or usage constraints matter → runtime tokens/assets only when used |
| Implement a component from Figma | `.codex/skills/figma-to-vue/SKILL.md` → `components.md` and relevant Vue source → runtime tokens/assets used by the component |
| Write or review UI copy | `docs/design-system/context/brand-voice.md` → `docs/design-system/context/legal-rules.md` → relevant product overview or unit context |
| Change tokens or theme styling | `src/styles/tokens.css` and the relevant file under `src/styles/tokens/` → `docs/design-system/tokens.md` |
| Review an existing layout | Relevant files in `src/components/layout` → `components.md` and linked implementation notes → `docs/design-system/patterns.md` and token docs |

## Self-review for UI changes

- [ ] Existing components, patterns, and tokens were reused where suitable.
- [ ] No raw colors or unexplained one-off visual values were added to component styles.
- [ ] Interactive controls have the applicable focus, disabled, and loading behavior.
- [ ] Errors provide a recovery path, and the main action is visually clear.
- [ ] Copy and visual hierarchy follow these project conventions.
- [ ] Relevant design-system documentation was updated when shared behavior or appearance changed.

## Commands

- `pnpm dev` starts the Vite development server.
- `pnpm lint` runs Oxlint.
- `pnpm lint:tokens` checks component Vue files for raw colors and unapproved arbitrary Tailwind values.
- `pnpm typecheck` runs Vue-aware TypeScript checks.
- `pnpm build` runs type checks and the Vite production build.

## Token efficiency rules

### Commands

- Always run installs and builds quietly:
  - `pnpm install --silent` (or `--reporter=silent`)
  - `npm install --silent --no-progress`
  - `pip install -q`
- Never print full logs. Pipe long output through `tail -n 30`, or use `rtk err <command>` to show errors only.
- If a command fails, show only the error lines, not the full output.

### Type checking

- Do not run `pnpm typecheck` after every edit.
- Run it once, at the end of the task, after all changes are done.
- Skip it entirely for small UI, text, or styling changes. The user will run it themselves.
- When you do run it, use `pnpm typecheck 2>&1 | tail -n 30` and fix only the errors in files you changed.

### Reading files

- Do not read whole files if only one part is needed. Use search first, then read only the relevant lines.
- Do not re-read files already read in the session.
- Do not scan `node_modules`, `dist`, `build`, or lockfiles.

### Responses

- Keep explanations short. Do not recap what you did unless asked.
- Do not repeat code. Just say which files changed.
- Make the smallest change that solves the problem. Do not do unrequested refactoring.
