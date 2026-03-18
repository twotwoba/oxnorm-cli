import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdirSync, rmSync, writeFileSync } from 'fs-extra'
import { resolve } from 'pathe'
import { detectLegacyConfigFiles } from '../../modules/legacy-cleanup'

describe('legacy-cleanup', () => {
    const testDir = resolve(__dirname, 'test-legacy-cleanup')

    beforeEach(() => {
        mkdirSync(testDir, { recursive: true })
    })

    afterEach(() => {
        rmSync(testDir, { recursive: true, force: true })
    })

    describe('detectLegacyConfigFiles', () => {
        it('should return empty array when no legacy files exist', () => {
            const result = detectLegacyConfigFiles(testDir)
            expect(result).toEqual([])
        })

        it('should detect prettier config files', () => {
            writeFileSync(resolve(testDir, '.prettierrc'), '{}', 'utf-8')
            writeFileSync(resolve(testDir, '.prettierignore'), 'node_modules', 'utf-8')

            const result = detectLegacyConfigFiles(testDir)

            expect(result.length).toBe(2)
            expect(result.every((f) => f.type === 'prettier')).toBe(true)
        })

        it('should detect eslint config files', () => {
            writeFileSync(resolve(testDir, '.eslintrc.json'), '{}', 'utf-8')
            writeFileSync(resolve(testDir, '.eslintignore'), 'dist', 'utf-8')

            const result = detectLegacyConfigFiles(testDir)

            expect(result.length).toBe(2)
            expect(result.every((f) => f.type === 'eslint')).toBe(true)
        })

        it('should detect stylelint config files', () => {
            writeFileSync(resolve(testDir, '.stylelintrc'), '{}', 'utf-8')

            const result = detectLegacyConfigFiles(testDir)

            expect(result.length).toBe(1)
            expect(result[0]?.type).toBe('stylelint')
        })

        it('should detect multiple types of legacy files', () => {
            writeFileSync(resolve(testDir, '.prettierrc'), '{}', 'utf-8')
            writeFileSync(resolve(testDir, '.eslintrc.json'), '{}', 'utf-8')
            writeFileSync(resolve(testDir, '.stylelintrc'), '{}', 'utf-8')

            const result = detectLegacyConfigFiles(testDir)

            expect(result.length).toBe(3)
            const types = new Set(result.map((f) => f.type))
            expect(types.has('prettier')).toBe(true)
            expect(types.has('eslint')).toBe(true)
            expect(types.has('stylelint')).toBe(true)
        })
    })
})
