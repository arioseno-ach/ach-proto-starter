import { ref } from 'vue'

export type SnackbarVariant = 'neutral' | 'success' | 'error'

export interface SnackbarMessage {
  variant: SnackbarVariant
  title: string
  description?: string
}

const message = ref<SnackbarMessage | null>(null)
const isOpen = ref(false)
// Bumped on every show so a repeated message remounts and is announced again.
const key = ref(0)

export function useSnackbar() {
  function show(next: SnackbarMessage) {
    message.value = next
    key.value += 1
    isOpen.value = true
  }

  function dismiss() {
    isOpen.value = false
  }

  return { message, isOpen, key, show, dismiss }
}
