// @ts-check
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Same rule set as the former .eslintrc.js: typescript-eslint `recommended`
// (which bundles its eslint-recommended overrides) plus prettier.
export default defineConfig(
  {
    ignores: ['dist/', 'coverage/', 'node_modules/'],
  },
  tseslint.configs.recommended,
  prettier,
  {
    files: ['lib/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // Replacements for the former `ban-types` exceptions (`Function` and `{}` allowed).
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      // A library must not write to its users' console.
      'no-console': 'error',
    },
  },
);
