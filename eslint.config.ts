import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import ts from 'typescript-eslint';
import LanguageOptions = Linter.LanguageOptions;

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'playwright-report', 'test-results', 'storybook-static'],
  },
  ...[
    js.configs.recommended as Linter.Config,
    ...(ts.configs.recommended as Linter.Config[]),
    reactPlugin.configs.flat.recommended as Linter.Config,
    importPlugin.flatConfigs.recommended as Linter.Config,
  ].map((conf) => ({
    ...conf,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    } as LanguageOptions,
    plugins: {
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        // allow the use of _ for regex matching purposes that eslint doesn't like
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/no-default-export': 'error',
      'import/no-unresolved': 'error',

      // Import sorting
      'import/order': 'off', // must be off for simple-import-sort to work
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-imports': 'off', // must be off for simple-import-sort to work
    },
    settings: {
      'import/extensions': ['.js', '.jsx', 'ts', 'tsx'],
      'import/resolver': { typescript: true, node: true },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['vite.config.ts', 'eslint.config.ts'],
    rules: {
      'import/no-default-export': 'off', // playground/storybook/vite/vitest need default exports
    },
  },
  eslintConfigPrettier,
]);
