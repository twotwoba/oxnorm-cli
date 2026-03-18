import inquirer from 'inquirer'
import { resolve } from 'pathe'
import fs from 'fs-extra'
import { VSCODE_SETTINGS, ZED_SETTINGS } from '../constants'
import { safeWriteJson, type WriteStrategy } from '../utils/file-utils'
import { logger } from '../utils/logger'

const { ensureDir, pathExists, readJson, writeJson } = fs

/**
 * VSCode settings 的 key 级别合并
 * 只替换 VSCODE_SETTINGS 中定义的 key，其他 key 保持不变
 */
async function mergeVSCodeSettings(
    settingsPath: string,
    newSettings: typeof VSCODE_SETTINGS
): Promise<boolean> {
    try {
        const existing = await readJson(settingsPath)
        const merged = { ...existing }

        // 只替换 VSCODE_SETTINGS 中定义的 key
        for (const key of Object.keys(newSettings)) {
            ;(merged as Record<string, unknown>)[key] = newSettings[key as keyof typeof newSettings]
        }

        await writeJson(settingsPath, merged, { spaces: 2 })
        logger.success('Merged VSCode settings (key-level merge)')
        return true
    } catch (error) {
        logger.error(`Failed to merge VSCode settings: ${error}`)
        return false
    }
}

/**
 * 显示选项并提示用户选择
 */
async function promptStrategy(fileType: string): Promise<WriteStrategy> {
    const { action } = await inquirer.prompt<{ action: WriteStrategy }>([
        {
            type: 'rawlist',
            name: 'action',
            message: `${fileType} already exists. What would you like to do?`,
            choices: [
                {
                    name: 'Overwrite (replace with OXC settings only)',
                    value: 'overwrite'
                },
                {
                    name: 'Merge (preserve existing, add OXC settings)',
                    value: 'merge'
                },
                { name: 'Skip', value: 'skip' }
            ],
            default: 'overwrite'
        }
    ])

    return action
}

export type EditorType = 'vscode' | 'zed'

export interface EditorSetupResult {
    vscode: boolean
    zed: boolean
}

export async function promptEditorSelection(): Promise<EditorType[]> {
    const { editors } = await inquirer.prompt<{
        editors: EditorType[]
    }>([
        {
            type: 'checkbox',
            name: 'editors',
            message: 'Select editors to configure:',
            choices: [
                { name: 'VSCode', value: 'vscode' as const },
                { name: 'Zed', value: 'zed' as const }
            ]
        }
    ])

    return editors
}

export async function setupVSCode(
    cwd: string,
    strategy: WriteStrategy = 'merge'
): Promise<boolean> {
    const vscodeDir = resolve(cwd, '.vscode')
    const settingsPath = resolve(vscodeDir, 'settings.json')

    await ensureDir(vscodeDir)

    // 如果文件存在且策略是 merge，使用 key 级别合并
    if (strategy === 'merge' && (await pathExists(settingsPath))) {
        return mergeVSCodeSettings(settingsPath, VSCODE_SETTINGS)
    }

    return safeWriteJson(settingsPath, VSCODE_SETTINGS, { strategy })
}

export async function setupZed(cwd: string, strategy: WriteStrategy = 'merge'): Promise<boolean> {
    const zedDir = resolve(cwd, '.zed')
    const settingsPath = resolve(zedDir, 'settings.json')

    await ensureDir(zedDir)

    return safeWriteJson(settingsPath, ZED_SETTINGS, { strategy })
}

export async function setupEditors(cwd: string): Promise<EditorSetupResult> {
    const selectedEditors = await promptEditorSelection()
    const result: EditorSetupResult = {
        vscode: false,
        zed: false
    }

    if (selectedEditors.includes('vscode')) {
        const vscodeDir = resolve(cwd, '.vscode')
        const settingsPath = resolve(vscodeDir, 'settings.json')
        const fileExists = await pathExists(settingsPath)

        let strategy: WriteStrategy = 'merge'
        if (fileExists) {
            strategy = await promptStrategy('VSCode settings.json')
        }

        result.vscode = await setupVSCode(cwd, strategy)
    }

    if (selectedEditors.includes('zed')) {
        const zedDir = resolve(cwd, '.zed')
        const settingsPath = resolve(zedDir, 'settings.json')
        const fileExists = await pathExists(settingsPath)

        let strategy: WriteStrategy = 'merge'
        if (fileExists) {
            strategy = await promptStrategy('Zed settings.json')
        }

        result.zed = await setupZed(cwd, strategy)
    }

    return result
}
