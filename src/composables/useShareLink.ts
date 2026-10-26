import { useSnackbar } from '@/composables/useSnackbar'

// Fallback for non-secure contexts (e.g. the dev server on a LAN IP) where
// navigator.clipboard is undefined. Returns whether the browser reported success.
function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } finally {
    textarea.remove()
  }
}

export function useShareLink() {
  const { show } = useSnackbar()

  async function share() {
    const url = window.location.href
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url)
      else if (!legacyCopy(url)) throw new Error('Copy command was rejected')
      show({ variant: 'success', title: 'Link copied' })
    } catch {
      show({
        variant: 'error',
        title: "Couldn't copy the link",
        description: "Copy it from your browser's address bar instead.",
      })
    }
  }

  return { share }
}
