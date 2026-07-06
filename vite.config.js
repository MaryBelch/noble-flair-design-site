import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle visualizer: ANALYZE=true npm run build → opens stats.html
    process.env.ANALYZE === 'true' &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),
  base: '/noble-flair-design-site/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase SDK → separate chunk
          if (id.includes('firebase/') || id.includes('@firebase/')) {
            return 'firebase';
          }
          // React → vendor chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
