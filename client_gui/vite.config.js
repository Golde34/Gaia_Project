import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/client-gui',
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    host: 'localhost',
    gaia_connector_port: 3000,
    authentication_service_port: 3001,
    task_manager_port: 3002,
    server_timeout: 10000,
    open: true,
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        keep_infinity: true,
      }
    },
    chunkSizeWarningLimit: 2000,
    outDir: '../client_gui_dist',
  }
})
