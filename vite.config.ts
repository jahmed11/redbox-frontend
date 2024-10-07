import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    target: 'esnext', // Target modern browsers if possible
    sourcemap: false, // Disable source maps in production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  base: './',
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/Components'),
      Pages: path.resolve(__dirname, './src/Pages'),
      api: path.resolve(__dirname, './src/api'),
      utils: path.resolve(__dirname, './src/utils'),
      types: path.resolve(__dirname, './src/types'),
    },
  }, 
});