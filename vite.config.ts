import { defineConfig } from "vite";
import { resolve } from "pathe";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "oxcinit",
			fileName: "index",
			formats: ["es"],
		},
		outDir: "dist",
		sourcemap: true,
		minify: false,
		rollupOptions: {
			external: [
				"commander",
				"inquirer",
				"execa",
				"fs-extra",
				"pathe",
				"ora",
				"chalk",
				"gradient-string",
				"figlet",
				"detect-package-manager",
				"semver",
			],
			output: {
				banner: "#!/usr/bin/env node\n",
				preserveModules: true,
				preserveModulesRoot: "src",
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
});
