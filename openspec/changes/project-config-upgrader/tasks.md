## 1. Project Setup

- [ ] 1.1 Initialize project with package.json and TypeScript configuration (strict mode)
- [ ] 1.2 Install core dependencies (commander, inquirer, execa, fs-extra, pathe, ora, chalk, gradient-string, figlet, detect-package-manager, semver)
- [ ] 1.3 Install dev dependencies (vite, vitest, oxlint, oxfmt, typescript, @types/node)
- [ ] 1.4 Configure Vite build for CLI output (ESM format)
- [ ] 1.5 Create source directory structure (commands/, modules/, utils/, constants/, __tests__/)
- [ ] 1.6 Configure Vitest with coverage settings

## 2. CLI Entry Point

- [ ] 2.1 Create index.ts with CLI entry point using commander.js
- [ ] 2.2 Implement ASCII art welcome banner using figlet and gradient-string
- [ ] 2.3 Create init command registration
- [ ] 2.4 Add --version and --help flags
- [ ] 2.5 Add --skip-version-check flag support

## 3. Utility Modules

- [ ] 3.1 Create logger utility with chalk for colored output
- [ ] 3.2 Create executor utility wrapping execa for cross-platform command execution
- [ ] 3.3 Create package-manager utility using detect-package-manager
- [ ] 3.4 Create file-utils with safe JSON write and deep merge functions
- [ ] 3.5 Create constants file with file patterns and configuration templates

## 4. Environment Detection Module

- [ ] 4.1 Implement package.json existence check
- [ ] 4.2 Implement installed package detection (oxfmt, oxlint, husky, lint-staged, commitlint)
- [ ] 4.3 Implement package manager detection (npm, yarn, pnpm)
- [ ] 4.4 Add friendly error messages for invalid environments
- [ ] 4.5 Write unit tests for environment detection module

## 5. Version Check Module

- [ ] 5.1 Implement Node.js version detection using process.versions.node
- [ ] 5.2 Implement minimum version validation (>= 18.18.0) using semver
- [ ] 5.3 Add error message with upgrade instructions for unsupported versions
- [ ] 5.4 Implement --skip-version-check bypass with warning
- [ ] 5.5 Write unit tests for version check module

## 6. Editor Setup Module

- [ ] 6.1 Implement editor selection prompt (VSCode, Zed, Both, None)
- [ ] 6.2 Implement VSCode .vscode/settings.json creation with OXC settings
- [ ] 6.3 Implement Zed .zed/settings.json creation with OXC settings
- [ ] 6.4 Implement safe file write with existence check
- [ ] 6.5 Implement deep merge for existing configuration files
- [ ] 6.6 Add merge/overwrite/skip prompt for existing configs
- [ ] 6.7 Write unit tests for editor setup module

## 7. Legacy Cleanup Module

- [ ] 7.1 Implement prettier config file detection (.prettierrc*, .prettierignore, prettier.config.*)
- [ ] 7.2 Implement eslint config file detection (.eslintrc*, .eslintignore, eslint.config.*)
- [ ] 7.3 Implement stylelint config file detection (.stylelintrc*, .stylelintignore, stylelint.config.*)
- [ ] 7.4 Create interactive file selection UI with inquirer
- [ ] 7.5 Implement file deletion with confirmation messages
- [ ] 7.6 Write unit tests for legacy cleanup module

## 8. Oxfmt Setup Module

- [ ] 8.1 Implement oxfmt installation with package manager detection
- [ ] 8.2 Implement format script addition to package.json
- [ ] 8.3 Add skip logic for already installed oxfmt
- [ ] 8.4 Write unit tests for oxfmt setup module

## 9. Oxlint Setup Module

- [ ] 9.1 Implement oxlint installation with package manager detection
- [ ] 9.2 Create .oxlintrc.json configuration file template
- [ ] 9.3 Implement lint script addition to package.json
- [ ] 9.4 Add skip logic for already installed oxlint
- [ ] 9.5 Write unit tests for oxlint setup module

## 10. Husky Setup Module

- [ ] 10.1 Implement husky installation with package manager detection
- [ ] 10.2 Implement husky initialization using `npx husky init`
- [ ] 10.3 Create .husky/pre-commit hook with `npx lint-staged`
- [ ] 10.4 Create .husky/commit-msg hook with `npx --no -- commitlint --edit $1`
- [ ] 10.5 Add overwrite confirmation for existing hooks
- [ ] 10.6 Write unit tests for husky setup module

## 11. Lint-staged Setup Module

- [ ] 11.1 Implement lint-staged installation with package manager detection
- [ ] 11.2 Create lint-staged configuration for JavaScript/TypeScript files
- [ ] 11.3 Create lint-staged configuration for JSON/YAML/Markdown files
- [ ] 11.4 Add merge/overwrite logic for existing lint-staged config
- [ ] 11.5 Write unit tests for lint-staged setup module

## 12. Commitlint Setup Module

- [ ] 12.1 Implement @commitlint/cli and @commitlint/config-conventional installation
- [ ] 12.2 Create commitlint.config.js template with custom rules
- [ ] 12.3 Add commit types configuration (feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, release)
- [ ] 12.4 Add overwrite confirmation for existing commitlint config
- [ ] 12.5 Write unit tests for commitlint setup module

## 13. Init Command Orchestration

- [ ] 13.1 Create init command handler that orchestrates all modules
- [ ] 13.2 Implement sequential execution flow (env-check → version-check → editor-setup → cleanup → oxfmt → oxlint → husky → lint-staged → commitlint)
- [ ] 13.3 Add progress indicators using ora spinner
- [ ] 13.4 Implement summary display at completion
- [ ] 13.5 Add error handling and rollback for failed steps

## 14. Testing

- [ ] 14.1 Set up Vitest test environment with coverage configuration
- [ ] 14.2 Create mock utilities for execa, fs-extra, and inquirer
- [ ] 14.3 Write unit tests for all utility modules (logger, executor, file-utils, package-manager)
- [ ] 14.4 Write unit tests for version-check module
- [ ] 14.5 Write unit tests for editor-setup module
- [ ] 14.6 Write unit tests for legacy-cleanup module
- [ ] 14.7 Write unit tests for all setup modules (oxfmt, oxlint, husky, lint-staged, commitlint)
- [ ] 14.8 Write integration tests for full init flow
- [ ] 14.9 Achieve minimum 80% test coverage

## 15. Documentation and Polish

- [ ] 15.1 Add README.md with installation and usage instructions
- [ ] 15.2 Document all CLI flags and options
- [ ] 15.3 Add inline code comments for complex logic
- [ ] 15.4 Test on Windows, macOS, and Linux
- [ ] 15.5 Final code review and cleanup with oxlint and oxfmt
