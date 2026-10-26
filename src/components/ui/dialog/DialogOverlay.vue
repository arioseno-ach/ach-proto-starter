<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { DialogOverlay } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <DialogOverlay
    data-slot="dialog-overlay"
    :class="cn(
      'ach-dialog-overlay fixed inset-0 z-50',
      props.class,
    )"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogOverlay>
</template>

<style scoped>
.ach-dialog-overlay {
  background: color-mix(in srgb, var(--semantic-bg-ach-color-bg-inverse) 40%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .ach-dialog-overlay[data-state="open"] {
    animation: ach-dialog-overlay-in var(--component-dialog-enter-duration) var(--component-dialog-enter-easing) both;
  }

  .ach-dialog-overlay[data-state="closed"] {
    animation: ach-dialog-overlay-out var(--component-dialog-exit-duration) var(--component-dialog-exit-easing) both;
  }
}

@keyframes ach-dialog-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ach-dialog-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
