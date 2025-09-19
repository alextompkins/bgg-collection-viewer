import { resolve } from 'node:path';

import { preact } from '@preact/preset-vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { shadowStylesPlugin } from 'vite-plugin-shadow-styles';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  build: {
    lib: {
      entry: {
        'view-collection': resolve(__dirname, 'src/embeds/view-collection.tsx'),
      },
      formats: ['es'],
    },
    minify: mode === 'production',
    rollupOptions: {
      external: [], // TODO externalize dependencies... somehow
    },
  },
  define: {
    'process.env.DEPLOY_PRIME_URL': JSON.stringify(process.env.DEPLOY_PRIME_URL),
  },
  plugins: [
    preact(),
    shadowStylesPlugin(command, mode),
    command === 'build' &&
      visualizer({
        template: 'raw-data',
        filename: `bundle-stats/report.json`,
        gzipSize: true,
      }),
  ],
}));
