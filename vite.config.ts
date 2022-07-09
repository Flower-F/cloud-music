import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import paths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    paths({
      loose: true
    }),
    react()
  ]
})
