## Why

开发者在新项目或现有项目中配置代码质量工具（oxlint、oxfmt、husky、lint-staged、commitlint）通常需要手动安装多个依赖、创建配置文件、设置 git hooks，过程繁琐且容易遗漏。现有的 prettier、eslint、stylelint 配置也需要手动清理，容易产生冲突。需要一个 CLI 工具自动化这一流程，帮助开发者快速完成项目配置升级。

## What Changes

- 新增 CLI 工具 `oxnorm`，用于自动化项目配置升级
- 实现包检测功能，自动识别已安装的工具包并跳过对应配置阶段
- 实现旧配置文件清理功能，支持交互式询问用户是否删除 prettier、eslint、stylelint 相关文件
- 实现 husky 自动配置，生成 `pre-commit` 和 `commit-msg` hooks
- 实现 commitlint 自动配置，安装依赖并生成符合团队规范的 `commitlint.config.js`
- 实现 oxfmt 和 oxlint 的自动安装与基础配置
- 实现版本兼容性校验，检测 Node.js 版本是否支持 Vite 8 和 OXC 工具链
- 实现编辑器配置功能，支持 VSCode 和 Zed 编辑器的配置文件生成
- 支持跨平台命令执行（Windows/macOS/Linux）

## Capabilities

### New Capabilities

- `env-detection`: 检测当前目录环境（package.json 存在性、已安装包检测）
- `version-check`: Node.js 版本校验，确保兼容 Vite 8 和 OXC 工具链
- `legacy-cleanup`: 旧配置文件清理（prettier、eslint、stylelint 相关文件）
- `oxlint-setup`: oxlint 安装与配置
- `oxfmt-setup`: oxfmt 安装与配置
- `husky-setup`: husky 安装与 git hooks 配置（pre-commit、commit-msg）
- `lint-staged-setup`: lint-staged 安装与配置
- `commitlint-setup`: commitlint 安装与配置（包含自定义规则）
- `editor-setup`: 编辑器配置生成（VSCode .vscode/settings.json、Zed .zed/settings.json）

### Modified Capabilities

无（新项目）

## Impact

- 新增 CLI 入口文件及命令行参数解析
- 新增多个配置模块（环境检测、版本校验、清理、各工具安装配置、编辑器配置）
- 依赖：commander.js、inquirer、execa、fs-extra、pathe、detect-package-manager、ora、chalk、gradient-string、figlet、semver
- 支持的包管理器：npm、yarn、pnpm（自动检测）
- 生成的配置文件：`commitlint.config.js`、`.husky/pre-commit`、`.husky/commit-msg`、`lint-staged` 配置、`.vscode/settings.json`、`.zed/settings.json`
- 最低 Node.js 版本要求：根据 Vite 8 和 OXC 的兼容性确定
