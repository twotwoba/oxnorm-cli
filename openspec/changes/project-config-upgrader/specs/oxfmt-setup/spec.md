## ADDED Requirements

### Requirement: oxfmt installation

The system SHALL install oxfmt as a development dependency when not already present.

#### Scenario: Install oxfmt with npm

- **WHEN** oxfmt is not installed and npm is the package manager
- **THEN** the system SHALL execute `npm install -D oxfmt`

#### Scenario: Install oxfmt with yarn

- **WHEN** oxfmt is not installed and yarn is the package manager
- **THEN** the system SHALL execute `yarn add -D oxfmt`

#### Scenario: Install oxfmt with pnpm

- **WHEN** oxfmt is not installed and pnpm is the package manager
- **THEN** the system SHALL execute `pnpm add -D oxfmt`

#### Scenario: Skip oxfmt installation

- **WHEN** oxfmt is already installed
- **THEN** the system SHALL skip the installation step
- **AND** the system SHALL display a message indicating oxfmt is already installed

### Requirement: oxfmt package.json script

The system SHALL add format script to package.json when it does not exist.

#### Scenario: Add format script

- **WHEN** the format script does not exist in package.json
- **THEN** the system SHALL add `"format": "oxfmt --write ."` to scripts section

#### Scenario: Format script already exists

- **WHEN** the format script already exists in package.json
- **THEN** the system SHALL preserve the existing script
