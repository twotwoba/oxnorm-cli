# oxnorm

A CLI tool to help developers quickly configure [oxlint](https://oxc.rs/docs/guide/usage/linter.html), [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html), [husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/lint-staged/lint-staged), and [commitlint](https://commitlint.js.org/) for their projects.

## Features

- 🚀 **One-command setup** - Configure all tools with a single command
- 🔍 **Smart detection** - Automatically detects already installed packages
- 🧹 **Legacy cleanup** - Optionally removes old prettier/eslint/stylelint configs
- 📝 **Editor support** - Generates VSCode and Zed editor configurations
- 🔒 **Version validation** - Ensures Node.js compatibility with Vite 8 and OXC
- 📦 **Package manager aware** - Auto-detects npm, yarn, or pnpm

## Requirements

- Node.js >= 18.18.0
- A project with `package.json`

## Installation

```bash
# Using pnpm (recommended)
pnpm add oxnorm -g
# Using npm
npm install oxnorm -g
```

## Usage

### Initialize project configuration

```bash
# Run in your project directory
ox init
```

This will:
1. Check your Node.js version
2. Ask which editors to configure (VSCode/Zed)
3. Ask about removing legacy config files
4. Install and configure all tools

### Skip version check

```bash
ox init --skip-version-check
```

## What gets configured

### oxfmt
- Installs `oxfmt` as dev dependency
- Adds `format` script to package.json

### oxlint
- Installs `oxlint` as dev dependency
- Creates `.oxlintrc.json` configuration
- Adds `lint` script to package.json

### husky
- Installs `husky` as dev dependency
- Creates `.husky/pre-commit` hook
- Creates `.husky/commit-msg` hook

### lint-staged
- Installs `lint-staged` as dev dependency
- Configures lint-staged in package.json

### commitlint
- Installs `@commitlint/cli` and `@commitlint/config-conventional`
- Creates `commitlint.config.js` with custom rules

### Editor configuration

**VSCode** (`.vscode/settings.json`):
```json
{
    "oxc.fmt.configPath": ".oxfmtrc.json",
    "editor.defaultFormatter": "oxc.oxc-vscode",
    "editor.formatOnSave": true,
}
```

**Zed** (`.zed/settings.json`):
```json
{
  "tab_size": 4,
  "format_on_save": "on",
  "formatter": "language_server",
  "languages": {
    "TypeScript": { "formatter": { "language_server": { "name": "oxfmt" } } },
    "JavaScript": { "formatter": { "language_server": { "name": "oxfmt" } } },
    // ...
  }
}
```

## Commit Message Convention

This tool configures commitlint with the following commit types:

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system changes |
| `ci` | CI/CD configuration |
| `chore` | Maintenance tasks |
| `revert` | Revert a previous commit |
| `release` | Release version |

Example: `feat: add user authentication`

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint
pnpm lint

# Format
pnpm format
```

## License

MIT
