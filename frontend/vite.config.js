import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Gokul-portfolio/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://gokul-portfolio-yjae.onrender.com',
        changeOrigin: true,
      },
    },
  },
});