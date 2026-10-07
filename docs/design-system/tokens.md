# Design tokens

Runtime design tokens are organized under [`src/styles/tokens/`](../../src/styles/tokens/) and loaded through [`src/styles/tokens.css`](../../src/styles/tokens.css). The entry point imports the layers in dependency order.

## Token layers

- [`primitives.css`](../../src/styles/tokens/primitives.css) contains literal foundation values such as colors, spacing, and typography.
- [`semantic.css`](../../src/styles/tokens/semantic.css) gives those values a design meaning and references primitives.
- [`components.css`](../../src/styles/tokens/components.css) assigns semantic values to component roles. Component tokens should reference semantic tokens rather than primitives directly.

Keep references flowing from primitives → semantic → components. Add raw values only in the primitives layer; do not put raw color values in component styles.

## Sidebar compatibility

The existing `--sidebar-*` and `--avatar-*` variables remain available as aliases to component tokens so current Vue styles continue to work. Sidebar hover and active colors now follow the Figma component tokens.

When a spec names a CSS variable, verify it exists in one of the runtime layers. Figma reference names and exported `--ach-*` names do not define the application's CSS API by themselves.

## Accordion compatibility

Accordion colors map to existing `--component-accordion-*` tokens. Header spacing, icon dimensions, typography, and divider width flow through the primitives → semantic → component layers in [`components.css`](../../src/styles/tokens/components.css).

## Top Bar compatibility

The TopBar uses top-bar, avatar, icon-button, divider, and focus tokens. Its literal dimensions are in the primitives layer, semantic aliases are in `semantic.css`, and `--component-topbar-*` role tokens are in [`components.css`](../../src/styles/tokens/components.css).
