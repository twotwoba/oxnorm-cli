import type { PackageJson } from "fs-extra";
import { writeJson } from "fs-extra";
import ora from "ora";
import { PACKAGE_NAMES } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

export async function setupOxfmt(
	packageJson: PackageJson,
	packageJsonPath: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up oxfmt...").start();

	if (isInstalled) {
		spinner.succeed("oxfmt is already installed");
		return true;
	}

	try {
		spinner.text = "Installing oxfmt...";
		await installPackage(PACKAGE_NAMES.oxfmt, packageManager, true);
		spinner.succeed("oxfmt installed successfully");
	} catch (error) {
		spinner.fail("Failed to install oxfmt");
		logger.error(String(error));
		return false;
	}

	// Add format script to package.json
	const scripts = packageJson.scripts ?? {};
	if (!scripts.format) {
		scripts.format = "oxfmt --write .";
		packageJson.scripts = scripts;

		try {
			await writeJson(packageJsonPath, packageJson, { spaces: 2 });
			logger.success('Added "format" script to package.json');
		} catch (error) {
			logger.error(`Failed to update package.json: ${error}`);
			return false;
		}
	} else {
		logger.info('"format" script already exists in package.json');
	}

	return true;
}
