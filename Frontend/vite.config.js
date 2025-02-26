import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // server: {
  //   cors: {
  //     origin: '*', // Allow all origins (not recommended for production)
  //     credentials: true,
  //     ws: true,
  //     changeOrigin: true,
  //   }
  // }
  
})
