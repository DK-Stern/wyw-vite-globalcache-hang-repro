import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';

const reportHandlesPlugin = {
  name: 'report-active-handles',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    if (process.env.REPORT_HANDLES === 'false') return;
    setTimeout(() => {
      const handles = process._getActiveHandles();
      const counts = {};
      let runnerCount = 0;
      for (const h of handles) {
        const name = h.constructor?.name ?? 'Unknown';
        counts[name] = (counts[name] ?? 0) + 1;
        if (name === 'ChildProcess' && h.spawnargs?.some(a => a.includes('runner.js'))) {
          runnerCount++;
        }
      }
      console.log('[report-active-handles] total:', handles.length, JSON.stringify(counts));
      console.log('[report-active-handles] runner.js ChildProcess count:', runnerCount);
    }, 1000).unref();
  },
};

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ['**/*.{js,jsx}'],
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
      features: {
        globalCache: process.env.WYW_GLOBAL_CACHE === 'true',
      },
    }),
    reportHandlesPlugin,
  ],
});
