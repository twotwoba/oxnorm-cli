import fs from "fs-extra";
import { resolve } from "pathe";
import inquirer from "inquirer";
import { LEGACY_CONFIG_PATTERNS } from "../constants";
import { logger } from "../utils/logger";

const { readdirSync, unlinkSync, existsSync } = fs;

export interface LegacyFile {
    path: string;
    type: "prettier" | "eslint" | "stylelint";
}

export function detectLegacyConfigFiles(cwd: string): LegacyFile[] {
    const files: LegacyFile[] = [];
    const dirEntries = readdirSync(cwd, { withFileTypes: true });
    const fileNames = dirEntries
        .filter((entry) => entry.isFile() || entry.isDirectory())
        .map((entry) => entry.name);

    for (const [type, patterns] of Object.entries(LEGACY_CONFIG_PATTERNS)) {
        for (const pattern of patterns) {
            const matchingFiles = fileNames.filter((name) => {
                if (pattern.includes("*")) {
                    const regex = new RegExp(
                        `^${pattern.replace(/\*/g, ".*")}$`,
                    );
                    return regex.test(name);
                }
                return name === pattern;
            });

            for (const file of matchingFiles) {
                files.push({
                    path: resolve(cwd, file),
                    type: type as LegacyFile["type"],
                });
            }
        }
    }

    return files;
}

export async function promptLegacyCleanup(
    files: LegacyFile[],
): Promise<LegacyFile[]> {
    if (files.length === 0) {
        logger.info("No legacy config files found.");
        return [];
    }

    logger.info(`Found ${files.length} legacy config file(s):`);
    for (const file of files) {
        logger.step(`${file.type}: ${file.path}`);
    }

    const { action } = await inquirer.prompt<{
        action: "all" | "select" | "none";
    }>([
        {
            type: "rawlist",
            name: "action",
            message:
                "What would you like to do with these legacy config files?",
            choices: [
                { name: "Delete all (recommended)", value: "all" },
                { name: "Select files to delete", value: "select" },
                {
                    name: "Keep all (not recommended, may cause conflicts)",
                    value: "none",
                },
            ],
            default: 0,
        },
    ]);

    if (action === "none") {
        logger.info("Keeping all legacy config files.");
        logger.warning(
            "Note: This may cause conflicts with the new OXC tools.",
        );
        return [];
    }

    if (action === "all") {
        return files;
    }

    const { selectedFiles } = await inquirer.prompt<{
        selectedFiles: string[];
    }>([
        {
            type: "checkbox",
            name: "selectedFiles",
            message: "Select files to delete:",
            choices: files.map((f) => ({
                name: `${f.type}: ${f.path}`,
                value: f.path,
                checked: true,
            })),
        },
    ]);

    return files.filter((f) => selectedFiles.includes(f.path));
}

export function removeLegacyFiles(files: LegacyFile[]): void {
    for (const file of files) {
        if (existsSync(file.path)) {
            unlinkSync(file.path);
            logger.success(`Removed ${file.path}`);
        }
    }
}
