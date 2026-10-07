# Components

This is the repository's component overview. The Vue files linked below define their props, behavior, and styling. Check `src/styles/tokens/` for runtime tokens and `docs/design-system/usage-rules.md` for shared usage constraints.

## Available in Vue

| Component | Source | Current implementation |
| --- | --- | --- |
| Accordion | [`Accordion.vue`](../../src/components/ui/Accordion.vue), [`AccordionItem.vue`](../../src/components/ui/AccordionItem.vue) | Custom Vue implementation; migration to shadcn-vue/Reka UI is tracked in the migration checklist. |
| Sidebar | [`Sidebar.vue`](../../src/components/layout/Sidebar.vue) | ACH navigation and responsive behavior; see the [asset map](implementations/sidebar.md). |
| Top Bar | [`TopBar.vue`](../../src/components/layout/TopBar.vue) | Custom responsive layout component. |

Update this list when component source is added or removed. Do not duplicate component APIs or Figma-generated code examples here.
