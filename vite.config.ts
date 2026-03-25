import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@icons': path.resolve(__dirname, './src/components/icons'),
      '@components': path.resolve(__dirname, './src/components'),
      '@src': path.resolve(__dirname, './src'),
      '@setupTest': path.resolve(__dirname, './src/setupTest.tsx'),
    },
  },
});
