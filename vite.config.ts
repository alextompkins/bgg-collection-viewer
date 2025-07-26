import preact from '@preact/preset-vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    preact(),
    command === 'build' &&
      visualizer({
        template: 'raw-data',
        filename: `bundle-stats/report.json`,
        gzipSize: true,
      }),
  ],
}));
