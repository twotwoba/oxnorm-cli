import semver from 'semver'
import { MIN_NODE_VERSION } from '../constants'
import { logger } from '../utils/logger'

export interface VersionCheckResult {
    currentVersion: string
    minVersion: string
    isValid: boolean
}

export function checkNodeVersion(skipCheck = false): VersionCheckResult {
    const currentVersion = process.versions.node
    const isValid = semver.gte(currentVersion, MIN_NODE_VERSION)

    if (skipCheck && !isValid) {
        logger.warning(`Node.js version ${currentVersion} may not be fully compatible.`)
        logger.warning(`Recommended version: >= ${MIN_NODE_VERSION}`)
    }

    return {
        currentVersion,
        minVersion: MIN_NODE_VERSION,
        isValid: skipCheck || isValid
    }
}

export function getVersionUpgradeInstructions(): string {
    return `
To upgrade Node.js, you can use one of the following methods:

1. Using nvm (Node Version Manager):
   nvm install 20
   nvm use 20

2. Using fnm (Fast Node Manager):
   fnm install 20
   fnm use 20

3. Download directly from https://nodejs.org/

Recommended: Node.js 20.x LTS or later
`.trim()
}
