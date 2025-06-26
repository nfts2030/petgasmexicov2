import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Asegura que las rutas base sean relativas
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Configuración para manejar correctamente las rutas en producción
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Asegura que las rutas funcionen correctamente en producción
  define: {
    'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || ''),
  },
});
