<script setup lang="ts">
import { ToastViewport } from "reka-ui"
</script>

<template>
  <ToastViewport data-slot="snackbar-viewport" class="snackbar-viewport" />
</template>

<!-- Unscoped: reka Toast renders through a Teleport/fragment, so scoped attributes never reach these elements. -->
<style>
.snackbar-viewport {
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 100;
  display: flex;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
  flex-direction: column;
  gap: var(--primitives-padding-2);
  margin: 0;
  padding: var(--primitives-padding-4);
  list-style: none;
  outline: none;
  /* Let clicks pass through the empty area; each snackbar re-enables them. */
  pointer-events: none;
  transform: translateX(-50%);
}
</style>
