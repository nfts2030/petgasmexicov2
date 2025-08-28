import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { PluginOption } from 'vite';

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/' : '/',
    server: {
      port: 3000,
      strictPort: true,
      host: true,
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
        babel: {
          plugins: []
        },
        exclude: /node_modules\/.*\/node_modules\/react/,
      }),
      ...(process.env.ANALYZE === 'true' ? [
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }) as unknown as PluginOption
      ] : [])
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'react': resolve(__dirname, 'node_modules/react'),
        'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('@emotion')) {
                return 'vendor-emotion';
              }
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      chunkSizeWarningLimit: 1500,
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
    preview: {
      port: 3000,
      open: true,
    },
  };
});
