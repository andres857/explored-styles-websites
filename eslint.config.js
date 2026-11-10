import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules/', 'runs/', 'reports/', '.stryker-tmp/', 'tests/fixtures/'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
