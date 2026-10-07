# Component implementation map

This page is the source of truth for component code that currently exists in this Vue repository. The design registry and framework-neutral Figma references live in [`components/_index.md`](components/_index.md) and the linked files beside it. A component appearing in that design registry does not mean it has been implemented in Vue.

## Implemented components

| Component | Vue implementation | Status | Design spec | Implementation notes |
| --- | --- | --- | --- | --- |
| Accordion | [`src/components/ui/Accordion.vue`](../../src/components/ui/Accordion.vue), [`src/components/ui/AccordionItem.vue`](../../src/components/ui/AccordionItem.vue) | Implemented | [`components/accordion.md`](components/accordion.md) | Wrapper and independently controlled/uncontrolled item |
| Sidebar | [`src/components/layout/Sidebar.vue`](../../src/components/layout/Sidebar.vue) | Implemented | [`components/sidebar.md`](components/sidebar.md) | [`Sidebar implementation`](implementations/sidebar.md) |
| Top Bar | [`src/components/layout/TopBar.vue`](../../src/components/layout/TopBar.vue) | Implemented | [`components/top-bar.md`](components/top-bar.md) | Web, Tab, and Mobile variants; optional logo, action trail, and divider |

Other components in the design registry may not have Vue implementations yet.
