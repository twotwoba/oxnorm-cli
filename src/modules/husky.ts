import { pathExists, writeFile, ensureDir } from "fs-extra";
import { resolve } from "pathe";
import ora from "ora";
import inquirer from "inquirer";
import { PACKAGE_NAMES, HUSKY_PRE_COMMIT, HUSKY_COMMIT_MSG } from "../constants";
import { installPackage, runNpx, type PackageManager } from "../utils/executor";
import { logger } from "../utils/logger";

export async function setupHusky(
	cwd: string,
	packageManager: PackageManager,
	isInstalled: boolean,
): Promise<boolean> {
	const spinner = ora("Setting up husky...").start();

	if (isInstalled) {
		spinner.succeed("husky is already installed");
	} else {
		try {
			spinner.text = "Installing husky...";
			await installPackage(PACKAGE_NAMES.husky, packageManager, true);
			spinner.succeed("husky installed successfully");
		} catch (error) {
			spinner.fail("Failed to install husky");
			logger.error(String(error));
			return false;
		}
	}

	// Initialize husky
	const huskyDir = resolve(cwd, ".husky");
	const preCommitPath = resolve(huskyDir, "pre-commit");
	const commitMsgPath = resolve(huskyDir, "commit-msg");

	try {
		spinner.text = "Initializing husky...";
		await runNpx("husky", ["init"], { cwd, silent: true });
		spinner.succeed("husky initialized");
	} catch {
		// husky init might fail if already initialized, continue anyway
		spinner.info("husky may already be initialized");
	}

	// Ensure .husky directory exists
	await ensureDir(huskyDir);

	// Create pre-commit hook
	if (await pathExists(preCommitPath)) {
		const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
			{
				type: "confirm",
				name: "overwrite",
				message: ".husky/pre-commit already exists. Overwrite?",
				default: false,
			},
		]);

		if (!overwrite) {
			logger.info("Skipping pre-commit hook");
		} else {
			await writeFile(preCommitPath, HUSKY_PRE_COMMIT, "utf-8");
			logger.success("Updated .husky/pre-commit");
		}
	} else {
		await writeFile(preCommitPath, HUSKY_PRE_COMMIT, "utf-8");
		logger.success("Created .husky/pre-commit");
	}

	// Create commit-msg hook
	if (await pathExists(commitMsgPath)) {
		const { overwrite } = await inquirer.prompt<{ overwrite: boolean }>([
			{
				type: "confirm",
				name: "overwrite",
				message: ".husky/commit-msg already exists. Overwrite?",
				default: false,
			},
		]);

		if (!overwrite) {
			logger.info("Skipping commit-msg hook");
		} else {
			await writeFile(commitMsgPath, HUSKY_COMMIT_MSG, "utf-8");
			logger.success("Updated .husky/commit-msg");
		}
	} else {
		await writeFile(commitMsgPath, HUSKY_COMMIT_MSG, "utf-8");
		logger.success("Created .husky/commit-msg");
	}

	return true;
}
