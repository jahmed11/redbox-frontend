import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import path from "path";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: path.resolve(__dirname, "./setupTests.ts"),
      include: ["**/*.test.{ts,tsx}"],
      coverage: {
        reporter: ["text", "json", "html"],
      },
    },
  })
);
