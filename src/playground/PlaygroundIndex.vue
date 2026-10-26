<script setup lang="ts">
import { registry } from './registry'

const entries = Object.entries(registry)
</script>

<template>
  <section>
    <h1>Playground</h1>
    <ul>
      <li v-for="[slug, entry] in entries" :key="slug">
        <RouterLink :to="`/playground/${slug}`">{{ entry.title }}</RouterLink>
      </li>
    </ul>
    <p><RouterLink to="/">Back to home</RouterLink></p>
  </section>
</template>
