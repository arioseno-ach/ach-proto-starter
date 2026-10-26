<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 4,
})

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('ach-tooltip-content bg-foreground text-background z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance', props.class)"
    >
      <slot />

      <TooltipArrow class="bg-foreground fill-foreground z-50 size-2.5 -translate-y-1/2 rotate-45 rounded-xs" />
    </TooltipContent>
  </TooltipPortal>
</template>

<!-- Unscoped: Reka applies the scope id to the popper wrapper, not the inner element that carries data-state/data-side. -->
<style>
@media (prefers-reduced-motion: no-preference) {
  .ach-tooltip-content[data-state="delayed-open"],
  .ach-tooltip-content[data-state="instant-open"] {
    animation: ach-tooltip-in var(--component-tooltip-enter-duration) var(--component-tooltip-enter-easing) both;
  }
  .ach-tooltip-content[data-state="closed"] {
    animation: ach-tooltip-out var(--component-tooltip-exit-duration) var(--component-tooltip-exit-easing) both;
  }
  .ach-tooltip-content[data-side="top"] { --ach-tooltip-from: translateY(4px); }
  .ach-tooltip-content[data-side="bottom"] { --ach-tooltip-from: translateY(-4px); }
  .ach-tooltip-content[data-side="left"] { --ach-tooltip-from: translateX(4px); }
  .ach-tooltip-content[data-side="right"] { --ach-tooltip-from: translateX(-4px); }
}

@keyframes ach-tooltip-in {
  from { opacity: 0; transform: var(--ach-tooltip-from, none) scale(0.97); }
  to { opacity: 1; transform: none; }
}

@keyframes ach-tooltip-out {
  from { opacity: 1; transform: none; }
  to { opacity: 0; transform: var(--ach-tooltip-from, none) scale(0.97); }
}
</style>
