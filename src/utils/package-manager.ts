import { detect } from 'detect-package-manager'

import type { PackageManager } from './executor'

export type { PackageManager }

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
    try {
        const pm = await detect({ cwd })
        return pm ?? 'npm'
    } catch {
        return 'npm'
    }
}

export function getInstallCommand(packageManager: PackageManager, isDev = true): string[] {
    switch (packageManager) {
        case 'npm':
            return ['install', isDev ? '-D' : '-S']
        case 'yarn':
            return ['add', isDev ? '-D' : ''].filter(Boolean)
        case 'pnpm':
            return ['add', '-D']
        case 'bun':
            return ['bun', '-d']
    }
}

export function getRunCommand(packageManager: PackageManager): string {
    switch (packageManager) {
        case 'npm':
            return 'npx'
        case 'yarn':
            return 'yarn'
        case 'pnpm':
            return 'pnpm'
        case 'bun':
            return 'bun'
    }
}
