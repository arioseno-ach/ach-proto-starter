// Playground page convention:
// - One page per component, in src/playground/pages/<Name>Page.vue.
// - Show every variant x state (default, hover, focus-visible, disabled, loading where applicable).
// - Use one section heading per variant; no decorative chrome around examples.
// - Registering a page is one line in the object below.
import type { Component } from 'vue'

export interface PlaygroundEntry {
  title: string
  component: () => Promise<{ default: Component }>
}

export const registry: Record<string, PlaygroundEntry> = {
  accordion: { title: 'Accordion', component: () => import('./pages/AccordionPage.vue') },
  alert: { title: 'Alert', component: () => import('./pages/AlertPage.vue') },
  button: { title: 'Button', component: () => import('./pages/ButtonPage.vue') },
  // Button and Input share one page.
  input: { title: 'Input', component: () => import('./pages/ButtonPage.vue') },
}
