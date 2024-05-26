import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  { files: ['/*.js'], languageOptions: { sourceType: 'module' } },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  eslintConfigPrettier,
  { ignores: ['**/dist/', 'node_modules'] },
  {
    rules: {
      camelcase: ['error'],
      eqeqeq: ['error', 'always'],
    },
  },
];
