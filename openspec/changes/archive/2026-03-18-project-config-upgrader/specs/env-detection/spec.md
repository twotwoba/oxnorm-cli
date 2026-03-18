## ADDED Requirements

### Requirement: Package.json detection

The system SHALL detect the presence of package.json in the current working directory before proceeding with any configuration.

#### Scenario: Valid project directory

- **WHEN** the current directory contains a valid package.json file
- **THEN** the system SHALL proceed to the next configuration step

#### Scenario: Invalid project directory

- **WHEN** the current directory does not contain a package.json file
- **THEN** the system SHALL display a friendly error message indicating the user should run the command in a project directory
- **AND** the system SHALL exit with a non-zero status code

### Requirement: Installed package detection

The system SHALL detect if configuration-related packages are already installed in the project.

#### Scenario: Detect oxfmt installation

- **WHEN** the system checks for oxfmt in package.json dependencies or devDependencies
- **THEN** the system SHALL return the installation status

#### Scenario: Detect oxlint installation

- **WHEN** the system checks for oxlint in package.json dependencies or devDependencies
- **THEN** the system SHALL return the installation status

#### Scenario: Detect husky installation

- **WHEN** the system checks for husky in package.json dependencies or devDependencies
- **THEN** the system SHALL return the installation status

#### Scenario: Detect lint-staged installation

- **WHEN** the system checks for lint-staged in package.json dependencies or devDependencies
- **THEN** the system SHALL return the installation status

#### Scenario: Detect commitlint installation

- **WHEN** the system checks for @commitlint/cli in package.json dependencies or devDependencies
- **THEN** the system SHALL return the installation status

### Requirement: Package manager detection

The system SHALL automatically detect the package manager used by the project.

#### Scenario: Detect npm

- **WHEN** the project contains package-lock.json
- **THEN** the system SHALL identify npm as the package manager

#### Scenario: Detect yarn

- **WHEN** the project contains yarn.lock
- **THEN** the system SHALL identify yarn as the package manager

#### Scenario: Detect pnpm

- **WHEN** the project contains pnpm-lock.yaml
- **THEN** the system SHALL identify pnpm as the package manager

#### Scenario: No lock file found

- **WHEN** no lock file is found in the project
- **THEN** the system SHALL prompt the user to select a package manager
