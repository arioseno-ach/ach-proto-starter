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
    data-slot="sheet-overlay"
    :class="cn('ach-sheet-overlay fixed inset-0 z-50', props.class)"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogOverlay>
</template>

<style scoped>
.ach-sheet-overlay {
  background: color-mix(in srgb, var(--semantic-bg-ach-color-bg-inverse) 40%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .ach-sheet-overlay[data-state="open"] {
    animation: ach-sheet-overlay-in var(--component-sheet-enter-duration) var(--component-dialog-enter-easing) both;
  }
  .ach-sheet-overlay[data-state="closed"] {
    animation: ach-sheet-overlay-out var(--component-sheet-exit-duration) var(--component-dialog-exit-easing) both;
  }
}

@keyframes ach-sheet-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes ach-sheet-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
