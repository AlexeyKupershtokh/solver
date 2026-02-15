import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom environment for React component testing
    environment: 'jsdom',
    // Include all test files under src
    include: ['src/**/*.test.{ts,tsx}'],
    // Setup testing library jest-dom matchers
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
