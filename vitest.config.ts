import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      reportsDirectory: "./tests/unit/coverage",
      exclude: [
        "*.config.ts",
        "build.js",
        "src/index.ts",
        "src/initialize.ts",
        "src/types.ts",
      ],
    },
  },
});
