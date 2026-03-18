import fs from "fs-extra";
import type { PackageJson } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import inquirer from "inquirer";
import { PACKAGE_NAMES, LINT_STAGED_CONFIG } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { deepMerge, logger } from "../utils";

const { writeJson, pathExists } = fs;

export async function setupLintStaged(
	packageJson: PackageJson,
	packageJsonPath: string,
	cwd: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up lint-staged...").start();

	if (isInstalled) {
		spinner.succeed("lint-staged is already installed");
	} else {
		try {
			spinner.text = "Installing lint-staged...";
			await installPackage(PACKAGE_NAMES.lintStaged, packageManager, true, { cwd });
			spinner.succeed("lint-staged installed successfully");
		} catch (error) {
			spinner.fail("Failed to install lint-staged");
			logger.error(String(error));
			return false;
		}
	}

	// Check for existing lint-staged config
	const lintStagedPath = resolve(cwd, ".lintstagedrc.json");
	const hasLintStagedRc = await pathExists(lintStagedPath);
	const hasPackageJsonConfig = "lint-staged" in packageJson;

	if (hasLintStagedRc || hasPackageJsonConfig) {
		const { action } = await inquirer.prompt<{
			action: "merge" | "overwrite" | "skip";
		}>([
			{
				type: "list",
				name: "action",
				message: "lint-staged configuration already exists. What would you like to do?",
				choices: [
					{ name: "Merge with existing config", value: "merge" },
					{ name: "Overwrite existing config", value: "overwrite" },
					{ name: "Skip", value: "skip" },
				],
				default: "merge",
			},
		]);

		if (action === "skip") {
			logger.info("Skipping lint-staged configuration");
			return true;
		}

		if (action === "merge" && hasPackageJsonConfig) {
			const existing = packageJson["lint-staged"] as Record<string, string[]>;
			packageJson["lint-staged"] = deepMerge(existing, LINT_STAGED_CONFIG);
		} else {
			packageJson["lint-staged"] = LINT_STAGED_CONFIG;
		}
	} else {
		packageJson["lint-staged"] = LINT_STAGED_CONFIG;
	}

	try {
		await writeJson(packageJsonPath, packageJson, { spaces: 2 });
		logger.success("Configured lint-staged in package.json");
	} catch (error) {
		logger.error(`Failed to update package.json: ${error}`);
		return false;
	}

	return true;
}
