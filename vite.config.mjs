/// <reference types="vitest" />

import * as path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src/js') }],
  },

  test: {
    browser: {
      enabled: true,
      name: 'chrome',
      provider: 'webdriverio',
    },
  },
});
