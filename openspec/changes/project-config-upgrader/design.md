## Context

开发者在新项目或现有项目中配置代码质量工具时，需要处理多个独立的 npm 包、创建配置文件、设置 git hooks。当前没有统一的工具来自动化这一流程，导致：

1. 配置过程耗时且容易出错
2. 不同项目的配置可能不一致
3. 旧的 prettier/eslint/stylelint 配置可能与新工具冲突
4. 跨平台兼容性问题（Windows/macOS/Linux）
5. 编辑器配置需要手动设置，容易遗漏

本项目旨在提供一个 CLI 工具，自动化完成 oxfmt、oxlint、husky、lint-staged、commitlint 的安装与配置，并提供编辑器配置支持。

## Goals / Non-Goals

**Goals:**

- 自动检测项目环境和已安装的包，智能跳过已配置的工具
- 校验 Node.js 版本兼容性，确保支持 Vite 8 和 OXC 工具链
- 交互式清理旧的 prettier、eslint、stylelint 配置文件
- 自动安装并配置 oxfmt、oxlint、husky、lint-staged、commitlint
- 生成符合团队规范的 commitlint 配置文件
- 支持编辑器配置生成（VSCode 和 Zed）
- 跨平台支持（Windows、macOS、Linux）
- 自动检测并使用项目的包管理器（npm/yarn/pnpm）
- 完善的单元测试和集成测试覆盖

**Non-Goals:**

- 不处理 monorepo 场景（暂不支持）
- 不支持自定义 commitlint 规则模板（使用内置规则）
- 不处理 CI/CD 配置
- 不支持旧版本 Node.js（要求 Node.js >= 18.18.0，Vite 8 最低要求）

## Decisions

### 1. 包管理器检测

**决策**: 使用 `detect-package-manager` 库自动检测项目使用的包管理器

**理由**:

- 支持检测 npm、yarn、pnpm
- 根据锁文件（package-lock.json、yarn.lock、pnpm-lock.yaml）准确判断
- 避免混用包管理器导致的依赖问题

**备选方案**: 让用户手动指定包管理器（用户体验差）

### 2. 跨平台命令执行

**决策**: 使用 `execa` 执行 shell 命令，配合 `pathe` 处理路径

**理由**:

- `execa` 提供跨平台的进程执行能力
- `pathe` 是跨平台路径处理库，替代 Node.js 原生 path 模块，更好的跨平台支持
- 避免 Windows 上 shell 脚本兼容性问题

**备选方案**: 使用 Node.js 原生 `child_process`（功能较弱，错误处理复杂）

### 3. Git Hooks 配置

**决策**: 使用 husky 的现代 API（v9+），通过 `husky init` 初始化

**理由**:

- husky v9 简化了配置流程
- 自动处理 git config core.hooksPath
- 跨平台兼容性更好

**备选方案**: 手动创建 .husky 目录和配置 git hooksPath（容易出错）

### 4. 交互式 UI

**决策**: 使用 `inquirer` 进行交互式问答，`ora` 显示进度，`chalk`/`gradient-string`/`figlet` 美化输出

**理由**:

- inquirer 提供丰富的交互组件（选择、确认、输入）
- ora 提供 elegant 的 loading 动画
- chalk 提供终端颜色支持
- figlet 和 gradient-string 用于启动欢迎界面

**备选方案**: 使用原生 readline（功能有限，体验差）

### 5. 版本兼容性校验

**决策**: 使用 `semver` 库进行 Node.js 版本校验

**理由**:

- Vite 8 要求 Node.js >= 18.18.0（支持 Node.js 18 的最新版本）
- OXC 工具链同样需要较新的 Node.js 版本
- semver 提供标准的版本比较能力
- 在工具安装前进行校验，避免安装后无法使用

**最低版本要求**: Node.js >= 18.18.0

**备选方案**: 不做版本校验，让用户自行处理兼容问题（用户体验差）

### 6. 编辑器配置

**决策**: 支持主流编辑器（VSCode 和 Zed）的配置文件生成

**理由**:

- VSCode 是最流行的编辑器，.vscode/settings.json 配置广泛使用
- Zed 是新兴的高性能编辑器，.zed/settings.json 配置格式不同
- 自动配置编辑器可以确保保存时自动格式化和 lint 修复
- 询问用户选择，而非自动检测（更准确）

**配置策略**:

- 检测现有配置文件，存在时询问是否合并/覆盖
- 使用深度合并策略，保留用户自定义配置
- 不暴力覆盖，保护用户已有的个性化设置

