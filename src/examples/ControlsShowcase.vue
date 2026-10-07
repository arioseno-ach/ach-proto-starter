<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const reference = ref('')
</script>

<template>
  <section class="controls-showcase" aria-labelledby="controls-showcase-title">
    <h2 id="controls-showcase-title">Button & Input</h2>

    <div class="controls-showcase__buttons" aria-label="Button states">
      <Button>Continue</Button>
      <Button variant="outline">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button disabled>Disabled</Button>
    </div>

    <label class="controls-showcase__field">
      <span>Reference number</span>
      <Input v-model="reference" placeholder="Enter a reference number" />
    </label>

    <label class="controls-showcase__field">
      <span>Disabled input</span>
      <Input model-value="Unavailable" disabled />
    </label>
  </section>
</template>

<style scoped>
.controls-showcase {
  display: flex;
  width: min(100%, 528px);
  flex-direction: column;
  gap: var(--primitives-padding-4);
}

h2 {
  margin: 0;
  color: var(--semantic-text-ach-color-text-default);
  font-size: var(--primitives-font-sizes-lg);
  font-weight: 600;
}

.controls-showcase__buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--primitives-padding-2);
}

.controls-showcase__field {
  display: flex;
  flex-direction: column;
  gap: var(--primitives-padding-1);
  color: var(--component-input-label-text);
  font-size: var(--primitives-font-sizes-sm);
}
</style>
