## ADDED Requirements

### Requirement: Editor selection prompt

The system SHALL prompt the user to select their preferred code editor.

#### Scenario: Display editor options

- **WHEN** the editor setup phase begins
- **THEN** the system SHALL display options: VSCode, Zed, Both, None (skip)

#### Scenario: User selects VSCode

- **WHEN** user selects VSCode
- **THEN** the system SHALL configure .vscode/settings.json

#### Scenario: User selects Zed

- **WHEN** user selects Zed
- **THEN** the system SHALL configure .zed/settings.json

#### Scenario: User selects Both

- **WHEN** user selects Both
- **THEN** the system SHALL configure both .vscode/settings.json and .zed/settings.json

#### Scenario: User selects None

- **WHEN** user selects None (skip)
- **THEN** the system SHALL skip editor configuration
- **AND** the system SHALL proceed to the next phase

### Requirement: VSCode configuration

The system SHALL create or update .vscode/settings.json with OXC integration settings.

#### Scenario: Create VSCode config

- **WHEN** .vscode/settings.json does not exist
- **THEN** the system SHALL create the file with the following content:

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.oxc": "always"
    }
}
```

#### Scenario: VSCode config already exists

- **WHEN** .vscode/settings.json already exists
- **THEN** the system SHALL prompt user to choose: merge, overwrite, or skip

#### Scenario: Merge VSCode config

- **WHEN** user chooses to merge existing config
- **THEN** the system SHALL perform deep merge preserving existing settings
- **AND** the system SHALL add OXC-specific settings

#### Scenario: Overwrite VSCode config

- **WHEN** user chooses to overwrite existing config
- **THEN** the system SHALL replace the file with new OXC configuration

### Requirement: Zed configuration

The system SHALL create or update .zed/settings.json with OXC integration settings.

#### Scenario: Create Zed config

- **WHEN** .zed/settings.json does not exist
- **THEN** the system SHALL create the file with the following content:

```json
{
    "tab_size": 4,
    "format_on_save": "on",
    "formatter": "language_server",
    "languages": {
        "TypeScript": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        },
        "JavaScript": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        },
        "TSX": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        },
        "Vue.js": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        },
        "JSON": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        },
        "JSONC": {
            "formatter": {
                "language_server": {
                    "name": "oxfmt"
                }
            }
        }
    }
}
```

#### Scenario: Zed config already exists

- **WHEN** .zed/settings.json already exists
- **THEN** the system SHALL prompt user to choose: merge, overwrite, or skip

#### Scenario: Merge Zed config

- **WHEN** user chooses to merge existing config
- **THEN** the system SHALL perform deep merge preserving existing settings
- **AND** the system SHALL add OXC-specific language formatter settings

#### Scenario: Overwrite Zed config

- **WHEN** user chooses to overwrite existing config
- **THEN** the system SHALL replace the file with new OXC configuration

### Requirement: Safe file writing

The system SHALL NOT overwrite configuration files without user confirmation.

#### Scenario: File exists confirmation

- **WHEN** any configuration file already exists
- **THEN** the system SHALL prompt for user confirmation before modifying
- **AND** the system SHALL provide options: merge, overwrite, skip

#### Scenario: Preserve user customizations

- **WHEN** merging configuration files
- **THEN** the system SHALL preserve all existing user settings
- **AND** the system SHALL only add new OXC-related settings
