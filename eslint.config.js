import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

import 'eslint';

export default [
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['./src/**/*.{js,mjs,cjs,ts}'],
  },
  {
    rules: {
      'no-console': ['warn'],
    },
  },
];
