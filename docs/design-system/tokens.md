# Design tokens

Runtime design tokens are organized under [`src/styles/tokens/`](../../src/styles/tokens/) and loaded through [`src/styles/tokens.css`](../../src/styles/tokens.css). The entry point imports the layers in dependency order.

## Token layers

- [`primitives.css`](../../src/styles/tokens/primitives.css) contains literal foundation values such as colors, spacing, and typography.
- [`semantic.css`](../../src/styles/tokens/semantic.css) gives those values a design meaning and references primitives.
- [`components.css`](../../src/styles/tokens/components.css) assigns semantic values to component roles. Component tokens should reference semantic tokens rather than primitives directly.

Keep references flowing from primitives → semantic → components. Add raw values only in the primitives layer; do not put raw color values in component styles.

## Tailwind and shadcn-vue

[`theme.css`](../../src/styles/theme.css) is the bridge between the token layers and Tailwind v4. [`tokens.css`](../../src/styles/tokens.css) imports it after the three layers. It holds three things:

- The shadcn-vue contract variables (`--background`, `--primary`, `--border`, `--radius`, and so on), mapped to ACH semantic tokens, plus their `--color-*` names.
- The sidebar utility colors (`--color-sidebar*`).
- The ACH semantic utilities described below, spacing, radius, and the default sans-serif font. The font uses `--primitives-font-families-body`, which must match the family name registered by Fontsource (`Lexend Variable`).

The bridge is light-theme only; add a dark palette only when its design values are available. `src/index.css` imports `tailwindcss`, then `tw-animate-css`, then the tokens.

## Tailwind utilities (Figma variable → class)

New and restyled components use these utilities instead of scoped CSS. The class name is the Figma variable path without the `ach-color-<group>` noise, so a Figma variable becomes a class with no translation. Use `--component-*` tokens only for per-component or per-state values that the semantic utilities cannot express, and reference them as `bg-(--component-button-solid-primary-bg)`.

| Figma path | CSS token | Class |
| --- | --- | --- |
| `bg/ach-color-bg-surface` (also `canvas`, `surface-hover`, `surface-active`, `surface-secondary`, `inverse`) | `--background-color-surface` | `bg-surface` |
| `bg-success/ach-color-bg-success-surface` (also `warning`, `info`, `error`; `info-surface-subtle`) | `--background-color-success-surface` | `bg-success-surface` |
| `text/ach-color-text-secondary` (also `default`, `subtle`, `placeholder`, `disabled`, `inverse`, `link`, `hover`) | `--text-color-secondary` | `text-secondary` |
| `text-error/ach-color-text-error` (also `success`, `warning`, `info`; each with `-subtle`) | `--text-color-error` | `text-error`, `text-error-subtle` |
| `icon/ach-color-icon-subtle` (all icon tokens, same variants as text) | `--text-color-icon-subtle` | `text-icon-subtle` |
| `border/ach-color-border-subtle` (also `default`, `strong`, `disabled`, `inverse`, `natural`) | `--border-color-subtle` | `border-subtle` |
| `border-error/ach-color-border-error-strong` (also `success`, `warning`, `info`; each with `-strong`) | `--border-color-error-strong` | `border-error-strong` |
| `fg/ach-color-fg-muted` (also `default`, `subtle`, `disabled`, `inverse`) | `--color-fg-muted` | `bg-fg-muted`, `text-fg-muted`, `border-fg-muted` |
| `fg-success/ach-color-fg-success-strong` (also `warning`, `info`, `error`; `strong`, `subtle`, `muted` where defined) | `--color-fg-success-strong` | `text-fg-success-strong` |
| `brand/ach-color-brand-default` | `--color-brand` | `bg-brand`, `text-brand`, `border-brand` |
| `brand/ach-color-brand-subtle` (also `muted`, `strong`, `stronger`, `secondary`) | `--color-brand-subtle` | `bg-brand-subtle` |
| `fontSizes/md` with `lineHeights/md` | `--text-md`, `--text-md--line-height` | `text-md` (also `text-base`) |
| `shadows/sm` | `--shadow-sm` | `shadow-sm` |
| `motion/easing/emphasized`, `motion/easing/exit` | `--ease-emphasized`, `--ease-exit` | `ease-emphasized`, `ease-exit` |
| `motion/duration/fast`, `base`, `slow` | `--transition-duration-fast`, `-base`, `-slow` | `duration-fast`, `duration-base`, `duration-slow` |

