import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', '.stryker-tmp', 'runs'],
    testTimeout: 60_000,
  },
});
