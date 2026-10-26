<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>[data-slot=icon]]:size-3.5', props.class)"
  >
    <slot>
      <Icon name="ui-actions/chevron-right" />
    </slot>
  </li>
</template>
