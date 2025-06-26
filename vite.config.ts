import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    historyApiFallback: true,
  },
  preview: {
    port: 3000,
    open: true,
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
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
