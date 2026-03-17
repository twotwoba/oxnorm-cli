## ADDED Requirements

### Requirement: lint-staged installation
The system SHALL install lint-staged as a development dependency when not already present.

#### Scenario: Install lint-staged with npm
- **WHEN** lint-staged is not installed and npm is the package manager
- **THEN** the system SHALL execute `npm install -D lint-staged`

#### Scenario: Install lint-staged with yarn
- **WHEN** lint-staged is not installed and yarn is the package manager
- **THEN** the system SHALL execute `yarn add -D lint-staged`

#### Scenario: Install lint-staged with pnpm
- **WHEN** lint-staged is not installed and pnpm is the package manager
- **THEN** the system SHALL execute `pnpm add -D lint-staged`

#### Scenario: Skip lint-staged installation
- **WHEN** lint-staged is already installed
- **THEN** the system SHALL skip the installation step
- **AND** the system SHALL display a message indicating lint-staged is already installed

### Requirement: lint-staged configuration
The system SHALL create lint-staged configuration in package.json.

#### Scenario: Create lint-staged config
- **WHEN** lint-staged configuration does not exist in package.json
- **THEN** the system SHALL add lint-staged configuration with oxlint and oxfmt for supported file types

#### Scenario: lint-staged config already exists
- **WHEN** lint-staged configuration already exists in package.json
- **THEN** the system SHALL prompt the user whether to merge or overwrite

### Requirement: lint-staged configuration format
The system SHALL configure lint-staged to run oxlint and oxfmt on appropriate file types.

#### Scenario: Configure for JavaScript/TypeScript files
- **WHEN** lint-staged configuration is created
- **THEN** the system SHALL include rules for `*.{js,jsx,ts,tsx}` files
- **AND** the rules SHALL run `oxlint --fix` and `oxfmt --write`

#### Scenario: Configure for other supported files
- **WHEN** lint-staged configuration is created
- **THEN** the system SHALL include rules for `*.{json,md,yml,yaml}` files
