import fs from 'fs-extra'
import { dirname } from 'pathe'
import { logger } from './logger'

const { existsSync, readJson, writeJson, writeFile, ensureDir } = fs

export type WriteStrategy = 'create' | 'merge' | 'overwrite' | 'skip'

export interface FileWriteOptions {
    strategy?: WriteStrategy
}

export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
    const result = { ...target }

    for (const key of Object.keys(source) as (keyof T)[]) {
        const sourceValue = source[key]
        const targetValue = target[key]

        if (
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null &&
            !Array.isArray(targetValue)
        ) {
            result[key] = deepMerge(
                targetValue as Record<string, unknown>,
                sourceValue as Record<string, unknown>
            ) as T[keyof T]
        } else if (sourceValue !== undefined) {
            result[key] = sourceValue as T[keyof T]
        }
    }

    return result
}

export async function safeWriteJson<T extends Record<string, unknown>>(
    filePath: string,
    content: T,
    options: FileWriteOptions = {}
): Promise<boolean> {
    const { strategy = 'create' } = options

    if (existsSync(filePath)) {
        if (strategy === 'skip') {
            logger.info(`Skipping ${filePath} (file exists)`)
            return false
        }

        if (strategy === 'merge') {
            try {
                const existing = (await readJson(filePath)) as T
                const merged = deepMerge(existing, content)
                await writeJson(filePath, merged, { spaces: 2 })
                logger.success(`Merged configuration into ${filePath}`)
                return true
            } catch (error) {
                logger.error(`Failed to merge ${filePath}: ${error}`)
                return false
            }
        }

        if (strategy === 'overwrite') {
            await writeJson(filePath, content, { spaces: 2 })
            logger.success(`Overwritten ${filePath}`)
            return true
        }

        logger.info(`Skipping ${filePath} (file exists, no strategy specified)`)
        return false
    }

    await writeJson(filePath, content, { spaces: 2 })
    logger.success(`Created ${filePath}`)
    return true
}

export async function safeWriteFile(
    filePath: string,
    content: string,
    options: FileWriteOptions = {}
): Promise<boolean> {
    const { strategy = 'create' } = options

    if (existsSync(filePath)) {
        if (strategy === 'skip') {
            logger.info(`Skipping ${filePath} (file exists)`)
            return false
        }

        if (strategy === 'overwrite') {
            await writeFile(filePath, content, 'utf-8')
            logger.success(`Overwritten ${filePath}`)
            return true
        }

        logger.info(`Skipping ${filePath} (file exists, no strategy specified)`)
        return false
    }

    await ensureDir(dirname(filePath))
    await writeFile(filePath, content, 'utf-8')
    logger.success(`Created ${filePath}`)
    return true
}
