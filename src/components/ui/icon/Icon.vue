<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  /** Path under public/icons without the .svg extension, e.g. "ui-actions/expand-more". */
  name: string
  class?: HTMLAttributes['class']
}>()

const mask = computed(() => `url("${import.meta.env.BASE_URL}icons/${props.name}.svg") center / contain no-repeat`)
const style = computed(() => ({ mask: mask.value, WebkitMask: mask.value }))
</script>

<template>
  <span
    aria-hidden="true"
    data-slot="icon"
    :class="cn('inline-block size-4 shrink-0 bg-current forced-color-adjust-none', props.class)"
    :style="style"
  />
</template>
