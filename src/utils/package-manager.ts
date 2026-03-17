import { detect } from "detect-package-manager";
import { pathExists } from "fs-extra/esm";
import { resolve } from "pathe";
import type { PackageManager } from "./executor";

export type { PackageManager };

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
	try {
		const pm = await detect({ cwd });
		return pm ?? "npm";
	} catch {
		return "npm";
	}
}

export function getInstallCommand(packageManager: PackageManager, isDev = true): string[] {
	switch (packageManager) {
		case "npm":
			return ["install", isDev ? "-D" : "-S"];
		case "yarn":
			return ["add", isDev ? "-D" : ""].filter(Boolean);
		case "pnpm":
			return ["add", "-D"];
	}
}

export function getRunCommand(packageManager: PackageManager): string {
	switch (packageManager) {
		case "npm":
			return "npx";
		case "yarn":
			return "yarn";
		case "pnpm":
			return "pnpm";
	}
}
