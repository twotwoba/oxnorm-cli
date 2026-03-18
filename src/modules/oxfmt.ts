import fs from "fs-extra";
import type { PackageJson } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import { PACKAGE_NAMES } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

const { writeJson, pathExists, readJson } = fs;

export async function setupOxfmt(
	_packageJson: PackageJson,
	packageJsonPath: string,
	cwd: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up oxfmt...").start();

	if (isInstalled) {
		spinner.succeed("oxfmt is already installed");
	} else {
		try {
			spinner.text = "Installing oxfmt...";
			await installPackage(PACKAGE_NAMES.oxfmt, packageManager, true, { cwd });
			spinner.succeed("oxfmt installed successfully");
		} catch (error) {
			spinner.fail("Failed to install oxfmt");
			logger.error(String(error));
			return false;
		}
	}

	// Re-read package.json to get the latest content (with newly installed deps)
	const packageJson = await readJson(packageJsonPath);

	// Add scripts to package.json
	const scripts = packageJson.scripts ?? {};

	if (!scripts.format) {
		scripts.format = "oxfmt --write .";
	}

	if (!scripts.fmt) {
		scripts.fmt = "oxfmt";
	}

	if (!scripts["fmt:check"]) {
		scripts["fmt:check"] = "oxfmt --check";
	}

	packageJson.scripts = scripts;

	// Create .oxfmtrc.json if not exists
	const oxfmtrcPath = resolve(cwd, ".oxfmtrc.json");
	if (!(await pathExists(oxfmtrcPath))) {
		try {
			await writeJson(oxfmtrcPath, {
				"$schema": "./node_modules/oxfmt/configuration_schema.json",
				printWidth: 100,
				useTabs: false,
				tabWidth: 4,
				semi: false,
				singleQuote: true,
				trailingComma: "none",
			}, { spaces: 2 });
			logger.success("Created .oxfmtrc.json");
		} catch (error) {
			logger.error(`Failed to create .oxfmtrc.json: ${error}`);
			return false;
		}
	} else {
		logger.info(".oxfmtrc.json already exists");
	}

	try {
		await writeJson(packageJsonPath, packageJson, { spaces: 2 });
		logger.success('Added "format", "fmt", "fmt:check" scripts to package.json');
	} catch (error) {
		logger.error(`Failed to update package.json: ${error}`);
		return false;
	}

	return true;
}
