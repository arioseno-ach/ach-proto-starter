# Sidebar implementation

This page records repository-specific implementation references for the Sidebar. Its design intent and component spec live in [`../components/sidebar.md`](../components/sidebar.md).

- **Vue source:** [`src/components/layout/Sidebar.vue`](../../../src/components/layout/Sidebar.vue)
- **Figma reference:** [Beta Design System — Sidebar](https://www.figma.com/design/NuDCvey0DAPdptqOT0mRlc/Beta-Design-System?node-id=1125-9352)
- **Implementation:** Native Vue state and HTML controls; no Radix dependency.
- **Tokens:** Sidebar CSS variables are defined in [`src/styles/tokens.css`](../../../src/styles/tokens.css) and documented in [`tokens.md`](../tokens.md).

## Project asset map

| Usage | Project asset |
| --- | --- |
| Home | [`public/icons/ui-actions/home.svg`](../../../public/icons/ui-actions/home.svg) |
| Document | [`public/icons/text-formatting/description.svg`](../../../public/icons/text-formatting/description.svg) |
| Sales Transaction | [`public/icons/custom/sales.svg`](../../../public/icons/custom/sales.svg) |
| Purchase Transaction | [`public/icons/custom/purchase.svg`](../../../public/icons/custom/purchase.svg) |
| Tax & Compliance | [`public/logo/logo-pajak-symbol-blue-20px.svg`](../../../public/logo/logo-pajak-symbol-blue-20px.svg) |
| Cash & Financing | [`public/logo/logo-credor-symbol-blue-24px.svg`](../../../public/logo/logo-credor-symbol-blue-24px.svg) |
| Insights & Commerce | [`public/logo/logo-covia-symbol-blue-24px.svg`](../../../public/logo/logo-covia-symbol-blue-24px.svg) |
| All Product | [`public/icons/ui-actions/apps.svg`](../../../public/icons/ui-actions/apps.svg) |
| Settings | [`public/icons/ui-actions/settings.svg`](../../../public/icons/ui-actions/settings.svg) |
| Help & Support | [`public/icons/communications/contact-support.svg`](../../../public/icons/communications/contact-support.svg) |
| Company switcher | [`public/icons/ui-actions/expand-more.svg`](../../../public/icons/ui-actions/expand-more.svg) |
| Footer indicators | [`public/icons/ui-actions/expand-less.svg`](../../../public/icons/ui-actions/expand-less.svg) |
| Collapse control | [`public/icons/ui-actions/chevron-left.svg`](../../../public/icons/ui-actions/chevron-left.svg) |
