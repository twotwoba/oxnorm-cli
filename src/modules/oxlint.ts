import fs from "fs-extra";
import type { PackageJson } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import { PACKAGE_NAMES, OXLINTRC_CONFIG } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

const { writeJson, pathExists, readJson } = fs;

export async function setupOxlint(
	_packageJson: PackageJson,
	packageJsonPath: string,
	cwd: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up oxlint...").start();

	if (isInstalled) {
		spinner.succeed("oxlint is already installed");
	} else {
		try {
			spinner.text = "Installing oxlint...";
			await installPackage(PACKAGE_NAMES.oxlint, packageManager, true, { cwd });
			spinner.succeed("oxlint installed successfully");
		} catch (error) {
			spinner.fail("Failed to install oxlint");
			logger.error(String(error));
			return false;
		}
	}

	// Re-read package.json to get the latest content (with newly installed deps)
	const packageJson = await readJson(packageJsonPath);

	// Add scripts to package.json
	const scripts = packageJson.scripts ?? {};

	if (!scripts.lint) {
		scripts.lint = "oxlint --deny-warnings";
	}

	if (!scripts["lint:fix"]) {
		scripts["lint:fix"] = "oxlint --fix";
	}

	packageJson.scripts = scripts;

	// Create .oxlintrc.json if not exists
	const oxlintrcPath = resolve(cwd, ".oxlintrc.json");
	if (!(await pathExists(oxlintrcPath))) {
		try {
			await writeJson(oxlintrcPath, OXLINTRC_CONFIG, { spaces: 2 });
			logger.success("Created .oxlintrc.json");
		} catch (error) {
			logger.error(`Failed to create .oxlintrc.json: ${error}`);
			return false;
		}
	} else {
		logger.info(".oxlintrc.json already exists");
	}

	try {
		await writeJson(packageJsonPath, packageJson, { spaces: 2 });
		logger.success('Added "lint" and "lint:fix" scripts to package.json');
	} catch (error) {
		logger.error(`Failed to update package.json: ${error}`);
		return false;
	}

	return true;
}
