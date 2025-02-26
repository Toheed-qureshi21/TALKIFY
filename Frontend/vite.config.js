import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
const isProduction = process.env.NODE_ENV === "production";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: !isProduction
    ? {
        proxy: {
          "/api": {
            target: "https://talkify-t4t1.onrender.com",
            changeOrigin: true,
            secure: false,
          },
          "/socket.io": {
            target: "https://talkify-t4t1.onrender.com",
            ws: true,
            changeOrigin: true,
            secure: false,
          },
        },
      }
    : {},
});