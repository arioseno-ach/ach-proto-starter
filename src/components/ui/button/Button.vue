<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
.ach-button {
  border: var(--primitives-border-width-default) solid transparent;
  border-radius: var(--primitives-border-radius-sm);
  outline-color: var(--component-input-border-focus);
}

.ach-button:focus-visible {
  outline-style: solid;
  outline-width: var(--primitives-border-width-2);
  outline-offset: var(--primitives-border-width-2);
}

.ach-button--solid-primary {
  border-color: var(--component-button-solid-primary-border);
  background: var(--component-button-solid-primary-bg);
  color: var(--component-button-solid-primary-text);
}

.ach-button--solid-primary:hover:not(:disabled) {
  background: var(--component-button-solid-primary-bg-hover);
}

.ach-button--solid-primary:active:not(:disabled) {
  background: var(--component-button-solid-primary-bg-active);
}

.ach-button--solid-primary:disabled {
  background: var(--component-button-solid-primary-bg-disabled);
  color: var(--component-button-solid-primary-text-disabled);
}

.ach-button--solid-error {
  background: var(--component-button-solid-error-bg);
  color: var(--component-button-solid-error-text);
}

.ach-button--solid-error:hover:not(:disabled) {
  background: var(--component-button-solid-error-bg-hover);
}

.ach-button--solid-error:disabled {
  background: var(--component-button-solid-error-bg-disabled);
  color: var(--component-button-solid-error-text-disabled);
}

.ach-button--outlined-primary {
  border-color: var(--component-button-outlined-primary-border);
  background: var(--component-button-outlined-primary-bg);
  color: var(--component-button-outlined-primary-text);
}

.ach-button--outlined-primary:hover:not(:disabled) {
  background: var(--component-button-outlined-primary-bg-hover);
}

.ach-button--outlined-primary:disabled {
  border-color: var(--component-button-outlined-primary-border-disabled);
  color: var(--component-button-outlined-primary-text-disabled);
}

.ach-button--solid-neutral {
  background: var(--component-button-solid-neutral-bg);
  color: var(--component-button-solid-neutral-text);
}

.ach-button--solid-neutral:hover:not(:disabled) {
  background: var(--component-button-solid-neutral-bg-hover);
}

.ach-button--solid-neutral:disabled {
  background: var(--component-button-solid-neutral-bg-disabled);
  color: var(--component-button-solid-neutral-text-disabled);
}

.ach-button--link-primary {
  color: var(--component-button-link-primary-text);
}

.ach-button--link-primary:hover:not(:disabled) {
  background: var(--component-button-link-primary-bg-hover);
  color: var(--component-button-link-primary-text-hover);
}

.ach-button--link-primary:disabled {
  color: var(--component-button-link-primary-text-disabled);
}

.ach-button--link {
  text-underline-offset: var(--primitives-padding-1);
}

.ach-button--link:hover:not(:disabled) {
  text-decoration-line: underline;
}
</style>
