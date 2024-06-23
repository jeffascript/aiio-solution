import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  base: '/',
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:3000',
  },
})
