import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

import 'eslint';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['.vercel/*', 'dist/*'],
  },
  {
    files: ['**/vite.config.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['./src/**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },

  {
    rules: {
      'no-console': ['warn'],
    },
  },
];
