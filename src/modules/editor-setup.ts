import inquirer from "inquirer";
import { resolve } from "pathe";
import { ensureDir } from "fs-extra";
import { VSCODE_SETTINGS, ZED_SETTINGS } from "../constants";
import { safeWriteJson, type WriteStrategy } from "../utils/file-utils";
import { logger } from "../utils/logger";

export type EditorType = "vscode" | "zed" | "none";

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
	const settingsPath = resolve(vscodeDir, ".vscode/settings.json");

	await ensureDir(vscodeDir);

	return safeWriteJson(settingsPath, VSCODE_SETTINGS, { strategy });
}

export async function setupZed(cwd: string, strategy: WriteStrategy = "merge"): Promise<boolean> {
	const zedDir = resolve(cwd, ".zed");
	const settingsPath = resolve(zedDir, ".zed/settings.json");

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
		const { strategy } = await inquirer.prompt<{
			strategy: WriteStrategy;
		}>([
			{
				type: "list",
				name: "strategy",
				message: "VSCode settings already exist. What would you like to do?",
				choices: [
					{ name: "Merge with existing settings", value: "merge" },
					{ name: "Overwrite existing settings", value: "overwrite" },
					{ name: "Skip", value: "skip" },
				],
				default: "merge",
			},
		]);

		result.vscode = await setupVSCode(cwd, strategy);
	}

	if (selectedEditors.includes("zed")) {
		const { strategy } = await inquirer.prompt<{
			strategy: WriteStrategy;
		}>([
			{
				type: "list",
				name: "strategy",
				message: "Zed settings already exist. What would you like to do?",
				choices: [
					{ name: "Merge with existing settings", value: "merge" },
					{ name: "Overwrite existing settings", value: "overwrite" },
					{ name: "Skip", value: "skip" },
				],
				default: "merge",
			},
		]);

		result.zed = await setupZed(cwd, strategy);
	}

	return result;
}
