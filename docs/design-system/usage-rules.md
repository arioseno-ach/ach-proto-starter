# Component Usage Rules

The component reuse ladder, the token chain and code conventions live in `AGENTS.md`. This page holds the cross-component constraints.

- Keep ACH product composition and navigation content in application components. Generic UI primitives stay independent of product flows.
- Overlays, menus and focus management come from reka-ui (directly or through shadcn-vue). Local components wrap that behavior rather than reimplementing it.
- `pnpm check` runs the token guard (`scripts/lint-tokens.mjs`). The guard allows structural variants (`data-[...]`, `has-[...]`, `[&_...]`) and `var(--…)` / `--spacing()` values. It rejects raw colours, Tailwind palette classes and one-off pixel values.
- Icons come from `public/icons` through `<Icon name="…">`. Logos come from `public/logo`.
