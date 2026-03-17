import { pathExists, writeFile } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import inquirer from "inquirer";
import { PACKAGE_NAMES, COMMITLINT_CONFIG } from "../constants";
import { installPackage, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

export async function setupCommitlint(
	cwd: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up commitlint...").start();

	if (isInstalled) {
		spinner.succeed("commitlint is already installed");
	} else {
		try {
			spinner.text = "Installing commitlint...";
			await installPackage(
				[PACKAGE_NAMES.commitlint, PACKAGE_NAMES.commitlintConfig],
				packageManager,
				true,
			);
			spinner.succeed("commitlint installed successfully");
		} catch (error) {
			spinner.fail("Failed to install commitlint");
			logger.error(String(error));
			return false;
		}
	}

	// Create commitlint.config.js
	const commitlintPath = resolve(cwd, "commitlint.config.js");

	if (await pathExists(commitlintPath)) {
		const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
			{
				type: "confirm",
				name: "overwrite",
				message: "commitlint.config.js already exists. Overwrite?",
				default: false,
			},
		]);

		if (!overwrite) {
			logger.info("Skipping commitlint.config.js");
			return true;
		}
	}

	try {
		await writeFile(commitlintPath, COMMITLINT_CONFIG, "utf-8");
		logger.success("Created commitlint.config.js");
	} catch (error) {
		logger.error(`Failed to create commitlint.config.js: ${error}`);
		return false;
	}

	return true;
}
