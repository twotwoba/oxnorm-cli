import { describe, it, expect, vi } from "vitest";
import { checkNodeVersion, getVersionUpgradeInstructions } from "../../modules/version-check";

describe("version-check", () => {
	describe("checkNodeVersion", () => {
		it("should return current version info", () => {
			const result = checkNodeVersion();

			expect(result.currentVersion).toBe(process.versions.node);
			expect(result.minVersion).toBe("18.18.0");
		});

		it("should validate version correctly", () => {
			const result = checkNodeVersion();

			expect(typeof result.isValid).toBe("boolean");
		});

		it("should skip check when flag is true", () => {
			const result = checkNodeVersion(true);

			expect(result.isValid).toBe(true);
		});
	});

	describe("getVersionUpgradeInstructions", () => {
		it("should return upgrade instructions", () => {
			const instructions = getVersionUpgradeInstructions();

			expect(instructions).toContain("nvm");
			expect(instructions).toContain("fnm");
			expect(instructions).toContain("nodejs.org");
		});
	});
});
