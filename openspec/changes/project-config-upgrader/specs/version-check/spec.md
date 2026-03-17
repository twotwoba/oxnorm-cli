## ADDED Requirements

### Requirement: Node.js version detection
The system SHALL detect the current Node.js version running on the user's machine.

#### Scenario: Detect Node.js version
- **WHEN** the system starts the version check
- **THEN** the system SHALL retrieve the current Node.js version from process.versions.node

### Requirement: Minimum version validation
The system SHALL validate that the Node.js version meets the minimum requirement for Vite 8 and OXC tools.

#### Scenario: Version meets requirement
- **WHEN** the detected Node.js version is greater than or equal to 18.18.0
- **THEN** the system SHALL proceed to the next configuration step

#### Scenario: Version below requirement
- **WHEN** the detected Node.js version is below 18.18.0
- **THEN** the system SHALL display an error message with the version requirement
- **AND** the system SHALL display instructions for upgrading Node.js
- **AND** the system SHALL exit with a non-zero status code

### Requirement: Version comparison using semver
The system SHALL use semver library for accurate version comparison.

#### Scenario: Compare versions correctly
- **WHEN** comparing Node.js versions
- **THEN** the system SHALL use semver.satisfies or semver.gte for accurate comparison
- **AND** the system SHALL handle pre-release versions correctly

### Requirement: User option to bypass version check
The system SHALL allow users to bypass version check with a warning.

#### Scenario: User bypasses version check
- **WHEN** user provides --skip-version-check flag
- **THEN** the system SHALL display a warning about potential compatibility issues
- **AND** the system SHALL proceed with configuration despite version mismatch
