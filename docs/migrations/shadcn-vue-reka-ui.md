# shadcn-vue / Reka UI Migration Checklist

Branch: `feat/shadcn-vue-reka-ui` · Baseline: `9d62d0f` (`chore: checkpoint current Vue design system state`)

## Phase 0 — Scan and decisions

- [x] Scan the Vue/Vite/Tailwind stack, token graph, existing components, docs, and guardrails.
- [x] Confirm this branch carries all local project changes from `main`.
- [x] Limit implementation scope to Accordion, Sidebar, Top Bar, Button, and Input; other designs remain backlog.
- [x] Keep the migration light-mode only until a dark palette is defined.

## Phase 1 — Documentation

- [x] Remove all 45 Markdown files under `docs/design-system/components/`, including `_index.md` and `_template.md`.
- [x] Keep `docs/design-system/components.md` as the only component overview; update it as code changes.
- [x] Update `AGENTS.md`, the ACH design-taste skill, and implementation notes to remove links/instructions for individual component specs.
- [x] Keep concise cross-component rules in `docs/design-system/usage-rules.md`.
- [x] Search the repository for broken links and instructions pointing to deleted component docs.

## Phase 2 — Tokens and shadcn-vue setup

- [ ] Preserve primitive → semantic → component token layers and current ACH variables.
- [ ] Add semantic aliases for shadcn-vue and Tailwind v4 `@theme inline`; do not add an invented dark palette.
- [ ] Configure shadcn-vue for the existing Vue, CSS, utility, and component paths without replacing token files.
- [ ] Install only the required Reka UI version and confirm `pnpm ls reka-ui --depth Infinity` reports one version.

## Phase 3 — Pilot components

- [ ] Add shadcn-vue Button and Input, styled with ACH tokens and project assets.
- [ ] Migrate Accordion to the shadcn-vue/Reka composition API and update the showcase.
- [ ] Preserve multi-expand and disabled behavior; verify keyboard interaction and visible focus.

## Phase 4 — Sidebar integration

- [ ] Adopt shadcn-vue Sidebar primitives while retaining ACH navigation, the `select` event, and project asset paths.
- [ ] Preserve collapse, mobile drawer, backdrop, and Escape behavior.
- [ ] Keep Top Bar custom and verify its existing menu integration remains functional.

## Phase 5 — Guardrails and final checks

- [ ] Add `pnpm lint:tokens` for raw color literals and arbitrary Tailwind values, with narrow layout exceptions.
- [ ] Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and `pnpm lint:tokens`.
- [ ] Audit component-doc links and inspect the final diff against the baseline.
- [ ] Manually verify Accordion, Sidebar, Top Bar, Button, and Input behavior and visual states.
- [ ] Merge the branch into `main` after all checks pass.
