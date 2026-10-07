# ACH Design System — Agent Instructions

> Applies to AI coding agents and engineers working in this repository. Keep UI implementation consistent with the project structure and the design-system source of truth.

## Project structure

- This project uses Vue 3, TypeScript, Vite, and Tailwind CSS v4.
- Put reusable UI primitives in `src/components/ui` and composed application components in `src/components`. Keep layout components in `src/components/layout`.
- Keep reference pages in `src/examples` and design-system documentation in `docs/design-system`.
- Define shared visual tokens in `src/styles/tokens/` by layer: `primitives.css` → `semantic.css` → `components.css`. Load them through `src/styles/tokens.css` and document them in `docs/design-system/tokens.md`.
- Use the `@/` alias for imports from `src` and `cn()` from `src/lib/utils.ts` to merge conditional Tailwind classes.
- Use `docs/design-system/components/_index.md` and its per-component specs as design references. Use `docs/design-system/components.md` as the implementation map for this Vue repo; follow its links to implementation-specific notes when present.

## Design-system rules

### Resolve visuals through the existing system

- Do not add raw color values to component styles. Add literal values in the primitives layer, semantic aliases in the semantic layer, and component aliases in the components layer. Keep the references flowing from primitives → semantic → components, then document shared changes in `docs/design-system/tokens.md`.
- Reuse the variables already in the project; do not assume token names or Tailwind utilities that are not configured here.
- Prefer the established Tailwind spacing and sizing scale. Avoid arbitrary one-off values; when a visual value is repeated or becomes part of the system, promote it to a token.
- Keep the token layer files limited to design values; `src/styles/tokens.css` is the import entry point. Put layout, component behavior, and composition in their respective component or pattern files.

### Use component specs as design references

- Read only the relevant component spec sections: Figma link, purpose, variants, anatomy, token mapping, and states. Specs are design references; Figma-generated React contracts and examples are not Vue APIs.
- When a Vue implementation section exists, use it for the documented Vue API, then verify against the actual source file. `docs/design-system/components.md` is the source of truth for whether a Vue implementation exists.
- Inspect the relevant runtime token layer only when styling or tokens are involved. Verify every CSS variable used in code exists under `src/styles/tokens/`; Figma names such as `--ach-*` are not runtime variables by assumption.

### Reuse and composition

- For a focused component task, inspect its relevant spec sections and nearby Vue implementation only. Check the implementation map when status or app integration is unclear; consult patterns only when composing a documented page/interaction pattern.
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
- Prefer clarity over decoration. Avoid wrapping every field or metric in a card; use spacing, dividers, and surface contrast to establish hierarchy.
- Use tabular numerals for financial values and aligned metric columns where appropriate.
- Do not add decorative glows or motion without a product reason.
- Keep visible copy calm, direct, and consistent. Avoid informal filler and do not use em dashes in UI copy.
- For substantial screen or flow work, include a concise `ACH Design Read` in the handoff: surface, target user, and the intended density, friction, and motion.

## Task routing

| Task | Read first |
| --- | --- |
| Build or change a screen or flow | Relevant product/unit context when business decisions require it → relevant pattern only when composing an existing workflow → specs for components used on the screen → Vue files and tokens/assets that affect the change |
| Build or change a component | Relevant sections of its Figma spec → existing Vue component if present → implementation map only when status/integration is unclear → runtime tokens/assets only when used |
| Write or review UI copy | `docs/design-system/context/brand-voice.md` → `docs/design-system/context/legal-rules.md` → relevant product overview or unit context |
| Change tokens or theme styling | `src/styles/tokens.css` and the relevant file under `src/styles/tokens/` → `docs/design-system/tokens.md` |
| Review an existing layout | Relevant files in `src/components/layout` → relevant component spec → implementation map and linked notes → `docs/design-system/patterns.md` and token docs |

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
- `pnpm typecheck` runs Vue-aware TypeScript checks.
- `pnpm build` runs type checks and the Vite production build.
