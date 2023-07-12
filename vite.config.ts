import { defineConfig } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
