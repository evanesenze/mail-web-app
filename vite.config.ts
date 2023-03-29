import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: '@root-entry-name: default;',
      },
    },
  },
  resolve: {
    alias: {
      components: '/src/components',
      store: '/src/store',
      hooks: '/src/hooks',
      types: '/src/types',
    }
  }
})
