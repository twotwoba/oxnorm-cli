import { defineConfig } from "vitest/config";
import { resolve } from "pathe";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		include: ["src/__tests__/**/*.test.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.ts"],
			exclude: [
				"src/__tests__/**",
				"src/index.ts",
				"src/constants/**",
			],
			thresholds: {
				lines: 80,
				functions: 80,
				branches: 80,
				statements: 80,
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
