# Components

This is the repository's component overview. Source files define each component's API and behavior; this page tracks which implementations exist. See [`usage-rules.md`](usage-rules.md) for shared rules and [`tokens.md`](tokens.md) for the runtime token layers.

## Available in Vue

| Component | Source | Implementation |
| --- | --- | --- |
| Accordion | [`accordion/`](../../src/components/ui/accordion/), [`AccordionShowcase.vue`](../../src/examples/AccordionShowcase.vue) | shadcn-vue composition wrappers backed by Reka UI. |
| Button | [`Button.vue`](../../src/components/ui/button/Button.vue), [`buttonVariants`](../../src/components/ui/button/index.ts) | shadcn-vue primitive with ACH component tokens. |
| Input | [`Input.vue`](../../src/components/ui/input/Input.vue) | shadcn-vue primitive with ACH component tokens. |
| Sidebar | [`Sidebar.vue`](../../src/components/layout/Sidebar.vue), [`sidebar primitives`](../../src/components/ui/sidebar/) | ACH navigation composed with shadcn-vue sidebar, sheet, and tooltip primitives. Uses local assets listed in the [Sidebar asset map](implementations/sidebar.md). |
| Top Bar | [`TopBar.vue`](../../src/components/layout/TopBar.vue) | Custom responsive layout component, retained as-is during the migration. |

Update this list when component source is added or removed. Keep API descriptions and code examples in the Vue implementation rather than duplicating them here.
