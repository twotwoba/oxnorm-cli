## ADDED Requirements

### Requirement: oxlint installation
The system SHALL install oxlint as a development dependency when not already present.

#### Scenario: Install oxlint with npm
- **WHEN** oxlint is not installed and npm is the package manager
- **THEN** the system SHALL execute `npm install -D oxlint`

#### Scenario: Install oxlint with yarn
- **WHEN** oxlint is not installed and yarn is the package manager
- **THEN** the system SHALL execute `yarn add -D oxlint`

#### Scenario: Install oxlint with pnpm
- **WHEN** oxlint is not installed and pnpm is the package manager
- **THEN** the system SHALL execute `pnpm add -D oxlint`

#### Scenario: Skip oxlint installation
- **WHEN** oxlint is already installed
- **THEN** the system SHALL skip the installation step
- **AND** the system SHALL display a message indicating oxlint is already installed

### Requirement: oxlint configuration file
The system SHALL create .oxlintrc.json configuration file when it does not exist.

#### Scenario: Create oxlint config
- **WHEN** .oxlintrc.json does not exist
- **THEN** the system SHALL create the file with default settings

#### Scenario: Oxlint config already exists
- **WHEN** .oxlintrc.json already exists
- **THEN** the system SHALL preserve the existing configuration

### Requirement: oxlint package.json script
The system SHALL add lint script to package.json when it does not exist.

#### Scenario: Add lint script
- **WHEN** the lint script does not exist in package.json
- **THEN** the system SHALL add `"lint": "oxlint ."` to scripts section

#### Scenario: Lint script already exists
- **WHEN** the lint script already exists in package.json
- **THEN** the system SHALL preserve the existing script
