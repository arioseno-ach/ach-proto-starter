<script setup lang="ts">
import { computed, ref, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    content?: string
    disabled?: boolean
    expanded?: boolean
    defaultExpanded?: boolean
    headingLevel?: 2 | 3 | 4 | 5 | 6
  }>(),
  {
    title: 'Accordion Title',
    content: 'Accordion content goes here. This is the body text that is revealed when the accordion item is expanded.',
    disabled: false,
    expanded: undefined,
    defaultExpanded: false,
    headingLevel: 3,
  },
)

const emit = defineEmits<{
  'update:expanded': [expanded: boolean]
}>()

const localExpanded = ref(props.defaultExpanded)
const isExpanded = computed(() => props.expanded ?? localExpanded.value)
const headingTag = computed(() => `h${props.headingLevel}`)
const id = useId()
const triggerId = `${id}-trigger`
const panelId = `${id}-panel`

function toggle() {
  if (props.disabled) return

  const nextExpanded = !isExpanded.value
  if (props.expanded === undefined) localExpanded.value = nextExpanded
  emit('update:expanded', nextExpanded)
}
</script>

<template>
  <section
    class="accordion-item"
    :class="{
      'accordion-item--expanded': isExpanded,
      'accordion-item--disabled': disabled,
    }"
    :data-expanded="isExpanded"
    :data-disabled="disabled"
  >
    <component :is="headingTag" class="accordion-item__heading">
      <button
        :id="triggerId"
        class="accordion-item__trigger"
        type="button"
        :aria-expanded="isExpanded"
        :aria-controls="panelId"
        :disabled="disabled"
        @click="toggle"
      >
        <span class="accordion-item__title">
          <slot name="title">{{ title }}</slot>
        </span>
        <img
          class="accordion-item__icon"
          :src="isExpanded ? '/icons/ui-actions/expand-more.svg' : '/icons/ui-actions/chevron-right.svg'"
          alt=""
          aria-hidden="true"
        />
      </button>
    </component>

    <div
      :id="panelId"
      class="accordion-item__panel"
      role="region"
      :aria-labelledby="triggerId"
      v-show="isExpanded"
    >
      <div class="accordion-item__content">
        <slot>
          <p class="accordion-item__copy">{{ content }}</p>
        </slot>
      </div>
    </div>

    <div class="accordion-item__divider" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.accordion-item {
  box-sizing: border-box;
  width: 100%;
  background: var(--component-accordion-background);
}

.accordion-item__heading {
  margin: 0;
  font: inherit;
}

.accordion-item__trigger {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: calc(
    var(--component-accordion-header-padding-block) * 2 +
      var(--component-accordion-title-line-height)
  );
  align-items: center;
  gap: var(--component-accordion-header-gap);
  padding: var(--component-accordion-header-padding-block) 0;
  border: 0;
  background: transparent;
  color: var(--component-accordion-title);
  font-family: var(--component-accordion-title-font-family), sans-serif;
  font-size: var(--component-accordion-title-font-size);
  font-weight: 500;
  line-height: var(--component-accordion-title-line-height);
  text-align: left;
  cursor: pointer;
}

.accordion-item__trigger:not(:disabled):hover {
  background: var(--component-accordion-background-hover);
}

.accordion-item__trigger:focus-visible {
  position: relative;
  z-index: 1;
  outline: var(--primitives-border-width-2) solid var(--component-input-border-focus);
  outline-offset: calc(-1 * var(--primitives-border-width-2));
}

.accordion-item__trigger:disabled {
  color: var(--component-accordion-title-disabled);
  cursor: not-allowed;
}

.accordion-item__title {
  min-width: 0;
  flex: 1;
}

.accordion-item__icon {
  display: block;
  width: var(--component-accordion-icon-size);
  height: var(--component-accordion-icon-size);
  flex: 0 0 var(--component-accordion-icon-size);
}

.accordion-item__trigger:disabled .accordion-item__icon {
  opacity: 0.25;
}

.accordion-item__content {
  box-sizing: border-box;
  padding-bottom: var(--component-accordion-header-padding-block);
  color: var(--component-accordion-content);
  font-family: var(--component-accordion-content-font-family), sans-serif;
  font-size: var(--component-accordion-content-font-size);
  font-weight: 400;
  line-height: var(--component-accordion-content-line-height);
}

.accordion-item--disabled .accordion-item__content {
  color: var(--component-accordion-content-disabled);
}

.accordion-item__copy {
  margin: 0;
}

.accordion-item__divider {
  width: 100%;
  height: var(--component-accordion-divider-width);
  background: var(--component-accordion-border);
}
</style>