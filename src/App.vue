<script setup lang="ts">
import { ToastProvider } from 'reka-ui'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Snackbar, SnackbarViewport } from '@/components/ui/snackbar'
import AppWorkspace from '@/components/layout/AppWorkspace.vue'
import { useSnackbar } from '@/composables/useSnackbar'

const snackbar = useSnackbar()
</script>

<template>
  <ToastProvider>
    <SidebarProvider>
      <AppWorkspace />
    </SidebarProvider>

    <Snackbar
      v-if="snackbar.message.value"
      :key="snackbar.key.value"
      v-model:open="snackbar.isOpen.value"
      :variant="snackbar.message.value.variant"
      :title="snackbar.message.value.title"
      :description="snackbar.message.value.description"
    />
    <SnackbarViewport />
  </ToastProvider>
</template>
