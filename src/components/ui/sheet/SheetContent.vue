<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import { cn } from "@/lib/utils"
import SheetOverlay from "./SheetOverlay.vue"

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes["class"]
  side?: "top" | "right" | "bottom" | "left"
  showClose?: boolean
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: "right",
  showClose: true,
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, "class", "side", "showClose")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      data-slot="sheet-content"
      :class="cn(
        `ach-sheet-content ach-sheet-content-${side} bg-background fixed z-50 flex flex-col gap-4 shadow-lg`,
        side === 'right'
          && 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        side === 'left'
          && 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        side === 'top'
          && 'inset-x-0 top-0 h-auto border-b',
        side === 'bottom'
          && 'inset-x-0 bottom-0 h-auto border-t',
        props.class)"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />

      <DialogClose
        v-if="props.showClose"
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
      >
        <img class="ach-sheet-close-icon size-4" src="/icons/ui-actions/close.svg" alt="" aria-hidden="true" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<style scoped>
/* Reka Presence waits on CSS animations, so use keyframes (not transitions). */
@media (prefers-reduced-motion: no-preference) {
  .ach-sheet-content[data-state="open"] {
    animation: ach-sheet-in var(--component-sheet-enter-duration) var(--component-dialog-enter-easing) both;
  }
  .ach-sheet-content[data-state="closed"] {
    animation: ach-sheet-out var(--component-sheet-exit-duration) var(--component-dialog-exit-easing) both;
  }
}

.ach-sheet-content-right { --ach-sheet-from: translateX(100%); }
.ach-sheet-content-left { --ach-sheet-from: translateX(-100%); }
.ach-sheet-content-top { --ach-sheet-from: translateY(-100%); }
.ach-sheet-content-bottom { --ach-sheet-from: translateY(100%); }

@keyframes ach-sheet-in {
  from { transform: var(--ach-sheet-from); opacity: 0; }
  to { transform: none; opacity: 1; }
}

@keyframes ach-sheet-out {
  from { transform: none; opacity: 1; }
  to { transform: var(--ach-sheet-from); opacity: 0; }
}
</style>
