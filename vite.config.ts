import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://eventsync-core-platform.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: mode === 'production' ? '/admin-event-sync/' : './',
  build: {
    sourcemap: mode === "development",
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
}));