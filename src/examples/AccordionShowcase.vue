<script setup lang="ts">
import Accordion from '@/components/ui/Accordion.vue'
import AccordionItem from '@/components/ui/AccordionItem.vue'
</script>

<template>
  <div class="accordion-showcase">
    <Accordion label="Three-item accordion">
      <AccordionItem />
      <AccordionItem />
      <AccordionItem />
    </Accordion>

    <Accordion label="Accordion item variants">
      <AccordionItem />
      <AccordionItem default-expanded />
      <AccordionItem disabled />
      <AccordionItem disabled default-expanded />
    </Accordion>
  </div>
</template>

<style scoped>
.accordion-showcase {
  display: flex;
  width: min(100%, 528px);
  flex-direction: column;
  gap: var(--primitives-padding-8);
}
</style>