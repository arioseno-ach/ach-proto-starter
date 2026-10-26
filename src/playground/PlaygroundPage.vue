<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { registry } from './registry'

const route = useRoute()
const entry = computed(() => registry[String(route.params.component)])
const page = computed(() => (entry.value ? defineAsyncComponent(entry.value.component) : null))
</script>

<template>
  <component :is="page" v-if="page" :key="String(route.params.component)" />
  <section v-else>
    <p>Not found</p>
    <p><RouterLink to="/playground">Back to playground</RouterLink></p>
  </section>
</template>
