import type { PackageJson } from "fs-extra";
import { writeJson, pathExists } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import { PACKAGE_NAMES, OXLINTRC_CONFIG } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

export async function setupOxlint(
	packageJson: PackageJson,
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
			await installPackage(PACKAGE_NAMES.oxlint, packageManager, true);
			spinner.succeed("oxlint installed successfully");
		} catch (error) {
			spinner.fail("Failed to install oxlint");
			logger.error(String(error));
			return false;
		}
	}

	// Add lint script to package.json
	const scripts = packageJson.scripts ?? {};
	if (!scripts.lint) {
		scripts.lint = "oxlint .";
		packageJson.scripts = scripts;

		try {
			await writeJson(packageJsonPath, packageJson, { spaces: 2 });
			logger.success('Added "lint" script to package.json');
		} catch (error) {
			logger.error(`Failed to update package.json: ${error}`);
			return false;
		}
	} else {
		logger.info('"lint" script already exists in package.json');
	}

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

	return true;
}
