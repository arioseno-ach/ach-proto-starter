<script setup lang="ts">
import { ToastClose, ToastDescription, ToastRoot, ToastTitle } from "reka-ui"
import type { SnackbarVariant } from "@/composables/useSnackbar"

const props = withDefaults(
  defineProps<{
    variant?: SnackbarVariant
    title: string
    description?: string
    duration?: number
  }>(),
  { variant: "neutral", duration: 4000 },
)

const open = defineModel<boolean>("open", { default: false })
</script>

<template>
  <ToastRoot
    v-model:open="open"
    data-slot="snackbar"
    class="snackbar"
    :class="`snackbar--${props.variant}`"
    :duration="props.duration"
  >
    <span v-if="props.variant !== 'neutral'" class="snackbar__icon" aria-hidden="true"></span>
    <div class="snackbar__copy">
      <ToastTitle class="snackbar__title">{{ props.title }}</ToastTitle>
      <ToastDescription v-if="props.description" class="snackbar__description">
        {{ props.description }}
      </ToastDescription>
    </div>
    <ToastClose class="snackbar__close" aria-label="Dismiss">
      <span class="snackbar__close-icon" aria-hidden="true"></span>
    </ToastClose>
  </ToastRoot>
</template>

<!-- Unscoped: reka Toast renders through a Teleport/fragment, so scoped attributes never reach these elements. -->
<style>
.snackbar {
  /* Stay interactive while a modal dialog disables pointer events on body. */
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: var(--primitives-padding-3);
  padding: var(--primitives-padding-3) var(--primitives-padding-4);
  border-radius: var(--primitives-border-radius-lg);
  background: var(--component-snackbar-neutral-background);
  font-family: var(--primitives-font-families-body), sans-serif;
  box-shadow:
    calc(var(--primitives-shadows-lg-shadow-1-x) * 1px)
      calc(var(--primitives-shadows-lg-shadow-1-y) * 1px)
      calc(var(--primitives-shadows-lg-shadow-1-blur) * 1px)
      calc(var(--primitives-shadows-lg-shadow-1-spread) * 1px)
      var(--primitives-shadows-lg-color),
    calc(var(--primitives-shadows-lg-shadow-2-x) * 1px)
      calc(var(--primitives-shadows-lg-shadow-2-y) * 1px)
      calc(var(--primitives-shadows-lg-shadow-2-blur) * 1px)
      calc(var(--primitives-shadows-lg-shadow-2-spread) * 1px)
      var(--primitives-shadows-lg-color);
}

.snackbar--success {
  background: var(--component-snackbar-success-background);
}

.snackbar--error {
  background: var(--component-snackbar-error-background);
}

.snackbar__icon {
  display: grid;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  place-items: center;
  border-radius: var(--primitives-border-radius-infinite);
}

.snackbar__icon::before {
  content: "";
  width: 14px;
  height: 14px;
  background: var(--component-snackbar-icon);
}

.snackbar--success .snackbar__icon {
  background: var(--component-snackbar-success-icon-bg);
}

.snackbar--success .snackbar__icon::before {
  mask: url("/icons/ui-actions/check.svg") center / contain no-repeat;
  -webkit-mask: url("/icons/ui-actions/check.svg") center / contain no-repeat;
}

.snackbar--error .snackbar__icon {
  background: var(--component-snackbar-error-icon-bg);
}

.snackbar--error .snackbar__icon::before {
  mask: url("/icons/common-actions/error.svg") center / contain no-repeat;
  -webkit-mask: url("/icons/common-actions/error.svg") center / contain no-repeat;
}

.snackbar__copy {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--primitives-padding-1);
}

.snackbar__title {
  margin: 0;
  color: var(--component-snackbar-title-text);
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 600;
  line-height: var(--primitives-line-heights-sm);
}

.snackbar__description {
  margin: 0;
  color: var(--component-snackbar-description-text);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.snackbar__close {
  display: grid;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: var(--primitives-border-radius-sm);
  background: none;
  cursor: pointer;
}

.snackbar__close:hover {
  opacity: 0.7;
}

.snackbar__close:focus-visible {
  outline: var(--primitives-border-width-2) solid var(--semantic-text-ach-color-text-link);
  outline-offset: var(--primitives-border-width-2);
}

.snackbar__close-icon {
  width: 16px;
  height: 16px;
  background: var(--component-snackbar-close-icon);
  mask: url("/icons/ui-actions/close.svg") center / contain no-repeat;
  -webkit-mask: url("/icons/ui-actions/close.svg") center / contain no-repeat;
}

@media (prefers-reduced-motion: no-preference) {
  .snackbar[data-state="open"] {
    animation: snackbar-in 200ms ease-out;
  }

  .snackbar[data-state="closed"] {
    animation: snackbar-out 150ms ease-in;
  }
}

@keyframes snackbar-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@keyframes snackbar-out {
  to {
    opacity: 0;
  }
}
</style>
