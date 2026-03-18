import { Command } from 'commander'
import figlet from 'figlet'
import gradient from 'gradient-string'
import { initCommand } from './commands/init'
import { logger } from './utils/logger'
import packageJson from '../package.json' with { type: 'json' }

const displayBanner = (): void => {
    console.clear()
    const banner = figlet.textSync('oxnorm', {
        font: 'Slant',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })
    console.log(gradient.pastel.multiline(banner))
    logger.newline()
    logger.info(`v${packageJson.version}`)
    logger.info('A CLI tool to configure oxlint, oxfmt, husky, lint-staged, and commitlint')
    logger.newline()
}

const program = new Command()

program
    .name('ox')
    .description('Configure oxlint, oxfmt, husky, lint-staged, and commitlint for your project')
    .version(packageJson.version, '-v, --version', 'Output the current version')
    .helpOption('-h, --help', 'Display help for command')

program
    .command('init')
    .description('Initialize project configuration')
    .option('--skip-version-check', 'Skip Node.js version check')
    .action(async (options) => {
        displayBanner()
        await initCommand({
            skipVersionCheck: options.skipVersionCheck ?? false
        })
    })

program.parse()