Notes:

- Breakpoint `xs` is 601px (`--breakpoint-xs`), matching the sidebar's mobile switch; `max-xs:` targets 600px and below (mobile).
- Under `prefers-reduced-motion: reduce`, `theme.css` sets `--tw-animation-duration: 0.01ms` on `[data-state]` and `[data-motion]`. tw-animate-css has no reduced-motion handling and reads that variable before `--tw-duration`, so every `animate-*` utility collapses to near zero while `animationend` still fires for reka Presence.
- `--tw-duration` and `--tw-ease` default on every `[data-state]` element, and Tailwind `transition-*` utilities read them too, so such elements transition with the base or fast timings unless they set `duration-*` or `ease-*`.
- Icons render with `currentColor`, so icon color is a text utility: `text-icon-subtle`, not `fill-` or `stroke-`.
- Typography pairs each primitives font size with the line height of the same step: `2xs` with `4xs`, and `xs` through `5xl` by name. The `2xs` pair follows the button sizes; `xs` uses the 18px line height. `text-md` is the 16px body size and `text-base` is an alias for upstream shadcn-vue classes. Font weights are not exposed because the primitives store them as font style names, not numbers. Letter spacing is not exposed because the primitives names do not map to a semantic scale.
- Shadows are built from the unitless primitives parts with `calc(... * 1px)`, so `shadow-*` and `shadow-<color>` utilities both work.
- `--default-transition-duration` is the base duration (250ms). `tw-animate-css` reads `--tw-duration` and `--tw-ease`; `theme.css` sets them on `[data-state]` to the base duration and emphasized easing, and on `[data-state="closed"]` to the fast duration and exit easing. A `duration-*` or `ease-*` class on the same element overrides them.
- `cn()` uses `extendTailwindMerge` in `src/lib/utils.ts`, which lists the ACH scale names tailwind-merge can't classify on its own (`ease-emphasized`, `ease-exit`, `duration-fast/base/slow`). T-shirt font sizes such as `text-2xs` and `text-md` are recognised already. When a token sync adds a new easing, duration or non-t-shirt font size (e.g. `text-caption`), add it there. Otherwise conflicting classes survive a merge, or a font-size class is read as a colour and drops a sibling `text-*` colour. `pnpm check` does not catch this.

### Name collisions with shadcn-vue

Tailwind resolves `bg-*` from `--background-color-*` before `--color-*`, and `text-*` from `--text-color-*` before `--color-*`. These names exist in both sets:

- `text-secondary` resolves to the ACH secondary text color (`--text-color-secondary`), not shadcn's `--color-secondary`. `bg-secondary` and `border-secondary` stay shadcn's surface color. Upstream shadcn-vue components use `text-secondary-foreground`, so they are unaffected.
- `text-primary`, `text-muted`, `text-accent`, `text-destructive`, `bg-primary`, and `border-border` stay shadcn's, because no ACH utility reuses those names.
- `text-subtle` and `border-subtle` are ACH text and border tokens. `bg-subtle` is not defined.
- `bg-inverse`, `text-inverse`, and `border-inverse` are three separate tokens that share a name.

## Sidebar compatibility

Sidebar hover and active colors follow the Figma component tokens.

When a Figma design or external reference names a CSS variable, verify it exists in one of the runtime layers. External token names such as `--ach-*` do not define the application's CSS API by themselves.

