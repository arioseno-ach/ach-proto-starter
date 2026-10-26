import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the ACH easing and duration names from src/styles/theme.css,
// otherwise `ease-emphasized ease-exit` or `duration-500 duration-base` both survive a merge.
// T-shirt font sizes (`text-2xs`, `text-md`) are already recognised.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      ease: ['emphasized', 'exit'],
    },
    classGroups: {
      duration: [{ duration: ['fast', 'base', 'slow'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
