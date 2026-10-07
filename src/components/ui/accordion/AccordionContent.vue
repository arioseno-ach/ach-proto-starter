<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionContent } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="overflow-hidden"
  >
    <div :class="cn('ach-accordion-content', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>

<style scoped>
.ach-accordion-content {
  padding-bottom: var(--component-accordion-header-padding-block);
  color: var(--component-accordion-content);
  font-family: var(--component-accordion-content-font-family), sans-serif;
  font-size: var(--component-accordion-content-font-size);
  line-height: var(--component-accordion-content-line-height);
}
</style>
