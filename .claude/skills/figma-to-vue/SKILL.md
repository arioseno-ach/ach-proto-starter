---
name: figma-to-vue
description: Implement or update a Vue UI component from a supplied Figma node by forking the shadcn-vue file and restyling it with ACH Tailwind utilities and tokens. Use when asked to build, convert, or sync an individual Figma component; for whole screens, use the project screen and flow guidance instead.
---

# Figma component to Vue

Migrate one Figma component into `src/components/ui/<name>/` (Vue 3, TypeScript, shadcn-vue, reka-ui). Match the design and keep interaction behavior accessible.

## Prerequisite

The Figma MCP connector must be authorized. If Figma tools are unavailable or unauthorized, stop and tell the user. Do not guess the design.

## Rules

- One component per task unless the user asks for more.
- Fork pattern: take the shadcn-vue file and restyle its class strings or `cva` variants with ACH Tailwind utilities (`bg-surface`, `text-secondary`, `border-subtle`, `bg-brand`, `text-icon-*`, `bg-fg-*`). See "Tailwind utilities" in `docs/design-system/tokens.md`. Verify each utility exists before using it.
- No new `<style scoped>` unless needed for Teleport/fragment parts (Toast, Tooltip/Popper) or masks. Use `--component-*` tokens only for per-component or per-state values, as `bg-(--component-x)`.
- Keep upstream shadcn props and exports. Add Figma-required props; never rename upstream ones. Report differences from Figma.
- Use reka-ui state attributes (`data-[state=...]`) for open, checked, disabled. Do not recreate keyboard, focus, ARIA, overlay, or positioning behavior.
- Icons and logos: only files in `public/icons` (and other `public/` assets), via `<Icon name="...">`. Never guess paths, use external libraries, or draw inline SVGs. If no asset fits, omit it and report the gap.
- Motion: `tw-animate-css` is installed, so upstream `animate-in`, `fade-*`, `zoom-*` and `slide-*` classes work. They pick up ACH motion defaults from `theme.css`, and reduced motion is handled globally. Keep them; don't hand-write keyframes.
- `pnpm ui:add` refuses a whole component if one of its lucide icons has no `public/icons` mapping. Add the mapping, or pass `--allow-gaps` and report the gap. `--force` only overwrites components named on the command line, never their dependencies.
- No raw colors or unapproved arbitrary values (`pnpm lint:tokens` enforces this).
- Keep one `reka-ui` version installed.

## Workflow

1. Read `AGENTS.md`, `components.json`, `docs/design-system/components.md`, `docs/design-system/tokens.md`, and one comparable component in `src/components/ui/`. Read `usage-rules.md` when shared behavior applies.
2. Inspect only the supplied Figma node: variants, states, variables, layers, screenshot. Record variants, states, token roles, slots, icons.
3. Classify before coding:
   - A: component exists in the project. Extend it; keep its API.
   - B: component exists in shadcn-vue but not here. Run `pnpm ui:add <name>` (pulls shadcn-vue new-york-v4 and rewrites lucide icons to `<Icon name="...">` from `public/icons`), then restyle.
   - C: not in shadcn-vue. Build on reka-ui primitives with the same conventions: folder `src/components/ui/<name>/`, `index.ts` exporting parts and `cva` variants, typed props, `cn()`.
   - D: static, no behavior. Small Vue component with the same conventions.
4. Map Figma variants to props and `cva` variants. Map Figma variables to tokens by semantic role, not by color guess.
5. Missing token: add it in the right layer. Figma variables have 3 layers (primitives, then semantic, then component) matching `src/styles/tokens/`. Expose semantic ones as utilities in `src/styles/theme.css`. A new theme scale key with a name tailwind-merge can't classify (easing, duration, or a non-t-shirt font size such as `text-caption`) must also go into `extendTailwindMerge` in `src/lib/utils.ts`; otherwise `cn()` silently drops a sibling colour class. Document shared additions in `docs/design-system/tokens.md`. Do not hardcode a value to avoid this.
6. Update the playground: add or update `src/playground/pages/<Name>Page.vue` showing every variant x state, and register it with one line in `src/playground/registry.ts`.
7. Update the component's row in `docs/design-system/components.md`: Origin, Figma node, Status (`upstream` or `ach`).
8. Verify: run `pnpm check` (token lint, oxlint, vue-tsc). Review keyboard access, visible focus, disabled behavior, and accessible names.

## Handoff

Report the classification, files changed, variants implemented, token assumptions or gaps, remaining differences from Figma, and `pnpm check` result. Do not paste component code.
