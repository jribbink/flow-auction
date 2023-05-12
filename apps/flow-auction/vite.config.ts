/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/flow-auction',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    {
      name: 'raw-loader',
      enforce: 'pre',
      async transform(code, id) {
        if (id.endsWith('.cdc')) {
          const regex = /import\s+(\w+)\s+from\s+".*"/g;
          const modifiedCode = code.replace(regex, (val) => {
            const contract = val.match(/import\s+(\w+)\s+from\s+".*"/)![1];
            return `import "${contract}"`;
          });

          return {
            code: `export default ${JSON.stringify(modifiedCode)};`,
            map: null,
          };
        }
      },
    },
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  resolve: {
    alias: {
      'node-fetch': './node_modules/node-fetch/browser.js',
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