**VSCode 配置内容**:

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.oxc": "always"
    }
}
```

**Zed 配置内容**:

```json
{
    "tab_size": 4,
    "format_on_save": "on",
    "formatter": "language_server",
    "languages": {
        "TypeScript": { "formatter": { "language_server": { "name": "oxfmt" } } },
        "JavaScript": { "formatter": { "language_server": { "name": "oxfmt" } } },
        "TSX": { "formatter": { "language_server": { "name": "oxfmt" } } },
        "Vue.js": { "formatter": { "language_server": { "name": "oxfmt" } } },
        "JSON": { "formatter": { "language_server": { "name": "oxfmt" } } },
        "JSONC": { "formatter": { "language_server": { "name": "oxfmt" } } }
    }
}
```

### 7. 配置文件写入策略

**决策**: 采用安全的配置文件写入策略，不暴力覆盖

**理由**:

- 保护用户已有的配置不被意外覆盖
- 提供合并、覆盖、跳过三种选项
- 对于 JSON 配置文件，使用深度合并

**实现策略**:

1. 检测目标文件是否存在
2. 不存在时直接创建
3. 存在时询问用户：合并（merge）/ 覆盖（overwrite）/ 跳过（skip）
4. 合并时使用深度合并，保留原有配置

### 8. 配置阶段流程

**决策**: 按以下顺序执行配置阶段

```
1. 环境检测（package.json）
2. Node.js 版本校验
3. 编辑器选择与配置
4. 旧配置清理询问（prettier/eslint/stylelint）
5. oxfmt 配置
6. oxlint 配置
7. husky 配置
8. lint-staged 配置
9. commitlint 配置
```

**理由**:

- 版本校验在最前面，避免后续操作因版本不兼容失败
- 编辑器配置在清理之前，因为编辑器配置是新增的
- 先清理旧配置，避免冲突
- oxfmt/oxlint 先配置，因为 lint-staged 依赖它们
- husky 在 lint-staged 之前，因为需要创建 .husky 目录
- commitlint 最后，因为需要创建 commit-msg hook

### 9. 模块架构

**决策**: 采用模块化设计，每个工具对应独立的配置模块

```
src/
├── index.ts              # CLI 入口
├── commands/
│   └── init.ts           # init 命令
├── modules/
│   ├── env-check.ts      # 环境检测
│   ├── version-check.ts  # 版本校验
│   ├── legacy-cleanup.ts # 旧配置清理
│   ├── editor-setup.ts   # 编辑器配置
│   ├── oxfmt.ts          # oxfmt 配置
│   ├── oxlint.ts         # oxlint 配置
│   ├── husky.ts          # husky 配置
│   ├── lint-staged.ts    # lint-staged 配置
│   └── commitlint.ts     # commitlint 配置
├── utils/
│   ├── package-manager.ts # 包管理器工具
│   ├── executor.ts        # 命令执行工具
│   ├── file-utils.ts      # 文件操作工具（安全写入、深度合并）
│   └── logger.ts          # 日志工具
├── constants/
│   └── index.ts          # 常量定义（版本要求、配置模板）
└── __tests__/
    ├── modules/          # 模块单元测试
    ├── utils/            # 工具函数测试
    └── integration/      # 集成测试
```

**理由**:

- 模块化便于测试和维护
- 每个工具配置独立，易于扩展
- 公共工具函数复用
- **tests** 目录与源码对应，便于测试管理

### 10. 测试策略

**决策**: 使用 Vitest 作为测试框架，实现全面的测试覆盖

**理由**:

- Vitest 与 Vite 生态完美集成
- 支持 TypeScript 开箱即用
- 快速的冷启动和热更新
- 兼容 Jest API，迁移成本低

**测试覆盖**:

- 单元测试：每个模块和工具函数
- 集成测试：完整的 init 流程
- Mock 策略：execa 命令执行、文件系统操作

## Risks / Trade-offs

| 风险                        | 缓解措施                          |
| --------------------------- | --------------------------------- |
| 用户项目结构特殊，检测失败  | 提供友好的错误提示和跳过选项      |
| 旧配置清理误删重要文件      | 仅删除标准配置文件，删除前确认    |
| 跨平台命令执行失败          | 使用 execa 的跨平台能力，充分测试 |
| husky 版本不兼容            | 检测 husky 版本，使用对应 API     |
| 网络问题导致依赖安装失败    | 提供重试机制和错误提示            |
| 与现有 lint-staged 配置冲突 | 检测现有配置，询问是否覆盖        |
| 编辑器配置覆盖用户自定义    | 使用深度合并，保留原有配置        |
| Node.js 版本校验过严        | 提供版本要求说明和升级指引        |
