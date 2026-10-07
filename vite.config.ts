import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  plugins: [react(), tailwindcss()],
})
