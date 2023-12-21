import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ToastPlugin from 'vue-toast-notification';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  plugins: [
    vue(),
    ToastPlugin
  ],
})
