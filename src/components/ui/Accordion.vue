<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: undefined,
  },
)
</script>

<template>
  <div class="accordion" role="group" :aria-label="label">
    <slot />
  </div>
</template>

<style scoped>
.accordion {
  display: flex;
  width: 100%;
  flex-direction: column;
  background: var(--component-accordion-background);
}
</style>