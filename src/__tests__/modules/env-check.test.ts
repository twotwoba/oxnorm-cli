import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, writeFileSync, existsSync, readJsonSync } from "fs-extra";
import { resolve } from "pathe";
import { checkEnvironment } from "../../modules/env-check";

describe("env-check", () => {
	const testDir = resolve(__dirname, "test-env-check");

	beforeEach(() => {
		mkdirSync(testDir, { recursive: true });
	});

	afterEach(() => {
		rmSync(testDir, { recursive: true, force: true });
	});

	describe("checkEnvironment", () => {
		it("should detect missing package.json", () => {
			const result = checkEnvironment(testDir);

			expect(result.hasPackageJson).toBe(false);
			expect(result.packageJson).toBeNull();
		});

		it("should detect valid package.json", () => {
			const packageJsonPath = resolve(testDir, "package.json");
			writeFileSync(packageJsonPath, JSON.stringify({ name: "test" }), "utf-8");

			const result = checkEnvironment(testDir);

			expect(result.hasPackageJson).toBe(true);
			expect(result.packageJson).not.toBeNull();
			expect(result.packageJson?.name).toBe("test");
		});

		it("should detect installed packages", () => {
			const packageJsonPath = resolve(testDir, "package.json");
			writeFileSync(
				packageJsonPath,
				JSON.stringify({
					name: "test",
					devDependencies: {
						oxlint: "^1.0.0",
						husky: "^9.0.0",
					},
				}),
				"utf-8",
			);

			const result = checkEnvironment(testDir);

			expect(result.installedPackages.oxlint).toBe(true);
			expect(result.installedPackages.husky).toBe(true);
			expect(result.installedPackages.oxfmt).toBe(false);
		});

		it("should handle invalid JSON", () => {
			const packageJsonPath = resolve(testDir, "package.json");
			writeFileSync(packageJsonPath, "not valid json", "utf-8");

			const result = checkEnvironment(testDir);

			expect(result.hasPackageJson).toBe(false);
			expect(result.packageJson).toBeNull();
		});
	});
});
