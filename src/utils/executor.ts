import { execa } from "execa";
import type { Options } from "execa";
import { logger } from "./logger";

export type PackageManager = "npm" | "yarn" | "pnpm";

export interface ExecuteOptions {
	cwd?: string;
	silent?: boolean;
}

export async function executeCommand(
	command: string,
	args: string[],
	options: ExecuteOptions = {},
): Promise<string> {
	const { cwd = process.cwd(), silent = false } = options;

	const execOptions: Options = {
		cwd,
		preferLocal: true,
	};

	if (!silent) {
		logger.step(`Running: ${command} ${args.join(" ")}`);
	}

	const result = await execa(command, args, execOptions);
	return result.stdout;
}

export async function installPackage(
	packageName: string | string[],
	packageManager: PackageManager,
	isDev = true,
	options: ExecuteOptions = {},
): Promise<void> {
	const packages = Array.isArray(packageName) ? packageName : [packageName];
	const args: string[] = [];

	switch (packageManager) {
		case "npm":
			args.push("install", isDev ? "-D" : "-S", ...packages);
			break;
		case "yarn":
			args.push("add", isDev ? "-D" : "-S", ...packages);
			break;
		case "pnpm":
			args.push("add", "-D", ...packages);
			break;
	}

	await executeCommand(packageManager, args, options);
}

export async function runNpx(packageName: string, args: string[] = [], options: ExecuteOptions = {}): Promise<string> {
	return executeCommand("npx", [packageName, ...args], options);
}
