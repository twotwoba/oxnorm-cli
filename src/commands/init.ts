import ora from 'ora'
import { logger } from '../utils/logger'
import { detectPackageManager } from '../utils/package-manager'
import { checkEnvironment } from '../modules/env-check'
import { checkNodeVersion, getVersionUpgradeInstructions } from '../modules/version-check'
import {
    detectLegacyConfigFiles,
    promptLegacyCleanup,
    removeLegacyFiles
} from '../modules/legacy-cleanup'
import { setupEditors } from '../modules/editor-setup'
import { setupOxfmt } from '../modules/oxfmt'
import { setupOxlint } from '../modules/oxlint'
import { setupHusky } from '../modules/husky'
import { setupLintStaged } from '../modules/lint-staged'
import { setupCommitlint } from '../modules/commitlint'

export interface InitOptions {
    skipVersionCheck: boolean
}

export async function initCommand(options: InitOptions): Promise<void> {
    const cwd = process.cwd()

    // Step 1: Environment check
    const envSpinner = ora('Checking environment...').start()
    const envResult = checkEnvironment(cwd)

    if (!envResult.hasPackageJson) {
        envSpinner.fail('package.json not found')
        logger.error('Please run this command in a Node.js project directory.')
        process.exit(1)
    }

    if (!envResult.packageJson) {
        envSpinner.fail('Failed to read package.json')
        logger.error('package.json is not valid JSON.')
        process.exit(1)
    }

    envSpinner.succeed('Environment check passed')

    // Step 2: Version check
    if (!options.skipVersionCheck) {
        const versionSpinner = ora('Checking Node.js version...').start()
        const versionResult = checkNodeVersion()

        if (!versionResult.isValid) {
            versionSpinner.fail(`Node.js version ${versionResult.currentVersion} is not supported`)
            logger.error(`This tool requires Node.js >= ${versionResult.minVersion}`)
            logger.info(getVersionUpgradeInstructions())
            process.exit(1)
        }

        versionSpinner.succeed(
            `Node.js version ${versionResult.currentVersion} (>= ${versionResult.minVersion})`
        )
    } else {
        logger.warning('Skipping Node.js version check')
    }

    // Detect package manager
    const packageManager = await detectPackageManager(cwd)
    logger.info(`Detected package manager: ${packageManager}`)

    // Step 3: Editor setup
    logger.title('Editor Configuration')
    await setupEditors(cwd)

    // Step 4: Legacy cleanup
    logger.title('Legacy Config Cleanup')
    const legacyFiles = detectLegacyConfigFiles(cwd)
    const filesToRemove = await promptLegacyCleanup(legacyFiles)
    if (filesToRemove.length > 0) {
        removeLegacyFiles(filesToRemove)
    }

    // Step 5-9: Install and configure tools
    logger.title('Installing and Configuring Tools')

    await setupOxfmt(
        envResult.packageJson,
        envResult.packageJsonPath,
        cwd,
        packageManager,
        envResult.installedPackages.oxfmt
    )

    await setupOxlint(
        envResult.packageJson,
        envResult.packageJsonPath,
        cwd,
        packageManager,
        envResult.installedPackages.oxlint
    )

    await setupHusky(
        envResult.packageJson,
        envResult.packageJsonPath,
        cwd,
        packageManager,
        envResult.installedPackages.husky
    )

    await setupLintStaged(
        envResult.packageJson,
        envResult.packageJsonPath,
        cwd,
        packageManager,
        envResult.installedPackages.lintStaged
    )

    await setupCommitlint(cwd, packageManager, envResult.installedPackages.commitlint)

    // Done
    logger.newline()
    logger.success('🎉 Project configuration complete!')
    logger.info('You can now use the following commands:')
    logger.step('pnpm lint     - Run oxlint')
    logger.step('pnpm format   - Run oxfmt')
    logger.step('git commit    - Commit with commitlint validation')
}
