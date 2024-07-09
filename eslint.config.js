import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // { languageOptions: { globals: globals.browser } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  // // ...configs['flat/recommended'],
  // { files: ['./src/**/*.{js,mjs,cjs,ts}'] },

  {
    files: ['./src/**/*.{js,mjs,cjs,ts}'],
  },
];
