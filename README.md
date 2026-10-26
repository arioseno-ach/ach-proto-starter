# ACH Prototype Starter

Base starter for turning the ACH design system from Figma into Vue code. It forks [shadcn-vue](https://www.shadcn-vue.com) and restyles it with ACH design tokens. Components shadcn-vue lacks are built on [reka-ui](https://reka-ui.com).

**Stack:** Vue 3, TypeScript, Vite, Tailwind CSS v4, shadcn-vue (`new-york-v4`), reka-ui, vue-router, pnpm.

## Getting started

```sh
pnpm install
pnpm dev
```

Vite prints the local URL. The home page walks through the first steps, and `/playground` lists every component.

## How it works

1. **Tokens** live in three layers, matching the Figma variable collections: primitives → semantic → component (`src/styles/tokens/`).
2. **`src/styles/theme.css`** exposes the semantic tokens as Tailwind utilities, so a Figma variable maps straight to a class: `bg-surface`, `text-secondary`, `border-subtle`, `bg-brand`.
3. **Components** are shadcn-vue files restyled through class strings and `cva`. No scoped CSS unless a part renders through a Teleport.
4. **Icons** come only from `public/icons`, through the `Icon` component.

## Add a component

Reuse in this order: existing component, shadcn-vue, reka-ui, static markup.

```sh
pnpm ui:add <name>   # pull from the shadcn-vue registry, icons rewritten to <Icon>
```

Then restyle the pulled file with ACH utilities, add a page in `src/playground/pages/` (register it in `src/playground/registry.ts`), and update its row in [`components.md`](docs/design-system/components.md).

## Migrate from Figma

Ask the agent with a prompt like this (the Figma connector must be authorized):

```text
Migrate <Component> from Figma: <node link>
Base: shadcn <name> | reka <Primitive> | custom
Scope: <all variants | ...>
```

The workflow is defined in [`.claude/skills/figma-to-vue/SKILL.md`](.claude/skills/figma-to-vue/SKILL.md).

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server. |
| `pnpm build` | Type-check and create a production build. |
| `pnpm preview` | Preview the production build. |
| `pnpm check` | Token lint, Oxlint and type check in one run. |
| `pnpm lint` | Run Oxlint. |
| `pnpm lint:tokens` | Reject raw colors, Tailwind palette classes and px one-offs. |
| `pnpm typecheck` | Run Vue-aware TypeScript checks. |
| `pnpm ui:add <name>` | Pull a shadcn-vue component. |

## Project structure

```text
src/
  components/
    ui/           shadcn-vue and reka-ui components, one folder each
    layout/       Sidebar, TopBar
  playground/     Component gallery, one page per component
  pages/          Screens and prototypes
  styles/
    tokens/       primitives.css, semantic.css, components.css
    theme.css     Tailwind utilities and the shadcn contract
scripts/          lint-tokens.mjs, ui-add.mjs
docs/design-system/  Components, tokens, patterns, usage rules, product context
```

## Documentation

- [Components](docs/design-system/components.md): origin, Figma node, status and source of every component
- [Tokens](docs/design-system/tokens.md): token layers and the Figma variable to class table
- [Patterns](docs/design-system/patterns.md): page and interaction patterns
- [Usage rules](docs/design-system/usage-rules.md): cross-component constraints
- [AGENTS.md](AGENTS.md): rules for AI agents and engineers working in this repo
