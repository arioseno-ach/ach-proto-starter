<script setup lang="ts">
import { ToastProvider } from 'reka-ui'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Snackbar, SnackbarViewport } from '@/components/ui/snackbar'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import { useSnackbar } from '@/composables/useSnackbar'

const snackbar = useSnackbar()
</script>

<template>
  <ToastProvider>
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <TopBar />
        <main class="p-6"><RouterView /></main>
      </SidebarInset>
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
