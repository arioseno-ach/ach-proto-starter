# Components

This is the repository's component overview and implementation map. Vue source under `src/components/` defines each component's props and behavior; this page tracks which components exist and how far each one follows Figma. See [`usage-rules.md`](usage-rules.md) for shared rules and [`tokens.md`](tokens.md) for the runtime token layers.

- **Origin**: where the implementation comes from. `shadcn` is shadcn-vue (new-york-v4), `reka` is a reka-ui primitive, `custom` is written for this project.
- **Figma node**: the Figma node the component was restyled against, or `—` when none is linked yet.
- **Status**: `ach` is restyled to Figma with ACH tokens. `upstream` is pulled from shadcn-vue with token-safe classes but not yet restyled from Figma. `custom` is project-specific and not tied to a shadcn-vue API.
- **Source**: component folder or file, plus playground pages under [`src/playground/pages`](../../src/playground/pages/) where they exist.

## Available in Vue

| Component | Origin | Figma node | Status | Source |
| --- | --- | --- | --- | --- |
| Accordion | shadcn | — | ach | [`accordion/`](../../src/components/ui/accordion/), [`AccordionPage.vue`](../../src/playground/pages/AccordionPage.vue) |
| Alert | custom | — | ach | [`alert/`](../../src/components/ui/alert/), [`AlertPage.vue`](../../src/playground/pages/AlertPage.vue) |
| Avatar | custom | — | ach | [`avatar/`](../../src/components/ui/avatar/) |
| Button | shadcn | — | ach | [`button/`](../../src/components/ui/button/), [`ButtonPage.vue`](../../src/playground/pages/ButtonPage.vue) |
| Checkbox | custom | — | ach | [`checkbox/`](../../src/components/ui/checkbox/) |
| Dialog | shadcn | — | ach | [`dialog/`](../../src/components/ui/dialog/) |
| Icon | custom | — | custom | [`icon/`](../../src/components/ui/icon/) |
| Input | shadcn | — | ach | [`input/`](../../src/components/ui/input/) |
| Sheet | shadcn | — | ach | [`sheet/`](../../src/components/ui/sheet/) |
| Sidebar | shadcn | — | ach | [`sidebar/`](../../src/components/ui/sidebar/), [`Sidebar.vue`](../../src/components/layout/Sidebar.vue) |
| Slider | custom | — | ach | [`slider/`](../../src/components/ui/slider/) |
| Snackbar | reka | — | ach | [`snackbar/`](../../src/components/ui/snackbar/), [`useSnackbar.ts`](../../src/composables/useSnackbar.ts), [`useShareLink.ts`](../../src/composables/useShareLink.ts) |
| Tooltip | shadcn | — | ach | [`tooltip/`](../../src/components/ui/tooltip/) |
| Top Bar | custom | — | custom | [`TopBar.vue`](../../src/components/layout/TopBar.vue) |
| Alert Dialog | shadcn | — | upstream; buttons unstyled until Button migrates to utilities (Button's ACH styles are scoped CSS) | [`alert-dialog/`](../../src/components/ui/alert-dialog/) |
| Aspect Ratio | shadcn | — | upstream | [`aspect-ratio/`](../../src/components/ui/aspect-ratio/) |
| Badge | shadcn | — | upstream | [`badge/`](../../src/components/ui/badge/) |
| Breadcrumb | shadcn | — | upstream | [`breadcrumb/`](../../src/components/ui/breadcrumb/) |
| Calendar | shadcn | — | upstream; buttons unstyled until Button migrates to utilities (Button's ACH styles are scoped CSS) | [`calendar/`](../../src/components/ui/calendar/) |
| Card | shadcn | — | upstream | [`card/`](../../src/components/ui/card/) |
| Collapsible | shadcn | — | upstream | [`collapsible/`](../../src/components/ui/collapsible/) |
| Combobox | shadcn | — | upstream | [`combobox/`](../../src/components/ui/combobox/) |
| Command | shadcn | — | upstream | [`command/`](../../src/components/ui/command/) |
| Context Menu | shadcn | — | upstream | [`context-menu/`](../../src/components/ui/context-menu/) |
| Drawer | shadcn | — | upstream | [`drawer/`](../../src/components/ui/drawer/) |
| Dropdown Menu | shadcn | — | upstream | [`dropdown-menu/`](../../src/components/ui/dropdown-menu/) |
| Hover Card | shadcn | — | upstream | [`hover-card/`](../../src/components/ui/hover-card/) |
| Label | shadcn | — | upstream | [`label/`](../../src/components/ui/label/) |
| Menubar | shadcn | — | upstream | [`menubar/`](../../src/components/ui/menubar/) |
| Native Select | shadcn | — | upstream | [`native-select/`](../../src/components/ui/native-select/) |
| Navigation Menu | shadcn | — | upstream | [`navigation-menu/`](../../src/components/ui/navigation-menu/) |
| Number Field | shadcn | — | upstream | [`number-field/`](../../src/components/ui/number-field/) |
| Pagination | shadcn | — | upstream; buttons unstyled until Button migrates to utilities (Button's ACH styles are scoped CSS) | [`pagination/`](../../src/components/ui/pagination/) |
| Pin Input | shadcn | — | upstream | [`pin-input/`](../../src/components/ui/pin-input/) |
| Popover | shadcn | — | upstream | [`popover/`](../../src/components/ui/popover/) |
| Progress | shadcn | — | upstream | [`progress/`](../../src/components/ui/progress/) |
| Radio Group | shadcn | — | upstream | [`radio-group/`](../../src/components/ui/radio-group/) |
| Range Calendar | shadcn | — | upstream; buttons unstyled until Button migrates to utilities (Button's ACH styles are scoped CSS) | [`range-calendar/`](../../src/components/ui/range-calendar/) |
| Resizable | shadcn | — | upstream | [`resizable/`](../../src/components/ui/resizable/) |
| Scroll Area | shadcn | — | upstream | [`scroll-area/`](../../src/components/ui/scroll-area/) |
| Select | shadcn | — | upstream | [`select/`](../../src/components/ui/select/) |
| Separator | shadcn | — | upstream | [`separator/`](../../src/components/ui/separator/) |
| Skeleton | shadcn | — | upstream | [`skeleton/`](../../src/components/ui/skeleton/) |
| Stepper | shadcn | — | upstream | [`stepper/`](../../src/components/ui/stepper/) |
| Switch | shadcn | — | upstream | [`switch/`](../../src/components/ui/switch/) |
| Table | shadcn | — | upstream | [`table/`](../../src/components/ui/table/) |
| Tabs | shadcn | — | upstream | [`tabs/`](../../src/components/ui/tabs/) |
| Tags Input | shadcn | — | upstream | [`tags-input/`](../../src/components/ui/tags-input/) |
| Textarea | shadcn | — | upstream | [`textarea/`](../../src/components/ui/textarea/) |
| Toggle | shadcn | — | upstream | [`toggle/`](../../src/components/ui/toggle/) |
| Toggle Group | shadcn | — | upstream | [`toggle-group/`](../../src/components/ui/toggle-group/) |

## Notes

- Dialog width is configurable through the `--ach-dialog-width` and `--ach-dialog-max-width` custom properties.
- Snackbar is mounted once in `App.vue`. Call `useSnackbar().show({ variant, title, description })` to display it; a new message replaces the current one. `useShareLink().share()` copies the current URL and reports the result through the snackbar.
- Button has solid and outlined color variants, five Figma sizes, and leading/trailing icon slots. Legacy variants, icon sizes, ghost, and link remain available.
- Upstream components render icons through `Icon` from `public/icons`. Upstream class strings that target svg are rewritten to `[data-slot=icon]`.

Update this list when component source is added or removed. Keep API descriptions and code examples in the Vue implementation rather than duplicating them here.
