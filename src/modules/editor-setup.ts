import inquirer from "inquirer";
import { resolve, dirname } from "pathe";
import fs from "fs-extra";
import { VSCODE_SETTINGS, ZED_SETTINGS } from "../constants";
import { safeWriteJson, type WriteStrategy } from "../utils/file-utils";
import { logger } from "../utils/logger";

const { ensureDir, pathExists } = fs;

export type EditorType = "vscode" | "zed";

export interface EditorSetupResult {
	vscode: boolean;
	zed: boolean;
}

export async function promptEditorSelection(): Promise<EditorType[]> {
	const { editors } = await inquirer.prompt<{
		editors: EditorType[];
	}>([
		{
			type: "checkbox",
			name: "editors",
			message: "Select editors to configure:",
			choices: [
				{ name: "VSCode", value: "vscode" as const },
				{ name: "Zed", value: "zed" as const },
			],
		},
	]);

	return editors;
}

export async function setupVSCode(cwd: string, strategy: WriteStrategy = "merge"): Promise<boolean> {
	const vscodeDir = resolve(cwd, ".vscode");
	const settingsPath = resolve(vscodeDir, "settings.json");

	await ensureDir(vscodeDir);

	return safeWriteJson(settingsPath, VSCODE_SETTINGS, { strategy });
}

export async function setupZed(cwd: string, strategy: WriteStrategy = "merge"): Promise<boolean> {
	const zedDir = resolve(cwd, ".zed");
	const settingsPath = resolve(zedDir, "settings.json");

	await ensureDir(zedDir);

	return safeWriteJson(settingsPath, ZED_SETTINGS, { strategy });
}

export async function setupEditors(cwd: string): Promise<EditorSetupResult> {
	const selectedEditors = await promptEditorSelection();
	const result: EditorSetupResult = {
		vscode: false,
		zed: false,
	};

	if (selectedEditors.includes("vscode")) {
		const vscodeDir = resolve(cwd, ".vscode");
		const settingsPath = resolve(vscodeDir, "settings.json");
		const fileExists = await pathExists(settingsPath);

		let strategy: WriteStrategy = "merge";
		if (fileExists) {
			const { action } = await inquirer.prompt<{
				action: WriteStrategy;
			}>([
				{
					type: "list",
					name: "action",
					message: "VSCode settings.json already exists. What would you like to do?",
					choices: [
						{ name: "Merge (preserve existing, add OXC settings)", value: "merge" },
						{ name: "Overwrite (replace with OXC settings only)", value: "overwrite" },
						{ name: "Skip", value: "skip" },
					],
					default: "merge",
				},
			]);
			strategy = action;
		}

		result.vscode = await setupVSCode(cwd, strategy);
	}

	if (selectedEditors.includes("zed")) {
		const zedDir = resolve(cwd, ".zed");
		const settingsPath = resolve(zedDir, "settings.json");
		const fileExists = await pathExists(settingsPath);

		let strategy: WriteStrategy = "merge";
		if (fileExists) {
			const { action } = await inquirer.prompt<{
				action: WriteStrategy;
			}>([
				{
					type: "list",
					name: "action",
					message: "Zed settings.json already exists. What would you like to do?",
					choices: [
						{ name: "Merge (preserve existing, add OXC settings)", value: "merge" },
						{ name: "Overwrite (replace with OXC settings only)", value: "overwrite" },
						{ name: "Skip", value: "skip" },
					],
					default: "merge",
				},
			]);
			strategy = action;
		}

		result.zed = await setupZed(cwd, strategy);
	}

	return result;
}
