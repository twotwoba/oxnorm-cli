## ADDED Requirements

### Requirement: commitlint installation

The system SHALL install commitlint packages as development dependencies when not already present.

#### Scenario: Install commitlint with npm

- **WHEN** @commitlint/cli is not installed and npm is the package manager
- **THEN** the system SHALL execute `npm install -D @commitlint/cli @commitlint/config-conventional`

#### Scenario: Install commitlint with yarn

- **WHEN** @commitlint/cli is not installed and yarn is the package manager
- **THEN** the system SHALL execute `yarn add -D @commitlint/cli @commitlint/config-conventional`

#### Scenario: Install commitlint with pnpm

- **WHEN** @commitlint/cli is not installed and pnpm is the package manager
- **THEN** the system SHALL execute `pnpm add -D @commitlint/cli @commitlint/config-conventional`

#### Scenario: Skip commitlint installation

- **WHEN** @commitlint/cli is already installed
- **THEN** the system SHALL skip the installation step
- **AND** the system SHALL display a message indicating commitlint is already installed

### Requirement: commitlint configuration file

The system SHALL create commitlint.config.js with predefined rules.

#### Scenario: Create commitlint config

- **WHEN** commitlint.config.js does not exist
- **THEN** the system SHALL create the file with conventional commit rules
- **AND** the configuration SHALL extend @commitlint/config-conventional
- **AND** the configuration SHALL include custom type-enum rule with allowed types

#### Scenario: Commitlint config already exists

- **WHEN** commitlint.config.js already exists
- **THEN** the system SHALL prompt the user whether to overwrite

### Requirement: commitlint configuration content

The system SHALL create commitlint configuration with specific rules.

#### Scenario: Type-enum rule

- **WHEN** commitlint.config.js is created
- **THEN** the configuration SHALL enforce allowed commit types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, release

#### Scenario: Subject rules

- **WHEN** commitlint.config.js is created
- **THEN** the configuration SHALL require non-empty subject
- **AND** the configuration SHALL forbid period at end of subject

#### Scenario: Header length rule

- **WHEN** commitlint.config.js is created
- **THEN** the configuration SHALL limit header to 72 characters

#### Scenario: Case rules

- **WHEN** commitlint.config.js is created
- **THEN** the configuration SHALL require lowercase type
