---
id: component-name
name: ComponentName
category: primitive # primitive | layout | feedback | navigation
figma_component_name: "ComponentName"
figma_url: "https://www.figma.com/design/..."
tokens_used: []
---

# ComponentName

## Purpose

Describe what this component does and when to use it.

## Variants

Document Figma variants and their design intent. Do not treat generated property names as the Vue API.

## Anatomy

Record the Figma layer hierarchy and notable slots or component relationships.

## Design token mapping

| Element | Property | Figma token | Figma value | Runtime CSS variable |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Figma token names and generated CSS variable names are design references. Verify runtime variables in `src/styles/tokens/` before using them in Vue styles.

## States

Document states present in Figma. Mark states not defined by the design as unspecified rather than inventing visuals.

## Figma-generated source reference

Optional. Include generated code or examples only when they add useful design detail. Label the source framework. Generated React contracts and examples are references, not this repository's Vue API.

## Vue implementation

Optional. Include this section only when a Vue implementation exists.

- **Source:** Link to `src/components/...`.
- **Props, events, and slots:** Document the actual Vue contract.
- **Runtime tokens:** List verified CSS variables used by the implementation.
- **Assets:** Link to exact local files under `public/`.
- **Accessibility:** Record implementation-specific keyboard and screen-reader behavior.
