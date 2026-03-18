import fs from 'fs-extra'
import type { PackageJson } from 'fs-extra'
import { resolve } from 'pathe'
import { PACKAGE_NAMES } from '../constants'

const { existsSync, readJsonSync } = fs

export interface EnvironmentCheckResult {
    hasPackageJson: boolean
    packageJson: PackageJson | null
    packageJsonPath: string
    installedPackages: InstalledPackages
}

export interface InstalledPackages {
    oxfmt: boolean
    oxlint: boolean
    husky: boolean
    lintStaged: boolean
    commitlint: boolean
}

export function checkEnvironment(cwd: string): EnvironmentCheckResult {
    const packageJsonPath = resolve(cwd, 'package.json')
    const hasPackageJson = existsSync(packageJsonPath)

    if (!hasPackageJson) {
        return {
            hasPackageJson: false,
            packageJson: null,
            packageJsonPath,
            installedPackages: {
                oxfmt: false,
                oxlint: false,
                husky: false,
                lintStaged: false,
                commitlint: false
            }
        }
    }

    let packageJson: PackageJson
    try {
        packageJson = readJsonSync(packageJsonPath) as PackageJson
    } catch {
        return {
            hasPackageJson: false,
            packageJson: null,
            packageJsonPath,
            installedPackages: {
                oxfmt: false,
                oxlint: false,
                husky: false,
                lintStaged: false,
                commitlint: false
            }
        }
    }

    const installedPackages = detectInstalledPackages(packageJson)

    return {
        hasPackageJson: true,
        packageJson,
        packageJsonPath,
        installedPackages
    }
}

function detectInstalledPackages(packageJson: PackageJson): InstalledPackages {
    const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
    }

    return {
        oxfmt: PACKAGE_NAMES.oxfmt in deps,
        oxlint: PACKAGE_NAMES.oxlint in deps,
        husky: PACKAGE_NAMES.husky in deps,
        lintStaged: PACKAGE_NAMES.lintStaged in deps,
        commitlint: PACKAGE_NAMES.commitlint in deps
    }
}