## Accordion compatibility

Accordion colors map to existing `--component-accordion-*` tokens. Header spacing, icon dimensions, typography, and divider width flow through the primitives → semantic → component layers in [`components.css`](../../src/styles/tokens/components.css).

## Button and Input

Button color states consume the `--component-button-solid-*` roles, and Input styles consume `--component-input-*` roles. Success and error hover/pressed fills use their stronger semantic foreground colors, while neutral hover/pressed uses the surface-hover token. Solid button size aliases flow through semantic and component roles, including typography; the extra-large height is 54px, and the inverse disabled state uses 40% opacity. The Controls showcase displays every solid color, size, and state combination on a dark semantic canvas so inverse buttons remain visible. Generic shadcn-vue semantic utilities remain aliases over ACH semantic tokens; component-specific styles should continue to use the ACH component roles when available.

## Slider

The slider primitive resolves its colors through `--component-slider-*` roles in `components.css`:
`--component-slider-track`, `--component-slider-fill`, `--component-slider-handle`, and
`--component-slider-handle-border`, plus `--component-slider-height` for the track thickness.

## Snackbar

The snackbar primitive resolves its colors through `--component-snackbar-*` roles in
`components.css`: `--component-snackbar-{neutral,success,warning,info,error}-background` for the
surface, `--component-snackbar-{variant}-icon-bg` for the icon disc, `--component-snackbar-icon` for
the glyph, `--component-snackbar-title-text`, `--component-snackbar-description-text`, and
`--component-snackbar-close-icon`.

## Checkbox

The checkbox primitive resolves its colors through `--component-checkbox-*` roles in
`components.css`: `--component-checkbox-background`, `--component-checkbox-border`,
`--component-checkbox-checked-background`, `--component-checkbox-checked-border`,
`--component-checkbox-check`, `--component-checkbox-text`, and `--component-checkbox-focus`.

## Motion

Motion values flow through the layers. Primitives hold the literals (`--primitives-motion-duration-fast`, `--primitives-motion-duration-base`, `--primitives-motion-duration-slow`, `--primitives-motion-duration-rotation`, `--primitives-motion-duration-spin`, `--primitives-motion-easing-emphasized`, `--primitives-motion-easing-exit`), and `semantic.css` aliases the reusable ones as `--semantic-motion-duration-fast`, `--semantic-motion-duration-base`, `--semantic-motion-duration-slow`, `--semantic-motion-duration-spin`, `--semantic-motion-duration-rotation`, `--semantic-motion-easing-emphasized` and `--semantic-motion-easing-exit`. Components consume them through component roles. Nonessential motion must respect `prefers-reduced-motion`.

Dialog and sheet open/close animations use `--component-dialog-enter-duration`, `--component-dialog-exit-duration`, `--component-dialog-enter-easing`, `--component-dialog-exit-easing`, `--component-sheet-enter-duration` and `--component-sheet-exit-duration`. They are driven by `@keyframes` on `[data-state]` (Reka waits for animations, not transitions) and only run under `prefers-reduced-motion: no-preference`.

Segmented tab controls use `--component-tabs-indicator-duration` and `--component-tabs-indicator-easing` for the sliding active indicator, and `--component-tabs-panel-enter-duration` and `--component-tabs-panel-exit-duration` for the panel fade and rise, with `--component-tabs-panel-exit-easing` (exit easing) on leave. Transitions are disabled under `prefers-reduced-motion: reduce`.

Tooltips use `--component-tooltip-enter-duration`, `--component-tooltip-exit-duration`, `--component-tooltip-enter-easing` and `--component-tooltip-exit-easing`.

## Top Bar compatibility

The TopBar uses top-bar, avatar, icon-button, divider, and focus tokens. Its literal dimensions are in the primitives layer, semantic aliases are in `semantic.css`, and `--component-topbar-*` role tokens are in [`components.css`](../../src/styles/tokens/components.css).
