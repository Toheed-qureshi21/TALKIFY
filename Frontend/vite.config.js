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
        target: 'https://talkify-t4t1.onrender.com/',
        changeOrigin: true,
        secure: false,
      },
      '/socket.io': {   // Proxy WebSockets correctly
        target: 'https://talkify-t4t1.onrender.com/',
        ws: true,  // Enable WebSocket support
        changeOrigin: true,
        secure: false,
      }
    }
  }
  
  
})
