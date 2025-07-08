import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [
    react({
      // Use the new JSX runtime
      jsxRuntime: 'automatic',
      // Configure Babel plugins
      babel: {
        plugins: [
          '@emotion/babel-plugin',
          // Ensure React is only imported once
          ['@babel/plugin-transform-react-jsx', {
            runtime: 'automatic',
            importSource: '@emotion/react'
          }]
        ]
      },
      // Exclude problematic files from transformation
      exclude: /node_modules\/.*\/node_modules\/react/,
    }),
    // Visualize bundle size in analyze mode
    ...(process.env.ANALYZE === 'true' ? [
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }) as unknown as PluginOption
    ] : []),
  ],
  base: env.VITE_BASE_URL || '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      // Ensure React is resolved to a single copy
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    port: parseInt(env.VITE_PORT || '3000'),
    open: true,
    cors: true,
    strictPort: true,
    host: true,
    proxy: {
      // Configuración de proxy para desarrollo
      '/api': {
        target: env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Ensure React is only included once
      external: ['react', 'react-dom'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet-async',
      'styled-components',
      '@emotion/react',
      '@emotion/styled',
    ],
    exclude: [],
  },
  
  // Definición de variables de entorno
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(mode),
      VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    __APP_ENV__: JSON.stringify(env.APP_ENV || mode),
  },
  
  // Configuración de compilación
  esbuild: {},
  };
});
