# Component design registry

This registry links to Figma-derived design references. It does not indicate whether a component is implemented in Vue; see [`../components.md`](../components.md) for implementation status. Generated React contracts, usage examples, and exported token names in a spec are references, not Vue APIs or runtime CSS variables.

| Component | Spec |
| --- | --- |
| Accordion | [accordion.md](./accordion.md) |
| Alert | [alert.md](./alert.md) |
| Avatar | [avatar.md](./avatar.md) |
| Badge | [badge.md](./badge.md) |
| Banner | [banner.md](./banner.md) |
| Breadcrumb | [breadcrumb.md](./breadcrumb.md) |
| Button | [button.md](./button.md) |
| Card | [card.md](./card.md) |
| Checkbox | [checkbox.md](./checkbox.md) |
| Contextual Menu | [contextual-menu.md](./contextual-menu.md) |
| Datepicker | [datepicker.md](./datepicker.md) |
| Datepicker Calendar | [datepicker-calendar.md](./datepicker-calendar.md) |
| Dialog | [dialog.md](./dialog.md) |
| Divider | [divider.md](./divider.md) |
| Drawer | [drawer.md](./drawer.md) |
| File Input | [file-input.md](./file-input.md) |
| File Input (Image) | [file-input-image.md](./file-input-image.md) |
| Image | [image.md](./image.md) |
| Input Field | [input-field.md](./input-field.md) |
| Input Group | [input-group.md](./input-group.md) |
| Input Select | [input-select.md](./input-select.md) |
| List | [list.md](./list.md) |
| Pagination | [pagination.md](./pagination.md) |
| Progress Bar | [progress-bar.md](./progress-bar.md) |
| Progress Bar (Circular) | [progress-bar-circular.md](./progress-bar-circular.md) |
| Radio | [radio.md](./radio.md) |
| Search Input | [search-input.md](./search-input.md) |
| Selection | [selection.md](./selection.md) |
| Selection Item | [selection-item.md](./selection-item.md) |
| Sidebar | [sidebar.md](./sidebar.md) |
| Slider | [slider.md](./slider.md) |
| Snackbar | [snackbar.md](./snackbar.md) |
| Spinner | [spinner.md](./spinner.md) |
| Stats | [stats.md](./stats.md) |
| Switch | [switch.md](./switch.md) |
| Table | [table.md](./table.md) |
| Tabs (Line) | [tabs-line.md](./tabs-line.md) |
| Tabs (Segmented) | [tabs-segmented.md](./tabs-segmented.md) |
| Text Area | [text-area.md](./text-area.md) |
| Timeline | [timeline.md](./timeline.md) |
| Tooltip | [tooltip.md](./tooltip.md) |
| Top Bar | [top-bar.md](./top-bar.md) |
| Tree View | [tree-view.md](./tree-view.md) |

## Adding a component

1. Copy `_template.md` and retain the Figma link, design anatomy, variants, states, and token mapping.
2. Add a row here. Track Vue implementation only in [`../components.md`](../components.md).
3. Keep Figma-generated code explicitly reference-only. Add a Vue implementation section only after its Vue source exists.
