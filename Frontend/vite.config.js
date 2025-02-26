import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://yourbackend.render.com',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {   // Proxy WebSockets correctly
        target: 'https://yourbackend.render.com',
        ws: true,  // Enable WebSocket support
        changeOrigin: true,
        secure: false,
      }
    }
  }
  
  
})
