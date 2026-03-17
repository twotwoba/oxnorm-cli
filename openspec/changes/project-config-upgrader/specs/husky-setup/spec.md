## ADDED Requirements

### Requirement: husky installation
The system SHALL install husky as a development dependency when not already present.

#### Scenario: Install husky with npm
- **WHEN** husky is not installed and npm is the package manager
- **THEN** the system SHALL execute `npm install -D husky`

#### Scenario: Install husky with yarn
- **WHEN** husky is not installed and yarn is the package manager
- **THEN** the system SHALL execute `yarn add -D husky`

#### Scenario: Install husky with pnpm
- **WHEN** husky is not installed and pnpm is the package manager
- **THEN** the system SHALL execute `pnpm add -D husky`

#### Scenario: Skip husky installation
- **WHEN** husky is already installed
- **THEN** the system SHALL skip the installation step
- **AND** the system SHALL display a message indicating husky is already installed

### Requirement: husky initialization
The system SHALL initialize husky in the project.

#### Scenario: Initialize husky
- **WHEN** husky is installed
- **THEN** the system SHALL execute `npx husky init` to create .husky directory
- **AND** the system SHALL configure git hooks path

### Requirement: pre-commit hook
The system SHALL create a pre-commit hook that runs lint-staged.

#### Scenario: Create pre-commit hook
- **WHEN** .husky directory exists
- **THEN** the system SHALL create .husky/pre-commit with content `npx lint-staged`

#### Scenario: Pre-commit hook already exists
- **WHEN** .husky/pre-commit already exists
- **THEN** the system SHALL prompt the user whether to overwrite

### Requirement: commit-msg hook
The system SHALL create a commit-msg hook that runs commitlint.

#### Scenario: Create commit-msg hook
- **WHEN** .husky directory exists
- **THEN** the system SHALL create .husky/commit-msg with content `npx --no -- commitlint --edit $1`

#### Scenario: Commit-msg hook already exists
- **WHEN** .husky/commit-msg already exists
- **THEN** the system SHALL prompt the user whether to overwrite
