import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Убедитесь, что эта настройка присутствует
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Настройка alias для папки src
    },
  },
  // Убедитесь, что Vite использует правильный tsconfig
  define: {
    'process.env': {}
  },
  server: {
    host: '0.0.0.0',
    port: 3001, // Устанавливаем порт на 3001
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/mixins";`
      }
    }
  }
});
