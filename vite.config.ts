import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dsv from '@rollup/plugin-dsv'

// for options see https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        index: 'index.html'
      }
    }
  },
  plugins: [vue(), dsv()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})